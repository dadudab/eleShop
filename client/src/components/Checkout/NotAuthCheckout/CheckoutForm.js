import { Link } from 'react-router-dom';

import useInput from '../../../hooks/use-input';

import classes from './CheckoutForm.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const CheckoutForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    valueInputBlurHandler: addressInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueInputBlurHandler: postalCodeInputBlurHandler,
  } = useInput((value) => value.match(/[0-9]{2}-[0-9]{3}/));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
  } = useInput((value) => value.trim().includes('@'));

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredCityIsValid &&
    enteredAddressIsValid &&
    enteredPostalCodeIsValid &&
    enteredEmailIsValid
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

    if (!formIsValid) {
      console.log('form not valid');
      return;
    }

    const user = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      city: enteredCity,
      address: enteredAddress,
      postalCode: enteredPostalCode,
      email: enteredEmail,
    };

    console.log(user);
    props.onPaymentToggle();
  };

  return (
    <form onSubmit={submitHandler} className={classes.checkoutForm}>
      <h3>Shipping address</h3>
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
      <div className={classes.checkoutActions}>
        <div className={classes.buttonsContainer}>
          <Button type="submit" className={classes.payBtn}>
            Continue
          </Button>
          <Link to="/products">
            <Button className={classes.btn}>Cancel</Button>
          </Link>
        </div>
        <Link to="/user/register">Create account to get benefits</Link>
      </div>
    </form>
  );
};

export default CheckoutForm;
