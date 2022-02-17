import classes from './Message.module.css';

const Message = (props) => {
  return (
    <h2 className={`${classes.message} ${props.className}`}>
      {props.children}
    </h2>
  );
};

export default Message;
