/*
   api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario,login,renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
router.post('/',[
   check('email','El email es obligatorio').isEmail(),
   check('password','El password el obligatorio').not().isEmpty(),
   validarCampos
],login);
router.post('/new', 
[
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),      
   check('password', 'El password es obligatorio').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   validarCampos
], crearUsuario);


router.get('/renew',validarJWT,renewToken);


module.exports = router;

