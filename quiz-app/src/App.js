import { useState, useEffect } from "react";

import Button from "./components/Button";
import Question from "./components/Question";
import Summary from "./components/Summary";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [isDisable, setisDisable] = useState(false);

  const shuffledArray = arr => {
    for(let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr
  }

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const questionsArray = [];

      data.results.map((query) => {
        const question = query.question;
        const answers = [];
        answers.push({
          answer: query.correct_answer,
          id: Math.random().toString(),
        });
        query.incorrect_answers.map((answer) => {
          const singleAnswer = {
            answer: answer,
            id: Math.random().toString(),
          };
          answers.push(singleAnswer);
        });
        const correctAnswer = query.correct_answer;
        questionsArray.push({
          question: question,
          answers: shuffledArray(answers),
          correctAnswer: correctAnswer,
        });
      });
      setQuestions(questionsArray);
    };
    getQuestions();
  }, []);

  const length = questions.length;

  const startGameHandler = () => {
    setCurrentQuestion(0);
  };

  const resetGameHandler = () => {
    setCurrentQuestion(null);
    setUserScore(0);
  };

  const checkAnswerHandler = (e) => {
    setisDisable(true);
    const userChoice = e.target.outerText;
    const goodAnswer = questions[currentQuestion].correctAnswer;
    const casualClasses =
      "text-white py-2 px-4 rounded-3xl border-4 text-xl hover:border-[6x] w-72";
    let buttonClasses;
    if (userChoice === goodAnswer) {
      setUserScore((prevUserScore) => {
        return prevUserScore + 1;
      });
      buttonClasses = e.target.className;
      e.target.className = `bg-[#16A34A] border-[#15803D] ${casualClasses}`;
    } else {
      buttonClasses = e.target.className;
      e.target.className = `bg-[#B91C1C] border-[#991B1B] ${casualClasses}`;
    }
    setTimeout(() => {
      setCurrentQuestion((prevCurrentQuestion) => {
        return prevCurrentQuestion + 1;
      });
      e.target.className = buttonClasses;
      setisDisable(false);
    }, 1000);
  };

  return (
    <div className="bg-[#4ea8de] h-screen w-screen text-4xl flex justify-evenly items-center flex-col">
      <header className="top-12 text-white font-bold text-6xl skew-x-6">
        <h1 style={{ textShadow: "7px 7px #5e60ce" }}>QuizApp</h1>
      </header>
      <main>
        {!currentQuestion && currentQuestion !== 0 && (
          <Button
            isDisable={isDisable}
            onClick={startGameHandler}
            size="lg"
            text="Start Game"
          />
        )}
        {(currentQuestion || currentQuestion === 0) &&
          currentQuestion < length && (
            <Question
              checkAnswer={checkAnswerHandler}
              quiz={questions[currentQuestion]}
              isDisable={isDisable}
            />
          )}
        {currentQuestion === length && (
          <Summary score={userScore} amount={length} reset={resetGameHandler} />
        )}
      </main>
    </div>
  );
}

export default App;
