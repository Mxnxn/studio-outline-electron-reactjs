import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Check, FileText, Plus, RotateCw } from "react-feather";
import { Category } from "../API/Category";
import { Subcategory } from "../API/Subcategory";
import { Product } from "../API/Product";
import { Entry } from "../API/Entry";
import EntryTable from "./EntryTable";
import { Client } from "../API/Client";
import { exportExcel } from "../API/Export";
import Hotkeys from "react-hot-keys";
const DetailView = ({ selectView, setSelectView, setToast }) => {
    const [state, setState] = useState({
        stopLoading: false,
        categories: [],
        subcategories: [],
        products: [],
        url: { value: "", edit: false },
        cid: selectView.id,
        saved: false,
        inputValues: {
            catName: "",
            subName: "",
        },
    });

    const [addedDataField, setAddedDataField] = useState([]);
    const [dataField, setDataField] = useState([]);

    const [blankRow, setBlankField] = useState({
        eid: 1,
        cid: selectView.id,
        catid: "",
        catname: "",
        subcatid: "",
        subcatname: "",
        description: "",
        mrate: 1,
        lrate: 1,
        qty: 1,
        type: "SQ.ft",
        cpaid: 0,
        total: 1,
        amountDue: 1,
        delete: false,
    });

    const getEverything = useCallback(async () => {
        try {
            const client = await Client.getClient(state.cid);
            const cats = await Category.getAllCategory();
            const scats = await Subcategory.getAllSubcategory();
            const prods = await Product.getAllProduct();
            const entries = await Entry.getAllEntryOfThis(state.cid);
            setState({
                ...state,
                categories: [...cats.data],
                subcategories: [...scats.data],
                products: [...prods.data],
                stopLoading: true,
                client: { ...client.data },
                url: { edit: false, value: client.data.url },
            });
            setAddedDataField([...entries.data]);
        } catch (error) {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getEverything();

        return () => {};
    }, [getEverything]);

    const saveTheseRows = async () => {
        if (dataField.length === 0) {
            setToast({ message: "Add a entry to save!!!", type: "danger", isVisible: true });
        }
        for (let i = 0; i < dataField.length; i++) {
            if (!dataField[i].catname || !dataField[i].catid || !dataField[i].description || !dataField[i].subcatname || !dataField[i].subcatid) {
                setToast({ message: "Please delete empty rows!!", type: "danger", isVisible: true });
                i = dataField.length;
                return null;
            }
        }
        let temp = [];
        for (let i = 0; i < dataField.length; i++) {
            const element = dataField[i];
            console.log(element.type);
            const res = await Entry.addEntry({
                cid: element.cid,
                catid: element.catid,
                subcatid: element.subcatid ? element.subcatid : "",
                product: element.description,
                qty: !element.qty ? 0 : element.qty,
                type: element.type,
                cpaid: element.cpaid,
                total: element.total,
                mrate: !element.mrate ? 0 : element.mrate,
                lrate: !element.lrate ? 0 : element.lrate,
            });
            temp.push({ ...res.data, catname: element.catname, subcatname: element.subcatname });
            if (i === dataField.length - 1 && res.message) {
                setDataField([]);
                setAddedDataField([...addedDataField, ...temp]);
                setToast({ message: "Successfully Saved!", type: "success", isVisible: true });
            }
        }
    };

    const updateExistingRows = async () => {
        for (let i = 0; i < addedDataField.length; i++) {
            if (!addedDataField[i].catname || !addedDataField[i].catid || !addedDataField[i].description) {
                setToast({ message: "Don't leave fields empty!!!", type: "danger", isVisible: true });
                i = addedDataField.length;
                return null;
            }
        }
        for (let i = 0; i < addedDataField.length; i++) {
            const element = addedDataField[i];
            const res = await Entry.updateEntry({
                eid: element.eid,
                cid: element.cid,
                catid: element.catid,
                subcatid: element.subcatid ? element.subcatid : "",
                product: element.description,
                qty: element.qty,
                type: element.type,
                cpaid: element.cpaid,
                total: element.total,
                mrate: element.mrate,
                lrate: element.lrate,
            });
            if (i === addedDataField.length - 1 && res.message) {
                setToast({ message: "Successfully updated!!", type: "danger", isVisible: true });
            }
        }
    };

    const exportToExcel = async () => {
        if (dataField.length !== 0) {
            return setToast({ message: "Kindly Save Your Work!", type: "danger", isVisible: true });
        }
        if (addedDataField.length === 0) {
            return setToast({ message: "Add Some entries to export!!", type: "danger", isVisible: true });
        }
        let rowWithSubCat = [];
        for (let index = 0; index < addedDataField.length; index++) {
            const entry = addedDataField[index];
            const indexOfCat = rowWithSubCat.findIndex((el) => el.catid === entry.catid);
            if (indexOfCat === -1) {
                rowWithSubCat = [
                    ...rowWithSubCat,
                    {
                        total: Number(entry.total),
                        cpaid: Number(entry.cpaid),
                        catid: entry.catid,
                        catname: entry.catname,
                        subcategories: [
                            {
                                subcatid: entry.subcatid,
                                subcatname: entry.subcatname,
                                total: entry.total,
                                cpaid: entry.cpaid,
                                entries: [entry],
                            },
                        ],
                    },
                ];
            } else {
                let cat = rowWithSubCat[indexOfCat];
                cat.total = cat.total + entry.total;
                cat.cpaid = cat.cpaid + entry.cpaid;
                if (!cat.subcategories) {
                    cat.subcategories = {
                        subcatid: entry.subcatid,
                        subcatname: entry.subcatname,
                        total: entry.total,
                        cpaid: entry.cpaid,
                        entries: [entry],
                    };
                } else {
                    const sindex = cat.subcategories.findIndex((el) => el.subcatid === entry.subcatid);
                    if (sindex === -1) {
                        cat.subcategories = [
                            ...cat.subcategories,
                            {
                                subcatid: entry.subcatid,
                                subcatname: entry.subcatname,
                                total: entry.total,
                                cpaid: entry.cpaid,
                                entries: [entry],
                            },
                        ];
                    } else {
                        cat.subcategories[sindex].entries = [...cat.subcategories[sindex].entries, entry];
                        cat.subcategories[sindex].total = cat.subcategories[sindex].total + entry.total;
                        cat.subcategories[sindex].cpaid = cat.subcategories[sindex].cpaid + entry.cpaid;
                    }
                }
            }
        }

        try {
            const res = await exportExcel.getExcel({
                clientname: state.client.clientname,
                sitename: state.client.sitename,
                rows: rowWithSubCat,
            });
            if (res.code === "SUCCESS") {
                setToast({ message: "Successfully Exported", type: "Success", isVisible: true });
            }
        } catch (error) {
            console.log(error.code);
            if (error.code === "BUSY") {
                return setToast({ message: "Please close sheet to overwrite!!", type: "danger", isVisible: true });
            }
            if (error.code === "INTERNAL") {
                return setToast({ message: "Something went wrong!", type: "danger", isVisible: true });
            }
        }
    };

    const onKeyDown = (keyName, e, handle) => {
        console.log(keyName);
        if (keyName === "ctrl+s") {
            saveTheseRows();
        }
        if (keyName === "ctrl+d") {
            setDataField([...dataField, { ...blankRow }]);
        }
        if (keyName === "ctrl+e") {
            exportToExcel();
        }
    };

    const urlChanger = async (evt) => {
        try {
            await Client.addDetail({ cid: state.cid, url: state.url.value });
            setToast({ message: "Project Url has been updated!!", type: "success", isVisible: true });
            setState({ ...state, url: { ...state.url, edit: false } });
        } catch (err) {
            setToast({ message: "Something went wrong!!", type: "danger", isVisible: true });
        }
    };

    const addCategory = async () => {
        if (!state.inputValues.catName) {
            alert("Field can't be empty");
        }
        try {
            const res = await Category.addCategory({ categoryname: state.inputValues.catName.toUpperCase() });
            if (res.data) {
                setState({ ...state, categories: [...state.categories, { ...res.data }], inputValues: { ...state.inputValues, catName: "" } });
            }
        } catch (error) {}
    };

    const addSubcategory = async () => {
        if (!state.inputValues.subName) {
            alert("Field can't be empty");
        }
        try {
            const res = await Subcategory.addSubcategory({ subcatname: state.inputValues.subName.toUpperCase() });
            if (res.data) {
                setState({ ...state, subcategories: [...state.subcategories, { ...res.data }], inputValues: { ...state.inputValues, subName: "" } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        state.stopLoading && (
            <>
                <Hotkeys keyName="ctrl+s,ctrl+d,ctrl+e" onKeyDown={onKeyDown}>
                    <div className="sidebar">
                        <div
                            className="square"
                            onClick={() => {
                                setSelectView({ id: undefined, view: "FRONT" });
                            }}
                        >
                            <ArrowLeft />
                        </div>
                        <div className="dbs topf" onClick={() => window.location.reload()}>
                            <RotateCw />
                        </div>
                        <div className="dbs" style={{ marginTop: "auto" }} onClick={saveTheseRows}>
                            <Bookmark />
                        </div>
                        <div className="dbs topf" onClick={exportToExcel}>
                            <FileText />
                        </div>
                    </div>
                    <div className="cont">
                        <div className="title-row">
                            <h1>Information</h1>
                        </div>
                        <div className="data-row">
                            <div className="client-block">
                                <span className="heading">CLIENT</span>
                                <h2>{state.client.clientname}</h2>
                            </div>
                            <div className="date-block">
                                <span className="heading">SITE</span>
                                <h2>{state.client.sitename}</h2>
                            </div>
                            {/* <div className="date-block">
                                <span className="heading">PROJECT ZIP</span>
                                <div style={{ display: "flex" }}>
                                    <input
                                        className="url-field"
                                        placeholder={`"http://google.com/"`}
                                        value={state.client.url}
                                        onChange={() => {}}
                                    />
                                    <button className="check-btn">
                                        <Check />
                                    </button>
                                </div>
                            </div> */}
                            <div className="date-block">
                                <div className="column ">
                                    <span className="heading">Date</span>
                                    {state.url.edit ? (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "1px solid #28213b",
                                                    marginTop: "6px",
                                                }}
                                                className="date-field"
                                                onChange={(evt) => {
                                                    setState({
                                                        ...state,
                                                        url: { ...state.url, value: evt.target.value },
                                                    });
                                                }}
                                                value={state.url.value}
                                                placeholder={`"https://localhost"`}
                                            />
                                            <button style={{ height: 30, width: 30 }} className="check-btn" onClick={() => urlChanger()}>
                                                <Check />
                                            </button>
                                        </div>
                                    ) : (
                                        <h2 onDoubleClick={() => setState({ ...state, url: { ...state.url, edit: true } })} style={{ cursor: "pointer" }}>
                                            {state.url.value ? state.url.value : "No Url Found"}
                                        </h2>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="data-row"></div>
                        <div className="title-row">
                            <h1>Quick Addition</h1>
                        </div>
                        <div className="data-rowx" style={{ flexDirection: "row" }}>
                            <div style={{ marginRight: 30 }}>
                                <table className="table">
                                    <thead className="thead">
                                        <th>Category</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    value={state.inputValues.catName}
                                                    onChange={(evt) => {
                                                        setState({ ...state, inputValues: { ...state.inputValues, catName: evt.target.value } });
                                                    }}
                                                    className="desc-field"
                                                    type="text"
                                                    placeholder={`'CIVIL WORK'`}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span className="add-row save" onClick={() => addCategory()}>
                                    Save
                                </span>
                            </div>
                            <div style={{ marginRight: 30 }}>
                                <table className="table">
                                    <thead className="thead">
                                        <th>Subcategory</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    value={state.inputValues.subName}
                                                    onChange={(evt) => {
                                                        setState({ ...state, inputValues: { ...state.inputValues, subName: evt.target.value } });
                                                    }}
                                                    className="desc-field"
                                                    type="text"
                                                    placeholder={`'CIVIL WORK'`}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span className="add-row save" onClick={() => addSubcategory()}>
                                    Save
                                </span>
                            </div>
                        </div>
                        <div className="title-row">
                            <h1>Add Entries</h1>
                        </div>
                        <div className="data-rowx">
                            <EntryTable
                                state={state}
                                dataField={dataField}
                                setDataField={setDataField}
                                saved={false}
                                setBlankField={setBlankField}
                                blankRow={blankRow}
                            />
                            <span
                                className="add-row"
                                onClick={() => {
                                    setDataField([...dataField, blankRow]);
                                }}
                            >
                                <Plus size="18" />
                            </span>
                        </div>
                        {addedDataField.length !== 0 && (
                            <>
                                <div className="title-row">
                                    <h1>Saved Entries</h1>
                                </div>
                                <div className="data-rowx">
                                    <span className="add-row save" onClick={updateExistingRows}>
                                        Update
                                    </span>
                                    <EntryTable
                                        state={state}
                                        dataField={addedDataField}
                                        setDataField={setAddedDataField}
                                        saved={true}
                                        setBlankField={setBlankField}
                                        blankRow={blankRow}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </Hotkeys>
            </>
        )
    );
};

export default DetailView;
