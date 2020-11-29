import React from "react";
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

function createData(id, name, email, date, message) {
    return { id, name, email, date, message };
}

const axios = require('axios')

class AdminPage extends React.Component {
    constructor() {
        super();
        this.state = { rows: [] };
    }

    callApi = async () => {
        try {
          return await axios.get('/api/messages');
        } catch (error) {
          console.error(error);
          return {"results": []}
        }
    };

    componentDidMount() {
        this.callApi()
          .then(res => {
              console.log(res);
              this.setState({ rows: res.data.results.map((row) =>
                createData(row.id, row.name, row.email, row.date, row.message)) });
          });
    }
    
    render() {
        const { classes } = this.props;
        return (
        <div>
            <Header
                brand="Cheap MBA"
                color="transparent"
                routes={dashboardRoutes}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
            <Parallax filter image={require("assets/img/bg-main.jpg")}>
                <div className={classes.container}>
                    <h1 className={classes.title}>You are the admin now</h1>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Message</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </div>
    );
}
    
}

AdminPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);