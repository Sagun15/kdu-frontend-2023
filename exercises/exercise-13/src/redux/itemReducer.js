import {createSlice} from "@reduxjs/toolkit";

const initState = {
  items: [],
};

const itemSlice = createSlice({
    name: 'items',
    initialState: initState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name);
        },
        updateItem: (state, action) => {
            state.items = state.items.map(item => {
                if(item.name === action.payload.oldName) {
                    item.name =action.payload.newName;
                }
                return item;
            })
        },
        removeCompletedItems: (state, action) => {
            state.items = state.items.filter(item =>!item.isClicked);
            console.log(state.items);
        },
        isComplted: (state, action) => {
            state.items = state.items.map(item => {
                if(item.name === action.payload) {
                    item.isClicked =!item.isClicked;
                }
                return item;
            })
        }
    }
})

export const {addItem , removeItem, isComplted, updateItem, removeCompletedItems } = itemSlice.actions;
export default itemSlice.reducer;