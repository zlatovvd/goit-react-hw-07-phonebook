import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { filterContactsAction } from 'redux/contactsSlice';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilter = event => {
    const { value } = event.currentTarget;
    dispatch(filterContactsAction(value));
  };

  return (
    <label className={css.filter}>
      Find contacts by name
      <input
        type="text"
        id="filter"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={filter}
        onChange={handleFilter}
      />
    </label>
  );
};

export default Filter;
