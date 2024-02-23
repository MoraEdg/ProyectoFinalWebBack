import {createPool} from 'mysql2/promise'
//CREDENCIALES DE LA BASE DE DATOS
export const pool= createPool ({
    host:'monorail.proxy.rlwy.net',
    user:'root',
    password:'c--5A2HFCAh35Cag6A5d6EGf2e55f3be',
    port:'16245',
    database:'proyectnewsdb'
}) 