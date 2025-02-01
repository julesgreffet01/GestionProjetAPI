import bcrypt from 'bcrypt';
import connectDB from './Config/dbConfig.js';  // Assurez-vous du bon chemin vers votre fichier de configuration de la base de données

// Fonction pour vérifier et mettre à jour les mots de passe
const verifyAndHashPasswords = async (req: any, res: any): Promise<void> => {
    const client = await connectDB();  // Connexion à la base de données
    try {
        const query = 'SELECT id, mdp FROM Admin';  // Modifier selon la structure de votre table Admin
        const result = await client.query(query);

        // Parcourir tous les utilisateurs
        for (let user of result.rows) {
            // Vérifier si le mot de passe est déjà haché (bcrypt)
            if (!user.mdp.startsWith('$2b$') && !user.mdp.startsWith('$2a$')) {
                console.log(`Hashing password for user ID: ${user.id}`);
                const hashedPassword = await bcrypt.hash(user.mdp, 10); // 10 est le nombre de "rounds" de hachage
                const updateQuery = 'UPDATE Admin SET mdp = $1 WHERE id = $2';
                await client.query(updateQuery, [hashedPassword, user.id]);  // Mettre à jour le mot de passe haché
            } else {
                console.log(`Password already hashed for user ID: ${user.id}`);
            }
        }

        // Retourner une réponse une fois que les mots de passe ont été traités
        res.status(200).send('Passwords checked and hashed if necessary');
    } catch (error) {
        console.error('Error during password verification and hashing:', error);
        res.status(500).send('Error during password hashing');
    } finally {
        client.release();  // Libération de la connexion à la base de données
    }
}

export default verifyAndHashPasswords;
