import classes from './RegistrationForm.module.css';
import Input from '../UI/Input';

const RegistrationForm = () => {
  return (
    <form>
      <Input name="firstName" label="First Name" placeholder="first name" />
      <Input name="lastName" label="Last Name" placeholder="last name" />
    </form>
  );
};

export default RegistrationForm;
