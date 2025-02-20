import express, { Request, Response } from 'express';  // Importation d'Express avec les types Request et Response
const dotenv = require('dotenv').config();
import verifyAndHashPasswords from './Routes/hashage';
import AdminRoutes from './Routes/Admin/AdminRoutes';
import UserRoutes from './Routes/User/UserRoutes';
import cors from 'cors';


const app = express();
const port = 5000;

//config de cors
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://gestion.greffetjules.fr',  // Site web
            'https://apigestion.greffetjules.fr',  // API elle-même (pour éviter les blocages)
            undefined  // Autorise les requêtes sans origine (applis mobiles)
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Accès non autorisé par CORS.'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Route pour lancer le processus de hachage des mots de passe
app.get('/hash', (req: Request, res: Response) => {
    verifyAndHashPasswords(req, res);  // Appeler la fonction de hashage
});

// Routes pour les admins
app.use('/admin', AdminRoutes);
app.use('/user', UserRoutes);


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
