import Expense from './domain/expense.interface';

export default class ExpenseRepository {
    private expenses: Expense[];

    constructor() {
        this.expenses = [
            {
                amount : 500,
                category : {
                    label: 'courses',
                    type: { label : 'necessity' }
                },
                date : new Date(),
                spender : { firstName : 'Yunhye', lastName: 'Jang' }
            },
            {
                amount : 30,
                category : {
                    label: 'bar',
                    type: { label : 'leisure' }
                },
                date : new Date(),
                spender : { firstName : 'Julien', lastName: 'Colin' }
            }
        ];
    }

    public findAll(): Expense[] {
        return this.expenses;
    }

    public add(expense: Expense): void {
        this.expenses.push(expense);
    }
}
