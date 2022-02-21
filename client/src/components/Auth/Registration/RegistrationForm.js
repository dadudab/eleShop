import { Link } from 'react-router-dom';

import useInput from '../../../hooks/use-input';

import classes from './RegistrationForm.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const RegistrationForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
    clearValueInput: clearFirstNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
    clearValueInput: clearLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    clearValueInput: clearCityInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    valueInputBlurHandler: addressInputBlurHandler,
    clearValueInput: clearAddressInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueInputBlurHandler: postalCodeInputBlurHandler,
    clearValueInput: clearPostalCodeInput,
  } = useInput((value) => value.match(/[0-9]{2}-[0-9]{3}/));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    clearValueInput: clearEmailInput,
  } = useInput((value) => value.trim().includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    clearValueInput: clearPasswordInput,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredCityIsValid &&
    enteredAddressIsValid &&
    enteredPostalCodeIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    firstNameInputBlurHandler(true);
    lastNameInputBlurHandler(true);
    cityInputBlurHandler(true);
    addressInputBlurHandler(true);
    postalCodeInputBlurHandler(true);
    emailInputBlurHandler(true);
    passwordInputBlurHandler(true);

    if (!formIsValid) {
      console.log('form not valid');
      return;
    }

    const newUser = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      city: enteredCity,
      address: enteredAddress,
      postalCode: enteredPostalCode,
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onRegisterUser(newUser);

    clearFirstNameInput();
    clearLastNameInput();
    clearCityInput();
    clearAddressInput();
    clearPostalCodeInput();
    clearEmailInput();
    clearPasswordInput();
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="firstName"
        label="First Name"
        placeholder="first name"
        value={enteredFirstName}
        onChange={firstNameChangeHandler}
        onBlur={firstNameInputBlurHandler}
        isInvalid={firstNameInputHasError}
        errorMessage="First name must not be empty"
      />
      <Input
        name="lastName"
        label="Last Name"
        placeholder="last name"
        value={enteredLastName}
        onChange={lastNameChangeHandler}
        onBlur={lastNameInputBlurHandler}
        isInvalid={lastNameInputHasError}
        errorMessage="Last name must not be empty"
      />
      <Input
        name="city"
        label="City"
        placeholder="city"
        value={enteredCity}
        onChange={cityChangeHandler}
        onBlur={cityInputBlurHandler}
        isInvalid={cityInputHasError}
        errorMessage="City must not be empty"
      />
      <Input
        name="address"
        label="Address"
        placeholder="address"
        value={enteredAddress}
        onChange={addressChangeHandler}
        onBlur={addressInputBlurHandler}
        isInvalid={addressInputHasError}
        errorMessage="Address must not be empty"
      />
      <Input
        name="postalCode"
        label="Postal Code"
        placeholder="12-345"
        value={enteredPostalCode}
        onChange={postalCodeChangeHandler}
        onBlur={postalCodeInputBlurHandler}
        isInvalid={postalCodeInputHasError}
        errorMessage="Correct pattern: 12-345"
      />
      <Input
        name="email"
        label="Email address"
        placeholder="email"
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailInputBlurHandler}
        isInvalid={emailInputHasError}
        errorMessage="Email must contain @"
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordInputBlurHandler}
        isInvalid={passwordInputHasError}
        errorMessage="Password must not be empty"
      />
      <div className={classes.actions}>
        <Button type="submit">Register</Button>
        <Link to="/user/login">Already registered? Login here</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
