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

export const getPackageRange = (code) => {
    let range = '-'
    switch (code) {
        case 1:
            range = '3 - 6 LPA '
            break;
        case 2:
            range = '6 - 9 LPA '
            break;
        case 3:
            range = '9 - 12 LPA '
            break;
        case 4:
            range = '12 - 20 LPA '
            break;
        default:
            break;
    }
    return range
}