import { Avatar, Icon, MenuItem, Tooltip, withStyles } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { logout as authLogout } from "lib/auth";
import Router from "next/router";
import React from "react";
import PopupMenu from "../Menu/PopupMenu";

const useStyles = makeStyles((theme) =>
  createStyles({
    topbar: {
      "& .topbar-hold": {
        backgroundColor: theme.palette.primary.main,
        height: "80px",
        "&.fixed": {
          boxShadow: theme.shadows[1],
          height: "80px",
        },
      },
    },
    menuItem: {
      marginBottom: 3,
      display: "flex",
      alignItems: "center",
      padding: "10px 10px",
      borderRadius: 4,
      "&:hover": {
        background: "#F3F6FF",
        border: "2px solid #DEE3F2",
      },
      border: "2px solid white",
    },
    icon: {
      color: "#92A3C4",
      marginRight: 10,
    },
    popupContainer: {
      marginLeft: 10,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    nameText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    avatar: {
      height: 45,
      width: 45,
    },
  })
);

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    fontWeight: "normal",
    borderRadius: "4px 0px 4px 4px",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

export default function ProfilePopup({ name = "User User" }) {
  const classes = useStyles({});

  const handleSignOut = () => {
    authLogout();
  };

  return (
    <PopupMenu
      menuButton={
        <div className={classes.popupContainer}>
          <LightTooltip title={name} placement="bottom-start">
            <Avatar
              className={classes.avatar}
              src={"https://www.w3schools.com/w3css/img_avatar3.png"}
            />
          </LightTooltip>
        </div>
      }
    >
      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          Router.push("/bookings");
        }}
      >
        <Icon className={classes.icon}> event </Icon>
        <span className="pl-4"> Bookings </span>
      </MenuItem>

      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          Router.push("/landlord/listings");
        }}
      >
        <Icon className={classes.icon}> house </Icon>
        <span className="pl-4"> My listings</span>
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          Router.push("/favorites");
        }}
      >
        <Icon className={classes.icon}> favorite </Icon>
        <span className="pl-4"> Favorites </span>
      </MenuItem>
      <MenuItem onClick={handleSignOut} className={classes.menuItem}>
        <Icon className={classes.icon}> power_settings_new </Icon>
        <span className="pl-4"> Logout </span>
      </MenuItem>
    </PopupMenu>
  );
}
