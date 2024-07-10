import { useContext, useEffect, useReducer } from "react";
import { Store } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from "../actions.jsx";
import axios from "axios";
import { getError } from "../../utils.js";
import { toast } from "react-toastify";
import orderPageReducer from "../reducers/orderPageReducer.jsx";

const OrderPage = () => {
  const {
    state: { userInfo },
    dispatch: ctxDispatch,
  } = useContext(Store);
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(orderPageReducer, {
    loading: true,
    order: null,
    error: "",
  });

  useEffect(() => {
    const getOrder = async () => {
      console.log("entered Use Effect");
      dispatch({ type: GET_REQUEST });
      console.log("finish dispatch GET REQUEST");

      try {
        const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log("got data", data);

        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: GET_FAILURE, payload: getError(err) });
        toast.error(getError(err));
      }
    };

    if (!userInfo) {
      navigate("/signin");
      return;
    }
    if (!order || (order._id && orderId !== order._id)) {
      getOrder();
    }
  }, [userInfo, order, orderId, navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Render order details here */}
          <h2>Order ID: {order._id}</h2>
          {/* Add more order details as needed */}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
