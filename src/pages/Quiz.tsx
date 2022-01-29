import { Countdown } from "../components/Countdown";
import { useLevelsContext } from "../context/LevelsContext";
import { Result } from "../components/Result";

export function Quiz() {

    const { state } = useLevelsContext();

    return (
        <div className="quiz-container">
            { state.isQuizFinished ? <Result/> : <Countdown seconds={3}/> }
        </div>
    )
}