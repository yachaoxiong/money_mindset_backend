const Budget = require('../models/budget');
const asyncHandler = require("express-async-handler");

// @route get /budgets
// @desc get all budgets

exports.getBudgets = asyncHandler(async (req, res) => {
  console.log("route get /budgets/:budgetType")
  const { budgetType } = req.params;
  const yearNumber = new Date().getFullYear();
  const monthNumber = new Date().getMonth();

  const budgets = await Budget.find({ user: req.user._id ,budgetType: budgetType, yearNumber: yearNumber, monthNumber: monthNumber});
  res.status(200).json({ success: true, data: budgets });
});

// @route get /budgets/:id
// @desc get a budget
// @access Public

exports.getBudget = asyncHandler(async (req, res) => {
 console.log("route get /budgets/:id")
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(404);
    throw new Error("Budget not found");
  }
  res.status(200).json({ success: true, data: budget });
})


// @route post /budgets
// @desc create a budget
// @access Public

exports.createBudget = asyncHandler(async (req, res) => {

    // create a bill
    console.log("req.body", req.body)
    const budget = await Budget.create(
      {
        amount: req.body.amount,
        budgetType: req.body.budgetType,
        iconName: req.body.iconName,
        user: req.user._id,
        monthNumber:req.body.monthNumber,
        yearNumber: req.body.yearNumber,
        budgetDate: req.body.budgetDate,
        isTotalBudget: req.body.isTotalBudget? req.body.isTotalBudget : false,
      });
    res.status(200).json({ success: true, data: bill });
})
  
// @route put /budgets/:id
// @desc update a budget
// @access private

exports.updateBudget = asyncHandler(async (req, res) => {

  const userID = req.user._id;

  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(404);
    throw new Error("Budget not found");
  }

  if (budget.user.toString() !== userID.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this budget");
  }

  budget.amount = req.body.amount;
  budget.iconName = req.body.iconName;

  const updatedBudget = await budget.save();
  res.status(200).json({ success: true, data: updatedBudget });

})

// @route delete /budgets/:id
// @desc delete a budget
// @access private

exports.deleteBudget = asyncHandler(async (req, res) => {
  
    const userID = req.user._id;
  
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      res.status(404);
      throw new Error("Budget not found");
    }
  
    if (budget.user.toString() !== userID.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this budget");
    }
  
    await budget.remove();
    res.status(200).json({ success: true, data: {} });
  
})




  