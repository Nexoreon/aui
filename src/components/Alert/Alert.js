import React from 'react';
import { defineIcon } from '../../utils';

const Alert = ({ className, type, style, title, children }) => {
    const alertCls = ['aui-alert', `aui-alert-${type}`];
    if (className) alertCls.push(className);

    return (
        <div className={alertCls.join(' ')} style={style}>
            <div className="aui-alert__icon">
                <i className={`fas fa-${defineIcon(type)}`} />
            </div>
            <div className="aui-alert__content">
                {title && <h4>{title}</h4>}
                {children}
            </div>
        </div>
    );
};

export default Alert;
