const { default: axiosClient } = require("./axiosClient")

const tuitionApi = {
    getSemesterTypes: (id) => {
        const url = '/tuition/semester-list'

        return axiosClient.get(
            url
        )
    },

    confirmPaymentTuition: (data) => {
        const url = '/student/confirm-payment'

        return axiosClient.post(
            url,
            {...data}
        )
    },
}

export default tuitionApi;