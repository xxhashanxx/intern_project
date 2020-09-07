import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabItem } from "../../TabContainer/ITabs";

function a11yProps(index: any) {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tab-${index}`,
  };
}
interface DashboardTabsProps {
  tabs: TabItem[];
  handleChange: any;
  value: any;
}
const DashboardTabs = (props: DashboardTabsProps) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        aria-label="Dashboard tabs"
      >
        {props.tabs.map((tab) => {
          return (
            <Tab
              key={tab.name}
              className="tab-item"
              label={tab.label}
              value={tab.name}
              {...a11yProps(tab.name)}
            />
          );
        })}
      </Tabs>
    </AppBar>
  );
};

export default DashboardTabs;
