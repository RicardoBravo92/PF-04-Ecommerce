const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    nickname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: Number,
    },
<<<<<<< HEAD
    password: {
      type: String,
    },
    cart: [
      {
        _id: {
          ref: "products",
          type: mongoose.Types.ObjectId,
        },
        quantity: Number,
      },
    ],
    orders: [
      {
        ref: "orders",
        type: mongoose.Types.ObjectId,
      },
    ],
    shoppingHistory: [
      {
        type: Array,
      },
    ],
    shipping: [{}],
    favorites: [
      {
        ref: "products",
        type: mongoose.Types.ObjectId,
      },
    ],
=======
    token: {
      type: String,
    },
>>>>>>> 78e023bd7b59e9aba338fd4fdff583ad046cf60a
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", UserSchema);
