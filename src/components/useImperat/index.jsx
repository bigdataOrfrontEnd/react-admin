import React, { useRef, forwardRef, useImperativeHandle } from 'react';

// 子组件2
const ChildComponent2 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    methodInChildComponent2() {
      alert('子组件2的方法被调用');
    },
  }));

  return <div>我是子组件2</div>;
});

// 子组件1
const ChildComponent1 = ({ child2Ref }) => {
  const handleClick = () => {
    if (child2Ref.current) {
      child2Ref.current.methodInChildComponent2();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>调用子组件2的方法</button>
    </div>
  );
};

// 父组件
const ParentComponent = () => {
  const child2Ref = useRef(null);

  return (
    <div>
      <ChildComponent1 child2Ref={child2Ref} />
      <ChildComponent2 ref={child2Ref} />
    </div>
  );
};

export default ParentComponent;
