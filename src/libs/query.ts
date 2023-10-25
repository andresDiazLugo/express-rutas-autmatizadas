import { connection } from '../db/db'

export function createQuery(query:string){
    return new Promise((resolve,reject)=>{
        connection.query(
            query,
            function(err, results,fields){
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            }
        )
    })
}