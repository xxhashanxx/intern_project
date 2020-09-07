import React from "react";
import { TabPanelProps } from "./ITabs";
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-cont"
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tab-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <div className="tab-wrap">{children}</div>}
    </div>
  );
};

export default TabPanel;
