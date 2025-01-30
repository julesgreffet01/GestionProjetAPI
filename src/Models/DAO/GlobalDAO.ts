import connectDB from "../../Config/dbConfig";

abstract class GlobalDAO {

    abstract getTableName(): string;

    abstract objectToClass(row: object): object;

    static async getAll(): Promise<object[] | null> {
        const client = await connectDB();

        try {
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM $1 WHERE del = FALSE`;
            const { rows } = await client.query(query, [tableName]);
            return rows.map((row) => this.prototype.objectToClass(row));
        } catch (e){
            return null;
        } finally {
            client.release();
        }
    }

    static async forceGetAll(): Promise<object[] | null> {
        const client = await connectDB();

        try {
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM $1`;
            const { rows } = await client.query(query, [tableName]);
            return rows.map((row) => this.prototype.objectToClass(row));
        } catch (e){
            return null;
        } finally {
            client.release();
        }
    }

    /*
    static async find(id: number): Promise<object | null> {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            let query = `SELECT * FROM ${tableName} WHERE id = ${id}`;
            const result = await client.query(query);
            if (result.rows.length === 0) {
                return null;
            } else if (result.rows.length === 1) {
                return this.prototype.objectToClass(result.rows[0]);
            } else {
                return result.rows.map(row => this.prototype.objectToClass(row));
            }
        } finally {
            client.release();
        }
    }
     */

    static async create(data: any):Promise<object | null> {
        const client = await connectDB();
        try {
            if (typeof data.toBDD !== "function") {
                return null;
            }

            const tableName = this.prototype.getTableName(); // Obtenir le nom de la table
            const dataObject = data.toBDD();

            const columns = Object.keys(dataObject).join(", ");
            const placeholders = Object.keys(dataObject).map((_, i) => `$${i + 1}`).join(", ");
            const values = Object.values(dataObject);

            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING id`;

            const result = await client.query(query, values);
            const lastInsertId = result.rows[0].id;

            // Mettre à jour l'objet avec l'ID retourné
            if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(data), "id")?.set) {
                data.id = lastInsertId;
            }

            return this.prototype.objectToClass(data);
        } catch (e) {
            return null;
        } finally {
            client.release();
        }
    }


    static async update(data: any): Promise<number | null> {
        const client = await connectDB();
        try {
            if (typeof data.toBDD !== "function") {
                return null;
            }

            const dataObject = data.toBDD();
            if (!data.id) {
                return null;
            }

            const tableName = this.prototype.getTableName();

            const setClause = Object.keys(dataObject)
                .map((key, index) => `${key} = $${index + 1}`)
                .join(", ");
            const values = [...Object.values(dataObject), data.id];
            const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length}`;
            const result = await client.query(query, values);
            return result.rowCount;
        } catch (error) {
            return null;
        } finally {
            client.release();
        }
    }

    static async softDelete(data: any): Promise<number | null> {
        const client = await connectDB();

        try {
            const tableName = this.prototype.getTableName();
            if (!data.id) {
                return null;
            }

            const query = "";
            if(data.del){
                const query = `UPDATE ${tableName} SET del = TRUE WHERE id = ${data.id}`;
            } else {
                const query = `DELETE FROM ${tableName} WHERE id = ${data.id}`;
            }
            const result = await client.query(query);
            return result.rowCount;
        } catch (e) {
            return null;
        } finally {
            client.release();
        }
    }

    static async delete(data: any): Promise<number | null> {
        const client = await connectDB();

        try {
            const tableName = this.prototype.getTableName();
            const query = `DELETE FROM ${tableName} WHERE id = ${data.id}`;
            const result = await client.query(query);
            return result.rowCount;
        } catch (e) {
            return null;
        } finally {
            client.release();
        }
    }
}