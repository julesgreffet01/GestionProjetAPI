import {Pool} from 'pg';

// Création d'un pool global unique
const pool = new Pool({
    user: process.env.DB_USER,
    // user: "postgres",
    // host: "localhost",
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    // database: "GestionProjetAPI",
    // password: "cannelle01",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to DB");
        return client;
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
        throw err;
    }
};

export default connectDB;
