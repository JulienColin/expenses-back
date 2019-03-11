import express, { Router, response } from 'express';
import Controller from '../app/controller.interface';
import TypeDTO from './dto/type.interface';
import TypesRepository from './typesRepository';

const TYPES_PATH = '/types';

export default class TypesController implements Controller {
    public router: express.Router;
    private typesRepository: TypesRepository;

    constructor() {
        this.router = Router();
        this.typesRepository = new TypesRepository();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            TYPES_PATH,
            (request, getResponse) => {
                this.typesRepository.findAll().then(
                   (findAllTypesResponse) => getResponse.send(findAllTypesResponse)
                );
            }
        );
        this.router.post(
            TYPES_PATH,
            (request, postResponse) => {
                const type: TypeDTO = request.body;
                this.typesRepository.create(type).then(
                    (createTypeResponse) => postResponse.send(createTypeResponse)
                );
            }
        );
        this.router.delete(
            TYPES_PATH,
            (request, deleteResponse) => {
                const id: number = request.query.id;
                this.typesRepository.delete(id).then(
                    (deleteTypeResponse) => deleteResponse.send(deleteTypeResponse)
                );
            }
        );
    }

}
