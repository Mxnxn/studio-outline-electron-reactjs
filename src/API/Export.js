import axios from "axios";

class Export {
    getExcel(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/excel/generate`, formData);
                if (!res.data.message) throw res.data;
                resolve(res.data);
            } catch (err) {
                reject(err.response.data);
            }
        });
    }
}

export let exportExcel = new Export();
