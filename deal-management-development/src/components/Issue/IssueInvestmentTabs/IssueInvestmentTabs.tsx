import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ConfirmedInvestmetsTab from "./ConfirmedInvestmetsTab";
import NonConfirmedInvestmetsTab from "./NonConfirmedInvestmetsTab";
import TrustDeedDetailsTab from "./TrustDeedDetailsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trustdeed-tab-panel-${index}`}
      aria-labelledby={`trustdeed-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `trustdeed-tab-${index}`,
    "aria-controls": `trustdeed-tab-panel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function IssueInvestmentTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Confirmed investments" {...a11yProps(0)} />
          <Tab label="Quotations" {...a11yProps(1)} />
          <Tab label="Trust deed details" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ConfirmedInvestmetsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NonConfirmedInvestmetsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TrustDeedDetailsTab />
      </TabPanel>
    </div>
  );
}
