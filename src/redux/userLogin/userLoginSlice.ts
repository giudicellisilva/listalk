import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'userLogin', // nome do reducer
  initialState: "", // estado inicial
  reducers: {
    setUserLogin(state, actions) {
      return state = actions.payload;
    }
  },
});

export const { setUserLogin } = counterSlice.actions;
export default counterSlice.reducer;