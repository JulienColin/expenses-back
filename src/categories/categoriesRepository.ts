import Pool from '../app/database';
import Category from './domain/category.interface';
import Error from '../app/error';
import { QueryResult } from 'pg';

const FIND_ALL_ERROR_CODE = 2_1;
const CREATE_ERROR_CODE = 2_2;
const DELETE_ERROR_CODE = 2_3;

export default class CategoriesRepository {
    public findAll(): Promise<Error | Category[]> {
        const query = 'SELECT c.id, c.label, t.id as typeId, t.label as typeLabel FROM category c JOIN type t ON c.type = t.id';
        return Pool.query(query)
            .then((response) => this.mapCategories(response))
            .catch((error) => {
                const businessError = new Error(
                    FIND_ALL_ERROR_CODE,
                    'Failed to fetch categories (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public create(person: Category): Promise<Error | Category> {
        const query = 'INSERT INTO person (firstname, lastname) VALUES($1, $2)';
        return Pool.query(query, [person.firstName, person.lastName])
            .then((response) => this.mapPerson(response))
            .catch((error) => {
                const businessError = new Error(
                    CREATE_ERROR_CODE,
                    'Failed to create person (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public delete(id: number): Promise<Error | QueryResult> {
        const query = 'DELETE FROM person WHERE id=$1';
        return Pool.query(query, [id])
            .catch((error) => {
                const businessError = new Error(
                    DELETE_ERROR_CODE,
                    'Failed to delete person with id (' + id + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    private mapCategories(response: any): Category[] {
        return response.rows.map(
            (row: any) => {
                return this.mapCategory(row);
            }
        );
    }

    private mapCategory(row: any): Category {
        return {
            id: row.id,
            label: row.label,
            type : {
                id: row.typeId,
                label: row.typeLabel
            }
        };
    }
}
