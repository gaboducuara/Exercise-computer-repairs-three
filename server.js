const { app } = require('./app');

//Models
const { Repair } = require('./models/modelrepairs');
const { User } = require('./models/modelusers');

//Utils
const { db } = require('./utils/database');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish models relations

// 1 User <----> M Repairs
// User.hasMany(Repair, { foreignKey: 'userId' });
User.hasMany(Repair);
Repair.belongsTo(User);

// Sync sequelize models

db.sync() //db.sync({ force: true }) es recomendable solo utilizar en desarrolo, ya que quita todo para montar el modelo actualizado.
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Spin up server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express app runnning on port: ${PORT}`);
});