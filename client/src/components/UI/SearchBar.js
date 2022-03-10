import classes from './SearchBar.module.css';

const SearchBar = (props) => {
  return (
    <div className={classes.searchContainer}>
      <label className={classes.searchLabel} htmlFor={props.for}>
        Search:
      </label>
      <input
        className={classes.searchInput}
        type={props.type || 'text'}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default SearchBar;
