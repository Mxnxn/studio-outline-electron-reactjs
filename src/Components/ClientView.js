import React, { useState } from "react";
import { Check, Edit, UserCheck, X } from "react-feather";
import { Client } from "../API/Client";

export default function ClientView({ clients, selectedView, setSelectView }) {
    const [state, setState] = useState({ clients: [...clients], copyClients: [...clients] });
    const [client, setClient] = useState({ clientName: "", sitename: "" });

    const updateClient = async (index, cid) => {
        console.log(index, cid);
        try {
            if (cid === "new") {
                const res = await Client.addClient({
                    clientname: client.clientName,
                    sitename: client.sitename,
                });
                let temp = [...state.clients];
                temp[index].cid = res.data;
                temp[index].clientname = client.clientName;
                temp[index].sitename = client.sitename;
                return setState({ ...state, clients: [...temp] });
            }
            await Client.updateClient({
                clientname: client.clientName,
                sitename: client.sitename,
                id: cid,
            });
            let temp = [...state.clients];
            console.log(temp);
            temp[index].clientname = client.clientName;
            temp[index].sitename = client.sitename;
            setState({ ...state, clients: [...temp] });
        } catch (error) {
            alert(error);
            // alert("Something went wrong!\nCHECK LOGS FOR ERROR!");
        }
    };

    const deleteThisClient = async (index, cid) => {
        if (window.confirm("Are you sure want to delete this client?")) {
            try {
                await Client.deleteClient({ id: cid });
                let temp = [...state.clients];
                temp.splice(index, 1);
                setState({ ...state, clients: [...temp] });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="cont">
            <div className="add-new-row">
                {/* <div className="search">
                    <input type="text" className="search-field" placeholder="Client Name" />
                </div> */}
                <span
                    className="btn"
                    onClick={() => {
                        const temp = [...state.clients];
                        let temp2 = [
                            {
                                cid: "new",
                                clientname: "",
                                sitename: "",
                                editView: true,
                                editMode: false,
                            },
                        ];
                        for (let i = 0; i < temp.length; i++) {
                            const element = temp[i];
                            temp2 = [...temp2, element];
                        }
                        setClient({ ...client, clientName: "", sitename: "" });
                        setState({ ...state, clients: [...temp2] });
                    }}
                >
                    Add New
                </span>
            </div>
            <div className="main-cont">
                {state.clients.map((element, index) => (
                    <div
                        key={index}
                        className="card"
                        onMouseEnter={() => {
                            let temp = state.clients;
                            temp[index].editMode = true;
                            setState({ ...state, clients: [...temp] });
                        }}
                        onMouseLeave={() => {
                            let temp = state.clients;
                            temp[index].editMode = false;
                            setState({ ...state, clients: [...temp] });
                        }}
                    >
                        {element.editMode && !element.editView && (
                            <div className="cross">
                                <X
                                    size="12"
                                    onClick={() => {
                                        deleteThisClient(index, element.cid);
                                    }}
                                />
                            </div>
                        )}
                        <div
                            className="avtar"
                            onClick={() => {
                                if (element.cid !== "new") setSelectView({ view: "BACK", id: element.cid });
                            }}
                        >
                            <div className="circle">
                                <div className="icon-svg">
                                    <UserCheck size="28" />
                                </div>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="cname">
                                {element.editView ? (
                                    <input
                                        className="cname-input"
                                        type="text"
                                        placeholder="Client Name"
                                        value={client.clientName}
                                        onChange={(evt) => setClient({ ...client, clientName: evt.target.value })}
                                    />
                                ) : (
                                    <span
                                        onClick={() => {
                                            setSelectView({ view: "BACK", id: element.cid });
                                        }}
                                    >
                                        {element.clientname}
                                    </span>
                                )}
                                <div className="editBtn">
                                    {element.editMode && !element.editView && (
                                        <Edit
                                            size="16"
                                            onClick={() => {
                                                let temp = state.clients;
                                                temp[index].editView = true;
                                                setState({ ...state, clients: [...temp] });
                                                setClient({
                                                    sitename: element.sitename,
                                                    clientName: element.clientname,
                                                });
                                            }}
                                        />
                                    )}
                                    {element.editView && (
                                        <Check
                                            style={{ color: "green", marginLeft: "-5px" }}
                                            size="22"
                                            onClick={() => {
                                                let temp = state.clients;
                                                temp[index].editView = false;
                                                setState({ ...state, clients: [...temp] });
                                                updateClient(index, element.cid);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="sname">
                                {element.editView ? (
                                    <input
                                        className="sname-input"
                                        type="text"
                                        placeholder="Site Name"
                                        value={client.sitename}
                                        onChange={(evt) => setClient({ ...client, sitename: evt.target.value })}
                                    />
                                ) : (
                                    <span>{element.sitename}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
