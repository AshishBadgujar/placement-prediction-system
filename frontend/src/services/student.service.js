import APICall from "./apicall.service"

export const getStudent = async (id) => {
    try {
        let res = await APICall(`/student/${id}`)
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const getPredictions = async (id, data) => {
    try {
        let res = await APICall(`/student/predictPlacement/${id}`, { studentData: data }, "patch")
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const regitrationReq = async (data) => {
    try {
        let res = await APICall('/student/reqRegister', data, "post")
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}