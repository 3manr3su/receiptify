const _ = require('lodash');
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Receipt = mongoose.model("receipts");

module.exports = app => {
  app.get("/api/receipts", requireLogin, async (req, res) => {
    const receipts = await Receipt.find({ _user: req.user.id });

    res.send(receipts);
  });

  app.post("/api/receipts", requireLogin, (req, res) => {
    const { vendorName, date, description, items } = req.body;
    const receipt = new Receipt({
      vendorName,
      date,
      description,
      items: items.map(item => [item.name, item.price]),
      _user: req.user.id,
      _id: req.id
    });
    try {
      receipt.save();
      const user = req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.delete('/api/receipts/:id', requireLogin, async (req, res) =>{
    const receipt = await Receipt.findByIdAndRemove(req.params.id) 
    const user = req.user.save();

    res.send(user);
    res.status(200).send(response)});
 


};
