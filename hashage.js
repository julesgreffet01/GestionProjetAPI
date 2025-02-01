const bcrypt = require('bcrypt');
const { connectDB } = require('./dist/Config/dbConfig'); // Assurez-vous de remplacer par le bon chemin pour votre fichier de config DB

// Fonction pour vérifier et mettre à jour les mots de passe
export async function verifyAndHashPasswords() {
    const client = await connectDB();
    try {
        const query = 'SELECT id, mdp FROM Admin'; // Modifier selon la structure de votre table Admin
        const result = await client.query(query);

        // Parcourir les utilisateurs
        for (let user of result.rows) {
            // Vérifier si le mot de passe est déjà haché en cherchant le préfixe bcrypt ($2b$, $2a$, etc.)
            if (!user.mdp.startsWith('$2b$') && !user.mdp.startsWith('$2a$')) {
                // Si le mot de passe n'est pas haché, le hacher
                console.log(`Hashing password for user ID: ${user.id}`);
                const hashedPassword = await bcrypt.hash(user.mdp, 10); // 10 est le nombre de "rounds" de hachage
                // Mettre à jour le mot de passe dans la base de données
                const updateQuery = 'UPDATE Admin SET mdp = $1 WHERE id = $2';
                await client.query(updateQuery, [hashedPassword, user.id]);
            } else {
                console.log(`Password already hashed for user ID: ${user.id}`);
            }
        }
    } catch (error) {
        console.error('Error during password verification and hashing:', error);
    } finally {
        client.release(); // Libération de la connexion
    }
}