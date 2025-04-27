// Home Page for the Trivia Quiz App. 
import React, { useState } from 'react';
import Results from './Results'; // Importing the Results Component 


function GetQuestion() {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: '',
    });


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [triviaData, setTriviaData] = useState(null);
    const [fetchError, setFetchError]= useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const[isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const[isCorrect, setIsCorrect] = useState(false);

    // Function for api call to get trivia data

    async function getTriviaData() {
        const {category, difficulty } = formData;
        const categoryId = category;

        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple&category=${categoryId}&difficulty=${difficulty}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.results.length === 0) {
                setFetchError('No trivia questions found for the selected criteria.');
                return;
            }
            
            const trivia = data.results[0];
            setTriviaData({
                question: trivia.question,
                answers: [...trivia.incorrect_answers, trivia.correct_answer],
                correct_answer: trivia.correct_answer, 
            });
            setFetchError(''); 
            setSuccess('Question Retrieved!');
            setUserAnswer(''); 
            setIsAnswerSubmitted(false);
            setIsCorrect(false);
        } catch (error) {
            setFetchError('Error fetching trivia data.');
            console.error('Error fetching trivia data:', error);
        }
    }

    // Function to handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to Validate the form data
    const validateForm = () => {
        const { name, category, difficulty } = formData;
        if (name.trim() === '' || category.trim() === '' || difficulty.trim() === '') {
            setError('Please fill in all fields!');
            setSuccess('');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setTriviaData(null);
            setFetchError('');
            setUserAnswer('');
            await getTriviaData();
            setSuccess('Question Retrieved!');
        }
    };
        
const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
};

const handleAnswerSubmit = (event) => {
    event.preventDefault();
    if (userAnswer === '') {
        setError('Please select an answer!');
        return;
    }

    if (userAnswer === triviaData.correct_answer) {
        setIsCorrect(true);
        setSuccess('Correct Answer!');
    }
    else {
        setIsCorrect(false);
        setSuccess('Incorrect Answer!');
    }
    setIsAnswerSubmitted(true);

};
    const handleRestart = () => {
        setFormData({
            name: '',
            category: '',
            difficulty: '',
        });

        setTriviaData(null);
        setError('');
        setSuccess('');
        setFetchError('');
        setUserAnswer('');
        setIsAnswerSubmitted(false);
        setIsCorrect(false);
    };



        return (
            <>
                <h2>Welcome to the Trivia Quiz App!</h2>
                <p>Here you can test your knowledge on multiple different subjects to prove just how much of a Genius you are!</p>
                <p>Instructions:</p>
                <ul className="instructions">
                    <li>Enter your name.</li>
                    <li>Select a category for the question.</li>
                    <li>Select a difficulty level for the question.</li>
                    <li>Click the submit button to get your question!</li>
                </ul>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            {/* Using the numerical values for the category selections as this is what the API expects */}
                            Category:
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select a category</option>
                                <option value="21">Sports</option>
                                <option value="28">Vehicles</option>
                                <option value="27">Animals</option>
                                <option value="26">Celebrities</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Difficulty:
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                <option value="">Select difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </label>
                        <br />
                        <button type="submit">Get Question</button>


                    </form>
                    {error && <p>{error}</p>}
                    {fetchError && <p>{fetchError}</p>}
                    {success && <p>{success}</p>}
                </div>

                {triviaData && (
                    <div>
                        <h3>Question:</h3>
                        <p>{triviaData.question}</p>
                        <form onSubmit={handleAnswerSubmit}>
                            <h4>Answers:</h4>
                            {triviaData.answers.map((answer, index) => (
                                <label key={index}>
                                    <input type="radio" name="answer" value={answer} checked={userAnswer === answer} onChange={handleAnswerChange} />
                                    {answer}
                                </label>
                            ))}
                            <button type="submit">Submit Answer</button>
                        </form>
                    </div>
                )}
                {isAnswerSubmitted && (
                    <Results
                        name={formData.name}
                        isCorrect={isCorrect}
                        correctAnswer={triviaData.correct_answer}
                        onRestart={handleRestart}
                    />
                )}
            </>
        )
    }


export default GetQuestion;