import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});

export default store;

// CORE REDUX functionality with a few data; without the @reduxjs/toolkit
// import { createStore } from 'redux';

// const initialState = {
//     counter: 0, 
//     showCounter: true
// }
// // Allays return brant new snapshot of the object - because is created an entirely new object
// const counterReducer = (state = initialState, action) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'increase') {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'toogle') {
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter
//         }
//     }

//     return state;
// }

// const store = createStore(counterReducer);

// export default store;