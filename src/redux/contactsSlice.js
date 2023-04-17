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
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, state => {
      state.contacts.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = payload;
    });
    builder.addCase(fetchContacts.rejected, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    });
    builder.addCase(addContact.pending, state => {
      state.contacts.isLoading = true;
    });
    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = [payload, ...state.contacts.items];
    });
    builder.addCase(addContact.rejected, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    });
    builder.addCase(deleteContact.pending, state => {
      state.contacts.isLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== payload.id
      );
    });
    builder.addCase(deleteContact.rejected, (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    });
  },
});

export const { filterContactsAction } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
