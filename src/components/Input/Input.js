import React from 'react';
import PropTypes from 'prop-types';

import Multiple from './Multiple';
import Password from './Password';

const Input = props => {
    const {
        id,
        name,
        className,
        style,
        size,
        type,
        value,
        touched,
        prefix,
        required,
        valid,
        disabled,
        allowClear,
        feedback,
        onChange,
        onKeyDown,
        ...inputProps
    } = props;
    const isSuffixVisible = allowClear || feedback;
    const wrapperCls = ['aui-input-wrapper'];
    const inputCls = ['aui-input'];
    const iconCls = ['aui-input-icon'];
    let iconEl;

    if (required && touched && !valid) {
        wrapperCls.push('aui-input-wrapper--error');
        inputCls.push('aui-input--error');
    }
    if (size) inputCls.push(`aui-input-${size}`);
    if (className) inputCls.push(className);
    if (disabled) wrapperCls.push('aui-input--disabled');
    if (allowClear && value) {
        iconCls.push('aui-input-icon-interactable');
        iconEl = 'fa-times-circle';
    }
    if (feedback && touched && value) {
        iconCls.push('aui-input-icon--success');
        iconEl = 'fa-check-circle';
    }
    if (feedback && touched && !value) {
        iconCls.push('aui-input-icon--error');
        iconEl = 'fa-times-circle';
    }

    const onInputChange = e => {
        const { value } = e.target;
        onChange(value, name);
    };

    const onPressClear = () => {
        onChange('', name);
    };

    return (
        <span className={wrapperCls.join(' ')} style={style}>
            {prefix && (
                <span className="aui-input-wrapper__prefix">
                    <i className={`far ${prefix}`} />
                </span>
            )}
            <input
                id={name || id}
                className={inputCls.join(' ')}
                type={type}
                value={value}
                disabled={disabled}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                {...inputProps}
            />
            {isSuffixVisible && (
                <span className="aui-input-wrapper__suffix">
                    <span className={iconCls.join(' ')}>
                        <i className={`fas ${iconEl}`} onClick={allowClear ? onPressClear : null} />
                    </span>
                </span>
            )}
        </span>
    );
};

Input.defaultProps = {
    size: 'normal',
    type: 'text',
    valid: true
};

Input.propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    type: PropTypes.string,
    valid: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

Input.Multiple = Multiple;
Input.Password = Password;

export default Input;
