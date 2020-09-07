/* eslint-disable react/no-multi-comp */
import { List, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
// import navConfig from "./navConfig";
import "./SideMenu.scss";
import { NavList, NavItem } from "../../../components/NavItem/NavItem";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ContactsIcon from "@material-ui/icons/Contacts";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ViewConfigIcon from "@material-ui/icons/ViewComfy";
import useGetSideMenu from "./useGetSideMenu";
const useStyles = makeStyles(() => ({
  root: {
    height: "calc(100vh - 65px)",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
}));

function renderNavItems({
  // eslint-disable-next-line react/prop-types
  items,
  subheader,
  key,
}: any) {
  return (
    <List key={key}>
      {subheader && (
        <ListSubheader className="list-subheader typo-color" disableSticky>
          {subheader}
        </ListSubheader>
      )}

      {items.reduce(
        (acc: any, item: any) => reduceChildRoutes({ acc, item }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, item, depth = 0 }: any) {
  if (item.items) {
    acc.push(
      <NavList
        depth={depth}
        icon={item.icon}
        key={item.title}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.items,
        })}
      </NavList>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={item.title}
        label={item.label}
        title={item.title}
      />
    );
  }

  return acc;
}

interface SideMenuProps {
  className?: string;
}
function SideMenu({ className }: SideMenuProps) {
  const classes = useStyles();

  const navConfig = useGetSideMenu();
  return (
    <div className={clsx(classes.root, className)}>
      <nav className="navigation">
        {navConfig.map((list) =>
          renderNavItems({
            items: list.items,
            subheader: list.subheader,
            key: list.subheader,
          })
        )}
      </nav>
    </div>
  );
}

export default React.memo(SideMenu);
