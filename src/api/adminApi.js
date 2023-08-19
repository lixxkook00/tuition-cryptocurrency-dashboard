const { default: axiosClient } = require("./axiosClient")

const adminApi = {
    getUserManagerList: () => {
        const url = 'admin/user-list'

        return axiosClient.get(url)
    },

    deleteUser: (userId) => {
        const url = '/admin/delete'

        return axiosClient.post(
            url,
            {
                ownerRoleId: 1,
                id: userId
            }
        )
    }
    
}

export default adminApi;