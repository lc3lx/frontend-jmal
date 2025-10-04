import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByCategory } from "../../redux/actions/productsAction";
import { getAllCategory } from "../../redux/actions/categoryAction";
import baseUrl from "../../Api/baseURL";

const useViewCategoryProducts = (categoryName, limit = 4) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all categories first
  const allCategories = useSelector((state) => state.allCategory.category);

  useEffect(() => {
    // First, get all categories if not already loaded
    if (!allCategories || !allCategories.data) {
      dispatch(getAllCategory());
      return;
    }

    const fetchCategoryProducts = async () => {
      setLoading(true);

      // Find category by name (case insensitive)
      const category = allCategories.data.find(
        (cat) =>
          cat.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
      );

      if (category) {
        console.log(
          `Found category: ${category.name} with ID: ${category._id}`
        );

        try {
          // Fetch products directly instead of using Redux action
          const response = await baseUrl.get(
            `/api/v1/products?limit=${limit}&category=${category._id}&page=1`
          );

          console.log(`API Response for ${categoryName}:`, response.data);

          if (response.data && response.data.data) {
            setProducts(response.data.data);
            console.log(
              `Products loaded for ${categoryName}:`,
              response.data.data.length
            );
          } else {
            setProducts([]);
            console.log(`No products found for ${categoryName}`);
          }
        } catch (error) {
          console.error("Error fetching category products:", error);
          console.error(
            "Error details:",
            error.response?.data || error.message
          );
          setProducts([]);
        }
      } else {
        console.log(`Category "${categoryName}" not found`);
        setProducts([]);
      }

      setLoading(false);
    };

    fetchCategoryProducts();
  }, [allCategories, categoryName, limit, dispatch]);

  return [products, loading];
};

export default useViewCategoryProducts;
