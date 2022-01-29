import axios from 'axios';
import { API } from "../constants/config";
import { Link } from 'react-router-dom';
import { useLevelsContext } from '../context/LevelsContext'
import { ResponseData } from '../types/types';

export function LevelsCard() {

    const { state, dispatch } = useLevelsContext();

    const getQuiz = async (levelName: string) => {
        try {
            const response = await axios.get<ResponseData>(`${API}/quiz/${levelName}`);

            console.log("I am running");
            
            dispatch({ 
                type: "SET_CURRENT_QUIZ", 
                payload: response.data.quizDetails
            });

            dispatch({
                type: "SET_INDEX",
                payload: 0
            });

            dispatch({
                type: "RESET_SCORE",
                payload: 0
            });

            dispatch({
                type: "SET_QUIZ_STATUS",
                payload: false
            })
                    
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            {state?.levels?.map(({ _id, levelName, img }) => (
                <li 
                    key={_id} 
                    className="rounded p-2 my-8 mx-4 md:w-1/2 shadow-card hover:shadow-md transition-shadow delay-100"
                    onClick={() => getQuiz(levelName) }
                >
                    <Link to="/rules">
                        <img src={img} alt="pawn/king" className="rounded-xl w-full"/>
                        <div className="m-4 flex align-center items-center justify-between">
                            <h1 className="font-bold text-xl">Level: {levelName} </h1>
                            <button className="w-24 bg-blue-400 rounded p-3">Play</button>
                        </div>
                    </Link>
                </li>
            ))}
        </>
    )
}