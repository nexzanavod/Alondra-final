import React, { useState, useEffect } from "react";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import { InfoSection, Pricing } from "../../components";

//Backend API
import { commerce } from "../../lib/commerce";
import Product from "../../components/Products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  //Product Function
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  //Cart function
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />

      <Product
        products={products}
        onAddToCart={handleAddToCart}
        handleUpdateCartQty
      />

      {/* <InfoSection {...homeObjTwo} />
      <Pricing />
      <InfoSection {...homeObjFour} /> */}
    </>
  );
};

export default Home;
