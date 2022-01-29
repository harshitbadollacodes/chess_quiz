import { useState } from "react";
import chess from "../images/chess.png";
import chess_light from "../images/chess_light.png"
import { Link } from "react-router-dom";
import { FaRegMoon, FaUserAlt } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

export function Navbar() {
    const [theme, setTheme] = useState("dark");

    function themeSwitchHandler() {
        const storedTheme = document.documentElement.getAttribute("class");
        if(storedTheme === "light") {
            document.documentElement.setAttribute("class", "dark");
            setTheme("dark");
        }  else {
            document.documentElement.setAttribute("class", "light");
            setTheme("light");
        }
    }

    return (
        <div className="bg-white text-opacity-50 pt-4 pb-4 shadow-lg dark:bg-navy dark:text-white">
            <div className="my-container flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={ theme === "dark" ? chess_light : chess } alt="logo" className="w-8" />
                        <h1 className="text-3xl font-bold ml-2">Chess Quiz</h1>
                    </div>
                </Link>

                <ul className="flex items-center">
                    <li>
                        <Link to="/login" className="font-bold text-xl">
                            <FaUserAlt size={20}/>
                        </Link>
                    </li>

                    <button 
                        className="border-2 p-1 dark:border-white ml-8 rounded-lg"
                        onClick={themeSwitchHandler}
                    >
                        { theme === "light" ? <FaRegMoon/> : <FiSun/> }
                    </button>
                </ul>
                


            </div>



        </div>
    )
}