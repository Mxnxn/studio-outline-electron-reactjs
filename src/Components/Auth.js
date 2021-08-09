import axios from "axios";
import React, { useState } from "react";

const Auth = ({ selectView, setSelectView }) => {
    const [state, setState] = useState({
        uname: "",
        password: "",
        status: false,
    });

    const check = async () => {
        if (!state.uname || !state.password) return setState({ ...state, status: "Field's Can't be Empty!" });
        try {
            const res = await axios.post("https://greenadvertisers.in/studiooutline/api/login", { username: state.uname, password: state.password });
            if (res.data.code === 403) {
                return setState({ ...state, status: "Something Went Wrong!" });
            }
            if (res.data.data && res.data.code) {
                setSelectView({ ...selectView, view: "FRONT" });
                localStorage.setItem("1b", res.data.data);
            }
        } catch (error) {
            setState({ ...state, status: "Something Went Wrong!" });
        }
    };

    return (
        <div className="cont">
            <div className="wrapper">
                <div className="box">
                    <span>Studio Outline</span>
                    {state.status && <span className="wrong">{state.status}</span>}

                    <input
                        type="text"
                        onChange={(evt) => {
                            setState({ ...state, uname: evt.target.value });
                        }}
                        value={state.uname}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        onChange={(evt) => {
                            setState({ ...state, password: evt.target.value });
                        }}
                        value={state.password}
                        placeholder="Password"
                    />
                    <button onClick={check}>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
