import {
  configureStore, createSlice
} from "@reduxjs/toolkit";



const initialState = {
  searchInput: {},
};
const searchSlice = createSlice({
  name: "search hotels",
  initialState,
  reducers: {
    getSearchInput(state, action) {
      state.searchInput = action.payload;
    }
  }
})

const store = configureStore({
  reducer: {
    searchInput: searchSlice.reducer
  }
});

export const searchHotelsActions = searchSlice.actions;

export default store;