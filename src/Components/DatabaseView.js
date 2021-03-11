import React from "react";
import EntryCardView from "./EntryCardView";
import ProductCard from "./ProductCard";

export default function DatabaseView(props) {
    return (
        <div className="cont">
            <div className="main-cont">
                <EntryCardView name="CATEGORY" />
                <EntryCardView name="SUBCATEGORY" />
                <ProductCard />
            </div>
            <div className="main-cont"></div>
        </div>
    );
}
