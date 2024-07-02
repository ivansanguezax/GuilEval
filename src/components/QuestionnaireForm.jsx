import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

const questions = [
  "How well does the project understand and address customer needs?",
  "How clearly does the project define and solve a specific problem?",
  "How scalable is the project in terms of technology and resources?",
  "How efficiently does the project use its capital and resources?",
  "How innovative is the project's approach to solving problems?",
  "How effectively does the project utilize cloud software for its operations?",
];

const options = [
  { label: 'Strong 💪', value: 'strong' },
  { label: 'Regular 👌', value: 'regular' },
  { label: 'Lacking 👎', value: 'lacking' },
];

const QuestionnaireForm = () => {
  const { project } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [continueInvesting, setContinueInvesting] = useState(null);
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = localStorage.getItem('juryCodeValid') === 'true';
    if (!isValid) {
      navigate('/');
    }
  }, [navigate]);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(questions.length);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const finalResults = {
      project,
      answers,
      continueInvesting,
      comments,
    };
    console.log(finalResults);
    
    const completedProjects = JSON.parse(localStorage.getItem('completedProjects')) || [];
    completedProjects.push(project);
    localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
    
    if (completedProjects.length === 3) {
      navigate('/congrats');
    } else {
      navigate('/projects');
    }
  };

  if (currentQuestion === questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Would you continue investing in this startup?</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <Button label="Yes" onClick={() => setContinueInvesting(true)} className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ${continueInvesting === true ? 'ring-2 ring-green-300' : ''}`} />
            <Button label="No" onClick={() => setContinueInvesting(false)} className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ${continueInvesting === false ? 'ring-2 ring-red-300' : ''}`} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Any comments on why this grade was given this project?</h2>
          <InputTextarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter your comments here"
          />
          <Button label="Submit" onClick={handleSubmit} disabled={continueInvesting === null} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion]}</h2>
        <Dropdown
          value={answers[currentQuestion]}
          options={options}
          onChange={(e) => handleAnswer(e.value)}
          placeholder="Select an option"
          className="w-full mb-4"
        />
        <div className="flex justify-between">
          <Button label="Previous" onClick={prevQuestion} disabled={currentQuestion === 0} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300" />
          <Button 
            label={currentQuestion === questions.length - 1 ? "Finish" : "Next"} 
            onClick={nextQuestion} 
            disabled={!answers[currentQuestion]}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;