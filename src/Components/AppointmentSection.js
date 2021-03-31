import React, { useState } from "react";
import AppointmentLetter from "./Template/AppointmentLetter";

const AppointmentSection = (props) => {
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
        display: false,
    });

    return (
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
            </div>
            <div className="data-row">
                <input
                    className="input-field mr-2"
                    placeholder="Select Date"
                    type="date"
                    onChange={(evt) => {
                        setLetterData({ ...letterData, display: false, date: getDate(evt.target.value) });
                    }}
                />
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
    );
};

export default AppointmentSection;
