import App from './app/app';
import ExpensesController from './expenses/exprensesController';
import PersonsController from './persons/personsController';
import CategoriesController from './categories/categoriesController';
import TypesController from './types/typesController';

const PORT = parseInt(process.env.port, 0) || 3000;
const app = new App(
    [
        new ExpensesController(),
        new PersonsController(),
        new CategoriesController(),
        new TypesController()
    ],
    PORT
);
app.listen();
