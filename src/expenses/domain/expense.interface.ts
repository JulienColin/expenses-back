import ExpenseCategory from './expenseCategory.interface';
import Person from './person.interface';

export default interface Expense {
    spender: Person;
    date: Date;
    category: ExpenseCategory;
    amount: number;
}
