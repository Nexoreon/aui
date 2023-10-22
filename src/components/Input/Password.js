import React, { useState } from 'react';

const Password = ({ id, name, value, size, style, prefix, disabled, valid, touched, onChange, ...props }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const wrapperCls = ['aui-input-wrapper'];
    const inputCls = ['aui-input'];
    if (size) inputCls.push(`aui-input-${size}`);
    if (!valid && touched) wrapperCls.push('aui-input-wrapper--error');
    if (disabled) wrapperCls.push('aui-input--disabled');

    const onInputChange = e => {
        onChange(e.target.value, name);
    };

    return (
        <span className={wrapperCls.join(' ')} style={style}>
            {prefix && (
                <span className="aui-input-wrapper__prefix">
                    <i className="far fa-lock" />
                </span>
            )}
            <input
                id={id}
                className={inputCls.join(' ')}
                type={isPasswordVisible ? 'text' : 'password'}
                disabled={disabled}
                onChange={onInputChange}
                {...props}
            />
            <span className="aui-input-wrapper__suffix">
                <span className="aui-input-icon">
                    <i
                        className={`far aui-input-icon-interactable ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => setPasswordVisible(v => !v)}
                    />
                </span>
            </span>
        </span>
    );
};

export default Password;
