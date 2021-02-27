import axios from "axios";

class EntryAPI {
    addEntry(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/entry/add`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    updateEntry(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/entry/update`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
    getAllEntry() {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/entry/getall`);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    getEntry(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/entry/get`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }

    deleteEntry(formData) {
        return Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/entry/delete`, formData);
                if (res.data.code !== 200) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(error);
            }
        });
    }
}

export let Entry = new EntryAPI();
