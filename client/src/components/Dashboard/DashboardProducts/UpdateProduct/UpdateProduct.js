import UpdateProductForm from './UpdateProductForm';
import classes from './UpdateProduct.module.css';

const UpdateProduct = () => {
  return (
    <section className={classes.updateProduct}>
      <div className={classes.wrapper}>
        <h1>Update Product</h1>
        <UpdateProductForm />
      </div>
    </section>
  );
};

export default UpdateProduct;
