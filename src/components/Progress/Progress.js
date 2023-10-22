import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ className, size, shape, progress }) => {
    const cls = ['aui-progress', `aui-progress-${size}`, `aui-progress-${shape}`];
    if (className) cls.push(className);
    if (progress?.percentage === 100) cls.push('aui-progress--finished');

    return (
        <div className={cls.join(' ')}>
            <div className="aui-progress__value" style={{ width: `${progress?.percentage || 0}%` }} />
            {progress?.required !== null && <span>{`${progress?.current}/${progress?.required}`}</span>}
        </div>
    );
};

Progress.defaultProps = {
    size: 'normal',
    shape: 'rounded',
    progress: {
        percentage: 0,
        current: 0,
        required: 0
    }
};

Progress.propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    shape: PropTypes.oneOf(['rounded', 'squared']),
    progress: PropTypes.instanceOf(Object)
};

export default Progress;
