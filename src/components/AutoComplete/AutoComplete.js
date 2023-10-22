import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useFloating } from '@floating-ui/react-dom';
import { useOutsideAlerter } from '../../hooks/hooks';

const AutoComplete = ({ id, name, value, placeholder, size, style, url, template, useMinLength, onChange }) => {
    const [showAnim, setShowAnim] = useState(false);
    const [data, setData] = useState([]);
    const [isDataVisible, setDataVisible] = useState(false);
    const { x, y, reference, floating, refs, strategy } = useFloating();
    useOutsideAlerter([refs.floating, refs.reference], isDataVisible, setShowAnim);

    useEffect(() => {
        if (isDataVisible) setShowAnim(true);
    }, [isDataVisible]);

    useEffect(() => {
        if ((useMinLength && value.length >= 3) || !useMinLength) {
            const timer = setTimeout(handleGetData, 500);
            return () => clearTimeout(timer);
        }
    }, [value]);

    const onInputClick = () => {
        if (isDataVisible) return setShowAnim(false);
        setDataVisible(true);
    };

    const handleGetData = async () => {
        await axios.get(`https://192.168.0.100:1500/api/v1/${url}}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    };

    const onItemClick = el => {
        setTimeout(() => setShowAnim(false)); // Using timeout to fix weird CSSTransition bug
        onChange(el);
    };

    const renderItems = () => {
        return data.map(el => (
            <span key={el._id} className="aui-autocomplete-item" onClick={() => onItemClick(el)}>
                {template(el) || <span>{el}</span>}
            </span>
        ));
    };

    const inputCls = ['aui-input'];
    const itemsCls = ['aui-autocomplete-overlay'];
    if (size) inputCls.push(`aui-input-${size}`);
    if (isDataVisible && data.length) itemsCls.push('aui-autocomplete__items--opened');

    const overlayStyles = { left: x, top: y + 8, position: strategy, width: refs.reference.current ? refs.reference.current.clientWidth : 'unset' };
    const overlayWrapper = (
        <div className="aui-autocomplete-wrapper" ref={floating} style={overlayStyles}>
            <CSSTransition in={showAnim} timeout={300} onExited={() => setDataVisible(false)} classNames="aui-autocomplete-overlay">
                <div className={itemsCls.join(' ')}>{renderItems()}</div>
            </CSSTransition>
        </div>
    );

    return (
        <span ref={reference} className="aui-input-wrapper aui-autocomplete" style={style}>
            <input
                id={name || id}
                className={inputCls.join(' ')}
                type="text"
                placeholder={placeholder}
                value={value}
                onClick={!isDataVisible ? onInputClick : null}
                onChange={e => onChange(e.target.value)}
            />
            {isDataVisible && createPortal(overlayWrapper, document.body)}
        </span>
    );
};

AutoComplete.defaultProps = {
    size: 'normal',
    useMinLength: false
};

AutoComplete.propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    useMinLength: PropTypes.bool,
    url: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default AutoComplete;
