const Bill = require("../models/bill");
const asyncHandler = require("express-async-handler");

// @route get /bills
// @desc get all bills
// @access Public

exports.getBillsByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const regex = new RegExp(type, 'i'); 

  const pipeline = [
    {
      $match: {user: req.user._id,iconName: regex}
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
  
  const bills = await Bill.aggregate(pipeline).exec();
  res.status(200).json({ success: true, data: bills });
});

exports.getBillsByGroup = asyncHandler(async (req, res) => {
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
  const result = await Bill.aggregate(pipeline).exec();
  res.status(200).json({success: true, data: result});
});

exports.getBills = asyncHandler(async (req, res) => {
  
  try {
    let groupByField, sortField;
    if (req.params.period === "week") {
      groupByField = "$weekNumber";
      sortField = "billDate";
    } else if (req.params.period === "month") {
      groupByField = "$monthNumber";
      sortField = "billDate";
    } else {
      groupByField = "$yearNumber";
      sortField = "billDate";
    }
    
    const pipeline = [
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: groupByField,
          billItems: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { [sortField]: -1 },
      },
    ];
    const result = await Bill.aggregate(pipeline).exec();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err.message);
  }
});

// @route get /bills/:id
// @desc get a bill
// @access Public

exports.getBill = asyncHandler(async (req, res) => {
  console.log("getBill --->", req.params.id)
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
  console.log("req.body", req.body)
  
  const bill = await Bill.create(
    {
      name: req.body.name,
      amount: req.body.amount,
      billType: req.body.billType,
      iconName: req.body.iconName,
      user: req.user._id,
      billDate: req.body.billDate,
      weekNumber:req.body.weekNumber,
      monthNumber:req.body.monthNumber,
      yearNumber:req.body.yearNumber,
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
  console.log("delete bill")
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





