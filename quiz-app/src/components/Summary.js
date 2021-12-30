import Card from "./Card";
import Button from "./Button";

const Summary = (props) => {
  return (
    <Card classes="text-center text-white">
      <h1 className="font-bold mb-4">You finished the quiz!</h1>
      <h2>
        Your score is {props.score}/{props.amount}
      </h2>
      <div>
        <Button
          onClick={props.reset}
          classes="mt-8"
          text="Play Again"
          size="lg"
        />
      </div>
    </Card>
  );
};

export default Summary;
