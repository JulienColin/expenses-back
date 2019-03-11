import Pool from '../app/database';
import TypeDTO from './dto/type.interface';
import Error from '../app/error';
import { QueryResult } from 'pg';

const FIND_ALL_TYPES_ERROR_CODE = 3_1;
const CREATE_TYPE_ERROR_CODE = 4_2;
const DELETE_TYPE_ERROR_CODE = 4_3;

export default class TypesRepository {
    public findAll(): Promise<Error | TypeDTO[]> {
        const query = 'SELECT * FROM type';
        return Pool.query(query)
            .then((response) => this.mapTypes(response))
            .catch((error) => {
                const businessError = new Error(
                    FIND_ALL_TYPES_ERROR_CODE,
                    'Failed to fetch types (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public create(type: TypeDTO): Promise<Error | TypeDTO> {
        const query = 'INSERT INTO type (label) VALUES($1)';
        return Pool.query(query, [type.label])
            .then((response) => type)
            .catch((error) => {
                const businessError = new Error(
                    CREATE_TYPE_ERROR_CODE,
                    'Failed to create type (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public delete(id: number): Promise<Error | QueryResult> {
        const query = 'DELETE FROM type WHERE id=$1';
        return Pool.query(query, [id])
            .catch((error) => {
                const businessError = new Error(
                    DELETE_TYPE_ERROR_CODE,
                    'Failed to delete type with id (' + id + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    private mapTypes(response: any): TypeDTO[] {
        return response.rows.map(
            (row: any) => {
                return this.mapType(row);
            }
        );
    }

    private mapType(row: any): TypeDTO {
        return {
            id: row.id,
            label: row.label,
        };
    }
}
