import React from 'react';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { authUser } from "../../store/actions/auth";
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import AuthForm from '../../components/AuthForm/AuthForm';
import SimpleBottomNavigation from '../SimpleBottomNavigation/SimpleBottomNavigation';
import ArticleForm from '../ArticleForm/ArticleForm';
import UpdateArticleForm from '../UpdateArticleForm/UpdateArticleForm';
import ArticleList from '../ArticleList/ArticleList';
import withAuth from "../../hoc/withAuth";
import {removeError} from '../../store/actions/errors';



const MainWrapper = (props) => {
  const { authUser, errors, removeError, currentUser } = props;
  
    return(
        <>
        <ButtonAppBar currentUser={props.currentUser}/>
        <SimpleBottomNavigation currentUser={props.currentUser}/>
        
        <Switch>

            <Route
            exact
            path="/"
            render={props => <ArticleList currentUser={props.currentUser} {...props} />}
            />

          <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back."
                {...props}
              />
            );
          }}
        />
        
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up!"
                heading="Join Blog today."
                {...props}
              />
            );
          }}
        />

        <Route
          path="/users/:id/articles/new"
          component={withAuth(ArticleForm)}
        />

        <Route exact 
          path='/users/:id/articles/:articleId/edit' 
          component={withAuth(UpdateArticleForm)} />



        </Switch>
        
        </>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      errors: state.errors
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, { authUser, removeError })(MainWrapper)
  );
  