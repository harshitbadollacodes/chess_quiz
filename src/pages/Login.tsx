import { LoginForm } from "../components/LoginForm";
import { Logout } from "../components/Logout";
import { useAuthContext } from "../context/AuthContext"

export function Login() {
    const { token } = useAuthContext();

    return (
        <>  
            <div className="my-container flex flex-col w-full justify-center items-center">
                { token && <Logout/> }
                { !token && <LoginForm/> }
            </div>
        </>
    )
}