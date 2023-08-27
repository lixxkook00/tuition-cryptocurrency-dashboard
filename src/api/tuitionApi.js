const { default: axiosClient } = require("./axiosClient")

const tuitionApi = {
    getSemesterTypes: (id) => {
        const url = '/tuition/semester-list'

        return axiosClient.get(
            url
        )
    },
}

export default tuitionApi;