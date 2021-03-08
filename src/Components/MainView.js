import React, { useCallback, useEffect, useState } from "react";
import ClientView from "./ClientView";
import DatabaseView from "./DatabaseView";
import Sidebar from "./Sidebar";
import { Client } from "../API/Client";

const MainView = ({ selectView, setSelectView }) => {
    const [view, setView] = useState({
        selectedView: localStorage.getItem("view") ? localStorage.getItem("view") : "CLIENT",
    });
    const initialState = { clients: [], stopLoading: false };

    const [state, setState] = useState({ ...initialState });
    const getAllClient = useCallback(async () => {
        try {
            let res = await Client.getAllClient();
            let temp = [];
            for (let i = 0; i < res.data.length; i++) {
                let element = res.data[i];
                temp[i] = { ...element, editMode: false, editView: false };
            }
            setState({ ...state, stopLoading: true, clients: temp });
        } catch (error) {
            console.log("here:", error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllClient();
        return () => setState({ ...initialState });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllClient]);

    return (
        <div className="App">
            <Sidebar view={view} setView={setView} />
            {view.selectedView === "CLIENT" && state.stopLoading && (
                <ClientView selectView={selectView} setSelectView={setSelectView} clients={state.clients} />
            )}
            {view.selectedView === "DATABASE" && <DatabaseView />}
        </div>
    );
};

export default MainView;
