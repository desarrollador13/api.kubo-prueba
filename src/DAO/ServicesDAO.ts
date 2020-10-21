import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc";

export class ServicesDAO {

	constructor(
		@Inject private databaseConnection: Conection
	) { }

	/**
	@router 
    **/
	public async guardarDatos(query:Array<any>|any):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  let result:any
				result=await connection.query(`${query}`)
			if(result.rowCount > 0 ){
				data = { 'status' :201, 'msg' : 'proceso exitoso'} 
			}else{
				data = { 'status' :400, 'rows' : 'bad request'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async listarPeliculas():Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT pe."Id", "Imagen", "Titulo", "Descripcion", "Duracion", 
																								"Trailer", "FechaEstreno", "IdCategotria", ca."NombreCategoria"
																								FROM public."Pelicula" pe
																								INNER JOIN public."Categoria" ca ON pe."IdCategotria" = ca."Id";`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :200, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}

	}

	public async listarSchema():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT table_schema, table_name
														FROM information_schema.tables
														ORDER BY table_name;`);
			//console.log('--- query',query)
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async listarBases():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT datname FROM pg_database;`);
			//console.log('--- query',query)
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}


	public async listarCategorias():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Id", "NombreCategoria" FROM  public."Categoria";`);
			//console.log('--- query',query)
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}
}