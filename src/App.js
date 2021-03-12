import React, { useState } from "react";
import "./css/style.scss";
import { HashRouter } from "react-router-dom";
import MainView from "./Components/MainView";
import DetailView from "./Components/DetailView";
import { createHashHistory } from "history";
import Auth from "./Components/Auth";
import { Minus, X } from "react-feather";
import axios from "axios";
const history = createHashHistory();

function App() {
    const [state, setState] = useState({
        view: localStorage.getItem("flag") ? "FRONT" : "AUTH",
        id: undefined,
    });

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
                {state.view === "FRONT" && <MainView setSelectView={setState} />}
                {state.view === "BACK" && <DetailView selectView={state} setSelectView={setState} />}
            </div>
        </HashRouter>
    );
}

export default App;
