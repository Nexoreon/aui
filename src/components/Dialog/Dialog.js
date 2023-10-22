import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { defineIcon } from '../../utils';

const Dialog = ({ id, className, title, content, type, style, visible, onOkText, onCancelText, onOk, onCancel }) => {
    const [showAnim, setShowAnim] = useState(false);
    const contentCls = ['aui-modal-content', `aui-modal-content-tiny`];
    if (className) contentCls.push(className);

    useEffect(() => {
        document.body.classList.toggle('aui-modal--opened', visible);
        if (visible) setTimeout(() => setShowAnim(true), 10);
    }, [visible]);

    const onCancelClick = () => {
        setShowAnim(false);
    };

    const onOkClick = () => {
        setShowAnim(false);
        if (onOk) onOk();
    };

    const body = (
        <CSSTransition in={showAnim} timeout={300} onExited={onCancel} classNames="aui-modal">
            <div id={id} className="aui-modal">
                <div className="aui-modal__mask" />
                <div className={contentCls.join(' ')}>
                    <div className="aui-modal-content__body aui-modal-dialog" style={style}>
                        <div className="aui-modal-dialog__icon">
                            <i className={`far fa-${defineIcon(type)}`} />
                        </div>
                        <div className="aui-modal-dialog__content">
                            <div className="aui-modal-dialog__header">
                                <h4>{title}</h4>
                            </div>
                            <div className="aui-modal-dialog__text">
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="aui-modal-dialog__actions">
                        {onCancel && onOk && <Button onClick={onCancelClick}>{onCancelText}</Button>}
                        <Button type="primary" onClick={onOkClick}>
                            {onOkText}
                        </Button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );

    return createPortal(body, document.body);
};

Dialog.defaultProps = {
    type: 'info',
    onOkText: 'Подтвердить',
    onCancelText: 'Отменить'
};

Dialog.propTypes = {
    type: PropTypes.string,
    onOkText: PropTypes.string,
    onCancelText: PropTypes.string,
    content: PropTypes.string.isRequired
};

export default Dialog;
