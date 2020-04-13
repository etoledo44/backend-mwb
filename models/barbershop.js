'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barbershop = sequelize.define('Barbershop', {
    name: DataTypes.STRING,
    cep: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {});
  Barbershop.associate = function(models) {
    Barbershop.belongsTo(models.User, {as: 'User', foreignKey: 'id_user'});
  };
  return Barbershop;
};