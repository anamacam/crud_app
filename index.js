// Importación de módulos
const express = require('express'); 
const mysql = require('mysql'); 
const bodyParser = require('body-parser'); 

// Configuración de la aplicación Express
const app = express(); // Crea una instancia de la aplicación Express

// Configuración del middleware bodyParser para analizar cuerpos JSON de las solicitudes
app.use(bodyParser.json());

// Definición de constantes
const PUERTO = 3000; 

// Configuración de la conexión a la base de datos MySQL
const conexion = mysql.createConnection({
    host: 'localhost', 
    database: 'prueba', 
    user: 'root', 
    password: '' 
});

// Inicio del servidor Express
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`); // Mensaje que se muestra en la consola cuando el servidor se inicia correctamente
});
