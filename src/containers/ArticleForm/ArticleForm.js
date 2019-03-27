import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewArticle } from "../../store/actions/articles";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link} from "react-router-dom";

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

class ArticleForm extends Component {
 
    state = {
      image:"", 
      category:"", 
      title:"", 
      description:""
    };

  

  handleNewArticle = event => {
    event.preventDefault();
    this.props.postNewArticle(this.state.image, this.state.category, this.state.title, this.state.description);
    this.setState(
      { image:"", 
      category:"", 
      title:"", 
      description:"" }
    );
    this.props.history.push("/");
  };

  render() {

    if(this.props.currentUser.isAuthenticated){
      return (
<>
        <form className={styles.container} onSubmit={this.handleNewArticle} noValidate autoComplete="off">
        
        {this.props.errors.message && (
          <h2>{this.props.errors.message}</h2>
        )}

        <TextField
          id="image"
          label="image"
          className={styles.textField}
          value={this.state.image}
          onChange={e => this.setState({ image: e.target.value })}
          margin="dense"
        />

        <TextField
          id="category"
          label="category"
          className={styles.textField}
          value={this.state.category}
          onChange={e => this.setState({ category: e.target.value })}
          margin="category"
        />


        <TextField
          id="title"
          label="title"
          className={styles.textField}
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          margin="dense"
        />


        <TextField
          id="desc"
          label="Description"
          className={styles.textField}
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          margin="dense"
        />

        <Button color="primary" className={styles.button} onClick={this.handleNewArticle}>
          Add
        </Button>
        </form>
      </>
      );
    } 
    else
    return <Link to="/signin">Log in first</Link>
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {postNewArticle})(
  withStyles(styles)(ArticleForm)
);




