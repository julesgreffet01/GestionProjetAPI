module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'], // Recherche des tests dans le dossier src
    transform: {
        '^.+\\.ts$': 'ts-jest', // Utiliser ts-jest pour transformer les fichiers .ts
    },
    moduleFileExtensions: ['ts', 'js', 'json'], // Extensions de fichiers supportées
    testMatch: ['**/?(*.)+(spec|test).ts'], // Rechercher les fichiers de test avec .test.ts ou .spec.ts
    // Permet à Jest de prendre en compte les fichiers JavaScript dans dist si nécessaire
    modulePaths: ['<rootDir>/dist'],
    // Optionnel : si vous souhaitez exclure certains fichiers ou répertoires
    coveragePathIgnorePatterns: ['/node_modules/'],
};