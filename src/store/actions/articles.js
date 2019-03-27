import { LOAD_ARTICLES,  REMOVE_ARTICLE } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addError } from "./errors";


export const loadArticles = articles => ({
  type: LOAD_ARTICLES,
  articles
});

export const remove = id => ({
  type: REMOVE_ARTICLE,
  id
});
  

export const postNewArticle = (image, category, title, description) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/articles`, { image, category, title, description })
    .then(res => {})
    .catch((err)=>dispatch(addError(err.message)))
};

export const searchArticles = (title) => (dispatch, getState) => {
  return apiCall("post", `/api/articles/search`, {title})
  .then(res => {
    dispatch(loadArticles(res));
  })
  .catch(err => {
    dispatch(addError(err.message));
  });
};

export const fetchArticles = () => {
  return dispatch => {
    return apiCall("GET", "/api/articles")
      .then(res => {
        dispatch(loadArticles(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};




export const updateArticle = (user_id, article_id, image, category, title, description) =>(dispatch)=>{
  return apiCall('put', `/api/users/${user_id}/articles/${article_id}`, { image:image, category:category, title:title, description:description })
  .then(res=>{dispatch(loadArticles(res));})
  .catch((err)=>dispatch(addError(err.message)))
}



export const removeArticle = (user_id, article_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/articles/${article_id}`)
      .then(() => dispatch(remove(article_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

