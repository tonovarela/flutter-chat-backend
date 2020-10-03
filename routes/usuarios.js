/*
   api/usuarios
*/
const { Router } = require('express');


const { validarJWT } = require('../middleware/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();
router.get('/',validarJWT, getUsuarios);

module.exports = router;

