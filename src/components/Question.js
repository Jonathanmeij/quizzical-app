import { nanoid } from "nanoid";

export default function Question(props) {
    const answersElements = props.answers.map((answer) => {
        const anwserID = nanoid();
        const styleCorrect = { backgroundColor: "#94D7A2" };
        const styleIncorrect = { backgroundColor: "#F8BCBC" };

        //when game is over this function makes the correct answers green
        //and if the user chose an incorrect answer the answers becomes red
        function getSyle(answer) {
            if (props.isDone && answer === props.selected) {
                return answer === props.correct_answer ? styleCorrect : styleIncorrect;
            } else if (props.isDone && answer === props.correct_answer) {
                return styleCorrect;
            }
        }

        return (
            <div className="radio--button" key={anwserID}>
                <input
                    type="radio"
                    className="answer"
                    value={answer}
                    name={props.id}
                    id={anwserID}
                    onChange={() => props.setSelected(props.id, answer)}
                    checked={answer === props.selected}
                    disabled={props.isDone}
                ></input>
                <label
                    htmlFor={anwserID}
                    style={getSyle(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                ></label>
            </div>
        );
    });

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: props.question }}></h2>
            <div className="answer--container">{answersElements}</div>
            <hr></hr>
        </div>
    );
}
