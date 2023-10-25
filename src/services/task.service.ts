import { createQuery } from '../libs/query'
export const getAllTask = async (id:number | string) =>{
    try {
        const tasks = await createQuery(`SELECT * FROM task where user_id = ${id}  `)
        return tasks
    } catch (error:any) {
        return error        
    }

}

export const getOneTask = async (id:number | string)=>{
    try {
        const task = await createQuery(`SELECT * FROM task WHERE id = ${id};`)
        return task
    } catch (error) {
        return error
    }
}

export const createTaskService = async (bodyTask:{title:string,description:string},id:number | string) =>{
    const { title, description } = bodyTask
    try {
        await createQuery(`INSERT INTO task(title,description,user_id) VALUES('${title}','${description}',${id});`)
        return {
            message:'task create '
        }
    } catch (error) {
        return error
    }
}

export const deleteTaskService = async (id:string) => {
    try {
        await createQuery(`DELETE FROM task WHERE id = ${id}`)
        return {
            message:'The register was delete'
        }
    } catch (error) {
        return error
    }
}