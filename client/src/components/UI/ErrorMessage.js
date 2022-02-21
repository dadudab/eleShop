import classes from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
  return (
    <h2 className={`${classes.message} ${props.className}`}>
      {props.children}
    </h2>
  );
};

export default ErrorMessage;
