import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';
import { ThreeDots } from 'react-loader-spinner';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        paddingLeft: '40px',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ThreeDots
        height="50"
        width="50"
        radius="8"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ position: 'absolute', left: '120px' }}
        wrapperClassName=""
        visible={isLoading && !error}
      />
      <ContactList />
    </div>
  );
};

export default App;
