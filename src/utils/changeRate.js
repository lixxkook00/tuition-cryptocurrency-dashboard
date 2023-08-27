import axios from "axios";

// https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd
export const getVNDRate = async (tution) => {
    const URL = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd'
    const response = await axios.get(URL);

    return {
        rate: response.data.tether.vnd,
        finalTuition: tution/response.data.tether.vnd
    }
} 