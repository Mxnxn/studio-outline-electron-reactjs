import React from "react";
import "./css/style.scss";
import { BrowserRouter, Route } from "react-router-dom";
import MainView from "./Components/MainView";
import DetailView from "./Components/DetailView";
function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact render={() => <MainView />} />
            <Route path="/clientid" render={() => <DetailView />} />
        </BrowserRouter>
    );
}

export default App;
