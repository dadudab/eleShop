import { useState } from 'react';
import { Link } from 'react-router-dom';

import useInput from '../../../../hooks/use-input';

import classes from './ProductForm.module.css';
import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';
import Select from 'react-select';
import PRODUCT_CATEGORIES from '../../../../assets/productCategories';

const ProductForm = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

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

  const categories = ['all'];
  selectedCategories.map((item) => {
    categories.push(item.value);
  });

  // checkboxes
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      border: '1px solid #ffffff79',
      color: state.isSelected ? 'red' : 'white',
      background: state.isFocused ? 'gray' : '#1f1f1f',
    }),
    control: () => ({
      background: '#1f1f1f',
      border: '1px solid #ffffff79',
      display: 'flex',
      borderRadius: '5px',
      color: 'red',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
    menu: () => ({
      margin: 0,
    }),
    input: () => ({
      color: 'white',
    }),
  };

  // form validation
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
        {!selectedFile && <small>You must upload image</small>}
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
      <p style={{ marginBottom: '0.3rem' }}>Categories</p>
      <Select
        isMulti
        options={PRODUCT_CATEGORIES}
        onChange={setSelectedCategories}
        value={selectedCategories}
        styles={customStyles}
      />
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
