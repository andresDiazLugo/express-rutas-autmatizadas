"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.connection = void 0;
const mysql2_1 = require("mysql2");
exports.connection = (0, mysql2_1.createConnection)({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestion_task',
});
//Connect a DB
const connect = () => {
    exports.connection.connect((error) => {
        if (error) {
            console.error('Error al conectar a MySQL', error);
            return;
        }
    });
    console.log('Conexion exitosa a MySQL');
};
exports.connect = connect;
