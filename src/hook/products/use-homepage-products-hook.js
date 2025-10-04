import { useState, useEffect } from "react";
import baseUrl from "../../Api/baseURL";

const useHomepageProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get all categories first
        const categoriesResponse = await baseUrl.get("/api/v1/categories");
        const allCategories = categoriesResponse.data.data;

        // Take first 3 categories
        const selectedCategories = allCategories.slice(0, 3);
        setCategories(selectedCategories);

        // Fetch products for each category in parallel
        const productPromises = selectedCategories.map(async (category) => {
          try {
            console.log(
              `Fetching products for category: ${category.name} (${category._id})`
            );

            const productsResponse = await baseUrl.get(
              `/api/v1/products?limit=3&category=${category._id}&page=1`
            );

            console.log(
              `Products response for ${category.name}:`,
              productsResponse.data
            );

            return {
              categoryId: category._id,
              category: category,
              products: productsResponse.data?.data || [],
              error: null,
            };
          } catch (err) {
            console.error(
              `Error fetching products for category ${category.name}:`,
              err.response?.data || err.message
            );
            return {
              categoryId: category._id,
              category: category,
              products: [],
              error: err.response?.data?.message || err.message,
            };
          }
        });

        // Wait for all product requests to complete
        const productResults = await Promise.all(productPromises);

        // Convert results to the expected format
        const productsData = {};
        productResults.forEach((result) => {
          productsData[result.categoryId] = {
            category: result.category,
            products: result.products,
            error: result.error,
          };
        });

        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching homepage products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageProducts();
  }, []);

  return {
    categories,
    products,
    loading,
    error,
  };
};

export default useHomepageProducts;
