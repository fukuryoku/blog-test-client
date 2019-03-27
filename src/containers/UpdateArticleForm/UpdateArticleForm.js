import React, { Component } from "react";
import { connect } from "react-redux";
import { updateArticle } from "../../store/actions/articles";
import { withStyles } from '@material-ui/core/styles';
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

    async componentDidMount(){
      let articleToUpdate = await this.props.articles.filter(article=>article._id === this.props.match.params.articleId)
      this.setState({
        image:articleToUpdate[0].image, 
        category:articleToUpdate[0].category, 
        title:articleToUpdate[0].title, 
        description:articleToUpdate[0].description
        })
    }
  

  

  handleUpdateArticle = event => {
    event.preventDefault();
    this.props.updateArticle(this.props.currentUser.user.id, this.props.match.params.articleId, this.state.image, this.state.category, this.state.title, this.state.description);
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
        <form className={styles.container} onSubmit={this.handleUpdateArticle} noValidate autoComplete="off">
        
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

        <Button color="primary" className={styles.button} onClick={this.handleUpdateArticle}>
          Edit
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
    currentUser: state.currentUser,
    articles: state.articles
  };
}

export default connect(mapStateToProps, {updateArticle})(
  withStyles(styles)(ArticleForm)
);




