

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR'
export const PAGE_CHANGED = 'PAGE_CHANGED'
export const SEARCH_CHANGED = 'SEARCH_CHANGED'

export const pageChanged = (page) =>(dispatch) => {
  dispatch({ type: PAGE_CHANGED,
    payload:{
      page:page
    }
   })
}

export const searchNews = (searchWord) =>(dispatch) => {
  dispatch({ type: SEARCH_CHANGED,
    payload:{
      news:{
        search:searchWord
      }
      
    }
   })
}

export const fetchNews = (path) => (dispatch) => {
  let FetchUrl ="https://api.canillitapp.com"; 
  if(path>1){
    FetchUrl=`${FetchUrl}/news/category/${path}`;
  }
  else if(path==1){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const fulldate = `${year}-${month}-${day}`;
    FetchUrl=`${FetchUrl}/latest/${fulldate}`;
  }
  else{
    FetchUrl=FetchUrl+path;
  }
  
    dispatch({ type: FETCH_NEWS_REQUEST })
    fetch(FetchUrl)
      .then(res => res.json())
      .then(news => {
        dispatch({
          type: FETCH_NEWS_SUCCESS,
          payload: {
              news,
              count:news.length
          }
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: FETCH_NEWS_ERROR,
          payload: {
            error:true
          }
        })
      })
}

