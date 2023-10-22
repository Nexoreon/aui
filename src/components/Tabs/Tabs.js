import React, { useState, useEffect, useMemo } from 'react';
import propTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabsContext } from '../AUIContext';

import Tab from './Tab';
import TabPane from './TabPane';

const Tabs = ({ id, className, type, active, onChange, children }) => {
    const [activeTab, setActiveTab] = useState();
    const [inkPos, setInkPos] = useState({ width: 0, left: 0 });
    const [tabsPosition, setTabsPosition] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const tabsCls = ['aui-tabs', `aui-tabs-type-${type}`];
    if (className) tabsCls.push(className);

    useEffect(() => {
        if (location.search && location.search.includes('tab')) return setActiveTab(location.search.split('=')[1]);
        setActiveTab(active);
    }, [location.search]);

    useEffect(() => {
        setInkPos(tabsPosition[activeTab]);
    }, [activeTab, tabsPosition]);

    const onTabChange = tab => {
        if (tab !== activeTab) navigate(`?tab=${tab}`);
        if (onChange) onChange(tab);
    };

    const renderTabList = () => {
        const list = children.map(({ props: { tab, label, disabled } }) => ({ tab, label, disabled })); // CHECK THIS
        return list.map(tab => <Tab key={tab.tab} setTabPosition={setTabsPosition} {...tab} />);
    };

    const providerValue = useMemo(() => ({ activeTab, onTabChange }), [activeTab, onTabChange]);
    return (
        <TabsContext.Provider value={providerValue}>
            <div id={id} className={tabsCls.join(' ')}>
                <div className="aui-tabs__list">
                    {renderTabList()}
                    {type !== 'chips' && <div className="aui-tabs-tab-ink" style={inkPos} />}
                </div>
                <div className="aui-tabs__panes">{children}</div>
            </div>
        </TabsContext.Provider>
    );
};

Tabs.defaultProps = {
    type: 'primary'
};

Tabs.propTypes = {
    type: propTypes.oneOf(['primary', 'chips']),
    active: propTypes.string.isRequired,
    children: propTypes.node.isRequired
};

Tabs.TabPane = TabPane;

export default Tabs;
