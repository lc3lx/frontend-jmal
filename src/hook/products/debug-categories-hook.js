import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

const useDebugCategories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const allCategories = useSelector((state) => state.allCategory.category);

  useEffect(() => {
    if (!allCategories || !allCategories.data) {
      dispatch(getAllCategory());
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (allCategories && allCategories.data) {
      setCategories(allCategories.data);
      console.log(
        "All available categories:",
        allCategories.data.map((cat) => cat.name)
      );
    }
  }, [allCategories]);

  return [categories];
};

export default useDebugCategories;
