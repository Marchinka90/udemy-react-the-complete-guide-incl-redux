import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {
    counter: 0, 
    showCounter: true
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;  // The toolkit is creating the new object snapshot
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        decrement(state) {
            state.counter--;
        },
        toogle(state) {
            state.showCounter = !state.showCounter
        },
    }
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;