import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Bookmark, FileText, Plus, RotateCw } from "react-feather";
import { Link } from "react-router-dom";
import { Category } from "../API/Category";
import { Subcategory } from "../API/Subcategory";
import { Product } from "../API/Product";
import { Entry } from "../API/Entry";
import EntryTable from "./EntryTable";
import { Client } from "../API/Client";
import { exportExcel } from "../API/Export";

const DetailView = ({ selectView, setSelectView }) => {
    const [state, setState] = useState({
        stopLoading: false,
        categories: [],
        subcategories: [],
        products: [],
        cid: selectView.id,
        saved: false,
    });

    const [addedDataField, setAddedDataField] = useState([]);
    const [dataField, setDataField] = useState([]);

    const blankRow = {
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
        type:"",
        cpaid: 1,
        total: 1,
        amountDue: 0,
        delete: false,
    };

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
            });
            setAddedDataField([...entries.data]);
        } catch (error) {}
    }, []);

    useEffect(() => {
        getEverything();

        return () => {};
    }, [getEverything]);

    const saveTheseRows = async () => {
        if (dataField.length === 0) {
            return alert("Add 1 row atleast to save!");
        }
        for (let i = 0; i < dataField.length; i++) {
            if (!dataField[i].catname || !dataField[i].catid || !dataField[i].description) {
                alert("Please dont leave Product/Category field Empty");
                i = dataField.length;
                return null;
            }
        }
        let temp = [];
        for (let i = 0; i < dataField.length; i++) {
            const element = dataField[i];
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
                alert("Successfully SAVED!!!");
            }
        }
    };

    const updateExistingRows = async () => {
        for (let i = 0; i < addedDataField.length; i++) {
            if (!addedDataField[i].catname || !addedDataField[i].catid || !addedDataField[i].description) {
                alert("Please dont leave Product/Category field Empty");
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
                qty:element.qty,
                type: element.type,
                cpaid: element.cpaid,
                total: element.total,
                mrate: element.mrate,
                lrate: element.lrate,
            });
            if (i === addedDataField.length - 1 && res.message) {
                alert("Successfully UPDATED!!!");
            }
        }
    };

    const exportToExcel = async () => {
        if (dataField.length !== 0) {
            return alert("Kindly, Save your work!");
        }
        if (addedDataField.length === 0) {
            return alert("Kindly, add some entries and save it to generate Excel sheet.");
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
                alert(`Successfully generated!\nPath: ${res.path} `);
            }
        } catch (error) {
            console.log(error.code);
            if (error.code === "BUSY") {
                return alert("Please close sheet to overwrite!!");
            }
            if (error.code === "INTERNAL") {
                return alert("Something went wrong!");
            }
        }
    };

    return (
        state.stopLoading && (
            <div className="App">
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
                    </div> */}
                    </div>
                    <div className="data-row"></div>
                    {addedDataField.length !== 0 && (
                        <>
                            <div className="title-row">
                                <h1>Added Entry</h1>
                            </div>
                            <div className="data-rowx">
                                <EntryTable
                                    state={state}
                                    dataField={addedDataField}
                                    setDataField={setAddedDataField}
                                    saved={true}
                                />

                                <span className="add-row save" onClick={updateExistingRows}>
                                    Update
                                </span>
                            </div>
                        </>
                    )}
                    <div className="title-row">
                        <h1>Entry</h1>
                    </div>
                    <div className="data-rowx">
                        <EntryTable state={state} dataField={dataField} setDataField={setDataField} />
                        <span
                            className="add-row"
                            onClick={() => {
                                setDataField([...dataField, blankRow]);
                            }}
                        >
                            <Plus size="18" />
                        </span>
                    </div>
                </div>
            </div>
        )
    );
};

export default DetailView;
