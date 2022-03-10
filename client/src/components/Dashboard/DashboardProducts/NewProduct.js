import classes from './NewProduct.module.css';
import ProductForm from './ProductForm';

const NewProduct = () => {
  return (
    <section className={classes.newProduct}>
      <div className={classes.wrapper}>
        <h1>New Product</h1>
        <ProductForm />
      </div>
    </section>
  );
};

export default NewProduct;
