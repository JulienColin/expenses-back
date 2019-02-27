import bodyParser = require('body-parser');
import express from 'express';
import Controller from './controller.interface';
import { logger } from './logger.middleware';

export default class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddleWares();
        this.initialzeController(controllers);
    }

    public listen() {
        this.app.listen(
            this.port,
            () => console.log(`Expenses manager backend application listening on ${this.port}`)
        );
    }

    private initializeMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(logger);
    }

    private initialzeController(controllers: Controller[]) {
        controllers.forEach(
            (controller) => this.app.use('/', controller.router)
        );
    }
}
