const indexControl = {};

// Mostar plantilla principal:
indexControl.renderIndex = (req, res) => {
  res.render('index');
};

// Mostar plantilla about:
indexControl.renderAbout = (req, res) => {
  res.render('about');
};

// exportar modulo:
module.exports = indexControl;
