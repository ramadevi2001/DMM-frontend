import ListOfMonthyGoals from "./ListOfMonthlyGoals"
import Quote from "../common/Quote"

const MonthlyGoals = ()=>{



    return (
        
        <>
        <Quote
            heading={"Monthly Goals"}
            message={"Set realistic and achievable goals for your monthly progress."}
        />
        <ListOfMonthyGoals/>
        </>
    )

}


export default MonthlyGoals