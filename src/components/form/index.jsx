// FormComponent.jsx
import React, { useState } from 'react';
import { data } from './data';
const App = () => {
    return (
        <div>
            <h1>数据表单</h1>
            <FormComponent />
        </div>
    );
};

export default App;


const FormComponent = () => {
    const [formData, setFormData] = useState(data);

    const handleChange = (id, value) => {
        setFormData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, value } : item
            )
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('your-backend-api-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('数据提交成功');
            } else {
                alert('数据提交失败');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('提交过程中发生错误');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {formData.map(item => (
                <div key={item.id}>
                    <label htmlFor={`data${item.id}`}>
                        Data {item.id}
                    </label>
                    <input
                        type="text"
                        id={`data${item.id}`}
                        value={item.value}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        readOnly={!item.needsEdit}
                    />
                </div>
            ))}
            <button type="submit">提交</button>
        </form>
    );
};


