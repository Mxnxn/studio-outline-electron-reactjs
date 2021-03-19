import React, { useEffect, useState } from "react";
import { X } from "react-feather";
const Toast = ({ msg, type, visible }) => {
    return (
        <>
            {visible && (
                <div className={type === "danger" ? "toast danger" : "toast"}>
                    <div className="ico">
                        <X size="12" />
                    </div>
                    <div className="msg">{msg}</div>
                </div>
            )}
        </>
    );
};

export default Toast;
