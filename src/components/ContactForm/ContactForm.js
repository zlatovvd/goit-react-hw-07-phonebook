import css from './ContactForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onSubmit = ({ name, phone }) => {
    let isSubmit = false;
    if (
      !contacts.some(value =>
        value.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      const contact = {
        name,
        phone,
      };
      dispatch(addContact(contact));
      isSubmit = true;
    } else {
      alert(`${name} is already in contacts.`);
    }
    return isSubmit;
  };

  const handleChange = event => {
    const { name: inputName, value } = event.currentTarget;

    switch (inputName) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (onSubmit({ name, phone })) {
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.phoneForm} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
