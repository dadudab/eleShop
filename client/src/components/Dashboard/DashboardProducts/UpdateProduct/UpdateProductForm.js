import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import classes from './UpdateProductForm.module.css';
import Button from '../../../UI/Button';
import Select from 'react-select';

const UpdateProductForm = () => {
  const [product, setProduct] = useState({
    image: '',
    name: '',
    price: 0,
    description: '',
    categories: [],
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const { productId } = useParams();

  async function getProduct() {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Some error');
      }
      const data = await response.json();
      // console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  // on change
  const nameChangeHandler = (event) => {
    setProduct({ ...product, name: event.target.value });
  };

  const priceChangeHandler = (event) => {
    setProduct({ ...product, price: +event.target.value });
  };

  const descriptionChangeHandler = (event) => {
    setProduct({ ...product, description: event.target.value });
  };

  const imageChangeHandler = (event) => {
    const uploadImg = event.target.files[0];
    const reader = new FileReader();
    if (uploadImg && uploadImg.type.match('image.*')) {
      reader.readAsDataURL(uploadImg);
      reader.onloadend = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
    }
  };

  const isNewImage = !selectedImage.imageUrl;

  // select
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla asd', label: 'Vanilla asd' },
  ];

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

  // set inital categories
  const array = [];
  product.categories.map((item) => {
    if (item === 'all') {
      return;
    } else {
      const fullCategory = {
        value: item,
        label: item[0].toUpperCase() + item.substring(1),
      };
      array.push(fullCategory);
    }
  });
  const updatedCategories = ['all'];
  selectedCategories.map((item) => {
    updatedCategories.push(item.value);
  });

  useEffect(() => {
    getProduct();
  }, [productId]);

  useEffect(() => {
    setSelectedCategories(array);
    setSelectedImage(product.image);
  }, [product]);

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedProduct = {
      ...product,
      categories: updatedCategories,
      image: selectedImage,
    };
    console.log(updatedProduct);
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
          // value={product.image}
        />
        {/* {noUploadFileError && <small>You must upload image</small>} */}
        {
          <img
            src={!isNewImage ? selectedImage.imageUrl : selectedImage}
            alt={product.name}
          />
        }
      </div>
      <Input
        name="name"
        id="name"
        placeholder="name"
        label="Name"
        onChange={nameChangeHandler}
        value={product.name}
        //   onBlur={nameInputBlurHandler}
        //   isInvalid={nameInputHasError}
        //   errorMessage="Name must not be empty"
      />
      <Input
        type="number"
        name="price"
        id="price"
        placeholder="price"
        label="Price"
        value={product.price}
        onChange={priceChangeHandler}
        //   value={enteredPrice}
        //   onBlur={priceInputBlurHandler}
        //   isInvalid={priceInputHasError}
        //   errorMessage="Price must be greater than 0"
      />
      <Textarea
        for="desc"
        label="Product description"
        id="desc"
        value={product.description}
        onChange={descriptionChangeHandler}
        //   onBlur={descInputBlurHandler}
        //   isInvalid={descInputHasError}
        //   errorMessage="Description must not be empty"
      />
      <p style={{ marginBottom: '0.3rem' }}>Categories</p>
      <Select
        isMulti
        onChange={setSelectedCategories}
        options={options}
        value={selectedCategories}
        styles={customStyles}
        // theme={(theme) => ({
        //   ...theme,
        //   borderRadius: '5px',
        //   colors: {
        //     ...theme.colors,
        //     primary25: 'hotpink',
        //     primary: 'black',
        //   },
        // })}
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

export default UpdateProductForm;
