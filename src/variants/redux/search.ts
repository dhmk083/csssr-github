import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { selector } from "@dhmk/utils";
import { SearchResponse } from "types";
import searchService from "api/search";
import { RootState } from ".";

const initialState = {
  isLoading: false,
  data: undefined as SearchResponse | undefined,
  error: undefined as SerializedError | undefined,
};

const search = createAsyncThunk("search/search", (text: string) =>
  searchService(text)
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.data = undefined;
        state.error = undefined;
      })
      .addCase(search.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(search.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export const reducer = searchSlice.reducer;

const select = selector((s: RootState) => s.search);

const self = {
  select,
  search,
};

export default self;
