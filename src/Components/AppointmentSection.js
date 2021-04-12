import React, { useState } from "react";
import { X } from "react-feather";
import AppointmentLetter from "./Template/AppointmentLetter";

const AppointmentSection = (props) => {
    const [authenticated, setAuthenticated] = useState({
        password: "",
        success: false,
    });

    const getDate = (pre) => {
        let date = new Date(pre);
        let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let yy = date.getFullYear();

        return `${dd}.${mm}.${yy}`;
    };

    const getSplitted = (address) => {
        return address.split(",");
    };

    const [letterData, setLetterData] = useState({
        name: "",
        address: "",
        date: "",
        arrayOfAddress: "",
        amount: "",
        totalSqft: "",
        rows: [],
        display: false,
    });

    const getAuthenticated = () => {
        if (authenticated.password === "truchi891") {
            setAuthenticated({ ...authenticated, success: true });
        }
    };

    const viewAuthentication = () => {
        return (
            <div className="cont">
                <div className="title-row">
                    <h1>Appointment Letter</h1>
                </div>
                <div className="data-row">
                    <input
                        type="password"
                        className="input-field mr-2"
                        placeholder="Enter Pin"
                        value={authenticated.password}
                        onChange={(evt) => {
                            setAuthenticated({ ...authenticated, password: evt.target.value });
                        }}
                    />
                    <button className="gen-btn" onClick={getAuthenticated}>
                        Enter
                    </button>
                </div>
            </div>
        );
    };

    return authenticated.success ? (
        <div className="cont">
            <div className="title-row">
                <h1>Appointment Letter</h1>
            </div>
            <div className="data-row">
                <input
                    className="input-field mr-2"
                    placeholder="Enter name"
                    value={letterData.name}
                    onChange={(evt) => {
                        setLetterData({ ...letterData, display: false, name: evt.target.value });
                    }}
                />
                <input
                    className="input-field mr-2"
                    placeholder="Enter address"
                    value={letterData.address}
                    onChange={(evt) => {
                        setLetterData({
                            ...letterData,
                            display: false,
                            address: evt.target.value,
                            arrayOfAddress: getSplitted(evt.target.value),
                        });
                    }}
                />
                <input
                    className="input-field mr-2"
                    placeholder="Enter Salary"
                    value={letterData.amount}
                    onChange={(evt) => {
                        setLetterData({ ...letterData, display: false, amount: evt.target.value });
                    }}
                />
                <input
                    className="input-field mr-2"
                    placeholder="Enter sq.ft"
                    value={letterData.totalSqft}
                    onChange={(evt) => {
                        setLetterData({ ...letterData, display: false, totalSqft: evt.target.value });
                    }}
                />
                <input
                    className="input-field mr-2"
                    placeholder="Select Date"
                    type="date"
                    onChange={(evt) => {
                        setLetterData({ ...letterData, display: false, date: getDate(evt.target.value) });
                    }}
                />
            </div>
            {letterData.rows.map((el, index) => (
                <div className="data-row">
                    <input
                        className="input-field mr-2"
                        placeholder="Enter Heading"
                        value={el.heading}
                        onChange={(evt) => {
                            let temp = [...letterData.rows];
                            temp[index].heading = evt.target.value;
                            setLetterData({ ...letterData, rows: temp });
                        }}
                    />
                    <input
                        className="input-field mr-2"
                        style={{ width: "1000px" }}
                        placeholder="Enter Description"
                        value={el.description}
                        onChange={(evt) => {
                            let temp = [...letterData.rows];
                            temp[index].description = evt.target.value;
                            setLetterData({ ...letterData, rows: temp });
                        }}
                    />
                    <span
                        style={{ display: "flex", marginRight: "auto", alignItems: "center", marginTop: 5, cursor: "pointer" }}
                        onClick={() => {
                            let temp = [...letterData.rows];
                            temp.splice(index, 1);
                            setLetterData({ ...letterData, rows: temp });
                        }}
                    >
                        <X size="18" style={{ color: "red" }} />
                    </span>
                </div>
            ))}
            <div className="data-row">
                <button
                    className="gen-btn mr-2"
                    onClick={() => {
                        let temp = { heading: "", description: "", rid: letterData.rows.length + 1 };
                        setLetterData({ ...letterData, rows: [...letterData.rows, temp] });
                    }}
                >
                    Add a Section
                </button>
                <button
                    className="gen-btn"
                    onClick={() => {
                        setLetterData({ ...letterData, display: true });
                    }}
                >
                    Generate
                </button>
            </div>
            <div className="letter-cont">
                <AppointmentLetter loading={letterData.display} state={letterData} />
            </div>
        </div>
    ) : (
        viewAuthentication()
    );
};

export default AppointmentSection;
