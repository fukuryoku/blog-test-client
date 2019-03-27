import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArticleCard from '../ArticleCard/ArticleCard';
import { removeArticle, fetchArticles, updateArticle, searchArticles } from "../../store/actions/articles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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

class ArticleList extends Component {

  state = {
    title: "",
  }


  componentDidMount() {
    this.props.fetchArticles();
  }
  handleSearch = event => {
    event.preventDefault();
    this.props.searchArticles(this.state.title);
    this.setState(
      { title: ""}
    );
  };


  render(){

  const { classes, articles, currentUser, removeArticle } = this.props;
  
  let articleList = articles.map((article, index)=>(
    <ArticleCard 
    key={article._id}
    articleId={article._id}
    image={article.image}
    category={article.category}
    title={article.title}
    description={article.description}
    username={article.user.username}
    date={article.createAt}
    isAdmin={currentUser.user.isAdmin}
    currentUserId={currentUser.user.id}
    isCorrectUser={currentUser.user.id === article.user._id}
    removeArticle={removeArticle.bind(this, article.user._id, article._id)}
    updateArticle={updateArticle.bind(this, article.user._id, article._id, article.image, article.category, article.title, article.description)}
    />
  ))
  
    return (
      <div className={classes.root}>
      <form className={styles.container} onSubmit={this.handleSearch} noValidate autoComplete="off">
        <TextField
          id="title"
          label="title"
          className={styles.textField}
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          margin="dense"
        />

         <Button color="primary" className={styles.button} onClick={this.handleSearch}>Search </Button>

        </form>

        <Grid container spacing={24}>
          {articleList}
        </Grid>
        
      </div>
    );
  }
  
}

ArticleList.propTypes = {
  classes: PropTypes.object.isRequired,
};




function mapStateToProps(state) {
  return {
    articles: state.articles,
    currentUser: state.currentUser
  };
}



export default connect(mapStateToProps, { removeArticle, fetchArticles, updateArticle, searchArticles })(
  withStyles(styles)(ArticleList)
);
