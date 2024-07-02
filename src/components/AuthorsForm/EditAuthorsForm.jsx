import React, { useState, useEffect } from 'react';

const EditAuthorForm = ({ author, onSave, onCancel }) => {
  const [name, setName] = useState(author.name);
  const [surname, setSurname] = useState(author.surname);

  useEffect(() => {
    setName(author.name);
    setSurname(author.surname);
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAuthor = { name, surname };
    onSave(author.id, updatedAuthor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditAuthorForm;
