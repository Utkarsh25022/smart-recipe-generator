export function matchRecipes(userIngredients, recipes) {
  return recipes
    .map((recipe) => {
      const matchCount = recipe.ingredients.filter((ingredient) =>
        userIngredients.includes(ingredient.toLowerCase())
      ).length;

      const score = matchCount / recipe.ingredients.length;

      return { ...recipe, score };
    })
    .filter((recipe) => recipe.score > 0)
    .sort((a, b) => b.score - a.score);
}
