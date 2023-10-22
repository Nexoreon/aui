import React from 'react';
import propTypes from 'prop-types';
import { useTabsContext } from '../AUIContext';

const TabPane = ({ tab, label, disabled, children }) => {
    const { activeTab } = useTabsContext();
    const tabPaneCls = ['aui-tabs-pane'];
    const isActive = activeTab === tab;
    if (isActive) tabPaneCls.push('aui-tabs-pane--active');

    return <div className={tabPaneCls.join(' ')}>{isActive && children}</div>;
};

TabPane.propTypes = {
    tab: propTypes.string.isRequired
};

export default TabPane;
