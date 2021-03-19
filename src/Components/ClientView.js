import React, { useState } from "react";
import { Check, Edit, UserCheck, X } from "react-feather";
import { Client } from "../API/Client";
import DeleteModal from "./DeleteModal";
export default function ClientView({ clients, selectedView, setSelectView, setToast }) {
    const [state, setState] = useState({ clients: [...clients], copyClients: [...clients] });
    const [client, setClient] = useState({ clientName: "", sitename: "", cid: "", delete: false, index: "" });

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
                setToast({ isVisible: true, message: "New Client Added!", type: "success" });
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
            setToast({ isVisible: true, message: "Details Updated Successfully!", type: "success" });
        } catch (error) {
            alert(error);
            setToast({ isVisible: true, message: "Something went wrong!", type: "danger" });
            // alert("Something went wrong!\nCHECK LOGS FOR ERROR!");
        }
    };

    const deleteThisClient = async () => {
        try {
            await Client.deleteClient({ id: client.cid });
            let temp = [...state.clients];
            temp.splice(client.index, 1);
            setState({ ...state, clients: [...temp] });
            setToast({ isVisible: true, message: "Client Deleted successfully!", type: "danger" });
            setClient({ clientName: "", sitename: "", cid: "", delete: false, index: "" });
        } catch (error) {
            setToast({ isVisible: true, message: "Something went wrong while deleting!", type: "danger" });
        }
    };

    const close = () => {
        setClient({ clientName: "", sitename: "", cid: "", delete: false, index: "" });
    };

    return (
        <div className="cont">
            <DeleteModal close={close} isVisible={client.delete} submit={deleteThisClient} title="Delete Client" />
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
                                        // deleteThisClient(index, element.cid);
                                        setClient({ ...client, delete: true, cid: element.cid, index: index });
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
