import axios from "axios";

class SubcategoryAPI {
    addSubcategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/add`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    updateSubcategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/update`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
    getAllSubcategory() {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/getall`);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    getSubcategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/get`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    deleteSubcategory(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/subcategory/delete`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
}

export let Subcategory = new SubcategoryAPI();
