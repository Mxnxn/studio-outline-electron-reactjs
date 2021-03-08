import axios from "axios";

class CategoryAPI {
    addCategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/add`, formData);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateCategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/update`, formData);
                if (!res.data.messsage) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
    getAllCategory() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getall`);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    getCategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get`, formData);
                if (!res.data.messsage) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteCategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/delete`, formData);
                if (!res.data.messsage) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export let Category = new CategoryAPI();
