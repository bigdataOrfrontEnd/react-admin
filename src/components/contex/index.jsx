// App.js
import React, { useState } from 'react';
import MyContext from './MyContext';
import ChildComponentA from './ChildComponentA';
import ChildComponentB from './ChildComponentB';

const App = () => {
  const [message, setMessage] = useState("Hello from App!");

  const sharedMethod = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <MyContext.Provider value={{ message, sharedMethod }}>
      <div>
        <h1>App Component</h1>
        <ChildComponentA />
        <ChildComponentB />
      </div>
    </MyContext.Provider>
  );
};

export default App;
