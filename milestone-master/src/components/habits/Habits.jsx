import Quote from "../common/Quote";
import ListOfHabits from "./ListOfHabits";
const Habits =  ()=>{


     return (
        <>
            <Quote 
                heading={"Habits"}
                message={"Habits are the daily routines you follow."}
            />
            <ListOfHabits />
        </>
     )
}


export default Habits;