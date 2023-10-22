import React, { useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';

const Checkbox = ({ id, name, disabled, checked, onChange, style, children }) => {
    const [inputId] = useState(name || id);
    const checkboxCls = ['aui-checkbox'];
    if (disabled) checkboxCls.push('aui-checkbox--disabled');

    return (
        <label htmlFor={inputId} className={checkboxCls.join(' ')} style={style}>
            <span>
                <input
                    id={inputId}
                    className="aui-checkbox__input"
                    type="checkbox"
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className="aui-checkbox__inner" />
            </span>
            {children && <span className="aui-checkbox__label">{children}</span>}
        </label>
    );
};

Checkbox.defaultProps = {
    id: nanoid(6)
};

Checkbox.propTypes = {
    id: propTypes.string,
    onChange: propTypes.func.isRequired
};

export default Checkbox;
