import React, { useState, useEffect } from 'react';
import AuthorsList from './components/AuthorsList/AuthorsList.jsx';
import AuthorsForm from './components/AuthorsForm/AuthorsForm.jsx';
import EditAuthorForm from './components/AuthorsForm/EditAuthorsForm.jsx';
import './styles.css'
const App = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/authors');
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const addAuthor = async (newAuthor) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        const createdAuthor = await response.json();
        setAuthors([...authors, createdAuthor]);
      } else {
        console.error('Failed to add author');
      }
    } catch (error) {
      console.error('Failed to add author:', error);
    }
  };

  const updateAuthor = async (authorId, updatedAuthor) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authors/${authorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAuthor),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setAuthors(authors.map(author => (author.id === authorId ? updatedData : author)));
        setEditingAuthor(null);
      } else {
        console.error('Failed to update author');
      }
    } catch (error) {
      console.error('Failed to update author:', error);
    }
  };

  const deleteAuthor = async (authorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authors/${authorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAuthors(authors.filter(author => author.id !== authorId));
      } else {
        console.error('Failed to delete author');
      }
    } catch (error) {
      console.error('Failed to delete author:', error);
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
  };

  return (
    <div>
      <h1>Authors Management</h1>
      {editingAuthor ? (
        <EditAuthorForm
          author={editingAuthor}
          onSave={updateAuthor}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <AuthorsForm onSubmit={addAuthor} />
          <AuthorsList
            authors={authors}
            onDelete={deleteAuthor}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default App;
