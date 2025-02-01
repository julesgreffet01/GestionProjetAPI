import connectDB from "../../../Config/dbConfig";


export class TrelloCardUserDAO {

    static async getAllCardByUser(userId: number): Promise<number[]> {
        const client = await connectDB();
        const query = `SELECT idCard FROM TrelloCardUser WHERE idUser = $1 AND del = FALSE`;

        try {
            const result = await client.query(query, [userId]);

            // Si aucune ligne n'est retournée, on renvoie un tableau vide
            if (result.rows.length === 0) {
                return [];
            }

            // Transformation des objets en nombre
            return result.rows.map((row: any) => row.idCard);
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

}