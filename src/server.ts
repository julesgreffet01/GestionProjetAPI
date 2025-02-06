import express, { Request, Response } from 'express';  // Importation d'Express avec les types Request et Response
const dotenv = require('dotenv').config();
import verifyAndHashPasswords from './Routes/hashage';
import AdminRoutes from './Routes/Admin/AdminRoutes';


const app = express();
const port = 5000;


// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Route pour lancer le processus de hachage des mots de passe
app.get('/hash', (req: Request, res: Response) => {
    verifyAndHashPasswords(req, res);  // Appeler la fonction de hashage
});

// Routes pour les admins
app.use('/admin', AdminRoutes);


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
