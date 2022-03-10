import { useState } from 'react';
import Input from '../../UI/Input';

const CATEGORIES = [
  {
    id: 1,
    value: 'Monitors',
  },
  {
    id: 2,
    value: 'Mouses',
  },
  {
    id: 3,
    value: 'Keyboards',
  },
];

const ProductForm = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(CATEGORIES.length).fill(false)
  );
  const [categories, setCategories] = useState([]);

  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      position === index ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const catArr = [];
    updatedCheckedState.map((item, index) => {
      if (item === true) {
        return catArr.push(CATEGORIES[index].value);
      }
    });
    console.log(catArr);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <Input name="name" id="name" placeholder="name" label="Name" />
      <Input
        type="number"
        name="price"
        id="price"
        placeholder="price"
        label="Price"
      />
      <p>Categories</p>
      <ul>
        {CATEGORIES.map((category, index) => {
          return (
            <li key={category.id}>
              <label htmlFor={category.value}>{category.value}</label>
              <input
                type="checkbox"
                id={category.value}
                onChange={() => checkboxChangeHandler(index)}
              />
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default ProductForm;
