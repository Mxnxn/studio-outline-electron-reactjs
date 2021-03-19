import React from "react";
import EntryRow from "./EntryRow";

const EntryTable = ({ dataField, setDataField, state, saved, setBlankField, blankRow }) => {
    return (
        <table className="table">
            {dataField.length !== 0 && (
                <thead className="thead">
                    <th>sr</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Name</th>
                    <th>qty</th>
                    <th>type</th>
                    <th>mrate</th>
                    <th>lrate</th>
                    <th>paid</th>
                    <th>Total</th>
                </thead>
            )}
            <tbody>
                {dataField.map((el, index) => (
                    <EntryRow
                        index={index}
                        el={el}
                        state={state}
                        dataField={dataField}
                        setDataField={setDataField}
                        saved={saved}
                        setBlankField={setBlankField}
                        blankRow={blankRow}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default EntryTable;
