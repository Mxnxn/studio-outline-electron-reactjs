import axios from "axios";

class EntryAPI {
    addEntry(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/entry/add`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateEntry(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/entry/update`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
    getAllEntry() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/entry/getall`);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    getAllEntryOfThis(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/entry/getall/${id}`);
                if (!res.data.data) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
    getEntry(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/entry/get`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteEntry(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/entry/delete/${id}`);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export let Entry = new EntryAPI();
