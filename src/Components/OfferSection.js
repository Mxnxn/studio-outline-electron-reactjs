import React, { useState } from "react";
import OfferLetter from "./Template/OfferLetter";

const OfferSection = ({ loading }) => {
    const getDate = (pre) => {
        let date = new Date(pre);
        let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let yy = date.getFullYear();

        return `${dd}-${mm}-${yy}`;
    };

    const [letterData, setLetterData] = useState({
        name: "",
        date: getDate(new Date()),
        workingDays: 0,
        wage: 0,
        display: false,
    });

    return (
        loading && (
            <div className="cont">
                <div className="title-row">
                    <h1>Offer Letter</h1>
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
                        placeholder="Enter working days"
                        value={letterData.workingDays}
                        onChange={(evt) => {
                            setLetterData({ ...letterData, display: false, workingDays: evt.target.value });
                        }}
                    />
                    <input
                        className="input-field mr-2"
                        placeholder="Enter Salary"
                        value={letterData.wage}
                        onChange={(evt) => {
                            setLetterData({ ...letterData, display: false, wage: evt.target.value });
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
                    <OfferLetter loading={letterData.display} state={letterData} />
                </div>
            </div>
        )
    );
};

export default OfferSection;
