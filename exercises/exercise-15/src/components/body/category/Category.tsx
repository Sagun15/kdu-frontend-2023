import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { ProductItemState } from "../../../features/products/ProductsSlice";
import Product from "./product/Product";
import "./Category.scss";
import { useEffect } from "react";
import {
  fetchProducts,
  fetchSpecificProducts,
} from "../../../features/products/ProductsSlice";

function Category() {
  const dispatch = useAppDispatch();
  const searchProvider = useAppSelector((state: RootState) => state.search);

  const productCategories = useAppSelector(
    (state: RootState) => state.categories
  );
  const productsState = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productCategories.categories.length > 1) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchSpecificProducts(productCategories.categories[0]));
    }
  }, [productCategories.categories, dispatch]);
  
  let productsList = productsState.products;
  productsList = productsList.slice(0, productCategories.categories.length);

  productsList = productsList?.filter((products) =>
    products.products?.filter((product) =>
      product.title?.includes(searchProvider.query)
    )
  );

  let filteredProducts: { category: string; products: ProductItemState[] }[] =
    [];

  productsList.map((products) =>
    filteredProducts.push({
      category: products.category,
      products: products.products.filter((product) =>
        product.title?.toLowerCase().includes(searchProvider.query)
      ),
    })
  );

  return (
    <div className="products">
      {productsState.loading ? (
        <div className="loader"></div>
      ) : (
        filteredProducts.map((item) => {
          return (
            item.products.length > 0 && (
              <>
                <p className="item__category">{item.category}</p>
                {item.products.map((product) => (
                  <Product
                    key={`${product.id}-${product.category}`}
                    product={product}
                  />
                ))}
              </>
            )
          );
        })
      )}
    </div>
  );
}

export default Category;
