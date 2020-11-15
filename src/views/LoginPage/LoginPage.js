import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import GoogleLogin from 'react-google-login';
import { withRouter, useLocation } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg-main.jpg";

const useStyles = makeStyles(styles);

export default function LoginPageInner(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  let location = useLocation();

  const responseGoogle = (googleUser) => {
    console.log(JSON.stringify(googleUser));
    const idToken = googleUser.getAuthResponse().id_token;
    const googleEmail = googleUser.profileObj.email;
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('googleEmail', googleEmail);
    let { from } = location.state || { from: { pathname: "/" } };
    props.history.replace(from)
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login</h4>
                </CardHeader>
                <CardBody>
                  <GoogleLogin
                    clientId="771945361737-053silnpvd0gd6d756n2b3dvnr1su4jf.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export const LoginPage = withRouter(LoginPageInner)
