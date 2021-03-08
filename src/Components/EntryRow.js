import React from "react";
import { X } from "react-feather";
import { Entry } from "../API/Entry";

const EntryRow = ({ state, dataField, setDataField, el, index, saved }) => {
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
                    <span
                        onClick={async () => {
                            let temp = [...dataField];
                            if (window.confirm("Are you sure?")) {
                                if (saved) {
                                    await Entry.deleteEntry(el.eid);
                                    temp.splice(index, 1);
                                    setDataField(temp);
                                    return null;
                                }
                                temp.splice(index, 1);
                                setDataField(temp);
                            }
                        }}
                        style={{ display: "flex", marginRight: "auto" }}
                    >
                        <X size="18" style={{ color: "red" }} />
                    </span>
                ) : (
                    index + 1
                )}
            </td>
            <td className="cat-group">
                <input
                    autoFocus
                    type="text"
                    onChange={(evt, lol) => {
                        let temp = { ...dataField[index] };
                        let cat = state.categories.findIndex((el) => el.catname === evt.target.value);
                        temp.catname = evt.target.value;
                        if (cat !== -1) {
                            temp.catid = state.categories[cat].catid;
                            temp.catname = state.categories[cat].catname;
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
                    value={el.description}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.description = evt.target.value;
                        let prod = state.products.findIndex((el) => el.pname === evt.target.value);
                        if (prod !== -1) {
                            temp.description = state.products[prod].pname;
                            temp.lrate = state.products[prod].lrate;
                            temp.mrate = state.products[prod].mrate;
                            const total =
                                Number(temp.length) *
                                Number(temp.height) *
                                (state.products[prod].lrate + state.products[prod].mrate);
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
                    value={el.length}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.length = evt.target.value;
                        const total = Number(evt.target.value) * Number(temp.height) * (temp.mrate + temp.lrate);
                        temp.total = total;
                        temp.amountDue = total - temp.cpaid;
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
                <input
                    className="qty-field"
                    value={el.height}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.height = evt.target.value;
                        const total = Number(evt.target.value) * Number(temp.length) * (temp.mrate + temp.lrate);
                        temp.total = total;
                        temp.amountDue = total - temp.cpaid;
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <select className="type-field">
                    <option>SQ.ft</option>
                    <option>Rn.ft</option>
                    <option>Lumsum</option>
                    <option>-</option>
                </select>
            </td>
            <td>
                <input
                    className="mrate-field"
                    value={el.mrate}
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.mrate = evt.target.value;
                        const total = Number(temp.length) * Number(temp.height) * (evt.target.value + temp.lrate);
                        temp.total = total;
                        temp.amountDue = total - temp.cpaid;
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
                    onChange={(evt) => {
                        let temp = { ...dataField[index] };
                        temp.lrate = evt.target.value;
                        const total = Number(temp.length) * Number(temp.height) * (evt.target.value + temp.mrate);
                        temp.total = total;
                        temp.amountDue = total - temp.cpaid;
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

                        temp.cpaid = evt.target.value;
                        temp.amountDue = temp.total - evt.target.value;
                        dataField.splice(index, 1);
                        dataField.splice(index, 0, temp);
                        setDataField([...dataField]);
                    }}
                />
            </td>
            <td>
                <input className="t-field" value={el.total} />
            </td>
        </tr>
    );
};

export default EntryRow;
