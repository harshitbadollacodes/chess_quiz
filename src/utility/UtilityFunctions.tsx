import { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type PrivateRouteType = {
    element: ReactElement;
    path: string;
}

export function PrivateRoute({ path, ...props }: PrivateRouteType) {

    const { token } = useAuthContext();

    return token ? (
        <Route path={path} {...props} />
    ) : (
        <Navigate replace to="/login" state={{ from: path }} />
    )
}   