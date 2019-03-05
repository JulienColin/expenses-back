import Person from '../../persons/domain/person.interface';
import Category from '../../categories/domain/category.interface';

export default interface Expense {
    spender: Person;
    date: Date;
    category: Category;
    amount: number;
}
