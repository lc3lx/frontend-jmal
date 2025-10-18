import { useState } from "react";

const CardContainerHook = () => {
  // Simplified - no wishlist functionality
  const [favProd] = useState([]);

  return [favProd];
};

export default CardContainerHook;
