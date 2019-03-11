import Pool from '../app/database';
import CategoryDTO from './dto/category.interface';
import Error from '../app/error';
import { QueryResult } from 'pg';

const FIND_ALL_CATEGORIES_ERROR_CODE = 2_1;
const CREATE_CATEGORY_ERROR_CODE = 2_2;
const DELETE_CATEGORY_ERROR_CODE = 2_3;

export default class CategoriesRepository {
    public findAll(): Promise<Error | CategoryDTO[]> {
        const query = 'SELECT * FROM category';
        return Pool.query(query)
            .then((response) => this.mapCategories(response))
            .catch((error) => {
                const businessError = new Error(
                    FIND_ALL_CATEGORIES_ERROR_CODE,
                    'Failed to fetch categories (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public create(category: CategoryDTO): Promise<Error | CategoryDTO> {
        const query = 'INSERT INTO category (label, type) VALUES($1, $2)';
        return Pool.query(query, [category.label, category.typeId])
            .then((response) => category)
            .catch((error) => {
                const businessError = new Error(
                    CREATE_CATEGORY_ERROR_CODE,
                    'Failed to create category (' + error + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    public delete(id: number): Promise<Error | QueryResult> {
        const query = 'DELETE FROM category WHERE id=$1';
        return Pool.query(query, [id])
            .catch((error) => {
                const businessError = new Error(
                    DELETE_CATEGORY_ERROR_CODE,
                    'Failed to delete category with id (' + id + ')'
                );
                businessError.print();
                return businessError;
            });
    }

    private mapCategories(response: any): CategoryDTO[] {
        return response.rows.map(
            (row: any) => {
                return this.mapCategory(row);
            }
        );
    }

    private mapCategory(row: any): CategoryDTO {
        return {
            id: row.id,
            label: row.label,
            typeId : row.type
        };
    }
}
