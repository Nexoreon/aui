import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { shift, useFloating } from '@floating-ui/react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { useOutsideAlerter } from '../../hooks/hooks';
import { DropdownContext } from '../AUIContext';
import Item from './Item';
import Button from '../Button/Button';

const Dropdown = ({ id, className, placement, title, label, style, overlay, placeInside, showArrow, children }) => {
    const [isOpened, setOpened] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const { refs, floatingStyles } = useFloating({ placement, middleware: [shift()] });
    useOutsideAlerter([refs.floating, refs.reference], isOpened, setShowAnim);

    useEffect(() => {
        if (isOpened) setShowAnim(true);
    }, [isOpened]);

    const onHostClick = () => {
        if (isOpened) return setShowAnim(false);
        setOpened(true);
    };

    const onItemClick = cb => {
        setTimeout(() => setShowAnim(false)); // Using timeout to fix weird CSSTransition bug
        if (cb) cb();
    };

    const defaultHost = (
        <Button elRef={refs.setReference} type="link" onClick={onHostClick}>
            {label}
        </Button>
    );
    const getCustomHost = () => {
        return React.createElement(children.type, {
            ...{
                ...children.props,
                onClick: e => {
                    e.preventDefault();
                    onHostClick();
                }
            },
            ref: refs.setReference
        });
    };
    const useHost = children ? getCustomHost() : defaultHost;
    const useOverlay =
        !overlay.type || overlay.type === React.Fragment
            ? overlay
            : React.createElement(overlay.type, { ...{ ...overlay.props, onItemClick: () => onItemClick() } });

    const overlayCls = ['aui-dropdown-overlay', `aui-dropdown-${placement}`];
    if (showArrow) overlayCls.push('aui-dropdown-overlay__withArrow');
    const overlayWrapper = (
        <div ref={refs.setFloating} className="aui-dropdown-wrapper" style={floatingStyles}>
            <CSSTransition in={showAnim} timeout={300} onExited={() => setOpened(false)} classNames="aui-dropdown-overlay">
                <div className={overlayCls.join(' ')}>{useOverlay}</div>
            </CSSTransition>
        </div>
    );

    const dropdownCls = ['aui-dropdown'];
    if (className) dropdownCls.push(className);
    if (isOpened) dropdownCls.push('aui-dropdown-opened');
    const providerValue = useMemo(() => ({ id, onItemClick }), [isOpened, onItemClick]);
    return (
        <DropdownContext.Provider value={providerValue}>
            <div id={id} title={title} className={dropdownCls.join(' ')} style={style}>
                {useHost}
                {placeInside && isOpened && overlayWrapper}
            </div>
            {isOpened && !placeInside && createPortal(overlayWrapper, document.body)}
        </DropdownContext.Provider>
    );
};

Dropdown.defaultProps = {
    placement: 'bottom'
};

Dropdown.propTypes = {
    placement: PropTypes.string
};

Dropdown.Item = Item;

export default Dropdown;
