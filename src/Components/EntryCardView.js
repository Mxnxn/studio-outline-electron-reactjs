import React, { useCallback, useEffect, useState } from "react";
import { Trash } from "react-feather";
import { Category } from "../API/Category";
import { Subcategory } from "../API/Subcategory";
import Pagination from "./Pagination";

export default function EntryCardView({ name }) {
    const initState = { subName: "", catName: "" };
    const [state, setState] = useState({
        categories: [],
        subcategories: [],
        searchSubcategory: {
            result: [],
            query: "",
        },
        serachCategory: {
            result: [],
            query: "",
        },
        inputValues: { subName: "", catName: "" },
        stopLoading: false,
    });
    const [pageOfSubcategory, setPageOfSubcategory] = useState({
        currentPage: 1,
        perPage: 12,
        lastIndex: 12,
        startIndex: 0,
        rows: [],
    });
    const [pageOfCategory, setPageOfCategory] = useState({
        currentPage: 1,
        lastIndex: 12,
        perPage: 12,
        startIndex: 0,
        rows: [],
    });

    const getAddedValues = useCallback(async () => {
        try {
            const res = await Category.getAllCategory();
            const resp = await Subcategory.getAllSubcategory();
            if (res.data) {
                setState({ ...state, categories: [...res.data], subcategories: [...resp.data], stopLoading: true });
                setPageOfSubcategory({
                    ...pageOfSubcategory,
                    rows: [...resp.data].slice(pageOfSubcategory.startIndex, pageOfSubcategory.lastIndex),
                });
                setPageOfCategory({
                    ...pageOfCategory,
                    rows: [...res.data].slice(pageOfCategory.startIndex, pageOfCategory.lastIndex),
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAddedValues();

        return () => {};
    }, [getAddedValues]);

    const addCategory = async () => {
        if (!state.inputValues.catName) {
            alert("Field can't be empty");
        }
        try {
            const res = await Category.addCategory({ categoryname: state.inputValues.catName.toUpperCase() });
            if (res.data) {
                const temp = [...state.categories, res.data];
                setState({
                    ...state,
                    categories: [...state.categories, res.data],
                    inputValues: { ...initState },
                });
                const li = pageOfCategory.currentPage * pageOfCategory.perPage;
                const si = pageOfCategory.currentPage * pageOfCategory.perPage - pageOfCategory.perPage;
                setPageOfCategory({
                    ...pageOfCategory,
                    rows: temp.slice(si, li),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addSubcategory = async () => {
        if (!state.inputValues.subName) {
            alert("Field can't be empty");
        }
        try {
            const res = await Subcategory.addSubcategory({ subcatname: state.inputValues.subName.toUpperCase() });
            if (res.data) {
                const temp = [...state.subcategories, res.data];
                setState({
                    ...state,
                    subcategories: [...state.subcategories, res.data],
                    inputValues: { ...initState },
                });
                const li = pageOfSubcategory.currentPage * pageOfSubcategory.perPage;
                const si = pageOfSubcategory.currentPage * pageOfSubcategory.perPage - pageOfSubcategory.perPage;
                setPageOfSubcategory({
                    ...pageOfSubcategory,
                    rows: temp.slice(si, li),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const setCurrentPage = (page, view) => {
        if (view !== "CATEGORY") {
            const li = page * pageOfSubcategory.perPage;
            const si = page * pageOfSubcategory.perPage - pageOfSubcategory.perPage;
            setPageOfSubcategory({
                ...pageOfSubcategory,
                currentPage: page,
                lastIndex: li,
                startIndex: si,
                rows: state.subcategories.slice(si, li),
            });
        } else {
            const li = page * pageOfCategory.perPage;
            const si = page * pageOfCategory.perPage - pageOfCategory.perPage;
            setPageOfCategory({
                ...pageOfCategory,
                currentPage: page,
                lastIndex: li,
                startIndex: si,
                rows: state.categories.slice(si, li),
            });
        }
    };

    const deleteSubategory = async (id) => {
        try {
            await Subcategory.deleteSubcategory({ id: id });
            let index = state.subcategories.findIndex((el) => el.subcatid === id);
            if (index !== -1) {
                let temp = [...state.subcategories];
                temp.splice(index, 1);
                setState({
                    ...state,
                    subcategories: [...temp],
                });
                const li = pageOfSubcategory.currentPage * pageOfSubcategory.perPage;
                const si = pageOfSubcategory.currentPage * pageOfSubcategory.perPage - pageOfSubcategory.perPage;
                setPageOfSubcategory({
                    ...pageOfSubcategory,
                    lastIndex: li,
                    startIndex: si,
                    rows: temp.slice(si, li),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await Category.deleteCategory(id);
            let index = state.categories.findIndex((el) => el.catid === id);
            console.log(index);
            if (index !== -1) {
                let temp = [...state.categories];
                temp.splice(index, 1);
                setState({
                    ...state,
                    categories: [...temp],
                });
                const li = pageOfCategory.currentPage * pageOfCategory.perPage;
                const si = pageOfCategory.currentPage * pageOfCategory.perPage - pageOfCategory.perPage;
                setPageOfCategory({
                    ...pageOfCategory,
                    lastIndex: li,
                    startIndex: si,
                    rows: temp.slice(si, li),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return name === "CATEGORY" ? (
        <div className="col-card">
            <div className="category-card no-ml cat-card">
                <div className="card-heading">
                    <span className="smtext">ADD</span>
                    <span className="lgtext">{name}</span>
                </div>
                <div className="card-body">
                    <div className="in-group">
                        <span className="card-cname-tag">Name</span>
                        <input
                            type="text"
                            onChange={(evt) => {
                                setState({
                                    ...state,
                                    inputValues: { ...state.inputValues, catName: evt.target.value },
                                });
                            }}
                            value={state.inputValues.catName}
                            placeholder={`'CIVIL WORK'`}
                        />
                    </div>
                    <button onClick={addCategory}>Save</button>
                </div>
            </div>
            <div className="category-card no-ml cat-card to-bot">
                <div className="card-heading">
                    <span className="smtext">ADDED</span>
                    <span className="lgtext">CATEGORIES</span>
                </div>
                <div className="card-body">
                    <table cellSpacing="0">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>#</th>
                        </thead>
                        <tbody>
                            {pageOfCategory.rows.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.catname}</td>
                                    <td>
                                        <button onClick={()=>{deleteCategory(el.catid)}}>
                                            <Trash size="12" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    length={state.categories.length}
                    perPage={pageOfCategory.perPage}
                    setCurrentPage={setCurrentPage}
                    name={name}
                />
            </div>
        </div>
    ) : (
        <div className="col-card">
            <div className="category-card">
                <div className="card-heading">
                    <span className="smtext">ADD</span>
                    <span className="lgtext">{name}</span>
                </div>
                <div className="card-body">
                    <div className="in-group">
                        <span className="card-cname-tag">Name</span>
                        <input
                            type="text"
                            onChange={(evt) => {
                                setState({
                                    ...state,
                                    inputValues: { ...state.inputValues, subName: evt.target.value },
                                });
                            }}
                            value={state.inputValues.subName}
                            placeholder={`'KITCHEN WORK'`}
                        />
                    </div>
                    <button onClick={addSubcategory}>Save</button>
                </div>
            </div>
            <div className="category-card  to-bot">
                <div className="card-heading">
                    <span className="smtext">ADDED</span>
                    <span className="lgtext">SUBCATEGORIES</span>
                </div>
                <div className="card-body">
                    <table cellSpacing="0">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>#</th>
                        </thead>
                        <tbody>
                            {pageOfSubcategory.rows.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.subcatname}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                deleteSubategory(el.subcatid);
                                            }}
                                        >
                                            <Trash size="12" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    length={state.subcategories.length}
                    perPage={pageOfSubcategory.perPage}
                    setCurrentPage={setCurrentPage}
                    name={name}
                />
            </div>
        </div>
    );
}
