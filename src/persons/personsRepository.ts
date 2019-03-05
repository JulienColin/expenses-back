import Pool from '../app/database';
import Person from './domain/person.interface';
import Error from '../app/error';
import { QueryResult } from 'pg';

const FIND_ALL_ERROR_CODE = 1_1;
const CREATE_ERROR_CODE = 1_2;
const DELETE_ERROR_CODE = 1_3;

export default class PersonsRepository {
    public findAll(): Promise<Error | Person[]> {
        const query = 'SELECT * FROM person;';
        return Pool.query(query)
            .then((response) => this.mapPersons(response))
            .catch((error) => {
                const businessError = new Error(
                    FIND_ALL_ERROR_CODE,
                    'Failed to fetch persons (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public create(person: Person): Promise<Error | Person> {
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

    private mapPersons(response: any): Person[] {
        return response.rows.map(
            (row: any) => {
                return this.mapPerson(row);
            }
        );
    }

    private mapPerson(row: any): Person {
        return {
            id: row.id,
            firstName: row.firstname,
            lastName: row.lastname
        };
    }
}
