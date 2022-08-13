// import files
const joi = require("joi");
const db = require("../shared/mongodb");
const ObjectId = require("mongodb").ObjectId;

// tableSchema
const tableSchema = joi.object({
    fullname: joi.string().required(),
    contactnumber: joi.number().required(),
    email: joi.string().email().required(),
    location: joi.string().required(),
    date: joi.string().required(),
    time: joi.string().required(),
    foodtype: joi.string().required(),
    count: joi.string().required(),
});

// validationSchema & mongodb query
const helper = {
  validate(post) {
    try {
      return tableSchema.validateAsync(post);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },

  find() {
    return db.table.find().toArray();
  },
  findById(_id) {
    return db.table.findOne({ _id: ObjectId(_id) });
  },
  create(post) {
    return db.table.insertOne(post);
  },
  update({ _id, ...post }) {
    return db.table.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: post },
      { returnDocument: "after" }
    );
  },
  deleteById(_id) {
    return db.table.deleteOne({ _id: ObjectId(_id) });
  },
};

// export
module.exports = helper;
