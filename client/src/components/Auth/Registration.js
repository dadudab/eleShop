import classes from './Registration.module.css';
import RegistrationForm from './RegistrationForm';

const Registration = () => {
  return (
    <section className={classes.registration}>
      <h2>Register here</h2>
      <RegistrationForm />
    </section>
  );
};

export default Registration;
