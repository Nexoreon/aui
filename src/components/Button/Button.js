import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ className, elRef, href, target, title, action, type, shape, size, icon, disabled, loading, onClick, style, children }) => {
    const handleBtnCls = () => {
        const cls = ['aui-button', ...[size, type, shape].map(prop => `aui-button-${prop}`)];
        if (icon && !children) cls.push('aui-button-icon');
        if (className) cls.push(className);
        if (loading) cls.push('aui-button--loading');
        if (disabled) cls.push('aui-button--disabled');
        return cls;
    };

    const displayIcon = icon ? <i className={`aui-button-icon ${icon.type ? icon.type : 'far'} ${icon.name ? icon.name : icon}`} /> : null;

    if (href && target) {
        return (
            <a target={target} href={!disabled && href} title={title} className={handleBtnCls().join(' ')} disabled={disabled || loading}>
                {icon && displayIcon}
                <span>{children}</span>
            </a>
        );
    }

    if (href && !target) {
        return (
            <Link to={href} title={title} className={handleBtnCls().join(' ')}>
                {icon && displayIcon}
                {children}
            </Link>
        );
    }

    return (
        // eslint-disable-next-line react/button-has-type
        <button
            ref={elRef}
            title={title}
            className={handleBtnCls().join(' ')}
            type={action}
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
        >
            {loading && <i className="fad fa-spinner-third fa-spin" />}
            {icon ? displayIcon : null}
            {children && <span className="aui-button__label">{children}</span>}
        </button>
    );
};

Button.defaultProps = {
    action: 'button',
    size: 'normal',
    type: 'normal',
    shape: 'round'
};

Button.propTypes = {
    action: PropTypes.oneOf(['button', 'reset', 'submit']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    type: PropTypes.oneOf(['normal', 'link', 'primary', 'dark']),
    shape: PropTypes.oneOf(['normal', 'round'])
};

export default Button;
