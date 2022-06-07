import { useState } from "react";

export default function Settings(props) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="settings-accordion">
            <div className="settings-title" onClick={() => setIsActive((prev) => !prev)}>
                <h3>Settings</h3>
                <h3>{isActive ? "-" : "+"}</h3>
            </div>
            {isActive && <hr className="settings-divider"></hr>}

            {isActive && (
                <div className="settings-container">
                    <div className="slider-container">
                        <h4>Amount of questions: {props.questionAmount}</h4>
                        <div className="">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                onChange={props.handleQuestionChange}
                                value={props.questionAmount}
                                className="slider"
                                id="myRange"
                            ></input>
                        </div>
                    </div>
                    <div className="select-container">
                        <h4>difficulty</h4>
                        <select
                            name="difficulty"
                            id="diff"
                            value={props.difficulty}
                            onChange={props.handleDifficultyChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
