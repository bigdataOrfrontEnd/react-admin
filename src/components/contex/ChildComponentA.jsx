// ChildComponentA.js
import React, { useContext } from 'react';
import MyContext from './MyContext';

const ChildComponentA = () => {
  const { message } = useContext(MyContext);

  return (
    <div>
      <h2>Child Component A</h2>
      <p>Message from App: {message}</p>
    </div>
  );
};

export default ChildComponentA;
