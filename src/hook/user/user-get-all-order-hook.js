import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/ordersAction";

const useUserGetAllOrder = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResult] = useState(0);
  const [paginate, setPaginate] = useState({});
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  let userName = "";
  if (user != null) userName = user.name;

  const get = async () => {
    setLoading(true);
    console.log("Loading orders...");
    await dispatch(getAllOrders("", 5));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  const onPress = async (page) => {
    setLoading(true);
    console.log("Loading orders page:", page);
    await dispatch(getAllOrders(page, 5));
    setLoading(false);
  };
  //get address detalis for user
  const resAllOrder = useSelector((state) => state.orderReducer.getAllOrders);

  console.log("Orders state:", resAllOrder);

  useEffect(() => {
    if (loading === false) {
      if (resAllOrder && resAllOrder.results) {
        setResult(resAllOrder.results);
        console.log("Orders results:", resAllOrder.results);
      }
      if (resAllOrder && resAllOrder.paginationResult) {
        setPaginate(resAllOrder.paginationResult);
        console.log("Orders pagination:", resAllOrder.paginationResult);
      }
      if (resAllOrder && resAllOrder.data) {
        setOrderData(resAllOrder.data);
        console.log("Orders data:", resAllOrder.data.length);
      }
    }
  }, [loading, resAllOrder]);

  return [userName, results, paginate, orderData, onPress];
};

export default useUserGetAllOrder;
