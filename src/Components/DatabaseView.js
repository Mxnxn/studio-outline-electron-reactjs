import React from "react";
import EntryCardView from "./EntryCardView";

export default  function DatabaseView (props){
    return <div className="cont">
                <div className="main-cont">
                    
                        <EntryCardView/>
                        <EntryCardView/>
                        <EntryCardView/>

                </div>
            </div>
}