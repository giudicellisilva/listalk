import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'categories', // nome do reducer
  initialState: [], // estado inicial
  reducers: {
    setArray(state, actions) {
      return state = actions.payload;
    }
  },
});

export const { setArray } = counterSlice.actions;
export default counterSlice.reducer;