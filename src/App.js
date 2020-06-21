import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response);
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
        "title" : "Conceitos Spring Boot",
        "url" : "https://github.com/mateuspegoraro/forum-spring",
        "techs" : ["spring", "jwt", "java"]
      }

    const response = await api.post('repositories', repository);
    setRepositories([ ... repositories, response.data]);

    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repo => repo.id === id)
    if(repositoryIndex >= 0 && (response.status >= 200 && response.status < 300)){
      repositories.splice(repositoryIndex, 1);
      setRepositories([... repositories])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
