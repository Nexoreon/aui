import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { defineIcon } from '../../utils';

const Message = ({ id, type, content, handleRemoveMsg }) => {
    const [showAnim, setShowAnim] = useState(false);
    const [progress, setProgress] = useState(100);
    const [paused, setPaused] = useState(false);
    let progressInterval;

    useEffect(() => {
        if (paused) onMessageHover();
        if (!paused) handleStartTimer();
    }, [paused]);

    const handleStartTimer = useCallback(() => {
        if (!showAnim) setTimeout(() => setShowAnim(true), 10);
        progressInterval = setInterval(() => {
            setProgress(progress => {
                if (progress <= 0) return onCloseClick();
                return progress - 0.1;
            });
        }, 5);
    }, [progressInterval]);

    const onMessageHover = useCallback(() => {
        clearInterval(progressInterval);
    }, [progressInterval]);

    const onCloseClick = () => {
        clearInterval(progressInterval);
        setTimeout(() => setShowAnim(false), 250);
    };

    return (
        <CSSTransition classNames="aui-message" in={showAnim} timeout={500} onExited={handleRemoveMsg}>
            <div
                id={id}
                className={`aui-message aui-message-${type}`}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => (showAnim ? setPaused(false) : null)}
            >
                <i className={`aui-message__icon fas fa-${defineIcon(type)}`} />
                <span className="aui-message__content">{content}</span>
                <div className="aui-message__actions">
                    <div className="aui-message__timer" style={{ width: `${progress}%` }} />
                    <a className="aui-message__close" title="Закрыть сообщение" onClick={onCloseClick}>
                        <i className="far fa-times" />
                    </a>
                </div>
            </div>
        </CSSTransition>
    );
};

Message.defaultProps = {
    type: 'info'
};

Message.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
    content: PropTypes.string.isRequired
};

export default Message;
