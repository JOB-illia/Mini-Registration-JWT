const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('Employees', {
    Name: {type: DataTypes.STRING(15), required: true},
    LastName: {type: DataTypes.STRING(15), required: true},
    Password: {type: DataTypes.STRING, required: true},
    Mail: {type: DataTypes.STRING, unique: true, required: true},
    Account: {type: DataTypes.STRING(20), required: true},
    Phone: {type: DataTypes.STRING(3), defaultValue: null},
    Mobile: {type: DataTypes.STRING(9), defaultValue: null},
    DepartmentID: {type: DataTypes.INTEGER, defaultValue: null},
    IDnumber: {type: DataTypes.INTEGER, defaultValue: null},
    Title: {type: DataTypes.STRING(60), defaultValue: null},
    Active: {type: DataTypes.BOOLEAN, defaultValue: true},
    LastActivity: {type: DataTypes.DATE, defaultValue: null},
    LastLogin: {type: DataTypes.DATE, defaultValue: null},
    GroupID: {type: DataTypes.ARRAY(DataTypes.INTEGER), primaryKey: true, defaultValue: null},
    AccessLevel: {type: DataTypes.STRING,  defaultValue: "user"},
    Access: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["user"]},
    EmployeeID: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    Position: {type: DataTypes.INTEGER, defaultValue: null},
    CRP_AE_ID: {type: DataTypes.STRING, defaultValue: null}
})

module.exports = {
    Users
}