import React, { useState } from "react";
import EntryCardView from "./EntryCardView";
import ProductCard from "./ProductCard";

export default function DatabaseView(props) {
    const initState = {
        categories: [],
        subcategories: [],
        products: [],
        product: {
            name: "",
            mrate: 0,
            lrate: 0,
        },
    };
    const [state, setState] = useState({ ...initState });

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
