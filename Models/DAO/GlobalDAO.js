const connectDB = require("../../Config/dbConfig");

class GlobalDAO {
    // Méthode à implémenter dans les classes héritées
    getTableName() {
        throw new Error("La méthode getTableName() doit être implémentée dans la classe fille.");
    }

    // Méthode à implémenter dans les classes héritées
    mapToObject(row) {
        throw new Error("La méthode mapToObject() doit être implémentée dans la classe fille.");
    }

    // Méthode statique pour récupérer toutes les entrées
    static async getAll() {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            const query = `SELECT * FROM ${tableName}`;
            const { rows } = await client.query(query);
            return rows.map((row) => this.prototype.mapToObject(row));
        } finally {
            client.release();
        }
    }

    static async find(conditions = {}) {
        const client = await connectDB();
        try {
            const tableName = this.prototype.getTableName();
            let query = `SELECT * FROM ${tableName}`;
            const values = [];

            if (Object.keys(conditions).length) {
                const clauses = Object.keys(conditions).map((key, index) => {
                    values.push(conditions[key]);
                    return `${key} = $${index + 1}`;
                });
                query += " WHERE " + clauses.join(" AND ");
            }

            const result = await client.query(query, values);

            if (result.rows.length === 0) {
                return null;
            } else if (result.rows.length === 1) {
                return this.prototype.mapToObject(result.rows[0]);
            } else {
                return result.rows.map(row => this.prototype.mapToObject(row));
            }
        } finally {
            client.release();
        }
    }

    
}

module.exports = GlobalDAO;
