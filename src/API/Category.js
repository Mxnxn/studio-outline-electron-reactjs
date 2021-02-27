import axios from "axios";

class CategoryAPI {
    addCategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/add`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    updateCategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/update`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
    getAllCategory() {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getall`);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    getCategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    deleteCategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/delete`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
}

export let Category = new CategoryAPI();
