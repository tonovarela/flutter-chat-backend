const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");




const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }
        const token = await generarJWT(usuarioDB.id);
        return res.set('token-access', token)
            .set('X-Powered-By', 'tonovarela')
            .status(200).json({
                ok: true,
                usuario: usuarioDB,
                token
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el backend'
        });
    }

};

const crearUsuario = async (req, res = response) => {

    const salt = bcrypt.genSaltSync();
    const { email, nombre, password } = req.body;


    const usuario = new Usuario(req.body);
    usuario.password = bcrypt.hashSync(password, salt);
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Este correo ya esta registrado"
            });
        }
        await usuario.save();
        //Generar el Json webToken
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Problemas con el backend"
        });
    }


};

const renewToken = async (req, res = response) => {
    
    const uid = req.uid;
    const usuarioDB = await Usuario.findById( uid );
    const nuevoToken =await generarJWT(uid);    
    res.json({
        ok: true,        
        usuario:usuarioDB,
        nuevoToken
    });

}

module.exports = {
    login,
    crearUsuario,
    renewToken
}