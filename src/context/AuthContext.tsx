import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type TokenType = {
    token: string;
}

type UserIdType = {
    userId: string;
}

type firstNameType = {
    firstName: string;
}

type AuthContextType = {
    firstName: firstNameType | null;
    setFirstName: React.Dispatch<React.SetStateAction<firstNameType | null>>;
    token: TokenType | null;
    setToken: React.Dispatch<React.SetStateAction<TokenType | null>>;
    userId: UserIdType | null;
    setUserId: React.Dispatch<React.SetStateAction<UserIdType | null>>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children } : AuthProviderProps) {

    let savedUsername = JSON.parse(localStorage.getItem("firstName")!);
    let savedToken =  JSON.parse(localStorage.getItem("token")!); 
    let savedUserId = JSON.parse(localStorage.getItem("userId")!);

    const [firstName, setFirstName] = useState<firstNameType | null>(savedUsername ||null);
    const [token, setToken] = useState<TokenType | null>(savedToken || null);
    const [userId, setUserId] = useState<UserIdType | null>(savedUserId || null );

    return (
        <AuthContext.Provider value={{firstName, setFirstName, token, setToken, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuthContext() {
    return useContext(AuthContext);
};