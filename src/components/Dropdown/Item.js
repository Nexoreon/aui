import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDropdownContext } from '../AUIContext';

const Item = ({ id, className, title, icon, to, disabled, onClick, children }) => {
    const { onItemClick } = useDropdownContext();
    const el = to ? <Link to={to}>{children}</Link> : <span>{children}</span>;
    const cls = ['aui-dropdown-item'];
    if (className) cls.push(className);
    if (disabled) cls.push('aui-dropdown-item--disabled');

    return (
        <div title={title} id={id} className={cls.join(' ')} onClick={() => onItemClick(onClick)}>
            {icon && <i className={`${icon.type ? icon.type : 'far'} ${icon.name ? icon.name : icon}`} />}
            {el}
        </div>
    );
};

Item.propTypes = {
    children: propTypes.string.isRequired
};

export default Item;
