import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Modal = ({ id, visible, className, title, size, outsideAnimFunc, outsideAnim, onCancel, windowStyle, contentStyle, children }) => {
    const [showAnim, setShowAnim] = useState(false);
    const contentCls = ['aui-modal-content', `aui-modal-content-${size}`];
    if (className) contentCls.push(className);

    useEffect(() => {
        if (visible) handleModalState(true);
    }, [visible]);

    const handleModalState = v => {
        if (!outsideAnimFunc) return setShowAnim(v);
        outsideAnimFunc(v);
    };

    const onCancelClick = e => {
        e.stopPropagation();
        e.preventDefault();
        handleModalState(false);
    };

    if (!visible) return null;

    const modal = (
        <CSSTransition in={outsideAnim || showAnim} timeout={300} onExited={onCancel} classNames="aui-modal">
            <div className="aui-modal">
                <div className="aui-modal__mask" onClick={onCancelClick} />
                <div className={contentCls.join(' ')} style={windowStyle}>
                    <a title="Закрыть окно" className="aui-modal-content__close" onClick={onCancelClick}>
                        <i className="fal fa-times" />
                    </a>
                    {title && (
                        <div className="aui-modal-content__header">
                            <h4>{title}</h4>
                        </div>
                    )}
                    <div id={id} className="aui-modal-content__body" style={contentStyle}>
                        {children}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
    return createPortal(modal, document.getElementById('root'));
};

Modal.defaultProps = {
    size: 'normal'
};

Modal.propTypes = {
    size: PropTypes.oneOf(['tiny', 'small', 'normal', 'large', 'huge']),
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default Modal;
