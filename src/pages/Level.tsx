import { LevelsCard } from "../components/LevelsCard";
import { useLevelsContext } from "../context/LevelsContext";

export function Level() {

    const { state } = useLevelsContext();

    return (
        <>
            <ul className="flex flex-col md:flex-row justify-center">
                { state?.levels === null ? <h1 className="text-3xl mt-4 font-bold">Loading...</h1> : <LevelsCard/> }
            </ul>
        </>
    )
}

export default Level;
