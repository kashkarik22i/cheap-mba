import React from "react";
import PropTypes from 'prop-types'

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const axios = require('axios')

class WorkSection extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      message: ''
    };
  }
  callApi = async () => {
    try {
      const response = await axios.post('/api/messages', {
        "email": this.state.email,
        "name": this.state.name,
        "message": this.state.message
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const { classes } = this.props;
    return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            We are open to suggestions and your contributions. Please,
            contact us here!
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (event) => { this.setState({name: event.target.value}) },
                    value: this.state.name
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (event) => { this.setState({email: event.target.value}) },
                    value: this.state.email
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 3,
                  onChange: (event) => { this.setState({message: event.target.value}) },
                  value: this.state.message
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  color="primary"
                  onClick={() => { this.callApi(); this.setState({message: '', email: '', name: ''}) }}>
                  Send Message
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );}
}

WorkSection.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(WorkSection);