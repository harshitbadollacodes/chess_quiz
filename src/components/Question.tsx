import { useState } from "react";
import { useLevelsContext } from "../context/LevelsContext";

export function Question() {

    const { state, dispatch } = useLevelsContext();
    const [optionId, setOptionId] = useState<string | null>(null);
    
    const index = state.questionIndex;

    const quiz = state.currentQuiz?.find(questionItem => questionItem.questions);

    const quizLength = quiz?.questions.length || null;
    
    function validateOption(
        optionId: string, 
        isCorrect: boolean, 
        points: number, 
        negativePoints: number
    ) {

        setOptionId(optionId);

        dispatch({ type: "SET_SCORE", payload: isCorrect? points : negativePoints });
        dispatch({ type: "IS_OPTION_SELECTED", payload: true });

        // Runs and returns immediately after answering the last question
        if (quizLength !== null) {
            if (quizLength - 1 === index) {
                setTimeout(() => {
                    return dispatch({ type: "SET_QUIZ_STATUS", payload: true });
                }, 2000);
            }; 
        };

        setTimeout(() => {
            dispatch({ type: "SET_INDEX", payload: index + 1 });
            dispatch({ type: "IS_OPTION_SELECTED", payload: false});
        }, 2500);

    };

    return (
        <>
            <div className="flex justify-between mb-4 mt-6">
                
                <h1 className="text-xl font-bold">
                    Question: {state.questionIndex + 1} / { quizLength } 
                </h1>
                
                <h1 className="text-xl font-bold">
                    Score: {state.score}
                </h1>

            </div>
            <ul>
                { state.currentQuiz?.map((questionItem) => (
                    <li key={questionItem._id} className="flex flex-col w-full">
                        <img 
                            src={questionItem.questions[index].img} 
                            alt={questionItem.questions[index].text}
                            className="md:w-2/4 md:h-80 mb-4 md:self-center" 
                        />
                        
                        <h1 
                            className="text-3xl text-center font-semibold mb-4"
                        >
                            {questionItem.questions[index].text}
                        </h1>
                        
                        <ul>
                            {questionItem.questions[index].options.map(option => (
                                <li key={option._id} className="flex flex-col">
                                    <button
                                        disabled={state.isOptionSelected}
                                        onClick={() => validateOption(
                                            option._id,
                                            option.isCorrect,
                                            questionItem.questions[index].points,
                                            questionItem.questions[index].negativePoints
                                            )}
                                        className={`text-2xl w-full rounded-xl mb-2 p-3 border-2 border-gray-400 transition-all 
                                            ${!state.isOptionSelected 
                                                && "hover:bg-blue-400"
                                            }

                                            ${ state.isOptionSelected 
                                                && option.isCorrect 
                                                && "bg-green-500" 
                                            } 
                                            ${ option._id === optionId
                                                && !option.isCorrect 
                                                && state.isOptionSelected 
                                                && "bg-red-500" 
                                            } 
                                        `}
                                    >
                                        {option.value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}