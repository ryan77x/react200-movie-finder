const defaultState = {
    movieID: '',
    movieData: {},
    notFound: null
};

export default function movieDetailReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_MOVIE_DETAIL_FULFILLED': {
        return {
            movieID: payload.movieID,
            movieData: payload.data,
            notFound: payload.notFound
            };  
        }

    default: {
      return state;
    }
  }
}
