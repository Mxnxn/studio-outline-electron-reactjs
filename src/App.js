import React, { useState } from "react";
import "./css/style.scss";
import { HashRouter } from "react-router-dom";
import MainView from "./Components/MainView";
import DetailView from "./Components/DetailView";
import { createHashHistory } from "history";
import Auth from "./Components/Auth";

const history = createHashHistory();

function App() {
    const [state, setState] = useState({
        view: localStorage.getItem("flag") ? "FRONT" : "AUTH",
        id: undefined,
    });

    return (
        <HashRouter history={history} basename="/">
            {state.view === "AUTH" && <Auth selectView={state} setSelectView={setState} />}
            {state.view === "FRONT" && <MainView setSelectView={setState} />}
            {state.view === "BACK" && <DetailView selectView={state} setSelectView={setState} />}
        </HashRouter>
    );
}

export default App;
