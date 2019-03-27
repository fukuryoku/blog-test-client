import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
    },
  });
  
class AuthForm extends Component {

    state = {
      username: "",
      password: "",
    }
    
  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push('/')

      })
      .catch(() => {
        return;
      });
  };


  render() {

    this.props.history.listen(() => {
      this.props.removeError();
    });

    return (

<form className={styles.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

        <h2>{this.props.heading}</h2>

        {this.props.errors.message ? <h3>{this.props.errors.message}</h3>:null}

        <TextField
          id="username"
          label="username"
          className={styles.textField}
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
          margin="dense"
        />

        <TextField
          id="password"
          label="password"
          className={styles.textField}
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          margin="dense"
        />

        <Button color="primary" className={styles.button} onClick={this.handleSubmit}>
          {this.props.buttonText}
        </Button>

        </form>
    );
  }
}


export default AuthForm;
