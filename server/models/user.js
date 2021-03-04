'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
       notEmpty: {
         msg: 'City is required'
       }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email has been used'
      },
      validate: {
        isEmail: {
          msg: 'Invalid email format'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [6,50],
          msg: 'Password minimal has 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance => {
        instance.password = hashPassword(instance.password)
      })
    }
  });
  return User;
};