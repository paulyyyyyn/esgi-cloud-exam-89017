const { Sequelize } = require('sequelize')
require('dotenv').config();

// database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;