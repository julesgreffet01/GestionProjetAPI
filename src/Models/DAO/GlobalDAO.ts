import connectDB from "../../Config/dbConfig.js";

export abstract class GlobalDAO {

    abstract getTableName(): string;
    abstract objectToClass(row: any): Promise<object>;



    static async forceGetAll(): Promise<object[]> {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM ${tableName}`;
            const { rows } = await client.query(query);
            return Promise.all(rows.map(async (row) => await this.prototype.objectToClass(row)));
        } catch (error) {
            console.error("Error fetching all data (force):", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

    static async find(id: number): Promise<object | null> {
        if (!id) throw new Error("Invalid ID");

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();

            // Normaliser tableName pour s'assurer qu'il est sans guillemets
            let match = tableName.match(/^"?(.*?)"?$/);
            let newTableName;
            if (match) {
                 newTableName = match[1];
            }

            // Vérifier si la colonne 'del' existe dans la table
            const checkColumnQuery = `
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = $1 AND column_name = 'del'
        `;
            const columnResult = await client.query(checkColumnQuery, [newTableName]);

            const hasDelColumn = columnResult.rows.length > 0;

            // Construire la requête en fonction de l'existence de 'del'
            const query = hasDelColumn
                ? `SELECT * FROM ${tableName} WHERE id = $1 AND del = FALSE LIMIT 1`
                : `SELECT * FROM ${tableName} WHERE id = $1 LIMIT 1`;

            const { rows } = await client.query(query, [id]);

            return rows.length > 0 ? await this.prototype.objectToClass(rows[0]) : null;
        } catch (error) {
            console.error("Error fetching record:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }



    static async forceFind(id: number): Promise<object | null> {
        if (!id) throw new Error("Invalid ID");

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM ${tableName} WHERE id = $1 LIMIT 1`;
            const { rows } = await client.query(query, [id]);

            return rows.length > 0 ? await this.prototype.objectToClass(rows[0]) : null;
        } catch (error) {
            console.error("Error fetching record:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

    static async create(data: any): Promise<object> {
        if (typeof data.toBDD !== "function") throw new Error("Data must implement toBDD()");

        const client = await connectDB();
        try {
            const tableName = `${this.prototype.getTableName()}`;
            const dataObject = data.toBDD();

            const columns = Object.keys(dataObject).map(col => `"${col}"`).join(", ");
            const placeholders = Object.keys(dataObject).map((_, i) => `$${i + 1}`).join(", ");
            const values = Object.values(dataObject);

            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
            const result = await client.query(query, values);

            return this.prototype.objectToClass(result.rows[0]);
        } catch (error) {
            console.error("Error creating record:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }


    static async update(data: any): Promise<number | null> {
        if (typeof data.toBDD !== "function" || !data.id) throw new Error("Invalid data or missing ID");

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const dataObject = data.toBDD();

            const setClause = Object.keys(dataObject)
                .map((key, index) => `"${key}" = $${index + 1}`)
                .join(", ");
            const values = [...Object.values(dataObject), data.id];

            const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length}`;
            const result = await client.query(query, values);
            return result.rowCount;
        } catch (error) {
            console.error("Error updating record:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

    static async softDelete(data: any): Promise<number | null> {
        if (!data.id) throw new Error("Invalid ID provided for deletion");

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            let query: string;

            if ('del' in data) {
                query = `UPDATE ${tableName} SET del = TRUE WHERE id = $1`;
            } else {
                query = `DELETE FROM ${tableName} WHERE id = $1`;
            }

            const result = await client.query(query, [data.id]);
            return result.rowCount;
        } catch (error) {
            console.error("Error in soft delete:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

    static async delete(data: any): Promise<number | null> {
        if (!data.id) throw new Error("Invalid ID provided for deletion");

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `DELETE FROM ${tableName} WHERE id = $1`;
            const result = await client.query(query, [data.id]);
            return result.rowCount;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }

    static async restore(id: number): Promise<object | null> {

        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `UPDATE ${tableName} SET del = FALSE WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            return this.prototype.objectToClass(result.rows[0]);
        } catch (error) {
            console.error("Error restoring restore:", error);
            throw error;
        } finally {
            if(client) client.release();
        }
    }
}
