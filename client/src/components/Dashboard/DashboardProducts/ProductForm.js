import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useInput from '../../../hooks/use-input';

import classes from './ProductForm.module.css';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import Button from '../../UI/Button';

const ALL_CATEGORIES = [
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
  {
    id: 4,
    value: 'Headphones',
  },
  {
    id: 5,
    value: 'PC',
  },
  {
    id: 6,
    value: 'Phones',
  },
];

const ProductForm = (props) => {
  const [checkedState, setCheckedState] = useState(
    new Array(ALL_CATEGORIES.length).fill(false)
  );
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const history = useHistory();

  // use input
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    valueInputBlurHandler: priceInputBlurHandler,
  } = useInput((value) => value > 0);

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangeHandler,
    valueInputBlurHandler: descInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  // file upload
  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(event.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
    return;
  };

  const noUploadFileError = !selectedFile;

  // checkboxes
  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      position === index ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const selectedCategories = [];
    updatedCheckedState.map((item, index) => {
      if (item === true) {
        return selectedCategories.push(ALL_CATEGORIES[index].value);
      }
      return false;
    });
    selectedCategories.push('All');
    setCategories(selectedCategories);
  };

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredPriceIsValid &&
    enteredDescIsValid &&
    selectedFile
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    nameInputBlurHandler(true);
    priceInputBlurHandler(true);
    descInputBlurHandler(true);

    if (!formIsValid) {
      return;
    }

    const product = {
      name: enteredName,
      price: enteredPrice,
      description: enteredDesc,
      categories: categories,
      image: previewSource,
    };

    props.onAddProduct(product);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.upload}>
        <label htmlFor="productImg">Upload image</label>
        <input
          id="productImg"
          type="file"
          accept="image/png, image/jpeg"
          onChange={imageChangeHandler}
          value={selectedFile}
        />
        {noUploadFileError && <small>You must upload image</small>}
        {selectedFile && <img src={previewSource} alt={enteredName} />}
      </div>
      <Input
        name="name"
        id="name"
        placeholder="name"
        label="Name"
        onChange={nameChangeHandler}
        value={enteredName}
        onBlur={nameInputBlurHandler}
        isInvalid={nameInputHasError}
        errorMessage="Name must not be empty"
      />
      <Input
        type="number"
        name="price"
        id="price"
        placeholder="price"
        label="Price"
        onChange={priceChangeHandler}
        value={enteredPrice}
        onBlur={priceInputBlurHandler}
        isInvalid={priceInputHasError}
        errorMessage="Price must be greater than 0"
      />
      <Textarea
        for="desc"
        label="Product description"
        id="desc"
        onChange={descChangeHandler}
        value={enteredDesc}
        onBlur={descInputBlurHandler}
        isInvalid={descInputHasError}
        errorMessage="Description must not be empty"
      />
      <p>Categories</p>
      <ul className={classes.checkboxes}>
        {ALL_CATEGORIES.map((category, index) => {
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
      <div className={classes.actions}>
        <Link to="/dashboard">
          <Button>Back</Button>
        </Link>
        <Button type="submit" className={classes.addBtn}>
          Add product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
