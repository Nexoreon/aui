import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Collapse = ({ id, className, title, visible, style, transparent, children }) => {
    const [isVisible, setVisible] = useState(visible);
    const collapseCls = ['aui-collapse'];
    const contentBoxCls = ['aui-collapse__content-box'];
    if (isVisible) collapseCls.push('aui-collapse--opened');
    if (transparent) collapseCls.push('aui-collapse--transparent');
    if (className) contentBoxCls.push(className);

    return (
        <div id={id} className={collapseCls.join(' ')} style={style}>
            <div className="aui-collapse__header" onClick={() => setVisible(v => !v)}>
                <h4>{title}</h4>
                <i className="far fa-chevron-down" />
            </div>
            <div className="aui-collapse__content">
                <div className={contentBoxCls.join(' ')}>{children}</div>
            </div>
        </div>
    );
};

Collapse.defaultProps = {
    visible: true
};

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default Collapse;
