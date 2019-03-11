import express, { Router, response } from 'express';
import Controller from '../app/controller.interface';
import CategoryDTO from './dto/category.interface';
import CategoriesRepository from './categoriesRepository';

const CATEGORIES_PATH = '/categories';

export default class CategoriesController implements Controller {
    public router: express.Router;
    private categoriesRepository: CategoriesRepository;

    constructor() {
        this.router = Router();
        this.categoriesRepository = new CategoriesRepository();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            CATEGORIES_PATH,
            (request, getResponse) => {
                this.categoriesRepository.findAll().then(
                   (findAllCategoriesResponse) => getResponse.send(findAllCategoriesResponse)
                );
            }
        );
        this.router.post(
            CATEGORIES_PATH,
            (request, postResponse) => {
                const category: CategoryDTO = request.body;
                this.categoriesRepository.create(category).then(
                    (createCategoryResponse) => postResponse.send(createCategoryResponse)
                );
            }
        );
        this.router.delete(
            CATEGORIES_PATH,
            (request, deleteResponse) => {
                const id: number = request.query.id;
                this.categoriesRepository.delete(id).then(
                    (deleteCategoryResponse) => deleteResponse.send(deleteCategoryResponse)
                );
            }
        );
    }

}
