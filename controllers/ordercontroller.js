import OrderModel from "../models/ordermodel.js";
import SubmitOrders from "../models/submitordersmodel.js";
export const GetallOrders = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const allOrders = await OrderModel.find();

    const submittedOrderIds = await SubmitOrders.find({ userId }).distinct(
      "orderId"
    );

    // Convert submitted order IDs to strings
    const submittedOrderStrings = submittedOrderIds.map((orderId) =>
      orderId.toString()
    );

    const ordersToDisplay = allOrders.filter(
      (order) => !submittedOrderStrings.includes(order._id.toString())
    );

    res.status(200).json(ordersToDisplay);
  } catch (error) {
    console.error("Error getting orders records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const GetSingleOrder = async (req, res, next) => {
  try {
    const singleorderrecord = await OrderModel.findById(req.params.orderId);
    if (!singleorderrecord) {
      return res.status(404).json({ error: "order record not found" });
    }
    res.status(200).json(singleorderrecord);
  } catch (error) {
    console.error("Error getting order record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errmsg: error.message });
  }
};

export const CreateOrder = async (req, res, next) => {
  try {
    const {
      userId,
      ordername,
      orderstatus,
      ordercost,
      ordercommission,
      frozenamount,
      orderimage,
      depositedrequired,
    } = req.body;
    console.log(
      userId,
      ordername,
      orderstatus,
      ordercost,
      ordercommission,
      frozenamount,
      orderimage,
      depositedrequired
    );
    // Check if a Order with the same name already exists for the given branch
    const expistingorder = await OrderModel.findOne({
      ordername,
    });
    if (expistingorder) {
      return res.status(400).json({
        message: "Order with the same name already exists",
      });
    }

    // Create a new Order instance
    const newOrder = new OrderModel({
      userId,
      orderName: ordername,
      orderStatus: orderstatus,
      orderCost: ordercost,
      orderCommission: ordercommission,
      frozenAmount: frozenamount,
      orderImage: orderimage,
      depositedrequired: depositedrequired,
    });

    // Save the record to the database
    await newOrder.save();

    res.status(201).json({ message: "Order record submitted successfully" });
  } catch (error) {
    console.error("Error submitting Order record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errormsg: error.message });
  }
};
export const UpdateOrder = async (req, res, next) => {
  try {
    const UpdateOrderRecord = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );
    if (!UpdateOrderRecord) {
      return res.status(404).json({ error: "Order record not found" });
    }
    res.status(200).json(UpdateOrderRecord);
  } catch (error) {
    console.error("Error updating Order record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
export const DeleteOrder = async (req, res, next) => {
  try {
    const DeleteOrderRecord = await OrderModel.findByIdAndDelete(
      req.params.orderId
    );
    if (!DeleteOrderRecord) {
      return res.status(404).json({ error: "Order record not found" });
    }
    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Order record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
