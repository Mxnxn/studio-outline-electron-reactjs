import React, { useCallback, useEffect, useState } from "react";
import "./css/style.scss";
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from "react-router-dom";
import MainView from "./Components/MainView";
import DetailView from "./Components/DetailView";
import axios from "axios";
import { createHashHistory } from "history";

const history = createHashHistory();

function App() {
    const [state, setState] = useState({
        view: "FRONT",
        id: undefined,
    });

    return (
        <HashRouter history={history} basename="/">
            {state.view === "FRONT" && <MainView setSelectView={setState} />}
            {state.view === "BACK" && <DetailView selectView={state} setSelectView={setState} />}
        </HashRouter>
    );
}

export default App;
