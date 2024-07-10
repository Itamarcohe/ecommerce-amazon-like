import Order from "../models/Order.js";

const addOrder = async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((orderItem) => ({
      ...orderItem,
      product: orderItem._id,
    })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: "New Order Created Successfully", order });
};

// const getOrderById = async (req, res) => {
//   const { id } = req.params;
//   const order = await order.findById(id);
//   if (!order) {
//     return res.status(404).send({ message: "Order not found" });
//   }
//   res.send(order);
// };
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id); // Ensure 'Order' is correctly referenced
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(order);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching order", error: error.message });
  }
};

export { addOrder, getOrderById };
