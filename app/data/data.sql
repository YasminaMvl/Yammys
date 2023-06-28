-- Table "users"
-- Insérer les enregistrements pour la table "users"
INSERT INTO users (username, password, is_admin) VALUES
  ('admin', 'adminpassword', true), -- Utilisateur administrateur
  ('john123', 'password123', false), -- Utilisateur ordinaire
  ('emma456', 'secret789', false); -- Utilisateur ordinaire

-- Table "recipes"
-- Insérer les enregistrements pour la table "recipes"
INSERT INTO recipes (title, ingredients, instructions) VALUES
  ('Spaghetti Bolognese', '200g spaghetti, 300g ground beef, 1 onion, 2 cloves of garlic, 400g canned tomatoes, 2 tablespoons tomato paste, 1 teaspoon dried oregano, salt, pepper, grated Parmesan cheese', '1. Cook the spaghetti according to package instructions. 2. In a separate pan, sauté the onion and garlic. 3. Add the ground beef and cook until browned. 4. Add the canned tomatoes, tomato paste, dried oregano, salt, and pepper. Simmer for 20 minutes. 5. Serve the Bolognese sauce over the cooked spaghetti. Sprinkle with grated Parmesan cheese.'), -- Recette 1
  ('Chicken Stir-Fry', '2 chicken breasts, 1 bell pepper, 1 carrot, 1 zucchini, 1 onion, 2 cloves of garlic, 3 tablespoons soy sauce, 1 tablespoon oyster sauce, 1 teaspoon cornstarch, 1/2 teaspoon sesame oil', '1. Slice the chicken breasts and vegetables. 2. In a hot pan, stir-fry the chicken until cooked. 3. Add the vegetables and garlic. Stir-fry for a few minutes. 4. In a small bowl, mix soy sauce, oyster sauce, cornstarch, and sesame oil. 5. Pour the sauce over the chicken and vegetables. Stir until thickened. 6. Serve the stir-fry over steamed rice.'), -- Recette 2
  ('Chocolate Chip Cookies', '200g butter, 150g granulated sugar, 150g brown sugar, 2 eggs, 1 teaspoon vanilla extract, 300g all-purpose flour, 1/2 teaspoon baking soda, 1/2 teaspoon salt, 200g chocolate chips', '1. Preheat the oven to 180°C (350°F). 2. In a mixing bowl, cream together butter, granulated sugar, and brown sugar. 3. Add eggs and vanilla extract. Mix well. 4. In a separate bowl, whisk together flour, baking soda, and salt. 5. Gradually add the dry ingredients to the wet mixture. Mix until well combined. 6. Stir in chocolate chips. 7. Drop spoonfuls of dough onto a baking sheet. 8. Bake for 10-12 minutes or until golden brown. 9. Let the cookies cool on a wire rack.'); -- Recette 3

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
