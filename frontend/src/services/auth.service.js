import APICall from "./apicall.service"

export const AuthLogin = async (email, password) => {
    try {
        let res = await APICall('/login', { email, password }, "post")
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const AuthLogout = async () => {
    try {
        let res = await APICall('/logout')
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const changePassword = async (obj) => {
    try {
        let res = await APICall('/changePassword', obj, "patch")
        if (res.data) {
            console.log(res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
