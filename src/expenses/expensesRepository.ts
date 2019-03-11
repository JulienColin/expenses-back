import Pool from '../app/database';
import ExpenseDTO from './dto/expense.interface';
import Error from '../app/error';
import { QueryResult } from 'pg';

const FIND_ALL_EXPENSES_ERROR_CODE = 4_1;
const CREATE_EXPENSE_ERROR_CODE = 4_2;
const DELETE_EXPENSE_ERROR_CODE = 4_3;

export default class ExpensesRepository {
    public findAll(): Promise<Error | ExpenseDTO[]> {
        const query = 'SELECT * FROM expense';
        return Pool.query(query)
            .then((response) => this.mapExpenses(response))
            .catch((error) => {
                const businessError = new Error(
                    FIND_ALL_EXPENSES_ERROR_CODE,
                    'Failed to fetch expenses (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public create(expense: ExpenseDTO): Promise<Error | ExpenseDTO> {
        const query = 'INSERT INTO expense (date, amount, spender, category) VALUES($1, $2, $3, $4)';
        return Pool.query(query, [expense.date, expense.amount, expense.spenderId, expense.categoryId])
            .then((response) => expense)
            .catch((error) => {
                const businessError = new Error(
                    CREATE_EXPENSE_ERROR_CODE,
                    'Failed to create expense (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public delete(id: number): Promise<Error | QueryResult> {
        const query = 'DELETE FROM expense WHERE id=$1';
        return Pool.query(query, [id])
            .catch((error) => {
                const businessError = new Error(
                    DELETE_EXPENSE_ERROR_CODE,
                    'Failed to delete expense with id (' + id + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    private mapExpenses(response: any): ExpenseDTO[] {
        return response.rows.map(
            (row: any) => {
                return this.mapExpense(row);
            }
        );
    }

    private mapExpense(row: any): ExpenseDTO {
        return {
            id: row.id,
            date: row.date,
            amount: row.amount,
            spenderId: row.spender,
            categoryId: row.category
        };
    }
}
