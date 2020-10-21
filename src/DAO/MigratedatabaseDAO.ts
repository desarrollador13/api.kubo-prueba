import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc";
import { Pool, Client }  from 'pg'
const colog = require('colog')

export class MigratedatabaseDAO {
	private hostNameLocal:string|any
	private hostDocker:string|any
	private hostdatabase:string|any

	private hostNameLocalD:string|any
	private hostDockerD:string|any
	private hostdatabaseD:string|any
	constructor(
		@Inject private databaseConnection: Conection
		
	) { 
		this.hostNameLocal=`postgresql://postgres:admin@localhost`
		this.hostDocker=`postgresql://postgres:admin@database`
		this.hostdatabase = this.hostNameLocal

		this.hostNameLocalD=`postgresql://postgres:admin@localhost/prueba_app`
		this.hostDockerD=`postgresql://postgres:admin@database/prueba_app`
		this.hostdatabaseD = this.hostNameLocalD

	}
	/**
	@router 
    **/
   	async migracion():Promise<object|any> {
   		let resval:object|any = {}
   		let resdb:object|any = {}
   		let restab:object|any = {}
   		let resins:object|any = {}

   		resval= await this.eliminardatabase()
   		console.log('resval',resval)
   		if(resval.code==201){
   			return resval
   		}

   		//ESTE METODO NO SE EJECUTA
   		// resval= await this.validarcreateDataBase()
   		// console.log('resval',resval)
   		// if(resval.code==201){
   		// 	return resval
   		// }

   		resdb= await this.createDataBase()
   		console.log('resdb',resdb)
   		if(resdb.code==500){
   	    	return resdb
   		}
 		
   		restab=await this.createTables()
   		console.log('resdb',restab)
   		if(restab.code==500){
   			return restab
   		}
   		
   		resins=await this.insertTable()
   		console.log('resdb',resins)
   		return resins
    }
    async eliminardatabase():Promise<object|any>{
    	const connectionString = this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		try{
			colog.success('***************************************')
			colog.success('************DROP DATABASE************')
			colog.success('***************************************')
			let res:object|any={}
			let des:object|any={}

			des = await pool.query(`SELECT	pg_terminate_backend (pid)
									FROM	pg_stat_activity
									WHERE	pg_stat_activity.datname = 'prueba_app';`)

			colog.success('***********desconet data base**************')
			console.log(des.rows)
			colog.success('***********desconet data base**************')

			res = await pool.query(`DROP DATABASE IF EXISTS prueba_app;`)
			colog.success('***********DROP data base***********')
			console.log(res.rows)
			colog.success('***********DROP data base***********')
			if(res.rowCount == null){
				return {code: 200, msg:'ok_sig'}
			}else{
				return {code: 201, msg:'migrate database ya fue generado'}
			}
		}catch(error){
			console.log(error,'error DROP database')
			return {code: 500, msg:'migrate database ya se realizo'}
		}
    }

    async validarcreateDataBase ():Promise<object|any> {
    	const connectionString = this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		try{
			let res:object|any={}
			res = await pool.query(`SELECT datname FROM pg_database WHERE datname='prueba_app';`)
			colog.success('----------select data base--------------')
			console.log(res.rows)
			colog.success('-----------select data base-------------')
			if(res.rowCount == 0){
				return {code: 200, msg:'ok_sig'}
			}else{
				return {code: 201, msg:'migrate database ya fue generado'}
			}
		}catch(error){
			console.log(error,'error migrar')
			return {code: 500, msg:'migrate database ya se realizo'}
		}	 
    }

    async createDataBase ():Promise<object|any> {
    	colog.success('***************************************')
		colog.success('************CREATE DATABASE************')
		colog.success('***************************************')
		const connectionString =  this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let res:object|any={}
		try{
			res = await pool.query(`CREATE DATABASE prueba_app
							    WITH 
							    OWNER = postgres
							    ENCODING = 'UTF8'
							    TABLESPACE = pg_default
							    CONNECTION LIMIT = -1;`)
			colog.success('----------create data base--------------')
			console.log(res.rows)
			colog.success('-----------create data base-------------')
			pool.end() 
			if(res.rowCount == null || res.rowCount == 'null'){
				return {code: 200, msg:'migrate database Exitoso'}
			}else{
				return {code: 200, msg:'migrate database ya se realizo'}
			} 
		}catch(error){
			colog.success(error,'error migrar')
			return res={code:500, msg:'migrate database ya se realizo'}
		}
		
	}

	async createTables():Promise<object|any> {
		const connectionString = this.hostdatabaseD  //`postgresql://postgres:admin@localhost/ban_colombia` //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resc:object|any={}
		let resu:object|any={}

		let rese:object|any={}
		let resd:object|any={}

		let rest:object|any={}
		let resf:object|any={}
		let resg:object|any={}
		
		let tabl:object|any={}
		
		try{
			colog.success('***************************************')
			colog.success('************CREATE TABLE***************')
			colog.success('***************************************')
			resc=await pool.query(`CREATE SEQUENCE public."TableType_Id_seq"
									INCREMENT 1
									START 1
									MINVALUE 1
									MAXVALUE 9223372036854775807
									CACHE 1;
									ALTER SEQUENCE public."TableType_Id_seq"
									OWNER TO postgres;`)
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(resc.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')
		
		// CREATE TABLE IF NOT EXISTS test_table(_id bigint primary key, co2_field v
		// 	archar(40) NOT NULL, temp_field int NOT NULL, quality_field decimal NOT NULL, reading_time_field timestamp NULL)

			resu=await pool.query(`CREATE TABLE IF NOT EXISTS public."TableType"
														(
														  "Id" integer NOT NULL DEFAULT nextval('"TableType_Id_seq"'::regclass),
														  "Name" text COLLATE pg_catalog."default" NOT NULL,
														  CONSTRAINT "TableType_pkey" PRIMARY KEY ("Id")
														)
														WITH (
														  OIDS = FALSE
														)
														TABLESPACE pg_default;
														ALTER TABLE public."TableType"
														OWNER to postgres;`)
			colog.success('----------CREATE TABLE base--------------')
			//console.log(resu.rows)
			colog.success('-----------CREATE TABLE base-------------')

			rese=await pool.query(`CREATE SEQUENCE public."TableStructure_Id_seq"
													    INCREMENT 1
													    START 1
													    MINVALUE 1
													    MAXVALUE 9223372036854775807
													    CACHE 1;

															ALTER SEQUENCE public."TableStructure_Id_seq"
													    OWNER TO postgres;`)
			
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(rese.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')

			resd=await pool.query(`CREATE TABLE IF NOT EXISTS public."TableStructure"
														(
														  "Id" integer NOT NULL DEFAULT nextval('"TableStructure_Id_seq"'::regclass),
														  "TableTypeId" integer,
														  "Header" text COLLATE pg_catalog."default",
														  "dataType" text  COLLATE pg_catalog."default",
														  format text COLLATE pg_catalog."default" DEFAULT NULL::text,
														  required bit(1),
														  CONSTRAINT "TableStructure_pkey" PRIMARY KEY ("Id"),
														  CONSTRAINT "TableStructure_TableTypeId_fkey" FOREIGN KEY ("TableTypeId")
														    REFERENCES public."TableType" ("Id") MATCH SIMPLE
														    ON UPDATE NO ACTION
														    ON DELETE NO ACTION
														)
														WITH (
														    OIDS = FALSE
														)
														TABLESPACE pg_default;
														ALTER TABLE public."TableStructure"
														OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')
			//console.log(resf.rows)
			colog.success('-----------CREATE TABLE base-------------')

			rest=await pool.query(`CREATE TABLE IF NOT EXISTS public."TableData1"
														(
													    "T1C1" integer NOT NULL,
													    "T1C2" text COLLATE pg_catalog."default" NOT NULL,
													    "T1C3" integer,
													    "T1C4" date
														)
														WITH (
														  OIDS = FALSE
														)
														TABLESPACE pg_default;
														ALTER TABLE public."TableData1"
														OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			colog.success('-----------CREATE TABLE base-------------')

			resf=await pool.query(`CREATE TABLE IF NOT EXISTS public."TableData2"
														(
														  "T2C1" integer NOT NULL,
														  "T2C2" text COLLATE pg_catalog."default" NOT NULL,
														  "T2C3" integer,
														  "T2C4" date,
														  "T2C5" integer
														)
														WITH (
														  OIDS = FALSE
														)
														TABLESPACE pg_default;

														ALTER TABLE public."TableData2"
														OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			colog.success('-----------CREATE TABLE base-------------')

			resg=await pool.query(`CREATE TABLE IF NOT EXISTS public."TableData3"
														(
														  "T3C1" integer NOT NULL,
														  "T3C2" text COLLATE pg_catalog."default" NOT NULL,
														  "T3C3" date
														)
														WITH (
														  OIDS = FALSE
														)
														TABLESPACE pg_default;
														ALTER TABLE public."TableData3"
														OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			tabl=await pool.query(`SELECT table_schema, table_name
									FROM information_schema.tables
									where table_schema = 'public'
									ORDER BY table_name;`)

			//colog.success('%c Oh my heavens! ', 'color: #bada55','more text');
			colog.success('---------ROWS TABLE---------------')
			console.log(tabl.rows)
			pool.end()
			return {code: 200, msg:'migrate tablas exitosas'}
		}catch(error){
			console.log(error,'oooooo')
			return {code: 500, msg:'migrate tabla ya se ejecuto'}
		
		}
	}

	async  insertTable():Promise<object|any> {

		const connectionString =  this.hostdatabaseD //`postgresql://postgres:admin@localhost/ban_colombia`//this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resIu1:object|any={}
		let resIu2:object|any={}
		let resIu3:object|any={}
		let resIu4:object|any={}
		let resIu5:object|any={}
		let resIu6:object|any={}
		let resIu7:object|any={}
		let prue:object|any={}
		try{
			colog.success('***************************************')
			colog.success('************INSERT TABLE***************')
			colog.success('***************************************')
			let arrayIns1:Array<any>=[]
			let arrayIns2:Array<any>=[]
			let arrayIns3:Array<any>=[]
			let arrayIns4:Array<any>=[]
			let arrayIns5:Array<any>=[]
			arrayIns1=[
				`INSERT INTO public."TableType"("Name") VALUES ('Tabla 1');`,
				`INSERT INTO public."TableType"("Name") VALUES ('Tabla 2');`,
				`INSERT INTO public."TableType"("Name") VALUES ('Tabla 3');`
			]

			arrayIns2=[
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (1, 'T1C1' , 'Int', '1');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (1, 'T1C2' , 'String', '1');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (1, 'T1C3' , 'Int', '0');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "format", "required") VALUES (1, 'T1C4' , 'Date', 'YYYY-MM-DD', '0');`,
			]

			arrayIns3=[
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (2, 'T2C1' , 'String', '1');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (2, 'T2C2' , 'String', '0');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (2, 'T2C3' , 'Int', '0');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "format", "required") VALUES (2, 'T2C4' , 'Date', 'YYYY-MM-DD', '1');`,
				`INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (2, 'T2C5' , 'Number', '1');`
			]

			arrayIns4=[
			 `INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (3, 'T3C1' , 'Int', '1');`,
			 `INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "required") VALUES (3, 'T3C2' , 'String', '1');`,
			 `INSERT INTO public."TableStructure"("TableTypeId", "Header", "dataType", "format", "required") VALUES (3, 'T3C3' , 'Date', 'HH:mm:ss', '1');`
			]

			for(let x in arrayIns1){
				//console.log(arrayIns1[x],`insert ${x}`)
				resIu1=await pool.query(`${arrayIns1[x]}`)
			}
			for(let x in arrayIns2){
				//console.log(arrayIns2[x],`insert ${x}`)
				resIu2=await pool.query(`${arrayIns2[x]}`)
			}
			for(let x in arrayIns3){
				//console.log(arrayIns3[x],`insert ${x}`) 
				resIu3=await pool.query(`${arrayIns3[x]}`)
			}
			for(let x in arrayIns4){
				//console.log(arrayIns4[x],`insert ${x}`)
				resIu4=await pool.query(`${arrayIns4[x]}`)
			}

			resIu5=await pool.query(`INSERT INTO public."TableData1"("T1C1", "T1C2", "T1C3", "T1C4") 
														VALUES ($1,$2,$3,$4)`, [1,	'PRUEBA', 10, '2020-08-28'])

			resIu6=await pool.query(`INSERT INTO public."TableData2"("T2C1", "T2C2", "T2C3", "T2C4", "T2C5") 
													    VALUES  ($1,$2,$3,$4,$5)`,[2,	'PRUEBA', 10, '2020-08-28', 11]);

			resIu7=await pool.query(`INSERT INTO public."TableData3"("T3C1", "T3C2", "T3C3") 
														VALUES ($1,$2,$3)`,[3, 'PRUEBA', '2020-08-28']);
			
			prue=await pool.query(`SELECT "T1C1", "T1C2", "T1C3" FROM public."TableData1";`)

			colog.success('************ROWS INSERT TABLES*************')
			console.log(prue.rows)

			return {code:200, msg:'migrate exitoso'}
			pool.end()	
		}catch(error){
			console.log(error,'error migrar')
			return {code:500, msg:'migrate error tablas'}
		}
	}
}