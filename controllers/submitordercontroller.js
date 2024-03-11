import SubmitOrders from "../models/submitordersmodel.js";
import OrderModel from "../models/ordermodel.js";
export const GetAllSubmitedOrders = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.isAdmin) {
    } else if (!req.user.isAdmin) {
      query.userId = req.user.user_id;
    }
    const submittedOrders = await SubmitOrders.find(query);
    const ordersWithDetails = await Promise.all(
      submittedOrders.map(async (order) => {
        const orderDetail = await OrderModel.findById(order.orderId);
        return { ...order.toObject(), orderDetail };
      })
    );

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error("Error getting Customers records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
export const GetSingleSubmitOrder = async (req, res, next) => {
  try {
    const singleorderrecord = await SubmitOrders.findById(
      req.params.submitorderId
    );
    if (!singleorderrecord) {
      return res.status(404).json({ error: "Submitorder  record not found" });
    }

    res.status(200).json(singleorderrecord);
  } catch (error) {
    console.error("Error getting submit order record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errmsg: error.message });
  }
};

export const CreateanewSubmitOrder = async (req, res, next) => {
  try {
    const { userId, orderId } = req.body;

    // Check if a Order with the same name already exists for the given branch

    // Create a new Order instance
    const newCustomerquery = new SubmitOrders({
      userId,
      orderId,
    });

    // Save the record to the database
    await newCustomerquery.save();

    res.status(201).json({ message: "Customer record submitted successfully" });
  } catch (error) {
    console.error("Error submitting Order record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errormsg: error.message });
  }
};

export const DeleteSubmitOrder = async (req, res, next) => {
  try {
    const DeleteOrderRecord = await SubmitOrders.findByIdAndDelete(
      req.params.submitorderId
    );
    if (!DeleteOrderRecord) {
      return res.status(404).json({ error: "Customer record not found" });
    }
    res.status(200).json({ message: "Customer Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Customer record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
