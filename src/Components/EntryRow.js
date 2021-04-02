import React, { useRef } from "react";
import { Check, X } from "react-feather";
import { Entry } from "../API/Entry";

const EntryRow = ({ state, dataField, setDataField, el, index, saved, setBlankField, blankRow }) => {
    const ref = useRef(null);
    const qtyRef = useRef(null);
    return (
        <tr key={index}>
            <td
                className="sr-td"
                onMouseEnter={() => {
                    let temp = { ...dataField[index] };
                    temp.delete = true;
                    dataField.splice(index, 1);
                    dataField.splice(index, 0, temp);
                    setDataField([...dataField]);
                }}
                onMouseLeave={() => {
                    let temp = { ...dataField[index] };
                    temp.delete = false;
                    dataField.splice(index, 1);
                    dataField.splice(index, 0, temp);
                    setDataField([...dataField]);
                }}
            >
                {el.delete ? (
                    <>
                        <span
                            onClick={async () => {
                                if (saved) {
                                    let temp = [...dataField];
                                    if (window.confirm("Are you sure?")) {
                                        await Entry.deleteEntry(el.eid);
                                        temp.splice(index, 1);
                                        setDataField(temp);
                                        return null;
                                    }
                                } else {
                                    let temp = [...dataField];
                                    temp.splice(index, 1);
                                    setDataField(temp);
                                }
                            }}
                            style={{ display: "flex", marginRight: "auto", cursor: "pointer" }}
                        >
                            <X size="18" style={{ color: "red" }} />
                        </span>
                        {saved && (
                            <span
                                style={{ display: "flex" }}
                                onClick={async () => {
                                    try {
                                        await Entry.updateEntry({
                                            eid: el.eid,
                                            cid: el.cid,
                                            catid: el.catid,
                                            subcatid: el.subcatid ? el.subcatid : "",
                                            product: el.description,
                                            qty: el.qty,
                                            type: el.type,
                                            cpaid: el.cpaid,
                                            total: el.total,
                                            mrate: el.mrate,
                                            lrate: el.lrate,
                                        });
                                    } catch (err) {
                                        alert("Something went wrong");
                                    }
                                }}
                            >
                                <Check size="18" style={{ color: "green", cursor: "pointer" }} />
                            </span>
                        )}
                    </>
                ) : (
                    index + 1
                )}
            </td>
            <td className="cat-group">
                <input
                    type="text"
                    onChange={(evt, lol) => {
                        let temp = { ...dataField[index] };
                        let cat = state.categories.findIndex((el) => el.catname === evt.target.value);
                        temp.catname = evt.target.value;
                        if (cat !== -1) {
                            temp.catid = state.categories[cat].catid;
                            temp.catname = state.categories[cat].catname;
                            setBlankField({
                                ...blankRow,
                                catid: state.categories[cat].catid,
                                catname: state.categories[cat].catname,
                            });
                        }
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                    value={el.catname}
                    list="cats"
                    placeholder="Type.."
                />
                <datalist id="cats">
                    {state.categories.map((elm, index) => (
                        <option value={elm.catname}>{elm.catid}</option>
                    ))}
                </datalist>
            </td>
            <td>
                <input
                    type="text"
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        let subc = state.subcategories.findIndex((el) => el.subcatname === evt.target.value);
                        temp.subcatname = evt.target.value;
                        if (subc !== -1) {
                            temp.subcatid = state.subcategories[subc].subcatid;
                            temp.subcatname = state.subcategories[subc].subcatname;
                            setBlankField({
                                ...blankRow,
                                subcatid: state.subcategories[subc].subcatid,
                                subcatname: state.subcategories[subc].subcatname,
                            });
                        }
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                    value={el.subcatname}
                    className="subcat-field"
                    placeholder="Type.."
                    list="subcats"
                    style={{ position: "relative" }}
                />
                <datalist height="200px" id="subcats">
                    {state.subcategories.map((elm, index) => (
                        <option key={index} value={elm.subcatname}>
                            {elm.subcatid}
                        </option>
                    ))}
                </datalist>
            </td>
            <td>
                <input
                    className="desc-field"
                    placeholder="Type.."
                    type="text"
                    ref={ref}
                    value={el.description}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.description = evt.target.value;
                        let prod = state.products.findIndex((el) => el.pname === evt.target.value);
                        if (prod !== -1) {
                            temp.description = state.products[prod].pname;
                            temp.lrate = state.products[prod].lrate;
                            temp.mrate = state.products[prod].mrate;
                            const total = Number(temp.qty) * (state.products[prod].lrate + state.products[prod].mrate);
                            temp.total = total;
                            temp.amountDue = total - temp.cpaid;
                        }
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                    list="products"
                />
                <datalist id="products">
                    {state.products.map((elm, index) => (
                        <option value={elm.pname}>{elm.pid}</option>
                    ))}
                </datalist>
            </td>
            <td>
                <input
                    className="qty-field"
                    value={el.qty}
                    type="number"
                    ref={qtyRef}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.qty = Number(evt.target.value);
                        const total = Number(evt.target.value) * (temp.mrate + temp.lrate);
                        temp.total = total;
                        temp.amountDue = total - Number(temp.cpaid);
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <select
                    className="type-field"
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.type = evt.target.value;
                        if (evt.target.value === "Lumsum") {
                            console.log(temp);
                            temp.mrate = 0;
                            temp.lrate = 0;
                            temp.description = "";
                            temp.total = 1;
                            ref.current.focus();
                        } else {
                            qtyRef.current.focus();
                        }
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                >
                    {el.type === "SQ.ft" ? (
                        <option selected value="SQ.ft">
                            SQ.ft
                        </option>
                    ) : (
                        <option value="SQ.ft">SQ.ft</option>
                    )}
                    {el.type === "Rn.ft" ? (
                        <option selected value="Rn.ft">
                            Rn.ft
                        </option>
                    ) : (
                        <option value="Rn.ft">Rn.ft</option>
                    )}
                    {el.type === "Lumsum" ? (
                        <option selected value="Lumsum">
                            Lumsum
                        </option>
                    ) : (
                        <option value="Lumsum">Lumsum</option>
                    )}
                </select>
            </td>
            <td>
                <input
                    className="mrate-field"
                    type="number"
                    disabled={el.type === "Lumsum" ? true : false}
                    value={el.mrate}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.mrate = Number(evt.target.value);
                        const total = Number(temp.qty) * (Number(evt.target.value) + Number(temp.lrate));
                        temp.total = total;
                        temp.amountDue = total - Number(temp.cpaid);
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <input
                    className="lrate-field"
                    value={el.lrate}
                    disabled={el.type === "Lumsum" ? true : false}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.lrate = Number(evt.target.value);
                        const total = Number(temp.qty) * (Number(evt.target.value) + Number(temp.mrate));
                        temp.total = total;
                        temp.amountDue = total - Number(temp.cpaid);
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <input
                    className="t-field"
                    value={el.cpaid}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.cpaid = Number(evt.target.value);
                        temp.amountDue = Number(temp.total) - Number(evt.target.value);
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <input
                    className="t-field"
                    value={el.total}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.total = Number(evt.target.value);
                        temp.amountDue = Number(evt.target.value) - Number(temp.cpaid);
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
        </tr>
    );
};

export default EntryRow;
