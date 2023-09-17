import css from './ContactForm.module.css';

import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'Redux/contactSlice';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обов'язкове поле")
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄ']+(([' -][a-zA-Zа-яА-ЯіІїЇєЄ' ])?[a-zA-Zа-яА-ЯіІїЇєЄ']*)*$/,
      'Неправильний формат імені'
    )
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄ\s']+(([' -][a-zA-Zа-яА-ЯіІїЇєЄ\s']*)?[a-zA-Zа-яА-ЯіІїЇєЄ\s']*)*$/,
      'Invalid name format'
    ),
  phone: Yup.string()
    .required('Phone is required')
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Invalid phone number'
    ),
});

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    console.log('handleSubmit');
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      phone,
    };
    const isContactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.phone === phone
    );
    if (isContactExists) {
      alert("Контакт з таким ім'ям або номером телефону вже існує.");
    } else {
      dispatch(addContact(newContact));
      setName('');
      setPhone('');
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ name: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              name="name"
              placeholder="Rosie Simpson"
            />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label className={css.label} htmlFor="phone">
              Phone
            </label>
            <Field
              className={css.field}
              type="text"
              id="phone"
              value={phone}
              name="phone"
              onChange={handleChange}
              placeholder="459-12-56"
            />
            <ErrorMessage name="phone" component="div" />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
