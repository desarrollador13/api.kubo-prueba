import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { MigratedatabaseDAO } from '../DAO/MigratedatabaseDAO'
import { ServicesDAO } from '../DAO/ServicesDAO'
import requests from 'request-promise'

export default class MigratedatabaseController{
	constructor(
		@Inject private migratedatabaseDAO: MigratedatabaseDAO,
	) {
	}
 /**
  * DEVUELVE SERVICO DE CIUDADES
	**/
	async migracion():Promise<object|any> {
		let res:any;
		try{
			res = await this.migratedatabaseDAO.migracion()
			return res
		}catch(error){
			res = { 'code' :500, 'msg' : 'error'}
			return res
		}
		
	}

}