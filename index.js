// Importación de módulos
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Configuración de la aplicación Express
const app = express(); // Crea una instancia de la aplicación Express

// Configuración del middleware bodyParser para analizar cuerpos JSON de las solicitudes
app.use(bodyParser.json());

// Definición de constantes
const PUERTO = 3000;

// Configuración de la conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  database: "prueba",
  user: "root",
  password: "",
});

// Inicio del servidor Express
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});

// Conexión a la base de datos
conexion.connect((error) => {
  if (error) throw error;
  console.log("Conexion exitosa a la base de datos");
});

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("API");
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const query = `SELECT * FROM usuarios;`;

  // Ejecutar la consulta en la base de datos
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);

    // Crear un objeto para almacenar los resultados
    const obj = {};

    // Verificar si hay resultados de la consulta
    if (resultado.length > 0) {
      obj.listaUsuarios = resultado;
      res.json(obj);
    } else {
      res.json(`No hay registros`);
    }
  });
});

// Ruta para obtener un usuario por su ID
app.get("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM usuarios WHERE idUsuarios = ${id};`;

  // Ejecutar la consulta en la base de datos
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);

    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json(`No hay registros`);
    }
  });
});

// Ruta para agregar un nuevo usuario
app.post("/usuario/add", (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    email: req.body.email,
  };
  const query = `INSERT INTO usuarios SET ?`;
  conexion.query(query, usuario, (error) => {
    if (error) return console.error(error.message);

    res.json(`Se insertó correctamente el usuario`);
  });
});

// Ruta para actualizar un usuario por su ID
app.put("/usuario/update/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE idUsuario='${id}';`;
  conexion.query(query, (error) => {
    if (error) return console.error(error.message);

    res.json(`Se actualizó correctamente el usuario`);
  });
});

// Ruta para eliminar un usuario por su ID
app.delete("/usuario/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM usuarios WHERE idUsuario = ${id};`;
  conexion.query(query, (error) => {
    if (error) console.error(error.message);

    res.json(`Se eliminó correctamente el usuario`);
  });
});
