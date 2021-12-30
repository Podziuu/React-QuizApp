import Button from "./Button";
import Card from "./Card";

const Question = (props) => {
  const question = props.quiz.question;
  const answers = props.quiz.answers;

  return (
    <Card >
      <h2 dangerouslySetInnerHTML={{__html: question}} className="text-3xl text-white font-bold text-center"></h2>
      <div className="flex flex-wrap justify-evenly gap-5 my-8">
        {answers.map((answer) => {
          return (
            <Button
              onClick={props.checkAnswer}
              text={answer.answer}
              key={answer.id}
              isTrue={answer.true}
              isDisable={props.isDisable}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default Question;
