import classes from './Loading.module.css';

const Loading = () => {
  // return <h2 className={classes.loading}>Loading...</h2>;
  return (
    <div className={classes['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
