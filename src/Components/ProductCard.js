import React, { useCallback, useEffect, useState } from "react";
import { Trash } from "react-feather";
import { Product } from "../API/Product";
import Pagination from "./Pagination";
const ProductCard = (props) => {
    const [pageOfProduct, setPageOfProduct] = useState({
        currentPage: 1,
        perPage: 9,
        lastIndex: 9,
        startIndex: 0,
        rows: [],
    });

    const [state, setState] = useState({
        stopLoading: false,
        products: [],
        copyOfProducts: [],
        inputValues: {
            pname: "",
            lrate: 0,
            mrate: 0,
        },
    });

    const getProducts = useCallback(async () => {
        try {
            const res = await Product.getAllProduct();
            if (res.data) {
                const li = pageOfProduct.lastIndex;
                const si = pageOfProduct.startIndex;
                setPageOfProduct({ ...pageOfProduct, rows: [...res.data].splice(si, li) });
                setState({ ...state, products: [...res.data], copyOfProducts: [...res.data], stopLoading: true });
            }
        } catch (error) {}
    }, []);

    useEffect(() => {
        getProducts();

        return () => {};
    }, [getProducts]);

    const addProduct = async () => {
        try {
            const res = await Product.addProduct({
                productname: state.inputValues.pname.charAt(0).toUpperCase() + state.inputValues.pname.slice(1),
                lrate: state.inputValues.lrate,
                mrate: state.inputValues.mrate,
            });
            if (res.data) {
                setState({
                    ...state,
                    products: [...state.products, res.data],
                    copyOfProducts: [...state.products, res.data],
                    inputValues: { pname: "", mrate: 0, lrate: 0 },
                });
                if (pageOfProduct.rows.length < 7) {
                    setPageOfProduct({ ...setPageOfProduct, rows: [...pageOfProduct.rows, res.data] });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const setCurrentPage = (page) => {
        const li = page * pageOfProduct.perPage;
        const si = page * pageOfProduct.perPage - pageOfProduct.perPage;
        setPageOfProduct({
            ...pageOfProduct,
            currentPage: page,
            lastIndex: li,
            startIndex: si,
            rows: state.products.slice(si, li),
        });
    };

    const deleteProduct = async (id) => {
        try {
            await Product.deleteProduct({ id: id });
            let index = state.products.findIndex((el) => el.pid === id);
            console.log(index);
            if (index !== -1) {
                let temp = [...state.products];
                temp.splice(index, 1);
                setState({
                    ...state,
                    products: [...temp],
                    copyOfPoducts: [...temp],
                });
                const li = pageOfProduct.currentPage * pageOfProduct.perPage;
                const si = pageOfProduct.currentPage * pageOfProduct.perPage - pageOfProduct.perPage;
                setPageOfProduct({
                    ...pageOfProduct,
                    lastIndex: li,
                    startIndex: si,
                    rows: temp.slice(si, li),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="col-card">
            <div className="category-card product-card">
                <div className="card-heading">
                    <span className="smtext">ADD</span>
                    <span className="lgtext">PRODUCT</span>
                </div>
                <div className="card-body">
                    <div className="in-group">
                        <span className="card-cname-tag">Name</span>
                        <input
                            type="text"
                            value={state.inputValues.pname}
                            onChange={(evt) =>
                                setState({ ...state, inputValues: { ...state.inputValues, pname: evt.target.value } })
                            }
                            placeholder={`'Demolistion'`}
                        />
                    </div>
                </div>
                <div className="card-body">
                    <div className="in-group">
                        <span className="card-cname-tag">Material Rate</span>
                        <input
                            type="number"
                            value={state.inputValues.mrate}
                            onChange={(evt) =>
                                setState({ ...state, inputValues: { ...state.inputValues, mrate: evt.target.value } })
                            }
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="card-body">
                    <div className="in-group">
                        <span className="card-cname-tag">Labour Rate</span>
                        <input
                            type="number"
                            value={state.inputValues.lrate}
                            onChange={(evt) =>
                                setState({ ...state, inputValues: { ...state.inputValues, lrate: evt.target.value } })
                            }
                            placeholder="0"
                        />
                    </div>
                    <button onClick={addProduct}>Save</button>
                </div>
            </div>
            <div className="category-card  to-bot-product ">
                <div className="card-heading">
                    <span className="smtext">ADDED</span>
                    <span className="lgtext">PRODUCTS</span>
                </div>
                <div className="card-body">
                    {/* <div className="in-group">
                        <span className="card-cname-tag">Name</span>
                        <input type="text" placeholder={`'CIVIL WORK'`} />
                    </div> */}
                    <table cellSpacing="0">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mrate</th>
                            <th>Lrate</th>
                            <th>#</th>
                        </thead>
                        <tbody>
                            {pageOfProduct.rows.map((el, index) => (
                                <tr key={index}>
                                    <td>{el.pid}</td>
                                    <td>{el.pname}</td>
                                    <td>{el.mrate}</td>
                                    <td>{el.lrate}</td>

                                    <td>
                                        <button
                                            onClick={() => {
                                                deleteProduct(el.pid);
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
                    length={state.products.length}
                    perPage={pageOfProduct.perPage}
                    setCurrentPage={setCurrentPage}
                    name={"Product"}
                />
            </div>
        </div>
    );
};

export default ProductCard;
