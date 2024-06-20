# Guide d'Utilisation du APIway

## Contenu du Répertoire

### Dossier Backend (Django App)

Ce dossier contient l'application Django avec tous les fichiers nécessaires :

- **settings.py** : Configuration de l'application Django. Vous pouvez changer la base de données dans la section `DATABASES`.
- **urls.py** : Contient les URLs liées à l'application.
- **models.py** : Contient les structures des modèles représentant les données stockées dans la base de données.
- **serializers.py** : Utilisé pour envoyer les données du backend au frontend dans un format structuré tel que JSON.
- **views.py** : Contient la logique backend de l'application.

### Dossier Frontend

Ce dossier contient l'application React avec les différents fichiers nécessaires :

- **API.js** : Contient la configuration de l'URL de base de l'application.
- **Components** : Logique du frontend.
- **Hooks** : Gère la communication du frontend vers le backend en utilisant l'URL de base définie dans `API.js`.

---

## Instructions pour Exécuter l'Application

Pour exécuter et utiliser l'application, suivez les étapes ci-dessous :

1. **Ouvrir deux terminaux en parallèle :**

### Terminal 1 : Exécuter l'Application React

1. Accéder au dossier `frontend` :
    ```sh
    cd frontend
    ```

2. Installer les dépendances :
    ```sh
    npm install
    ```

3. Démarrer l'application React :
    ```sh
    npm start
    ```

### Terminal 2 : Exécuter l'Application Django

1. Installer les dépendances :
    ```sh
    pip install -r requirements.txt
    ```

2. Appliquer les migrations de la base de données :
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

3. Démarrer le serveur Django :
    ```sh
    python manage.py runserver
    ```

---


