import React from 'react';

// Results component to display the results of the quiz with the user name. 

const Results = ({ name, isCorrect, correctAnswer, onRestart}) => {
    return (
        <div className="results">
            <h2>{name}, your answer is {isCorrect ? 'correct' : 'incorrect'}!</h2>
            {!isCorrect && <p>The correct answer is: {correctAnswer}</p>}
            <button onClick={onRestart}>Try Another Question!</button>
        </div>
    );  
}; 

export default Results; 