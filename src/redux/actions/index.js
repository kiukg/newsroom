
  
  export const loading = (bool) => ({
    type: "LOADING",
    isLoading: bool
  });
  
  export const success = (news) => ({
    type: "SUCCESS",
    news
  });
  
  export const search = (e) => ({
    type: "SEARCH",
    value: e.target.value
  });
  
  export const clearNews = (news) => ({
    type: "CLEAR_NEWS",
    news
  });