import { baseUrl } from "../shared";
import { successToast, errorToast } from '../utils/toasts';
import { SYMBOLS_ALL } from '../constants'

class Symbols {

    constructor() {

    }

    async getAll() {

        try {
            let response = await baseUrl.get(SYMBOLS_ALL);
            return response.data;
        }
        catch (err) {
            console.log(err)
        }

        return [];
    }
};


export default new Symbols();