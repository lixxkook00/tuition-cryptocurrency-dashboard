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
    },

    createUser: (data) => {
        const url = '/admin/create'

        return axiosClient.post(
            url,
            {...data}
        )
    },

    editUser: (data) => {
        const url = '/admin/edit'

        return axiosClient.post(
            url,
            {...data}
        )
    },

    getAdminWalletList: () => {
        const url = 'admin/wallet-list'

        return axiosClient.get(url)
    },

    deleteAdminWallet: (ownerRoleId, addressId) => {
        const url = 'admin/wallet-delete'

        return axiosClient.post(
            url,
            { ownerRoleId, addressId }
        )
    },

    createAdminWallet: (data) => {
        const url = 'admin/wallet-create'

        return axiosClient.post(
            url,
            {...data}
        )
    },

    activeAdminWallet: (data) => {
        const url = 'admin/wallet-active'
        
        return axiosClient.post(
            url,
            {...data}
        )
    },

    tuitionAnalytics: (semesterID) => {
        const url = 'admin/tuition-analytics'
        
        return axiosClient.post(
            url,
            {
                semesterId: semesterID
            }
        )
    },

    getSemester: () => {
        const url = 'tuition/semester-list'
        
        return axiosClient.get(url)
    },
}

export default adminApi;