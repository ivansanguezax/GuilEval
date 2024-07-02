import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Congrats = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lanzar el confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    localStorage.removeItem('juryCodeValid');
    localStorage.removeItem('completedProjects');
    localStorage.clear();
    const timer = setTimeout(() => {
      navigate('/');
    }, 20000);

    return () => clearTimeout(timer);
    
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Thank you for helping us evaluate these 3 projects!</h1>
      <p className="text-xl text-center mb-4">Your input is invaluable to our decision-making process.</p>
      <p className="text-lg text-center text-gray-600">You will be redirected to the home page in 20 seconds.</p>
    </div>
  );
};

export default Congrats;