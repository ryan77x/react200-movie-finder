const defaultState = {
    userInput: '',
    movieData: {},
    notFound: null
};

export default function searchReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_SEARCH_INPUT': {
      return {
        ...state,
        userInput: payload.input
      };
    }

    case 'GET_MOVIE_FULFILLED': {
      return {
        ...state,
        movieData: payload.data,
        notFound: payload.notFound
      };  
    }

    default: {
      return state;
    }
  }
}
