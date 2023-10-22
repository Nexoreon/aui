import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import PropTypes from 'prop-types';

const Tooltip = ({ title, place, type, effect, children }) => {
    const id = useId();
    return (
        <>
            <div data-tooltip-id={id}>{children}</div>
            <ReactTooltip id={id} className="aui-tooltip" place={place} type={type} effect={effect}>
                <span>{title}</span>
            </ReactTooltip>
        </>
    );
};

export default Tooltip;

Tooltip.defaultProps = {
    place: 'top',
    type: 'dark',
    effect: 'solid'
};

Tooltip.propTypes = {
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    type: PropTypes.oneOf(['dark', 'success', 'warning', 'error', 'info', 'light']),
    effect: PropTypes.oneOf(['float', 'solid']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.node.isRequired
};
