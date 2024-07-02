import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [juryCode, setJuryCode] = useState(['', '', '', '', '']);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...juryCode];
      newCode[index] = value;
      setJuryCode(newCode);

      if (value && index < 4) {
        document.getElementById(`jury-code-${index + 1}`).focus();
      }
    }
  };

  const renderOtpInputs = () => {
    return juryCode.map((digit, index) => (
      <InputText
        key={index}
        id={`jury-code-${index}`}
        value={digit}
        onChange={(e) => handleInputChange(index, e.target.value)}
        className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
        maxLength={1}
      />
    ));
  };

  const handleDialogHide = () => {
    setVisible(false);
    setJuryCode(['', '', '', '', '']);
  };

  const handleSubmit = () => {
    const code = juryCode.join('');
    if (code === '12345' ) {
      toast.success('Welcome!');
      setVisible(false);
      localStorage.setItem('juryCodeValid', 'true');
      localStorage.setItem('justLoggedIn', 'true');
      navigate('/projects'); 
    } else {
      toast.error('Invalid code');
      setJuryCode(['', '', '', '', '']);
    }
  };

  const dialogFooter = (
    <div>
      <Button label="Start" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300" onClick={handleSubmit} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-12 text-center transform transition-transform duration-1000 ease-out"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        Evaluate <span className="text-blue-600">the gate</span> in Just 2 Easy Steps
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-5xl">
        <div className="flex flex-col items-center mb-12 md:mb-0 md:mr-12 transform transition-transform duration-1000 ease-out"
             style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <img
            src="https://res.cloudinary.com/dhicmjsel/image/upload/v1719867808/srzyhaj2ve6ymqeexrt9.png"
            alt="Identify yourself"
            className="w-full max-w-[120px] md:max-w-[180px] h-auto mb-6"
          />
          <h2 className="text-2xl font-semibold"><span className="text-blue-600">1. Identify yourself</span></h2>
          <p className="text-center mt-3 text-lg">Submit your details on our platform.</p>
        </div>
        <div className="flex flex-col items-center transform transition-transform duration-1000 ease-out"
             style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <img
            src="https://res.cloudinary.com/dhicmjsel/image/upload/v1719866660/ueyuc4jxber0w5ophyhg.png"
            alt="Rate the startup"
            className="w-full max-w-[120px] md:max-w-[180px] h-auto mb-6"
          />
          <h2 className="text-2xl font-semibold"><span className="text-blue-600">2. Rate the startup</span></h2>
          <p className="text-center mt-3 text-lg">Provide your evaluation of the startup.</p>
        </div>
      </div>
      <Button 
        label="SUBMIT YOUR EVALUATION" 
        className="mt-12 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        onClick={() => setVisible(true)}
      />
      
      <Dialog 
        visible={visible} 
        style={{ width: '90vw', maxWidth: '500px' }} 
        onHide={handleDialogHide}
        footer={dialogFooter}
        modal
        className="p-fluid"
      >
        <h2 className="text-2xl font-bold mb-4">Enter your jury code</h2>
        <div className="flex justify-between mb-4 space-x-2">
          {renderOtpInputs()}
        </div>
        <a href="#" className="text-blue-500 hover:underline">I don't have a jury code</a>
      </Dialog>
    </div>
  );
};

export default Login;