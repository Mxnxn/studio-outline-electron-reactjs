import axios from "axios";

class ProductAPI {
    addProduct(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, formData);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateProduct(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/update`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
    getAllProduct() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getall`);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    getProduct(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteProduct(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/delete`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export let Product = new ProductAPI();
