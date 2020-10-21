//import mysql from 'mysql';
import { Pool } from 'pg'
import { Singleton } from 'typescript-ioc';
import config from '../config';
/**
 * @category Database
 */
@Singleton
export default class DatabaseConnection {
  constructor() {}
  public async getPool() {
    let connection
      connection = new Pool({
        host:'localhost',
        user:'postgres',
        database:'kubo',
        password:'admin',
        //port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })
    return connection 
  }
}