import React, { useEffect, useState } from 'react';
import AuthorsList from './components/AuthorsList/AuthorsList.jsx';
import AuthorsForm from './components/AuthorsForm/AuthorsForm.jsx';
import './styles.css'
const App = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/authors?skip=0&limit=100');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('There was an error fetching the authors!', error);
    }
  };

  const createAuthor = async (author) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newAuthor = await response.json();
      setAuthors([...authors, newAuthor]);
    } catch (error) {
      console.error('There was an error creating the author!', error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authors/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAuthors(authors.filter(author => author.id !== id));
    } catch (error) {
      console.error('There was an error deleting the author!', error);
    }
  };

  

  return (
    <div>
      <h1>Authors</h1>
      <AuthorsForm onSubmit={createAuthor} />
      <AuthorsList authors={authors} onDelete={deleteAuthor} />
    </div>
  );
};

export default App;
