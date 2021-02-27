import axios from "axios";

class ClientAPI {
    addClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/client/add`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/client/update`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.message);
            } catch (error) {
                reject(error);
            }
        });
    }
    getAllClient() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/client/getall`);
                if (!res.data) throw res.data;
                resolve(res.data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/client/get`, formData);
                if (!res.data) throw res.data;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/client/delete`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.message);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let Client = new ClientAPI();
