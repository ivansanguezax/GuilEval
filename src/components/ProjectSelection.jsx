import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const projects = ['Justicar', 'Drifin', 'Raidin'];

const ProjectSelection = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedProjects')) || [];
    setCompletedProjects(completed);

    // Verificar si el usuario acaba de iniciar sesión
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      setCompletedProjects([]);
      localStorage.removeItem('completedProjects');
      localStorage.removeItem('justLoggedIn');
    }
  }, []);

  const handleProjectSelect = (project) => {
    navigate(`/questionnaire/${project}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Choose a project to evaluate</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Button
            key={project}
            label={project}
            onClick={() => handleProjectSelect(project)}
            disabled={completedProjects.includes(project)}
            className={`p-4 ${
              completedProjects.includes(project)
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            icon={completedProjects.includes(project) ? 'pi pi-times' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSelection;