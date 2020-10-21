import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { ServicesDAO } from '../DAO/ServicesDAO'
import requests from 'request-promise'
const multipart= require('connect-multiparty')
const fs= require('fs');
const csv= require('csvtojson')
const csvToJson= require('convert-csv-to-json')
const getStream = require('get-stream')
const parse = require('csv-parse')
const csv1 = require('fast-csv')



export default class ServicesController {
	resValidacionArc:Array<any>|any
	constructor(
		@Inject private servicesDAO: ServicesDAO,
	) {
		this.resValidacionArc= []
	}
 /** **/
 	async listarPeliculas(): Promise<any> {
 		let res:any
 		try{
 			res = await this.servicesDAO.listarPeliculas()
			return res
 		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
 	}


/**************************GUARDAR DATOS**************************/
	async guardarDatos(requets:object|any):Promise<any> {
		let res:any
		try{
			const {Imagen, Titulo , Descripcion , Duracion , Trailer, FechaEstreno, IdCategotria} = requets

			if(!Imagen  && !Titulo && !Descripcion  && 
				 !Duracion && !Trailer && !FechaEstreno && !IdCategotria){
				return {status: 400, msg: 'bad request' }
			}

			if(Imagen == '' && Titulo == '' && Descripcion == '' && 
				 Duracion == '' && Trailer == '' && FechaEstreno == '' && IdCategotria == '' ){
				return {status: 400, msg: 'bad request' }
			}

			for(let x=0; x < IdCategotria.length; x++){

				let query:any =  `INSERT INTO public."PeliculaS" ("Imagen", "Titulo", "Descripcion", "Duracion", 
													"Trailer", "FechaEstreno", "IdCategotria") VALUES
													('${Imagen}', '${Titulo}','${Descripcion}','${Duracion}','${Trailer}',
													 '${FechaEstreno}','${IdCategotria[x]}')`
				console.log(query)

				res = await this.servicesDAO.guardarDatos(query)
				if(res.status == 500){
					return res
				}
				if(res.status == 400){
					return res
				}
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
		
	}
	
	async listarCategorias():Promise<any> {
		let res:any;
		try{
			res = await this.servicesDAO.listarCategorias()
			return res
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

	async listarSchema():Promise<any> {
		let res:any;
		try{
			res = await this.servicesDAO.listarSchema()
			return res
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

	async listarBases():Promise<any> {
		let res:any;
		try{
			res = await this.servicesDAO.listarBases()
			return res
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

}
