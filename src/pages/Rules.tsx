import { Link } from "react-router-dom";
import { useLevelsContext } from "../context/LevelsContext";

export function Rules() {

    const { state: {currentQuiz} } = useLevelsContext();
    
    const levelId = currentQuiz?.find(quizDetails => quizDetails._id);

    return (
        <div className="my-container">
            <h1 className="text-3xl font-bold my-4">Rules</h1>

            <ul className="m-4">
                <li className="list-decimal">
                    <p>There will be a total of 5 Questions.</p>
                </li>

                <li className="list-decimal">
                    <p>For each right answer, you will be awarded 10 points.</p>
                </li>

                <li className="list-decimal">
                    <p>For each wrong answer, 5 points will be taken away.</p>
                </li>

            </ul>

            <Link 
                to={`/level/${levelId?._id}`}
                className="bg-blue-400 p-3 w-max text-center block rounded my-8"
            >
                Begin Quiz
            </Link>

        </div>
    )
}
