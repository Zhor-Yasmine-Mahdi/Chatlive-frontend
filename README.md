
# Chatlive Frontend

## Description

Chatlive Frontend est une application de chat en temps réel qui offre une interface utilisateur pour les clients et les agents, intégrant des suggestions d'IA fournies par OpenAI. Ce projet utilise React pour le développement de l'interface utilisateur, avec Socket.IO pour la communication en temps réel.

## Structure du Projet

Voici la structure actuelle du projet, avec une description de chaque dossier et fichier.

- **frontend/**
  - **public/**
    - `index.html` : Fichier HTML principal.
  - **src/**
    - **components/**
      - `ClientChat.js` : Interface de chat pour le client.
      - `AgentChat.js` : Interface de chat pour l'agent.
    - **services/**
      - `openaiService.js` : Service pour interagir avec l'API backend pour les suggestions d'IA.
    - `App.js` : Composant principal de l'application qui configure les routes.
    - `index.js` : Fichier de démarrage de React.
  - `package.json` : Fichier de configuration des dépendances et scripts.

### Explication des Fichiers

- **`components/ClientChat.js`** : Gère l'interface utilisateur pour le client, permettant d'envoyer et de recevoir des messages.
- **`components/AgentChat.js`** : Gère l'interface utilisateur pour l'agent, avec des suggestions de réponses basées sur l'IA et des notifications pour les messages clients.
- **`services/openaiService.js`** : Fichier de service qui communique avec l'API backend pour obtenir des réponses d'IA pour les agents.
- **`App.js`** : Configure le routage pour les interfaces client et agent, et affiche une page d'accueil avec des liens de navigation.
- **`index.js`** : Point d'entrée de l'application React.

## Installation

Suivez ces étapes pour installer et configurer le projet en local.

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/Zhor-Yasmine-Mahdi/Chatlive-frontend.git
   cd Chatlive-frontend
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** (si nécessaire) :
   - Si vous avez des configurations spécifiques, ajoutez-les dans un fichier `.env` à la racine du projet.

## Utilisation

1. **Démarrez le serveur de développement** :
   ```bash
   npm start
   ```

2. L'application sera accessible à `http://localhost:3000` par défaut.

## API Endpoints

Cette application frontend se connecte au backend via l'API suivante pour les suggestions d'IA :

- **`POST /api/chat/ai-response`** : Envoie un message client et reçoit une suggestion de réponse générée par l'IA pour l'agent.

## Améliorations Futures

- **Séparation de la Configuration des Sockets** : Actuellement, la configuration des sockets se fait dans les composants `ClientChat.js` et `AgentChat.js`. Une amélioration future consisterait à déplacer cette configuration dans un fichier dédié (par exemple, `config/socket.js`) pour une meilleure modularité.
- **Gestion des Styles** : Les styles sont actuellement intégrés dans chaque composant. Dans une version future, les styles pourraient être séparés dans des fichiers CSS ou via une solution de style dynamique pour améliorer la maintenabilité.
- **Tests Unitaires** : Ajouter des tests unitaires pour chaque composant clé afin d'assurer la robustesse de l'application.

## Dépendances

- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Socket.IO** : Pour la communication en temps réel entre clients et agents.
- **Axios** : Utilisé pour les appels API au backend.
- **React Router** : Pour gérer les différentes routes de l'application.

