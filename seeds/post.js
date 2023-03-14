const { Post } = require("../models");

const postRows = [
  {
    title: "Como crear Hash en contraseñas al usar bulkcreate",
    content:
      "Crear el hook en tu modelo, y hablilitar la opción { individualHooks : true}.",
    user_id: 1,
  },
  {
    title: "Uso timeStamp y sequelize.literal en la implementacion createdAt",
    content:
      'Habilitar el default value en tu modelo, defaultValue : sequelize.literal ("CURRENT_TIMESTAMP")',
    user_id: 2,
  },
  {
    title: "Por qué debería tener cuidado con las opciones de Sequelize Raw",
    content:
      "La mayoría de las veces, el uso de raw no le traerá gran parte del problema. Sin embargo, afectará al campo de tipo de datos booleano .",
    user_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(postRows);
module.exports = seedPost;
