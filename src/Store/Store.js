import {
    configureStore,
    createSlice
} from '@reduxjs/toolkit';

const SearchResultSlice = createSlice({
    name: 'SearchResult',
    initialState: {
        query: "",
        loading: false,
        result: ""
    },
    reducers: {
        updateQuery: (state, action) => { state.query = action.payload; },
        updateLoading: (state, action) => { state.loading = action.payload; },
        updateResult: (state, action) => { state.result = action.payload; }
    }
});

export const { updateQuery, updateResult, updateLoading } = SearchResultSlice.actions;

export const getQuery = (state) => { return state.searchResult.query; }
export const getLoading = (state) => { return state.searchResult.loading; }
export const getResult = (state) => { return state.searchResult.result; }


export default configureStore({
    reducer: {
        searchResult: SearchResultSlice.reducer
    },
})