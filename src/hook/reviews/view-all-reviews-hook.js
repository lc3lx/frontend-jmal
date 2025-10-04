import React, { useState, useEffect } from "react";
import baseUrl from "../../Api/baseURL";

const ViewAllReviewsHook = (limit = 7) => {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await baseUrl.get(
          `/api/v1/reviews?limit=${limit}&sort=-createdAt`
        );
        if (response.data.status === "success") {
          setAllReviews(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [limit]);

  return [allReviews, loading];
};

export default ViewAllReviewsHook;
