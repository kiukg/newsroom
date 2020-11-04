

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR'

export const fetchNews = (path) => (dispatch) => {
  let FetchUrl ="https://api.canillitapp.com/"; 

  if(path>1){
    FetchUrl=`${FetchUrl}news/category/${path}`;
  }
  else{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const fulldate = `${year}-${month}-${day}`;
    FetchUrl=`${FetchUrl}latest/${fulldate}`;
  }

 
    dispatch({ type: FETCH_NEWS_REQUEST })
    fetch(FetchUrl)
      .then(res => res.json())
      .then(news => {
        dispatch({
          type: FETCH_NEWS_SUCCESS,
          payload: {
              news
          }
        })
      })
      .catch(error => {
        dispatch({
          type: FETCH_NEWS_ERROR,
          error: error.toString()
        })
      })
  
}