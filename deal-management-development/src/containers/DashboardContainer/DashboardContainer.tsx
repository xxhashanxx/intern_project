import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import "./DashboardContainer.scss";
import SideMenu from "./SideMenu/SideMenu";
import { useHistory } from "react-router-dom";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: "128px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
export interface DashboardContainerProps {
  children: JSX.Element;
}

const DashboardContainer = (props: DashboardContainerProps) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isMenu, setMenuOpen] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("userDataObj");
    history.push("/login");

    setAnchorEl(null);
  };
  return (
    <>
      <div className="dashboard-cont">
        <div className={`dashboard-wrap ${isMenu ? "menu-active" : ""}`}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="inherit"
                onClick={() => setMenuOpen(!isMenu)}
                className="mr-3"
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                Mpower Capital
              </Typography>

              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
                style={{ marginLeft: "auto" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  //src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push("/profile");
                  }}
                  style={{ minWidth: 150 }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          {/* <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper),
            }}
            open={false}
          >
            <div className={classes.toolbarIcon}>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <SideMenu />
          </Drawer> */}
          <div className="side-menu">
            <SideMenu />
          </div>
          <main className="dashboard-content" id="dashboard-content">
            <div className="dashboard-box">{props.children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
