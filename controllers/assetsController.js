const Assets = require("../models/assets");
const asyncHandler = require("express-async-handler");

exports.getAssets = asyncHandler(async (req, res) => {
    const pipeline = [
        {
          $match: { user: req.user._id },
        },
        {
          $group: {
            _id:  "$tab",
            assetsItems: { $push: "$$ROOT" },
          },
          
        },
        {
            $sort: { ["tab"]: -1 },
        },
      ];
    const assets = await Assets.aggregate(pipeline).exec();
    // const assets = await Assets.find({user: req.user._id});
    res.status(200).json({ success: true, data: assets });
});

exports.createAssets = asyncHandler(async (req, res) => {
    // create a bill
    console.log("req.body", req.body);
    const assets = await Assets.create(
        {
            tab: req.body.tab,
            bank: req.body.bank,
            last4digits: req.body.last4digits,
            user: req.user._id,
            note: req.body.note,
            amount: req.body.amount,
        });
    res.status(200).json({ success: true, data: assets });
})

exports.updateAssets = asyncHandler(async (req, res) => {

  const userID = req.user._id;

  const asset = await Assets.findById(req.params.id);
  if (!asset) {
    res.status(404);
    throw new Error("Bill not found");
  }

  if (asset.user.toString() !== userID.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this bill");
  }

  const updatedAsset = await Assets.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updatedAsset });
})

exports.deleteAssets = asyncHandler(async (req, res) => {
  console.log("delete assets");
  const userID = req.user._id;
  const asset = await Assets.findByIdAndDelete(req.params.id); // <-- Changed line
  if (!asset) {
    res.status(404);
    throw new Error("Asset not found");
  }
  if (asset.user.toString() !== userID.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this asset");
  }
  res.status(200).json({ success: true, data: {} });
});