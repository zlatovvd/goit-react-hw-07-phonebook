import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactsInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    filterContactsAction: {
      reducer(state, { payload }) {
        state.filter = payload;
      },
    },
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.contacts.isLoading = true;
    },
    [fetchContacts.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = payload;
    },
    [fetchContacts.rejected](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
    [addContact.pending](state) {
      state.contacts.isLoading = true;
    },
    [addContact.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = [payload, ...state.contacts.items];
    },
    [addContact.rejected](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
    [deleteContact.pending](state) {
      state.contacts.isLoading = true;
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== payload.id
      );
    },
    [deleteContact.rejected](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
  },
});

export const { filterContactsAction } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
