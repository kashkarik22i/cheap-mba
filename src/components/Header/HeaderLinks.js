/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Explore from "@material-ui/icons/Explore";
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink}
          color="transparent"
          onClick={e => e.preventDefault()}
        >
          <Explore className={classes.icons} /> Browse
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink}
          color="transparent"
          component={Link}
          to="/profile"
        >
          <AccountCircle className={classes.icons} /> Profile
              </Button>
      </ListItem>
    </List>
  );
}
