import React from "react";

export default function EntryCardView(props) {
    return (
        <div className="category-card">
            <div className="card-heading">
                <span className="smtext">ADD</span>
                <span className="lgtext">CATEGORY</span>
            </div>
            <div className="card-body">
                <div className="in-group">
                    <span>Name</span>
                    <input type="text" />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}
