import { LOAD_ARTICLES, REMOVE_ARTICLE } from "../actionTypes";

  const article = (state = [], action) => {
    switch (action.type) {
      case LOAD_ARTICLES:
        return [...action.articles];
      case REMOVE_ARTICLE:
        return state.filter(article => article._id !== action.id);
      default:
        return state;
    }
  };
  
  export default article
