import React, { useState } from "react";

const Auth = ({ selectView, setSelectView }) => {
    const [state, setState] = useState({
        uname: "",
        password: "",
        status: false,
    });

    const check = () => {
        if (state.uname === "studio.outline" && state.password === "Outline@20891") {
            setSelectView({ ...selectView, view: "FRONT" });
            localStorage.setItem("flag", true);
        } else {
            setState({ ...state, status: "Wrong Credential" });
        }
    };

    return (
        <div className="App">
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
        </div>
    );
};

export default Auth;
