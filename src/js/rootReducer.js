import { combineReducers } from 'redux';
import movieDetailReducer from './containers/MovieDetail/movieDetailReducer'
import movieSearchReducer from './containers/MovieSearch/movieSearchReducer'

const rootReducer = combineReducers({
    movieDetail: movieDetailReducer,
    movieSearch: movieSearchReducer,
});

export default rootReducer;
