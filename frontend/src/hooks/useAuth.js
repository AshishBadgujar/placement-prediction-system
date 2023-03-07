import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthLogin, AuthLogout } from "../services/auth.service";

// Create the context 
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    // Using the useState hook to keep track of the value authed (if a 
    // user is logged in)
    const localStorageValue = JSON.parse(localStorage.getItem("user"));
    // Use this value as the defalt value for the state 
    const [authed, setAuthed] = useState(localStorageValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authed) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [authed])

    const login = async (email, password) => {
        const user = await AuthLogin(email, password);

        if (user) {
            console.log("user has logged in");
            setAuthed(user);
            localStorage.setItem("user", JSON.stringify(user));
        }
        return user
    };

    const logout = async () => {
        const result = await AuthLogout();

        if (result) {
            console.log("The User has logged out");
            setAuthed({});
            localStorage.removeItem("user");
        }
        return result
    };

    return (
        <AuthContext.Provider value={{ authed, setAuthed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Finally creating the custom hook 
export const useAuth = () => useContext(AuthContext);