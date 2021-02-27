import React from "react";
import {  Database,Settings, Users} from "react-feather";

export default function Sidebar({setView,view}){
    return (<div className="sidebar">
    <div className={view.selectedView === "DATABASE" ?  "dbs":"users" } onClick={()=>setView({selectedView:"CLIENT"})}>
        <Users />
    </div>
    <div className={view.selectedView === "DATABASE" ? "users topf":"dbs topf"} onClick={()=>setView({selectedView:"DATABASE"})}>
        <Database />
    </div>
    <div className="square" style={{ marginTop: "auto" }}>
        <Settings />
    </div>
</div>)
}
