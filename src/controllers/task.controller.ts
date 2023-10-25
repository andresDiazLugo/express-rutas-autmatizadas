import { Request,Response } from 'express'
import { getAllTask,getOneTask, createTaskService, deleteTaskService } from '../services/task.service'
import { handleHttp } from '../utils/error.handle'
export async function getTasks(req:Request,res:Response){
    const { user } = req
    console.log(user)
    try {
        if( user !== undefined){ 
            const response = await getAllTask(user);
            console.log(response)
            res.status(200).json(response)
            return
        }
        throw new Error('Hubo un error no se puede encontrar las tareas del usuario correspondiente')
    } catch (error:any) {
        if('message' in error){
            handleHttp(res,error.message as string)
        }else{
            handleHttp(res,'Surgio un error al buscar las tareas')
        }
    }
}
export  async function getTask(req:Request,res:Response){
    const { id } = req.params
    try {
        const response = await getOneTask(id)
        res.status(200).json(response)
    } catch (error:any) {
        if('message' in error){
            handleHttp(res,error.message as string)
        }else{
            handleHttp(res,'Surgio un error al buscar una tarea')
        }
    }
}
export async function createTask(req:Request,res:Response){
    const { user } = req
    try {
        if(user !== undefined){
            const response = await createTaskService(req.body,user)
            res.status(200).json(response)
            return
        }
        throw new Error('Ocurred a error to the create a task')
    } catch (error:any) {
        if('message' in error){
            handleHttp(res,error.message as string)
        }else{
            handleHttp(res,'Surgio un error al crear una tarea')
        }
    }
}

export async function deleteTask(req:Request,res:Response){
    const { id } = req.params
    try {
        const response = await deleteTaskService(id)
        res.status(200).json(response)
    } catch (error:any) {
        if('message' in error){
            handleHttp(res,error.message as string)
        }else{
            handleHttp(res,'Surgio un error al eliminar una tarea')
        }
    }
}