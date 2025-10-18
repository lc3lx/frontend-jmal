import React, { useState } from "react";
import favoff from "../../images/fav-off.png";

const ProductCardHook = (item, favProd) => {
  const [favImg] = useState(favoff);

  // Simplified - no wishlist functionality
  const handelFav = () => {
    // Future: can implement wishlist here if needed
    console.log("Wishlist functionality removed");
  };

  const addToWishListData = () => {
    console.log("Wishlist functionality removed");
  };

  const removeToWishListData = () => {
    console.log("Wishlist functionality removed");
  };

  return [removeToWishListData, addToWishListData, handelFav, favImg];
};

export default ProductCardHook;
