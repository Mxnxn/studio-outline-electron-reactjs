import React, { useEffect, useState } from "react";
import "./css/style.scss";
import "./css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import MainView from "./Components/MainView";
import DetailView from "./Components/DetailView";
import { createHashHistory } from "history";
import Auth from "./Components/Auth";
import { Minus, X } from "react-feather";
import axios from "axios";
import Toast from "./Components/Toast";
import anime from "animejs";
const history = createHashHistory();

function App() {
    const [state, setState] = useState({
        view: localStorage.getItem("flag") ? "FRONT" : "AUTH",
        id: undefined,
    });

    const [toast, setToast] = useState({ isVisible: false, type: "", message: "" });

    useEffect(() => {
        if (toast.isVisible) {
            anime({
                targets: ".toast",
                opacity: [1, 0],
                translateY: -20,
                delay: 1500,
                duration: 2400,
                easing: "spring(100,0,10,1)",
            });

            setTimeout(() => {
                setToast({ isVisible: false, type: "", message: "" });
            }, 2400);
        }
    }, [toast.isVisible]);

    return (
        <HashRouter history={history} basename="/">
            <div className="App">
                <div className="titlebar">
                    <button
                        className="min-btn"
                        onClick={async () => {
                            try {
                                await axios.get(`${process.env.REACT_APP_API_URL}/minimize`);
                            } catch (err) {}
                        }}
                    >
                        <Minus size="12" />
                    </button>
                    <button
                        className="cls-btn"
                        onClick={async () => {
                            try {
                                await axios.get(`${process.env.REACT_APP_API_URL}/exit`);
                            } catch (err) {}
                        }}
                    >
                        <X size="12" />
                    </button>
                </div>
                {state.view === "AUTH" && <Auth selectView={state} setSelectView={setState} />}
                {state.view === "FRONT" && <MainView setSelectView={setState} setToast={setToast} />}
                {state.view === "BACK" && (
                    <DetailView selectView={state} setSelectView={setState} setToast={setToast} />
                )}
                <Toast msg={toast.message} type={toast.type} visible={toast.isVisible} setToast={toast} />
            </div>
        </HashRouter>
    );
}

export default App;
