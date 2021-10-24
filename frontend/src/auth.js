import React, {useContext, useEffect, useState} from "react";

const AuthContext = React.createContext({});

export const AuthProvider = function ({children}) {
    const [auth, setAuthState] = useState(null);

    const setAuth = (auth) => {
        auth ? localStorage.setItem("token", auth.token) : localStorage.removeItem("token");
        setAuthState(auth);
    };

    return (
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = function () {
    return useContext(AuthContext);
}