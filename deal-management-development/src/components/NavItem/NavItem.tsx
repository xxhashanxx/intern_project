import { Button, Collapse, ListItem } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import { matchPath, NavLinkProps, NavLink } from "react-router-dom";
import { browserHistory } from "../../navigation/routerHistory";

const useStyles = makeStyles(() => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    "&.depth-0": {
      fontWeight: 500,
    },
  },
  icon: {
    // color: theme.palette.icon,

    display: "flex",
    alignItems: "center",
    marginRight: "1rem",
  },
  expandIcon: {
    marginLeft: "auto",
    height: 16,
    width: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
}));

interface NavItemProps {
  depth: number;
  href?: string;
  icon: React.FC<{ className: string }>;
  label: React.FC;
  title: string;
}
export function NavItem({
  title,
  href,
  depth,
  icon: Icon,
  label: Label,
}: NavItemProps) {
  const classes = useStyles();
  const style = calcStyle(depth);
  return (
    <ListItem
      className={clsx(classes.itemLeaf, "list-item")}
      disableGutters
      key={title}
    >
      <NavButton
        activeClassName="active"
        className={clsx(classes.buttonLeaf, `depth-${depth}`, "list-button")}
        exact
        style={style}
        to={href as string}
      >
        {Icon && <Icon className={classes.icon} />}
        {title}
        {Label && (
          <span className={classes.label}>
            <Label />
          </span>
        )}
      </NavButton>
    </ListItem>
  );
}

interface NavButtonProps extends NavLinkProps {
  className: string;
  style: React.CSSProperties;
  to: string;
}
function NavButton(props: React.PropsWithChildren<NavButtonProps>) {
  const NavBtn: any = Button;
  return <NavBtn component={NavLink} {...props} />;
}

export function NavList({
  title,
  href,
  depth,
  children,
  icon: Icon,
}: React.PropsWithChildren<Omit<NavItemProps, "label">>) {
  const classes = useStyles();
  const [open, setOpen] = useState(
    () =>
      !!matchPath(browserHistory.location.pathname, {
        path: href,
        exact: false,
      })
  );
  const handleToggle = () => {
    setOpen((prevOpen: boolean) => !prevOpen);
  };
  const style = calcStyle(depth);
  return (
    <ListItem
      className={clsx(classes.item, "collapse-item", open ? "is-open" : "")}
      disableGutters
      key={title}
    >
      <Button
        className={clsx(classes.button, "list-button")}
        onClick={handleToggle}
        style={style}
      >
        {Icon && <Icon className={classes.icon} />}
        {title}
        {open ? (
          <ExpandLessIcon className={classes.expandIcon} color="inherit" />
        ) : (
          <ExpandMoreIcon className={classes.expandIcon} color="inherit" />
        )}
      </Button>
      <Collapse in={open}>{children}</Collapse>
    </ListItem>
  );
}

function calcStyle(depth: number) {
  let paddingLeft = 16;
  if (depth > 0) {
    paddingLeft = 36 + 9 * depth;
  }
  const style = {
    paddingLeft,
  };
  return style;
}
