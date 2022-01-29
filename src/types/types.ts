import { ReactNode }from "react";

export type LevelsObjectType = {
    _id: string;
    img: string;
    levelName: string;
    __v: number;
};

export type Options = {
    _id: string;
    isCorrect: boolean;
    value: string;
};

export type Question = {
    _id: string;
    index: number;
    img: string;
    text: string;
    points: number;
    negativePoints: number;
    options: Options[];
};

export type QuizDetails = {
    _id: string;
    levelName: string;
    questions: Question[];
};

export type State = {
    levels: LevelsObjectType[] | null;
    currentQuiz: QuizDetails[] | null;
    questionIndex: number;
    score: number;
    isQuizFinished: boolean;
    isOptionSelected: boolean;
};

export type Action = 
    | { type: "SET_LEVELS"; payload: LevelsObjectType[] }
    | { type: "SET_CURRENT_QUIZ", payload: QuizDetails[] }
    | { type: "SET_INDEX", payload: number }
    | { type: "SET_SCORE", payload: number }
    | { type: "RESET_SCORE", payload: number }
    | { type: "SET_QUIZ_STATUS", payload: boolean }
    | { type: "IS_OPTION_SELECTED", payload: boolean }
    | { type: "RESET_QUIZ" }

export type FetchAllLevels = {
    success: boolean;
    levels: LevelsObjectType[];
};

export type StateProviderPropsType = {
    children: ReactNode;
};

export type StateContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

export type ServerError = {
    message: string;
};

export type ResponseData = {
    quizDetails: QuizDetails[]
};