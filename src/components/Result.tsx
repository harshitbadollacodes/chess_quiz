import { useNavigate } from "react-router-dom";
import { useLevelsContext } from "../context/LevelsContext"

export function Result() {

    const { state, dispatch } = useLevelsContext();

    const navigate = useNavigate();

    function restartQuiz() {
        dispatch({ type: "SET_QUIZ_STATUS", payload: false });
        dispatch({ type: "RESET_QUIZ"});
        navigate("/");
    };

    return (
        <div className="m">
            <h1 className="text-2xl font-semibold"> Quiz over !! </h1>
            <h3 className={`text-xl mb-2 `}> You scored: {state.score} </h3>
            
            <ul>
                {state.currentQuiz?.map(quizDetails => (
                    <li key={quizDetails._id}>
                        <ul>
                            { quizDetails.questions.map(question => (
                                <li key={question._id}>
                                    <h1 className="text-3xl font-semibold mb-4">
                                        {question.text}
                                    </h1>
                                    <ul>
                                        { question.options.map(option => (
                                            <li key={option._id}>
                                                <p 
                                                    className={`${option.isCorrect && "bg-green-500"} text-2xl w-full rounded-xl mb-2 p-3 border-2 border-gray-400 `}
                                                >
                                                    {option.value}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <button
                className="text-2xl w-full rounded-xl mb-2 bg-blue-500 p-3"
                onClick={() => restartQuiz()}
            >
                Play Again
            </button>
        </div>
    )
}