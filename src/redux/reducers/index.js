import { combineReducers } from 'redux'
import news from './newsReducer'
import search from './searchReducer'

export default combineReducers({
    news,
    search
})