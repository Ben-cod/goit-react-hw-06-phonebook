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
          <li key={id}>
            <div className={css.contact_card}>
              <div className={css.contact_details}>
                <p className={css.contact_name}>{name}</p>
                <p className={css.contact_phone}>☎️ {phone}</p>
              </div>
              <button
                className={css.contact_button}
                type="button"
                onClick={() => dispatch(removeContact(id))}
              >
                ❌ Remove
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );

  //   return (
  //     <ul>
  //       {findContacts.map(({ id, phone, name }) => {
  //         return (
  //           <li className={css.item} key={id}>
  //             <p className={css.text}>
  //               {name}: ☎️{phone}
  //             </p>
  //             <button
  //               className={css.button}
  //               type="button"
  //               onClick={() => dispatch(removeContact(id))}
  //             >
  //               ❌
  //             </button>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
};
