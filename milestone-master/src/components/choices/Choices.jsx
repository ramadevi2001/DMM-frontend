import Quote from "../common/Quote";
import ChoicesList from "./ListChoices";
const Choices = () => {
  return <>
   <Quote
      heading={"Choice"}
      message={"What do you want to become in your life is your choice"}
    />
    <ChoicesList />
   
  </>
};

export default Choices;
