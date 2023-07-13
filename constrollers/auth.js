import Usuario from "../models/Usuario.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";



export const register = async(req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const newPass = bcrypt.hashSync(req.body.password, salt);


        const newUser = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            admin: req.body.admin,
            password: newPass,
        });


        const user = await newUser.save()
        res.status(201).json(user)
    } catch (err) {
        next(new Error("No se logro registrar"));
    }


}


export const login = async(req, res, next) => {

    try {
        const user = await Usuario.findOne({
            email: req.body.email

        })


        if (!user) res.status(400).json({
            "message": "Usuario no encontrado"
        })
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) res.status(400).json({
            "message": "Datos de acceso incorrectos "
        })

        const token = jwt.sign({ id: user._id, email: user.email, admin: user.admin }, process.env.JWT);
        const { password, createdAt, updatedAt, ...other } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...other, token })

    } catch (err) {
        return res.status(500).json({ "error": "No se  logró " })
    }
}