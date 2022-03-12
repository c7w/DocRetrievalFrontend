import {
    configureStore,
    createSlice
} from '@reduxjs/toolkit';

const SearchResultSlice = createSlice({
    name: 'SearchResult',
    initialState: {
        query: "",
        loading: false,
        result: "",
        result_qa: "",
    },
    reducers: {
        updateQuery: (state, action) => { state.query = action.payload; },
        updateLoading: (state, action) => { state.loading = action.payload; },
        updateResult: (state, action) => { state.result = action.payload; },
        updateQAResult: (state, action) => { state.result_qa = action.payload; },
    }
});

const SystemStateSlice = createSlice({
    name: 'SystemState',
    initialState: {
        current: "none"
    },
    reducers: {
        updateCurrent: (state, action) => { state.current = action.payload; },
    }
});

export const { updateQuery, updateResult, updateLoading, updateQAResult } = SearchResultSlice.actions;
export const { updateCurrent } = SystemStateSlice.actions;

export const getQuery = (state) => { return state.searchResult.query; }
export const getLoading = (state) => { return state.searchResult.loading; }
export const getResult = (state) => { return state.searchResult.result; }
export const getQAResult = (state) => { return state.searchResult.result_qa; }
export const getCurrent = (state) => {return state.systemState.current; }

export default configureStore({
    reducer: {
        searchResult: SearchResultSlice.reducer,
        systemState: SystemStateSlice.reducer,
    },
})