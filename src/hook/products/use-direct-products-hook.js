import { useState, useEffect } from "react";
import baseUrl from "../../Api/baseURL";

const useDirectProducts = (categoryName, limit = 4) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add small delay to avoid 429 errors
        await new Promise((resolve) => setTimeout(resolve, 100));

        // First get all categories
        const categoriesResponse = await baseUrl.get("/api/v1/categories");
        const categories = categoriesResponse.data.data;

        // Find the category by name
        const category = categories.find(
          (cat) =>
            cat.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
        );

        if (category) {
          console.log(
            `Found category: ${category.name} with ID: ${category._id}`
          );

          // Add another small delay before fetching products
          await new Promise((resolve) => setTimeout(resolve, 200));

          // Get products for this category
          const productsResponse = await baseUrl.get(
            `/api/v1/products?limit=${limit}&category=${category._id}&page=1`
          );

          if (productsResponse.data && productsResponse.data.data) {
            setProducts(productsResponse.data.data);
            console.log(
              `Products loaded for ${categoryName}:`,
              productsResponse.data.data.length
            );
          } else {
            setProducts([]);
            console.log(`No products found for ${categoryName}`);
          }
        } else {
          console.log(`Category "${categoryName}" not found`);
          setProducts([]);
        }
      } catch (err) {
        console.error(`Error fetching products for ${categoryName}:`, err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, limit]);

  return [products, loading, error];
};

export default useDirectProducts;
