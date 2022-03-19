import classes from './DashboardCard.module.css';

const DashboardCard = (props) => {
  return (
    <div className={classes.dashboardCard}>
      <div className={classes.wrapper}>
        <h4>
          {props.name} {props.data}
        </h4>
      </div>
    </div>
  );
};

export default DashboardCard;
