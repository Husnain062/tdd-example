import React, {useState, useEffect} from 'react';
import styles from '../styles.module.css';

export const ContactModal = ({submit}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [isValid, setIsValid] = useState('');

  useEffect(() => {
    setNameError('');
    setPhoneError('');
    setEmailError('');

    let _valid = () => {
      if (!name) {
        setNameError('Name is required');
        return false;
      } else if (!phone || !/^[0-9]{3}-[0-9]{3}-[0-9]{3}/.test(phone)) {
        setPhoneError('Phone is improperly formatted');
        return false;
      } else if (!email || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
        setEmailError('Email is not valid');
        return false;
      }
      return true;
    };

    setIsValid(_valid());
  }, [name, email, phone]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      submit();
    } else {
    }
  };

  return (
    <div className={styles.main}>
      <form data-testid='contact-modal-form' onSubmit={handleSubmit}>
        <div>
          <input required placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
          {!!nameError && (
            <div data-testid='error' className={styles.error}>
              {nameError}
            </div>
          )}
        </div>

        <div>
          <input required placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
          {!!phoneError && (
            <div data-testid='error' className={styles.error}>
              {phoneError}
            </div>
          )}
        </div>

        <div>
          <input required placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} />
          {!!emailError && (
            <div data-testid='error' className={styles.error}>
              {emailError}
            </div>
          )}
        </div>

        <button disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
};
