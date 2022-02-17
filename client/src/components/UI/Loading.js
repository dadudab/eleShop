import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loadingWrapper}>
      <h2 className={classes.loading}>Loading...</h2>
    </div>
  );
};

export default Loading;
