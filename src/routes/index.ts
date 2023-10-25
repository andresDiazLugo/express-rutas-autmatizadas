import { Router } from "express";
import { readdirSync } from 'fs' // leer directorio

const PATH_ROUTER = `${__dirname}` //nos va a devolver la ruta absoluta
const router = Router()

const cleanFileName = (fileName:string)=>{
    const file = fileName.split('.').shift()
    return file
}

readdirSync(PATH_ROUTER).filter((filename)=>{
    const cleanName = cleanFileName(filename)
    if(cleanName !== 'index') {
        import(`./${cleanName}`).then((moduleRouter)=>{
            console.log(`Se esta cargando la ruta ... /${cleanName} `)
            router.use(`/${cleanName}`,moduleRouter.router)// basicamente estoy convirtiendolo en una ruta accediendo a la propiedad de router de la importacion dinamica
        })
    }
    console.log(filename)// esto nos muestra el nombre de los archivos
})// esta funcion se va a encargar de leer los archivos


export { router }