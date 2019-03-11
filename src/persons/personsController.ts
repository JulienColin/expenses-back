import express, { Router, response } from 'express';
import Controller from '../app/controller.interface';
import PersonDTO from './dto/person.interface';
import PersonsRepository from './personsRepository';

const PERSONS_PATH = '/persons';

export default class PersonsController implements Controller {
    public router: express.Router;
    private personsRepository: PersonsRepository;

    constructor() {
        this.router = Router();
        this.personsRepository = new PersonsRepository();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            PERSONS_PATH,
            (request, getResponse) => {
                this.personsRepository.findAll().then(
                   (findAllPersonsResponse) => getResponse.send(findAllPersonsResponse)
                );
            }
        );
        this.router.post(
            PERSONS_PATH,
            (request, postResponse) => {
                const person: PersonDTO = request.body;
                this.personsRepository.create(person).then(
                    (createPersonResponse) => postResponse.send(createPersonResponse)
                );
            }
        );
        this.router.delete(
            PERSONS_PATH,
            (request, deleteResponse) => {
                const id: number = request.query.id;
                this.personsRepository.delete(id).then(
                    (deletePersonResponse) => deleteResponse.send(deletePersonResponse)
                );
            }
        );
    }

}
