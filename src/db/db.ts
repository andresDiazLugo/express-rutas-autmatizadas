import { createConnection, Connection } from 'mysql2'

export const connection:Connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestion_task',
})

//Connect a DB

const connect = () =>{
    connection.connect((error) => {
        if(error){
            console.error('Error al conectar a MySQL',error)
            return
        }
    })
    console.log('Conexion exitosa a MySQL')
}

export { connect }