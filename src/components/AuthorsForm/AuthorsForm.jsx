import React, { useState } from 'react';

const AuthorsForm = ({ onSubmit }) => {
  const [newAuthor, setNewAuthor] = useState({ name: '', surname: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newAuthor);
    setNewAuthor({ name: '', surname: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newAuthor.name}
        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={newAuthor.surname}
        onChange={(e) => setNewAuthor({ ...newAuthor, surname: e.target.value })}
        placeholder="Surname"
        required
      />
      <button type="submit">Add Author</button>
    </form>
  );
};

export default AuthorsForm;
