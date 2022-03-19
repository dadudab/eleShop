import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import classes from './UpdateProductForm.module.css';
import Button from '../../../UI/Button';
import Select from 'react-select';
import Loading from '../../../UI/Loading';
import ErrorMessage from '../../../UI/ErrorMessage';
import PRODUCT_CATEGORIES from '../../../../assets/productCategories';

// console.log(PRODUCT_CATEGORIES);

const UpdateProductForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setError(null);
      setIsLoading(true);
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
        throw new Error('Cannot get product');
      }
      const data = await response.json();
      setIsLoading(false);
      setProduct(data);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
        setSelectedImage(reader.result);
      };
    }
  };

  const isNewImage = !selectedImage.imageUrl;

  // checkbox

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

  // set initial categories
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
  }, [product.image]);

  // input validation
  const nameInputIsValid = product.name.trim() !== '';
  const priceInputIsValid = product.price > 0;
  const descInputIsValid = product.description.trim() !== '';

  let formIsValid = false;
  if (nameInputIsValid && priceInputIsValid && descInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log('form not valid');
      return;
    }

    const updatedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      categories: updatedCategories,
      image: selectedImage,
    };
    props.onAddProduct(updatedProduct);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.upload}>
        <label htmlFor="productImg">Upload image</label>
        <input
          id="productImg"
          type="file"
          accept="image/png, image/jpeg"
          onChange={imageChangeHandler}
        />
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
      />
      {!nameInputIsValid && <small>Name must not be empty</small>}
      <Input
        type="number"
        name="price"
        id="price"
        placeholder="price"
        label="Price"
        value={product.price}
        onChange={priceChangeHandler}
      />
      {!priceInputIsValid && <small>Price must be greater than 0</small>}
      <Textarea
        for="desc"
        label="Product description"
        id="desc"
        value={product.description}
        onChange={descriptionChangeHandler}
      />
      {!descInputIsValid && <small>Description must not be empty</small>}
      <p style={{ marginBottom: '0.3rem' }}>Categories</p>
      <Select
        isMulti
        onChange={setSelectedCategories}
        options={PRODUCT_CATEGORIES}
        value={selectedCategories}
        styles={customStyles}
      />
      <div className={classes.actions}>
        <Link to="/dashboard">
          <Button>Back</Button>
        </Link>
        <Button type="submit" className={classes.updateBtn}>
          Update product
        </Button>
      </div>
    </form>
  );
};

export default UpdateProductForm;
