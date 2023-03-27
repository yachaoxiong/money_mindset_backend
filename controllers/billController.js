const Bill = require("../models/bill");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const MongoClient = require('mongodb').MongoClient;

// @route get /bills
// @desc get all bills
// @access Public

exports.getBills = asyncHandler(async (req, res) => {
  // get all bills from current user and current year
  const uri = 'mongodb://localhost:27017/money_mindset';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    const pipeline = [
      {
        $match: {user: req.user._id,}
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$billDate" } },
          billItems: { $push: "$$ROOT" }
        }
      },
      {
        $sort: { "_id": -1 }
      }
    ];
    const result = await client.db().collection('bills').aggregate(pipeline).toArray();
    res.status(200).json({success: true, data: result});
  } catch (err) {
    console.log(err.message);
  }

  // const bills = await Bill.find({
  //   user: req.user._id,
  //   billDate: {
  //     $gte: new Date(new Date().getFullYear(), 0, 1),
  //     $lt: new Date(new Date().getFullYear() + 1, 0, 1),
  //   },
  // });
  // res.status(200).json({success: true, data: bills});
})

// @route get /bills/:id
// @desc get a bill
// @access Public

exports.getBill = asyncHandler(async (req, res) => {
  // get a bill
  const bill = await Bill.findById(req.params.id);
  if (!bill) {
    res.status(404);
    throw new Error("Bill not found");
  }
  res.status(200).json({ success: true, data: bill });
})




// @route post /bills
// @desc create a bill
// @access Public

exports.createBill = asyncHandler(async (req, res) => {
  // create a bill
  const bill = await Bill.create(
    {
      name: req.body.name,
      amount: req.body.amount,
      billType: req.body.billType,
      iconName: req.body.iconName,
      user: req.user._id,
      billDate: req.body.billDate,
    });
  res.status(200).json({ success: true, data: bill });
})


// @route put /bills/:id
// @desc update a bill
// @access private

exports.updateBill = asyncHandler(async (req, res) => {

  const userID = req.user._id;

  const bill = await Bill.findById(req.params.id);
  if (!bill) {
    res.status(404);
    throw new Error("Bill not found");
  }

  if (bill.user.toString() !== userID.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this bill");
  }


  const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updatedBill });
})


// @route delete /bills/:id

exports.deleteBill = asyncHandler(async (req, res) => {

  const userID = req.user._id;
  const bill = await Bill.findById(req.params.id);
  if (!bill) {
    res.status(404);
    throw new Error("Bill not found");
  }
  if (bill.user.toString() !== userID.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this bill");
  }
  await bill.remove();
  res.status(200).json({ success: true, data: {} });

})





