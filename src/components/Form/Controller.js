import React from 'react';

const Controller = ({ name, className, id, required, label, error, touched, children }) => {
    return (
        <div className={`aui-form-controller${className ? ` ${className}` : ''}`}>
            {label && (
                <label className="aui-form-controller__label" htmlFor={name}>
                    {required && <span title="Обязательно для заполнения">*</span>}
                    {label}
                </label>
            )}
            {React.Children.map(children, child => {
                return React.createElement(child.type, { ...{ ...child.props, id, name, required, touched, error } });
            })}
            {error && error.condition && touched ? <div className="aui-form-controller__error">{error.message}</div> : null}
        </div>
    );
};

export default Controller;
