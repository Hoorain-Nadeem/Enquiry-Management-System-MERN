let enquiryModal = require("../models/enquiry.model");

let enquiryInsert = async (req, res) => {
  let { name, email, phone, message } = req.body;

  let beforeId = await enquiryModal.findOne({ email: email });
  console.log(beforeId);
  if (beforeId) {
    res.send({
      status: "04",
      message: "email already exist",
    });
  } else {
    let insertObj = new enquiryModal({
      name,
      email,
      phone,
      message,
    });
    insertObj
      .save()
      .then(() => {
        res.send("data is inserted");
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

let enquiryList = async (req, res) => {
  let enquiryList = await enquiryModal.find();
  res.send({
    status: 1,
    enquiryList: enquiryList,
  });
};

let enquiryDel = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let enquiryDel = await enquiryModal.deleteOne({ _id: id });
  res
    .send({
      status: 1,
      message: "data is deleted",
      enquiryDel,
    })
    .catch((err) => {
      console.log(err);
    });
};

let enquiryEdit = async (req, res) => {
  let { id } = req.params;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name,
    email,
    phone,
    message,
  };
  let enquiryEdit = await enquiryModal.updateOne({ _id: id }, updateObj);
  res.send({
    message: "data is updated",
    enquiryEdit,
  });
};
module.exports = { enquiryInsert, enquiryList, enquiryDel, enquiryEdit };
