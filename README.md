# Yammy's

## Instalation

Pour commencer vous devez créer une BDD avec psql sur votre server.
Ensuite créer les tables et y importer les données que vous trouverez dans /app/data/.
```
psql -U nomDeLutilisateur -d nomDeLaBdd -f create_tables.sql
psql -U nomDeLutilisateur -d nomDeLaBdd -f data.sql
```

Ensuite vous devez installer les dépendances en tapant la commande suivante d
```
npm i
```

Une fois ces étapes réalisées vous pouvez lancer votre  server, et tester la récuperation des donéees, pour le moment.