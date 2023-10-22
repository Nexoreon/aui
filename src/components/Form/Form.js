import React from 'react';

const Form = ({ className, children, onSubmit }) => {
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className={`aui-form${className ? ` ${className}` : ''}`} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
