const { Router } = require('express');
const router = Router();

// importar rutas:
const {
  renderIndex,
  renderAbout,
} = require('../controllers/index.controllers');

// pagina principal:
router.get('/', renderIndex);
// pagina about:
router.get('/about', renderAbout);

module.exports = router;
