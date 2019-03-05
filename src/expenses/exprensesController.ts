import express, { Router } from 'express';
import Controller from '../app/controller.interface';
import Expense from './domain/expense.interface';
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
            (request, response) => response.send(
                this.expenseRepository.findAll()
            )
        );
        this.router.post(
            EXPENSES_PATH,
            (request, response) => {
                const expense: Expense = request.body;
                this.expenseRepository.add(expense);
                response.send(expense);
            }
        );
    }

}
