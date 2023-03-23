import APICall from "./apicall.service"

export const getAdminProfile = async () => {
    try {
        let res = await APICall('/admin')
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const updateAdminProfile = async (obj) => {
    try {
        let res = await APICall('/admin/updateProfile', obj, "patch")
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const getStudentReq = async () => {
    try {
        let res = await APICall('/admin/getStudentReq')
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const getAllStudents = async () => {
    try {
        let res = await APICall('/admin/getStudents')
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const approveReq = async (reqId) => {
    try {
        let res = await APICall(`/admin/approveReq/${reqId}`, {}, "patch")
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const rejectReq = async (reqId) => {
    try {
        let res = await APICall(`/admin/rejectReq/${reqId}`, {}, "patch")
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const deleteStudent = async (id) => {
    try {
        let res = await APICall(`/admin/deleteStudent/${id}`, {}, "delete")
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}