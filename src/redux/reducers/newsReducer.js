import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR, PAGE_CHANGED, SEARCH_CHANGED } from '../actions/newsAction'

const initialState = {
  news: [],
  page:1,
  count:0,
  pageSize:10,
  isFetching: false,
  error: null,
  search:""
}

function news (state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        news: action.payload.news,
        count:action.payload.count
      }

    case FETCH_NEWS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }
    
    case PAGE_CHANGED:
      return{
        ...state,
        page: action.payload.page
      }

    case SEARCH_CHANGED:
      return {
        ...state,
        
          search:action.payload.news.search
        
      }

    default:
      return state
  }
}

export default news