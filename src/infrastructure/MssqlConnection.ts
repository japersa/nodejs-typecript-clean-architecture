import sql from 'mssql'
import dotenv from 'dotenv'
import util from 'util'
import { IDBConnection } from '../interfaces/database/IDBConnection'

export class MssqlConnection extends IDBConnection {
  private pool: any

  constructor() {
    super()
    dotenv.config()
    this.pool = new sql.ConnectionPool({
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASSWORD_DEV,
      server: process.env.DB_HOST_DEV,
      database: process.env.DB_NAME_DEV,
    })

    this.pool.connect((error: any) => {
      if (error) {
        if (error === 'ELOGIN') {
          console.error('Login failed.')
        }
        if (error === 'ETIMEOUT') {
          console.error('Connection timeout.')
        }

        if (error === 'EALREADYCONNECTED') {
          console.error('Database is already connected')
        }

        if (error === 'EALREADYCONNECTING') {
          console.error('Already connecting to database!')
        }
        if (error === 'EINSTLOOKUP') {
          console.error('Instance lookup failed.')
        }
        if (error === 'ESOCKET') {
          console.error('Socket error.')
        }
      }
    })
  }

  execute(query: string, params: any = null) {
    // if (params !== null) {
    //   return this.pool.query(query, params);
    // } else {
    //   return this.pool.query(query);
    // }
  }
}
