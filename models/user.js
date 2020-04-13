'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Barbershop, { as: 'Barbershops', foreignKey: 'id_user'});
  };
  return User;
};