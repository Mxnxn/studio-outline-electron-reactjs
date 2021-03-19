import React from "react";
import { Database, LogOut, RotateCw, Users } from "react-feather";

export default function Sidebar({ setView, view }) {
    return (
        <div className="sidebar">
            <div
                className={view.selectedView === "DATABASE" ? "dbs" : "users"}
                onClick={() => {
                    setView({ selectedView: "CLIENT" });
                    localStorage.setItem("view", "CLIENT");
                }}
            >
                <Users />
            </div>
            <div
                className={view.selectedView === "DATABASE" ? "users topf" : "dbs topf"}
                onClick={() => {
                    setView({ selectedView: "DATABASE" });
                    localStorage.setItem("view", "DATABASE");
                }}
            >
                <Database />
            </div>
            <div
                className={"dbs topf"}
                onClick={() => {
                    window.location.reload();
                }}
            >
                <RotateCw />
            </div>

            <div
                className="square"
                style={{ marginTop: "auto" }}
                onClick={() => {
                    localStorage.removeItem("flag");
                    window.location.reload();
                }}
            >
                <LogOut />
            </div>
        </div>
    );
}
