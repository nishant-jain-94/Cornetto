var db = {
  development: {
    db: 'mongodb://localhost/Cornetto-Development'
  },
  test: {
    db: 'mongodb://localhost/Cornetto-Test'
  },
  production: {
    db: 'mongodb://localhost/Cornetto-Production'
  }
};

module.exports = db;
