import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR } from '../actions/newsAction'

const initialState = {
  news: [],
  isFetching: false,
  error: null
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
        news: action.payload.news
      }

    case FETCH_NEWS_ERROR:
      return {
        ...state,
        isFetching: false,
        // error: action.payload.error
      }

    default:
      return state
  }
}

export default news