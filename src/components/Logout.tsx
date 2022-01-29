import { useAuthContext } from '../context/AuthContext';
import { useLevelsContext } from '../context/LevelsContext';

export function Logout() {

    const { firstName, setToken, setUserId } = useAuthContext();
    const { dispatch } = useLevelsContext();

    function logoutHandler() {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        dispatch({ type: "RESET_QUIZ" })
    };

    return (
        <>  
            <div className="text-center mt-8">
                <h1 className="text-2xl mb-4">
                    Hello {firstName},  You are logged in. Want to logout? 
                </h1>
                <button 
                    type="submit" 
                    className="text-xl border-2 rounded-xl hover:bg-blue-400 transition-transform p-2 w-1/4 bg-blue-500"
                    onClick={() => logoutHandler()} 
                >
                    Logout
                </button>
            </div>
        </>
    )
}
