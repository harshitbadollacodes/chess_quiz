import { useState, useEffect  } from "react";
import { Question } from "./Question";

type CountdownProps = {
    seconds: number
}

export function Countdown({seconds} : CountdownProps) {

    const [timer, setTimer] = useState(seconds);

    useEffect(() => {

        const interval = setTimeout(() => {
            setTimer(timer => timer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(interval);
        }
    
        return () => {
            clearInterval(interval);
        }
    }, [timer]);

    return (
        <>
            { timer !== 0 ?  
                <div className="flex justify-center h-96 items-center">
                    <h1 className="text-center font-bold text-4xl">Quiz begins in 
                        <span className="text-4xl"> {timer} </span>
                    </h1>
                </div> 
                :
                <Question/>               
            }
        </>
    )
}