import App from './app/app';
import ExpensesController from './expenses/controller';

const PORT = parseInt(process.env.port, 0) || 3000;
const app = new App(
    [
        new ExpensesController()
    ],
    PORT
);
app.listen();
