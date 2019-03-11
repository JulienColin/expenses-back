import express, { Router } from 'express';
import Controller from '../app/controller.interface';
import ExpenseDto from './dto/expense.interface';
import ExpenseRepository from './expensesRepository';

const EXPENSES_PATH = '/expenses';

export default class ExpensesController implements Controller {
    public router: express.Router;
    private expenseRepository: ExpenseRepository;

    constructor() {
        this.router = Router();
        this.expenseRepository = new ExpenseRepository();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            EXPENSES_PATH,
            (request, response) => {
                this.expenseRepository.findAll().then(
                    (findAllExpensesResponse) => response.send(findAllExpensesResponse)
                );
            }
        );
        this.router.post(
            EXPENSES_PATH,
            (request, response) => {
                const expense: ExpenseDto = request.body;
                this.expenseRepository.create(expense).then(
                    (createExpenseResponse) => response.send(createExpenseResponse)
                );
            }
        );
        this.router.delete(
            EXPENSES_PATH,
            (request, response) => {
                const id: number = request.query.id;
                this.expenseRepository.delete(id).then(
                    (deleteExpenseResponse) => response.send(deleteExpenseResponse)
                );
            }
        );
    }

}
