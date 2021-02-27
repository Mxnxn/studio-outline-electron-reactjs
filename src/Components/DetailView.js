import React, { useState } from "react";
import { ArrowLeft, Plus } from "react-feather";
import { Link } from "react-router-dom";

const DetailView = (props) => {
    const [edit, setEdit] = useState(false);

    const [dataField, setDataField] = useState([{ id: "", name: "" }]);

    const blankRow = { id: "", name: "" };
    return (
        <div className="App">
            <div className="sidebar">
                <Link to="/">
                    <div className="square">
                        <ArrowLeft />
                    </div>
                </Link>
            </div>
            <div className="cont">
                <div className="title-row">
                    <h1>Information</h1>
                </div>
                <div className="data-row">
                    <div className="client-block">
                        <span className="heading">CLIENT</span>
                        <h2>Mr. Narayan Das</h2>
                    </div>
                    <div className="date-block">
                        <span className="heading">SITE</span>
                        <h2>FarmVille Farm House</h2>
                    </div>
                    <div className="date-block">
                        <div className="column ">
                            <span className="heading">DATE</span>
                            {edit ? (
                                <input
                                    onMouseLeave={() => setEdit(false)}
                                    className="date-field"
                                    type="date"
                                    onChange={(e) => console.log(e)}
                                    value="2020-02-22"
                                />
                            ) : (
                                <h2 onDoubleClick={() => setEdit(true)}>22/02/2020</h2>
                            )}
                        </div>
                    </div>
                </div>
                <div className="data-row"></div>
                <div className="title-row">
                    <h1>Entry</h1>
                </div>
                <div className="data-rowx">
                    <table className="table">
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
                        <tbody>
                            {dataField.map((el, index) => (
                                <tr key={index}>
                                    <td className="sr-td">{index + 1}</td>
                                    <td>
                                        <input className="cat-field" value="Electrification work" />
                                    </td>
                                    <td>
                                        <input className="subcat-field" value="Kitchen area(Laminate+TANDOM+CHANEL)" />
                                    </td>
                                    <td>
                                        <input className="desc-field" value="Kitchen area(Laminate+TANDOM+CHANEL)" />
                                    </td>
                                    <td>
                                        <input className="qty-field" />
                                        <input className="qty-field" />
                                    </td>
                                    <td>
                                        <input className="type-field" />
                                    </td>
                                    <td>
                                        <input className="mrate-field" />
                                    </td>
                                    <td>
                                        <input className="lrate-field" />
                                    </td>
                                    <td>
                                        <input className="t-field" />
                                    </td>
                                    <td>
                                        <input className="t-field" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span
                        className="add-row"
                        onClick={() => {
                            setDataField([...dataField, blankRow]);
                        }}
                    >
                        <Plus size="18" />
                    </span>
                </div>
                <div className="footer-row"></div>
            </div>
        </div>
    );
};

export default DetailView;
