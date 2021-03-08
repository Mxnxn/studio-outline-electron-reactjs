import React from "react";

const Pagination = ({ length, perPage, setCurrentPage, name }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(length / perPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((el, index) => (
                <button
                    key={index}
                    className="page"
                    onClick={() => {
                        setCurrentPage(el, name);
                    }}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
