import React from 'react';

const AuthorsList = ({ authors, onDelete, onEdit }) => {
  return (
    <ul>
      {authors.map((author) => (
        <li key={author.id}>
          {author.name} {author.surname}
          <button onClick={() => onEdit(author)}>Edit</button>
          <button onClick={() => onDelete(author.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default AuthorsList;
