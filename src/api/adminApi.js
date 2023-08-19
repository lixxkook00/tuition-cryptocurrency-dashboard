const { default: axiosClient } = require("./axiosClient")

const adminApi = {
    getUserManagerList: () => {
        const url = 'admin/user-list'
        return axiosClient.get(url)
    }
}

export default adminApi;