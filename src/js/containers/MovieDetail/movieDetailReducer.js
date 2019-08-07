// const defaultState = {
//   cityNameInput: '',
//   searchHistory: [],
//   weatherData: {},
//   notFound: null
// };

// export default function searchReducer(state = defaultState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case 'UPDATE_SEARCH_INPUT': {
//       return {
//         ...state,
//         cityNameInput: payload.input
//       };
//     }

//     case 'GET_WEATHER_FULFILLED': {
//       let dateTime = new Date();
//       let time = dateTime.toLocaleTimeString(('en-GB'));
//       let date = dateTime.toLocaleDateString();

//       return {
//         cityNameInput: payload.input,
//         searchHistory: [{id: state.searchHistory.length + 1, cityName: payload.input, dateTime: date + ' ' + time}, ...state.searchHistory],
//         weatherData: payload.data,
//         notFound: payload.notFound
//       };  
//     }

//     default: {
//       return state;
//     }
//   }
// }
