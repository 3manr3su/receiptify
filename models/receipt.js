const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiptSchema = new Schema({
  vendorName: String,
  date: String,
  description: String,
  items: {
    type: Map,
    of: String
  },
  _user: { type: Schema.Types.ObjectId, ref: "user" },
  _id: { type: Schema.Types.ObjectId, auto: true }
});

mongoose.model("receipts", receiptSchema);
