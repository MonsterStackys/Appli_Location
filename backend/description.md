# Pour Pascal:

method : myProperties(), favorites(), showProperties() (Tout dans PropertyController.php)

myProperties(): recuperer toutes les proprietes de l'utilisateur connecter.
favorites() : recuperer toutes les proprietes liker par l'user connecter et verifier si elles sont toujours active ou non(is_active = true/false).
showProperties(User $id) : recuperer toutes les proprietés d'un utilisateur 
                           à partir de son id.

PS: modifie la methode store de PropertyController.php pour faire en sorte que l'utilisateur ne puisse plus ajouter une proprieté si il a deja 20 proprieté (limite d'ajout a 20)

# Pour Stackys:
method : updateProfile()->UserController.php, index()->StoryController.php

updateProfile(): mettre a jour les informations de l'user connecter.
index() : recuperer toutes les stories(qui n'ont pas encore expiré), Supprimer toutes les stories qui sont expirées.

# Pour Dimi:
methode : store(), markAsViewed() (tout dans StoryController.php)

store() : creation d'une nouvelle storie en renseigant tous les champs dont on a besoin.
markAsViewed() : marquer une storie comme vu (Nouvelle table requise).

# Pour Sahim:
methode : index(), store(), destroy() 

index(): afficher toutes les alertes de l'user connecter.
store(): creer une nouvelle alerte.
destroy(Alert $id) : supprimer une alerte.
