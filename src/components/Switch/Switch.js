import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({ id, className, title, disabled, size, placement, checked, showLoading, onChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const switchCls = ['aui-switch', `aui-switch-${size}`, `aui-switch-placement-${placement}`];
    if (className) switchCls.push(className);
    if (checked) switchCls.push('aui-switch--checked');
    if (disabled) switchCls.push('aui-switch--disabled');
    if (isLoading) switchCls.push('aui-switch--loading');

    const handleChange = () => {
        if (showLoading) setIsLoading(true);
        if (onChange) onChange(!checked, () => setIsLoading(false));
    };

    return (
        <button id={id} type="button" className={switchCls.join(' ')} title={title} onClick={!isLoading ? handleChange : null} disabled={disabled}>
            <div className="aui-switch__handle" />
            <span className="aui-switch__inner" />
        </button>
    );
};

Switch.defaultProps = {
    size: 'normal',
    checked: false,
    showLoading: false,
    placement: 'outside'
};

Switch.propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    placement: PropTypes.oneOf(['outside', 'container']),
    checked: PropTypes.bool,
    showLoading: PropTypes.bool
};

export default Switch;
