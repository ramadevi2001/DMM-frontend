import Quote from "../common/Quote";
import GoalsList from "./ListOfGoals";

const Goals = () => {
  return (
    <>
      <Quote
        heading={"Goals"}
        message={
          "A goal is a specific desired outcome you aim to accomplish within a set timeframe."
        }
        
      />
      <GoalsList />
    </>
  );
};

export default Goals;
