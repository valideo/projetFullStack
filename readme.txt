//Serveur (/socialMedServer)

premier lancement : 
éxécuter la commande "npm install" pour installer les dépendances requises dans le dossier;
éxecuter la commande "node server.js" pour lancer le programme à la racine du dossier /socialMedServer;

/models :
Ici on trouve les modèles des collections "users" et "posts" 

/routes 
Ici on trouve les routes avec leurs fonctions permettant d'interagir avec les "users, posts et uploads"

/utils
On trouve ici la gestion du token jwt avec des fonctions associées

/uploads 
On trouve ici les fichiers mis en ligne lors de l'utilisation de l'app (images de posts et photos de profil)

app.js
C'est ici que nous effectuons la connexion à la base de données mongoDB Atlas et que nous traitons les routes récupérées dans /routes

server.js 
Base du programme qui est exécuté 



//Front (/socialMedFront)

premier lancement : 
éxécuter la commande "npm install" pour installer les dépendances requises dans le dossier;
pour lancer le programme on éxécute (normalement) la commande "npm start" si erreur, lancer "webpack -d ; copy src/index.html dist/index.html ; webpack-dev-server --content-base src/ --inline --hot"

Les composants créés sont dans le dossier /src/app/components
    Les composants reliés à l'autehentification ou création de compte sont dans /userAuth
    Dans /main on retrouve les composants du coeur de l'application

Composant Header : 
    Présent sur toutes les pages suite à la connexion
    On peut accéder depuis ce Header à son profil personnel (icone profil), à ses demandes d'amis reçues (icone notification)
    On peut rechercher des utilisateurs inscrits sur l'application via la barre de recherche et les inviter comme amis avec l'icone (+)
    L'icone "messages" permet d'afficher une barre latérale :

    Barre latérale :
        Premier cadre en haut : on affiche les amis de l'utilisateur 
        Second cadre : discussion de groupe (non fonctionnel)
        3ème cadre : zone de chat (chat global) avec différenciation des pseudos et messages de l'utilisateur 

Page d'accueil : (/home)
    Ici sont présentées les publications des utilisateurs avec une image, une description, une date et l'utilisateur en question

Page profil : (/profil)
    Ici sont affichées nos propres publications 
    En haut de page apparait notre photo de profil. Pour la modifier, il suffit de cliquer sur cette dernière, de séléctionner une image et cliquer ensuite sur mettre à jour
    Sur cette page apparait également une zone pour déposer une nouvelle publication. Il suffit de taper sa descritpion dans la zone de texte, de cliquer sur l'icone "image", séléctionner une image et ensuite cliquer sur le bouton publier.