import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Multiple = ({ id, name, size, value, disabled, required, touched, valid, onChange, ...props }) => {
    const [inputValue, setInputValue] = useState('');
    const wrapperCls = ['aui-input-wrapper'];
    const inputCls = ['aui-input', `aui-input-${size}`];
    if (disabled) wrapperCls.push('aui-input--disabled');
    if (required && touched && !valid) {
        wrapperCls.push('aui-input-wrapper--error');
        inputCls.push('aui-input--error');
    }

    const onButtonPress = e => {
        e.preventDefault();
        const isNewValue = !value.includes(inputValue);
        if (['Enter', undefined].includes(e.key) && inputValue && isNewValue) onPressSubmit();
        if (e.key === 'Backspace' && value.length) onRemoveClick(value[value.length - 1]);
    };

    const onPressSubmit = () => {
        const newValues = [...value, inputValue];
        setInputValue('');
        onChange(newValues, name);
    };

    const onRemoveClick = el => {
        const newValues = [...value].filter(v => v !== el);
        onChange(newValues, name);
    };

    const renderValues = () => {
        return value.map(val => (
            <span key={val} className="aui-input-multiple__value">
                {val}
                <a title="Убрать" onClick={() => onRemoveClick(val)}>
                    <i className="fal fa-times" />
                </a>
            </span>
        ));
    };

    return (
        <div className="aui-input-multiple">
            {value && value.length ? <div className="aui-input-multiple__values">{renderValues()}</div> : null}
            <span className={wrapperCls.join(' ')}>
                <input
                    id={name || id}
                    className={inputCls.join(' ')}
                    type="text"
                    disabled={disabled}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={e => onButtonPress(e)}
                    onKeyDown={e => (e.key === 'Enter' || (e.key === 'Backspace' && !inputValue) ? onButtonPress(e) : null)}
                    {...props}
                />
            </span>
        </div>
    );
};

Multiple.defaultProps = {
    get: 'values',
    size: 'normal'
};

Multiple.propTypes = {
    get: PropTypes.oneOf(['values', 'field']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    value: PropTypes.instanceOf(Array).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Multiple;
