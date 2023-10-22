/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Drawer = ({ id, visible, title, width, className, onCancel, outsideAnimFunc, outsideAnim, children }) => {
    const [showAnim, setShowAnim] = useState(false);
    const drawerContentCls = ['aui-drawer-content'];
    if (className) drawerContentCls.push(className);

    useEffect(() => {
        if (visible) handleDrawerState(true);
    }, [visible]);

    const handleDrawerState = v => {
        if (!outsideAnimFunc) return setShowAnim(v);
        outsideAnimFunc(v);
    };

    const onCancelClick = () => {
        handleDrawerState(false);
    };

    if (!visible) return null;
    const drawer = (
        <CSSTransition in={outsideAnim || showAnim} timeout={300} classNames="aui-drawer" onExited={onCancel}>
            <div key="drawer" className="aui-drawer">
                <div className="aui-drawer__mask" onClick={onCancelClick} />
                <div className="aui-drawer-content" style={{ width }}>
                    <div className="aui-drawer-content__header">
                        <h4>{title}</h4>
                        <a className="aui-drawer-content__close" onClick={onCancelClick}>
                            <i className="fal fa-times" />
                        </a>
                    </div>
                    <div id={id} className="aui-drawer-content__body">
                        {children}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );

    return createPortal(drawer, document.body);
};

Drawer.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default Drawer;
