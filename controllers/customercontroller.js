import CustomerModel from "../models/customermodel.js";

export const GetAllQueries = async (req, res, next) => {
  try {
    const orderrecord = await CustomerModel.find();
    res.status(200).json(orderrecord);
  } catch (error) {
    console.error("Error getting Customers records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
export const GetSingleQuery = async (req, res, next) => {
  try {
    const singleorderrecord = await CustomerModel.findById(
      req.params.customerid
    );
    if (!singleorderrecord) {
      return res.status(404).json({ error: "customer record not found" });
    }
    res.status(200).json(singleorderrecord);
  } catch (error) {
    console.error("Error getting customer record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errmsg: error.message });
  }
};

export const CreateQueryCustomer = async (req, res, next) => {
  try {
    const { userId, fullname, email, message } = req.body;

    // Check if a Order with the same name already exists for the given branch
    const expistingorder = await CustomerModel.findOne({
      ordername,
    });
    if (expistingorder) {
      return res.status(400).json({
        message: "Order with the same name already exists",
      });
    }

    // Create a new Order instance
    const newCustomerquery = new CustomerModel({
      userId,
      fullname,
      email,
      message,
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

export const DeleteCustomerQuery = async (req, res, next) => {
  try {
    const DeleteOrderRecord = await CustomerModel.findByIdAndDelete(
      req.params.customerid
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
