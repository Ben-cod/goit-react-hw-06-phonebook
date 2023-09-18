import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'Redux/contactSlice';

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
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, phone } = values;

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
      toast.warning('Контакт з таким імям або номером телефону вже існує.');
    } else {
      toast.success('Операція завершилася успішно');
      dispatch(addContact(newContact));
      resetForm();
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
          <div className={css.form_wrap}>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              id="name"
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
              name="phone"
              placeholder="459-12-56"
            />
            <ErrorMessage name="phone" component="div" />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};
