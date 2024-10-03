const express = require('express');
const router = express.Router();
const { renderHomePage } = require('../controllers/homeController');

// Definir a rota para a página inicial
router.get('/', renderHomePage);

module.exports = router;
