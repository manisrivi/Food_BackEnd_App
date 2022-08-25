// import files
const joi = require("joi");
const ObjectId = require("mongodb").ObjectId;
const db = require("../shared/mongodb");

// UserProfileSchema
const userProfileSchema = joi.object({
  fullname: joi.string().required(),
  contactnumber: joi.number().required(),
  address: joi.string().required(),
  img: joi.string().required(),
});

// mongodb query
const helper = {
  validateProfileSchema(user) {
    try {
      return userProfileSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  find() {
    return db.users.find();
  },
  findById(_id) {
    return db.users.findOne({ _id: ObjectId(_id) });
  },
  update({ _id, ...post }) {
    return db.users.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: post },
      { returnDocument: "after" }
    );
  },
  deleteById(_id) {
    return db.users.deleteOne({ _id: ObjectId(_id) });
  },
};

// export
module.exports = helper;
