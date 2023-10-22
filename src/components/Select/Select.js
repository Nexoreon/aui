import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { offset, shift, useFloating } from '@floating-ui/react-dom';
import { CSSTransition } from 'react-transition-group';
import { SelectContext } from '../AUIContext';
import { useOutsideAlerter } from '../../hooks/hooks';
import Option from './Option';

const Select = ({ id, className, size, type, title, placeholder, value, initialValue, useChips, disabled, style, onChange, children }) => {
    const [innerValue, setInnerValue] = useState(initialValue || '');
    const [isOpened, setOpened] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const { refs, floatingStyles } = useFloating({ middleware: [shift(), offset(8)] });
    useOutsideAlerter([refs.floating, refs.reference], isOpened, setShowAnim);

    useEffect(() => {
        if (!innerValue && !initialValue && value) setInnerValue(value);
        if (!innerValue && React.Children.toArray(children).length !== 0) {
            const selectedOption = React.Children.toArray(children).find(child => child.props && child.props.value === value);
            if (selectedOption) setInnerValue(selectedOption.props.children);
        }
    }, [value]);

    useEffect(() => {
        if (isOpened) setShowAnim(true);
    }, [isOpened]);

    const onSelectClick = () => {
        if (isOpened) return setShowAnim(false);
        setOpened(true);
    };

    const handleItemChange = (value, children) => {
        setTimeout(() => setShowAnim(false)); // Using timeout to fix weird CSSTransition bug
        onChange(value, children);
    };

    const providerValue = useMemo(() => ({ handleItemChange, setInnerValue, selectValue: value }), [value, onChange]);
    const overlayWrapper = (
        <div
            ref={refs.setFloating}
            className="aui-select-wrapper"
            style={{ ...floatingStyles, width: refs.reference.current ? refs.reference.current.clientWidth : 'unset' }}
        >
            <CSSTransition in={showAnim} timeout={300} onExited={() => setOpened(false)} classNames="aui-select-overlay">
                <div className="aui-select-overlay">{children}</div>
            </CSSTransition>
        </div>
    );

    const selectCls = ['aui-select', `aui-select-${size}`, `aui-select-type-${type}`];
    if (className) selectCls.push(className);
    if (isOpened) selectCls.push('aui-select--opened');
    if (value || value === 0) selectCls.push('aui-select--selected');
    if (disabled) selectCls.push('aui-select--disabled');
    if (useChips) selectCls.push('aui-select-chips');

    return (
        <SelectContext.Provider value={providerValue}>
            <div ref={refs.setReference} id={id} title={title} className={selectCls.join(' ')} style={style}>
                {!useChips ? (
                    <>
                        <div className="aui-select__selector" onClick={!disabled ? onSelectClick : null}>
                            <div className="aui-select__placeholder">
                                {/* <span>{value || innerValue ? useValue : placeholder}</span> */}
                                <span>{value || innerValue ? innerValue : placeholder}</span>
                            </div>
                            <div className="aui-select__arrow">
                                <i className="far fa-chevron-down" />
                            </div>
                        </div>
                        {isOpened && createPortal(overlayWrapper, document.body)}
                    </>
                ) : (
                    <div className="aui-select__chips">{children}</div>
                )}
            </div>
        </SelectContext.Provider>
    );
};

Select.defaultProps = {
    get: 'name',
    size: 'normal',
    type: 'normal',
    useChips: false
};

Select.propTypes = {
    get: PropTypes.oneOf(['id', 'name']),
    size: PropTypes.string,
    type: PropTypes.oneOf(['normal', 'transparent']),
    onChange: PropTypes.func.isRequired,
    useChips: PropTypes.bool
};

Select.Option = Option;

export default Select;
