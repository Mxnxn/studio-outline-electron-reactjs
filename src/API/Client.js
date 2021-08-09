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

    addDetail(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/client/details`, formData);
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

    getClient(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/client/get/${id}`);
                if (!res.data.data) throw res.data;
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

    verifyToken(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify`, formData);
                if (!res.data.msg) throw res.data;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let Client = new ClientAPI();
