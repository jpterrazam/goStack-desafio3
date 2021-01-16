import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response);
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Projeto ${Date.now()}`,
      url: `http://github.com/jpterrazam/${Date.now()}`,
      techs: ['NodeJS', 'ReactJS']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository=> (
      
          <li key={repository.id}>{repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
