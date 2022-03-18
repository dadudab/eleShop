import classes from './Textarea.module.css';

const Textarea = (props) => {
  return (
    <div className={classes.textareaWrapper}>
      <label htmlFor={props.for}>{props.label}</label>
      <textarea
        className={props.isInvalid ? classes.textareaInvalid : ''}
        id={props.id}
        rows={props.rows || '6'}
        onChange={props.onChange}
        value={props.value}
      ></textarea>
      {props.isInvalid && <small>{props.errorMessage}</small>}
    </div>
  );
};

export default Textarea;
