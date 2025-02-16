import connectDB from "../../../Config/dbConfig.js";
import {TrelloCardUser} from "../../BO/Trello/TrelloCardUser";


export class TrelloCardUserDAO {

    static async getAllCardByUser(userId: number): Promise<number[]> {
        const client = await connectDB();
        const query = `SELECT "idCard" FROM "TrelloCardUser" WHERE "idUser" = $1 AND del = FALSE`;
        try {
            const result = await client.query(query, [userId]);
            if (result.rows.length === 0) {
                return [];
            }
            return result.rows.map((row: any) => row.idCard);
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async getAllByCard(cardId: number) {
        const client = await connectDB();
        const query = `SELECT * FROM "TrelloCardUser" WHERE "idCard" = $1 AND del = FALSE`;
        try {
            const result = await client.query(query, [cardId]);
            return result.rows.map((row: any) => new TrelloCardUser(row.idUser, row.idCard, row.del));
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async create(card: TrelloCardUser) {
        const client = await connectDB();
        const query = `INSERT INTO "TrelloCardUser"("idCard", idUser) VALUES ($1, $2);`;
        try {
            const result = await client.query(query, [card.idCard, card.idUser]);
            return new TrelloCardUser(result.rows[0].idUser, result.rows[0].idCard, result.rows[0].del)
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    static async delete(card: TrelloCardUser) {
        const client = await connectDB();
        const query = `DELETE FROM "TrelloCardUser" WHERE "idCard" = $1 AND "idUser" = $2`;
        try {
            const result = await client.query(query, [card.idCard, card.idUser]);
            return result.rowCount;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
}