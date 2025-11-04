import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {    
    user_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
  },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roles : {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;

