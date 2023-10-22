import React, { useEffect } from 'react';
import { useSelectContent } from '../AUIContext';

const Item = ({ value, children }) => {
    const { handleItemChange, innerValue, setInnerValue, selectValue } = useSelectContent();
    const itemCls = ['aui-select-item'];
    const isSelected = value === selectValue || children === selectValue;
    if (isSelected) itemCls.push('aui-select-item--selected');
    // console.log(selectValue === value && innerValue !== value)
    // console.log(innerValue)

    // useEffect(() => {
    //     if (!innerValue && value === selectValue) {
    //         console.log('test')
    //         setInnerValue(children);
    //     }
    // }, []);

    const onItemClick = () => {
        handleItemChange(value, children); // RETURN children IF ANOMALY BEHAVIOR FOUND!
        setInnerValue(children);
    };

    return (
        <div className={itemCls.join(' ')} onClick={onItemClick}>
            <span>{children}</span>
        </div>
    );
};

export default Item;
