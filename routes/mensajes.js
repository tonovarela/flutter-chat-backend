/*
   api/mensajes
*/
const { Router } = require('express');
const { getMensajes } = require('../controllers/mensajes');


const { validarJWT } = require('../middleware/validar-jwt');



const router = Router();
router.get('/:de',validarJWT, getMensajes);

module.exports = router;

