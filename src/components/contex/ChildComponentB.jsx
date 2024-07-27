// ChildComponentB.js
import React, { useContext } from 'react';
import MyContext from './MyContext';

const ChildComponentB = () => {
  const { sharedMethod } = useContext(MyContext);

  return (
    <div>
      <h2>Child Component B</h2>
      <button onClick={() => sharedMethod("Message updated from ChildComponentB!")}>
        Update Message
      </button>
    </div>
  );
};

export default ChildComponentB;
