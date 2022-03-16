import { useState } from 'react';

import classes from './Dropdown.module.css';

const Dropdown = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdownHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <article className={classes.dropdown}>
      <div className={classes.wrapper}>
        <h2 onClick={toggleDropdownHandler}>
          {props.title}
          <div
            className={isDropdownOpen ? classes.arrowDown : classes.arrowUp}
          ></div>
        </h2>
        {isDropdownOpen && props.content}
      </div>
    </article>
  );
};

export default Dropdown;
