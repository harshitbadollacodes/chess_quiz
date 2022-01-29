import { State, Action } from "../types/types";

export const initialState: State = {
    levels: null,
    currentQuiz: null,
    questionIndex: 0,
    score: 0,
    isQuizFinished: false,
    isOptionSelected: false
}

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case "SET_LEVELS":
            return {
                ...state, 
                levels: action.payload 
            };
    
        case "SET_CURRENT_QUIZ": 
            return { 
                ...state, 
                currentQuiz: action.payload 
            }

        case "SET_INDEX": 
            return { 
                ...state, 
                questionIndex: action.payload 
            };

        case "SET_SCORE": 
            return { 
                ...state, 
                score: state.score + action.payload
            }

        case "RESET_SCORE":
            return {
                ...state,
                score: 0
            }

        case "SET_QUIZ_STATUS": 
            return { 
                ...state, 
                isQuizFinished: action.payload
            };

        case "IS_OPTION_SELECTED": 
            return { 
                ...state, 
                isOptionSelected: action.payload
            }

        case "RESET_QUIZ": 
            return { 
                ...state,
                currentQuiz: null,
                questionIndex: 0,
                score: 0,
                isQuizFinished: false,
                isOptionSelected: false,
            };
    
        default:
            return state
    }
};