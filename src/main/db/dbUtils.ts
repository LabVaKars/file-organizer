// import {Database, OPEN_READWRITE, OPEN_CREATE} from 'sqlite3'
import knex from 'knex';

export const dbPath = './mysqlite.db'
export const knSqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: dbPath
    },
    useNullAsDefault: true
});

// export function getDBConnection(dbPath: string){
//     console.log('Opening DB');
//     console.log(Database)
//     let db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, (err:any) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log('Connected to the SQlite database.');
//     });
//     return db
// }

// export function closeDBConnection(db: any){
//     db.close((err: any) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log('Close the database connection.');
//     });
// }