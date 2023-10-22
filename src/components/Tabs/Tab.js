import React, { useEffect, useRef } from 'react';
import { useTabsContext } from '../AUIContext';

const Tab = ({ tab, label, disabled, setTabPosition }) => {
    const { onTabChange, activeTab } = useTabsContext();
    const tabCls = ['aui-tabs-tab'];
    if (activeTab === tab) tabCls.push('aui-tabs-tab--active');
    if (disabled) tabCls.push('aui-tabs-tab--disabled');

    const tabRef = useRef();
    useEffect(() => {
        const { offsetWidth, offsetHeight, offsetLeft } = tabRef.current;
        const pos = { width: offsetWidth, height: offsetHeight, left: offsetLeft };
        setTabPosition(tabs => ({ ...tabs, [tab]: pos }));
    }, []);

    return (
        <div ref={tabRef} className={tabCls.join(' ')} onClick={!disabled ? () => onTabChange(tab) : null}>
            <span>{label}</span>
        </div>
    );
};

export default Tab;
