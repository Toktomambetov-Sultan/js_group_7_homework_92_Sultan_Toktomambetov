const mongoose = require("mongoose");
const uniqueValidate = (model,path="name") => ({
  validator: async (value) => {

    const obj = await mongoose.model(model).findOne({ [path]: value });
    if (obj) return false;
    return true;
  },
  message: (props) => {
    return `${model} property '${props.path}' already exists.`;
  },
});

module.exports = uniqueValidate;
