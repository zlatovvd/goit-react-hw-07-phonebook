import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = contactsId => {
    dispatch(deleteContact(contactsId));
  };

  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
