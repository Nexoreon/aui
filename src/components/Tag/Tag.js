import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip/Tooltip';

const Tag = ({ className, type, shape, size, tooltip, children }) => {
    const tagCls = ['aui-tag', `aui-tag-${type}`, `aui-tag-${shape}`, `aui-tag-size-${size}`];
    if (className) tagCls.push(className);

    return (
        <span className={tagCls.join(' ')}>
            {children}
            {tooltip && (
                <Tooltip title={tooltip}>
                    <i className="fas fa-circle-info" />
                </Tooltip>
            )}
        </span>
    );
};

Tag.defaultProps = {
    type: 'normal',
    shape: 'rounded',
    size: 'normal'
};

Tag.propTypes = {
    type: PropTypes.oneOf(['normal', 'primary', 'error', 'warning']),
    shape: PropTypes.oneOf(['rounded', 'squared']),
    size: PropTypes.oneOf(['small', 'normal', 'large'])
};

export default Tag;
