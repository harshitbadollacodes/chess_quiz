import axios, { AxiosError } from "axios";
import { createContext, useEffect, useContext, useReducer } from "react";
import { API } from "../constants/config";
import { initialState, reducer } from "../reducer/reducer";
import { FetchAllLevels, ServerError, StateContextType, StateProviderPropsType } from "../types/types";

const LevelCtx = createContext({} as StateContextType);

export function LevelProvider({children}: StateProviderPropsType) {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<FetchAllLevels>(`${API}/levels`);
                
                return dispatch({ 
                    type: "SET_LEVELS",
                    payload: response.data.levels
                });

            }catch(error) {
                if (axios.isAxiosError(error)) {
                    const serverError = error as AxiosError<ServerError>;
                    if (serverError && serverError.response) {
                        console.log({serverError});
                        return serverError.response.data;
                    }
                }
        
                console.log({error});
                return { errorMessage: "something went wrong" };
            }

        })();
    }, []);

    console.log(state);

    return (
        <LevelCtx.Provider value={{ state, dispatch }}>
            {children}
        </LevelCtx.Provider>
    );
};

export function useLevelsContext() {
    return useContext(LevelCtx);
};