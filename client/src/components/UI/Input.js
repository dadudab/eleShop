import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.inputWrapper}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type || 'text'}
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
        className={`${classes.input} ${
          props.isInvalid ? classes.invalidInput : ''
        } ${props.className}`}
        id={props.name}
        placeholder={props.placeholder}
      />
      {props.isInvalid && <small>{props.errorMessage}</small>}
    </div>
  );
};

export default Input;
