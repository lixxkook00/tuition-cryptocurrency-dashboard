const { default: axiosClient } = require("./axiosClient")

const studentApi = {
    getTuiTion: (id) => {
        const url = '/student/tuition'

        return axiosClient.post(
            url,
            {
                studentId: id,
            }
        )
    },
}

export default studentApi;