-- Table "users"
-- Insérer les enregistrements pour la table "users"
INSERT INTO users (username, password, is_admin) VALUES
  ('admin', 'adminpassword', true), -- Utilisateur administrateur
  ('john123', 'password123', false), -- Utilisateur ordinaire
  ('emma456', 'secret789', false); -- Utilisateur ordinaire

-- Table "recipes"
-- Insérer les enregistrements pour la table "recipes"
INSERT INTO recipes (title, ingredients, instructions, image) VALUES
  ('Gâteau Arc-en-ciel', '500g de farine, 400g de sucre, 250g de beurre, 4 œufs, 250ml de lait, 1 cuillère à soupe d''extrait de vanille, colorants alimentaires de différentes couleurs', '1. Préchauffez le four à 180°C (350°F). 2. Dans un bol, mélangez le beurre ramolli et le sucre jusqu''à obtenir une consistance crémeuse. 3. Ajoutez les œufs un par un en mélangeant bien après chaque ajout. 4. Incorporez la farine en alternant avec le lait. 5. Ajoutez l''extrait de vanille. 6. Divisez la pâte en plusieurs bols et ajoutez des colorants différents à chaque bol. 7. Versez les différentes pâtes colorées dans un moule à gâteau en les superposant. 8. Faites cuire au four pendant environ 45 minutes. 9. Laissez refroidir avant de démouler. 10. Dégustez ce gâteau arc-en-ciel plein de couleurs !', 'gateau_arc_en_ciel.jpg'),

  ('Poulet dansant aux épices', '2 chicken breasts, 1 bell pepper, 1 carrot, 1 zucchini, 1 onion, 2 cloves of garlic, 3 tablespoons soy sauce, 1 tablespoon oyster sauce, 1 teaspoon cornstarch, 1/2 teaspoon sesame oil', '1. Slice the chicken breasts and vegetables. 2. In a hot pan, stir-fry the chicken until cooked. 3. Add the vegetables and garlic. Stir-fry for a few minutes. 4. In a small bowl, mix soy sauce, oyster sauce, cornstarch, and sesame oil. 5. Pour the sauce over the chicken and vegetables. Stir until thickened. 6. Serve the stir-fry over steamed rice.'), -- Recette 2
  
  ('Gaufres de patate douce', '2 patates douces, 200g de farine, 2 œufs, 250ml de lait, 50g de beurre fondu, 2 cuillères à soupe de sucre, 1 cuillère à café de levure chimique, 1 pincée de sel', '1. Faites cuire les patates douces jusqu''à ce qu''elles soient tendres. 2. Épluchez les patates douces et écrasez-les dans un grand bol. 3. Ajoutez la farine, les œufs, le lait, le beurre fondu, le sucre, la levure chimique et le sel. Mélangez bien. 4. Faites chauffer un gaufrier et versez-y une louche de pâte. 5. Faites cuire les gaufres jusqu''à ce qu''elles soient dorées. 6. Servez les gaufres avec du sirop d''érable et un peu de folie !', 'gaufres_patate_douce.jpg'),

  ('Gâteau de bonbons', 'Gâteau en mousse de guimauve, bonbons assortis (dragées, marshmallows, réglisse, etc.), ruban coloré', '1. Achetez un gâteau en mousse de guimauve dans une pâtisserie. 2. Disposez les bonbons assortis sur le gâteau pour le décorer selon votre créativité. 3. Utilisez le ruban coloré pour faire un joli nœud autour du gâteau. 4. Ce gâteau de bonbons fera le bonheur des petits et des grands !', 'gateau_bonbons.jpg'),

  ('Salade de fruits rigolote', 'Fraises, kiwis, ananas, mangue, melon, raisins, jus d''orange', '1. Lavez et coupez tous les fruits en morceaux. 2. Mélangez-les dans un grand bol pour former une salade de fruits colorée. 3. Pressez un peu de jus d''orange sur la salade pour ajouter une touche de fraîcheur. 4. Servez la salade de fruits dans des coupes originales pour encore plus de plaisir !', 'salade_fruits_rigolote.jpg'),

  ('Smoothie arc-en-ciel', 'Fruits de différentes couleurs (fraises, bananes, kiwis, bleuets, mangue, framboises), yaourt nature, miel', '1. Lavez et coupez les fruits en morceaux. 2. Mixez chaque fruit séparément avec un peu de yaourt nature et de miel pour obtenir des purées colorées. 3. Dans un grand verre, versez une couche de purée de fraise, puis une couche de purée de banane, et ainsi de suite avec les autres fruits. 4. Terminez par une cuillère de purée de framboises sur le dessus. 5. Insérez une paille pour déguster ce smoothie arc-en-ciel plein de saveurs !', 'smoothie_arc_en_ciel.jpg');

  ('Crêpe surprise au chocolat', '250g de farine, 500ml de lait, 3 œufs, 2 cuillères à soupe de sucre, 1 cuillère à soupe de cacao en poudre, 1 cuillère à café de levure chimique, 1 pincée de sel, confiture de fraise, morceaux de chocolat', '1. Mélangez la farine, le lait, les œufs, le sucre, le cacao en poudre, la levure chimique et le sel dans un grand bol. 2. Faites chauffer une poêle antiadhésive à feu moyen. 3. Versez une petite louche de pâte dans la poêle et faites tourner la poêle pour étaler la pâte en une crêpe fine. 4. Laissez cuire la crêpe jusqu''à ce qu''elle soit presque cuite. 5. Étalez une cuillère de confiture de fraise et quelques morceaux de chocolat sur la moitié de la crêpe. 6. Pliez la crêpe en deux pour cacher la surprise au chocolat à l''intérieur. 7. Faites cuire la crêpe quelques instants de plus jusqu''à ce que le chocolat soit fondant. 8. Servez cette crêpe gourmande et surprenez vos invités avec sa délicieuse surprise au chocolat !', 'crepe_surprise_chocolat.jpg'),

  ('Pancakes rigolos', '200g de farine, 250ml de lait, 1 œuf, 2 cuillères à soupe de sucre, 1 cuillère à café de levure chimique, 1 pincée de sel, colorants alimentaires de différentes couleurs, chocolat fondu, fruits frais', '1. Mélangez la farine, le lait, l''œuf, le sucre, la levure chimique et le sel dans un grand bol. 2. Divisez la pâte en plusieurs bols et ajoutez des colorants différents à chaque bol. 3. Faites chauffer une poêle antiadhésive à feu moyen. 4. Versez une petite louche de pâte colorée dans la poêle pour former un pancake de couleur. 5. Retournez le pancake lorsque des bulles commencent à se former à la surface. 6. Répétez l''opération avec les autres couleurs de pâte pour former une pile de pancakes multicolores. 7. Utilisez le chocolat fondu et les fruits frais pour créer des visages rigolos sur les pancakes. 8. Dégustez ces pancakes rigolos pour un petit-déjeuner plein de couleurs !', 'pancakes_rigolos.jpg'),

  ('Soupe de sorcière', '2 patates douces, 1 carotte, 1 oignon, 2 gousses d''ail, 1 cuillère à soupe d''huile d''olive, 1 litre de bouillon de légumes, 1 cuillère à café de curcuma, 1 cuillère à café de cumin, sel, poivre, crème fraîche, graines de citrouille', '1. Épluchez et coupez les patates douces, la carotte et l''oignon en morceaux. 2. Faites revenir l''oignon et l''ail dans l''huile d''olive dans une grande casserole jusqu''à ce qu''ils soient translucides. 3. Ajoutez les patates douces et la carotte, puis versez le bouillon de légumes dans la casserole. 4. Assaisonnez avec le curcuma, le cumin, le sel et le poivre. 5. Laissez mijoter la soupe jusqu''à ce que les légumes soient tendres. 6. Mixez la soupe jusqu''à ce qu''elle soit lisse et onctueuse. 7. Servez la soupe dans des bols et ajoutez une cuillère de crème fraîche pour former un cercle sur le dessus. 8. Saupoudrez de graines de citrouille pour ajouter une touche de sorcellerie à votre soupe !', 'soupe_sorciere.jpg'),
  
  ('Pâtes farcies surprises', '250g de pâtes farcies (ravioli, tortellini, etc.), sauce tomate, fromage râpé, olives vertes, feuilles de basilic', '1. Faites cuire les pâtes farcies selon les instructions du paquet. 2. Réchauffez la sauce tomate dans une casserole. 3. Dans chaque pâte farcie, cachez une olive verte à l''intérieur pour créer une surprise. 4. Versez la sauce tomate sur les pâtes farcies dans chaque assiette. 5. Saupoudrez de fromage râpé sur les pâtes et ajoutez une feuille de basilic pour décorer. 6. Dégustez ces pâtes farcies surprises pour une explosion de saveurs inattendues !', 'pates_farcies_surprises.jpg'),

  ('Tarte aux légumes souriante', '1 pâte brisée, 1 poivron rouge, 1 poivron jaune, 1 courgette, 1 aubergine, 1 oignon, 2 tomates, 100g de fromage râpé, huile d''olive, sel, poivre', '1. Préchauffez le four à 180°C (350°F). 2. Étalez la pâte brisée dans un moule à tarte. 3. Lavez et coupez tous les légumes en petits morceaux. 4. Disposez les légumes sur la pâte pour former un visage souriant. Utilisez les poivrons pour former les yeux et la bouche, la courgette pour former le nez et l''aubergine pour former les cheveux. 5. Arrosez les légumes d''un filet d''huile d''olive et assaisonnez avec du sel et du poivre. 6. Saupoudrez le fromage râpé sur les légumes. 7. Faites cuire la tarte au four pendant environ 30 minutes jusqu''à ce qu''elle soit dorée. 8. Servez cette tarte aux légumes souriante et égayez votre repas !', 'tarte_legumes_souriante.jpg'),

  ('Brochettes de fruits rigolotes', 'Fruits frais de saison (fraises, kiwis, ananas, melon, etc.), mini-marshmallows, piques à brochettes', '1. Lavez et coupez les fruits en morceaux. 2. Enfilez les morceaux de fruits sur les piques à brochettes de manière à former des visages rigolos. 3. Ajoutez des mini-marshmallows pour les yeux et la bouche. 4. Répétez l''opération pour former plusieurs brochettes de fruits rigolotes. 5. Disposez les brochettes dans un plat de présentation. 6. Ces brochettes de fruits rigolotes seront un succès auprès des petits comme des grands !', 'brochettes_fruits_rigolotes.jpg');




-- Table "favorites"
-- Insérer les enregistrements pour la table "favorites"
-- Ajouter des recettes favorites pour les utilisateurs spécifiques
INSERT INTO favorites (user_id, recipe_id)
SELECT u.id, r.id
FROM users u, recipes r
WHERE u.id = 2 AND r.id = 1; -- Utilisateur 2 favorise la Recette 1

INSERT INTO favorites (user_id, recipe_id)
SELECT u.id, r.id
FROM users u, recipes r
WHERE u.id = 2 AND r.id = 3; -- Utilisateur 2 favorise la Recette 3

INSERT INTO favorites (user_id, recipe_id)
SELECT u.id, r.id
FROM users u, recipes r
WHERE u.id = 3 AND r.id = 2; -- Utilisateur 3 favorise la Recette 2
