import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { getContacts, getFilter, removeContact } from 'Redux/contactSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const findContacts = filteredContacts;
  return (
    <ul>
      {findContacts.map(({ id, phone, name }) => {
        return (
          <li className={css.item} key={id}>
            {name}: {phone}
            <button
              className={css.button}
              type="button"
              onClick={() => dispatch(removeContact(id))}
            >
              ❌
            </button>
          </li>
        );
      })}
    </ul>
  );
};
