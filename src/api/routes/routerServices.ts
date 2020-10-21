import { Request, Response, NextFunction, Router } from 'express'
import ServicesController from '../../controllers/servicesController'
import { Container } from "typescript-ioc";
import MigratedatabaseController from '../../controllers/MigratedatabaseController' 
const multipart = require('connect-multiparty')
const fs = require('fs');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

export default class routerServices {
  public app:Router
  multipartMiddleware:any
  upload:any
  type:any
  constructor(router: Router) {
    this.app = router
    this.multipartMiddleware = multipart() // multipart({
    //      uploadDir: './src/uploads'
    //   })
  }

  router(): void {

    this.app.get(
      '/services/peliculas/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.listarPeliculas()
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/peliculas/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController);
        let responseModel = await servicesController.guardarDatos(req.body)
        res.status(200).json(responseModel);
      }
    )

   this.app.get(
      '/services/categorias/',
      async (req: Request, res: Response, next: NextFunction) => {
          const servicesController:ServicesController = Container.get(ServicesController);
          let responseModel = await servicesController.listarCategorias()
          res.status(200).json(responseModel);
      }
    )

    this.app.get(
      '/services/migrate/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const migratedatabaseController: MigratedatabaseController = Container.get(MigratedatabaseController);
          let responseModel = await migratedatabaseController.migracion();
          res.status(200).json(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
    )

  this.app.get(
      '/services/schema/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const servicesController: ServicesController = Container.get(ServicesController)
          //let responseModel = await servicesController.guardarDatos1();
          let responseModel = await servicesController.listarSchema()
          res.status(200).json(responseModel)
        } catch (error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/services/bases/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const servicesController: ServicesController = Container.get(ServicesController)
          let responseModel = await servicesController.listarBases()
          res.status(200).json(responseModel)
        } catch (error) {
          console.log(error)
        }
      }
    )
  }
}