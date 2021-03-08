import axios from "axios";

class SubcategoryAPI {
    addSubcategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/add`, formData);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateSubcategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/update`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
    getAllSubcategory() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/getall`);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    getSubcategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/get`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteSubcategory(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/delete`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export let Subcategory = new SubcategoryAPI();
