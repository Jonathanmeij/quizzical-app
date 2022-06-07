import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Question from "./Question";
import blobs from "../images/blobs.png";
import blobs2 from "../images/blobs2.png";

export default function Main() {
    //used to switch from start screen to quiz screen
    const [hasStarted, setHasStarted] = useState(false);

    //array of question objects
    const [questions, setQuestions] = useState([]);

    //keeps track of if the user is done with the quiz
    const [isDone, setIsDone] = useState(false);

    //keeps track of the correct choices
    const [correct, setCorrect] = useState(0);

    //fetches quiz data from API
    function fetchData() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium")
            .then((res) => res.json())
            .then((data) =>
                setQuestions(
                    data.results.map((quest) => {
                        let answers = [...quest.incorrect_answers, quest.correct_answer];
                        answers = answers.sort(() => Math.random() - 0.5);
                        return {
                            ...quest,
                            selected: "",
                            id: nanoid(),
                            shuffledArray: answers,
                        };
                    })
                )
            );
    }

    //fetches data when page loads
    useEffect(() => {
        fetchData();
    }, []);

    //go from start screen to quiz screen
    function startQuiz() {
        setHasStarted((prev) => !prev);
    }

    //when user selects an answer this function places that choise in the question object
    function setSelected(id, selectedAnswer) {
        setQuestions((prev) => {
            return prev.map((quest) => {
                if (quest.id === id) {
                    return { ...quest, selected: selectedAnswer };
                } else {
                    return quest;
                }
            });
        });
    }

    //makes JSX elements of all the questions
    const questionElements = questions.map((quest) => {
        const id = quest.id;

        return (
            <Question
                setSelected={setSelected}
                selected={quest.selected}
                question={quest.question}
                answers={quest.shuffledArray}
                correct_answer={quest.correct_answer}
                isDone={isDone}
                key={id}
                id={id}
            />
        );
    });

    //checks user results
    function checkResult() {
        //check if every question is answered
        if (questions.every((quest) => quest.selected !== "")) {
            setIsDone(true);
            let correctAmount = 0;
            questions.forEach((quest) => {
                if (quest.correct_answer === quest.selected) {
                    correctAmount++;
                }
                setCorrect(correctAmount);
            });
        } else {
            alert("Fill out all questions");
        }
    }

    //resets the states to play again
    function playAgain() {
        fetchData();
        setIsDone(false);
        setCorrect(0);
    }

    return (
        <div>
            {/* start screen */}
            {!hasStarted && (
                <div className="start--container">
                    <h1>Quizzical</h1>
                    <p>Some description if needed</p>
                    <button className="start" onClick={startQuiz}>
                        Start quiz
                    </button>
                </div>
            )}
            {/* quiz screen */}
            {hasStarted && (
                <div className="quiz--container">
                    <div className="questions--container">{questionElements}</div>
                    {isDone > 0 && (
                        <h3>
                            You scored {correct}/{questions.length} correct answers
                        </h3>
                    )}
                    {isDone ? (
                        <button onClick={playAgain}>Play again</button>
                    ) : (
                        <button onClick={checkResult}>Check answers</button>
                    )}
                </div>
            )}

            {/* Background */}
            <img src={blobs} id="blobs" alt=""></img>
            <img src={blobs2} id="blobs2" alt=""></img>
        </div>
    );
}
