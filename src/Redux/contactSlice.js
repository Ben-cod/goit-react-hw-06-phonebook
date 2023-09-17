import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    removeContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setStatusFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};
export const persistContactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
export const { addContact, removeContact, setStatusFilter } =
  contactSlice.actions;

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export default contactSlice.reducer;
