const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const {Users} = require('../models/models');
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {
        expiresIn: '24h'
    })
}

class UserController {
    async registration (req, res, next) {
        const {
            Name, LastName, Account,
            Mail, Password, AccessLevel,
            Phone, Mobile, DepartmentID,
            IDnumber, Title, GroupID,
            Access, Position, LastActivity,
            CRP_AE_ID, Active, LastLogin
        } = req.body;
        if (!Mail || !Password || !Name || !LastName) {
            return next(ApiError.badRequest('Not character Mail or Password or Name or LastName'))
        }
        if (!Account) {
            return next(ApiError.badRequest('Create your Login!'))
        }

        const candidate = await Users.findOne({where: {Mail}})
        if (candidate) {
            return next(ApiError.badRequest('Email is already in the database'))
        }

        const candidateAccount = await  Users.findOne({where: {Account}})
        if (candidateAccount) {
            return next(ApiError.badRequest('This login exists'))
        }

        const hashPassword = await  bcrypt.hash(Password, 5)
        const user = await Users.create({
            Name, LastName, Account,
            Mail, AccessLevel, password: hashPassword,
            Phone, Mobile, DepartmentID,
            IDnumber, Title, GroupID,
            Access, Position, CRP_AE_ID,
            LastActivity, Active, LastLogin

        })
        const token = generateJwt(user.EmployeeID, user.Mail, user.AccessLevel)
        return res.json({token})
    }

    async login (req, res) {

    }

    async check (req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Not set ID'))
        }
        res.json(id)
    }

    async getAll (req, res) {

    }

    async getOne (req, res) {

    }
}

module.exports = new UserController()