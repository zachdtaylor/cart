defmodule CartWeb.Schema.RecipesSchema do
  @moduledoc """
  Defines the GraphQL schema (types and mutations) for the
  recipes context.
  """
  use Absinthe.Schema.Notation
  import CartWeb.Helpers.Mutations

  alias CartWeb.Resolvers.RecipesResolver

  object :ingredient do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :amount, :string
    field :recipe_id, non_null(:id)
    field :user_id, non_null(:id)
  end

  object :recipe do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :instructions, :string
    field :total_time, :string
    field :image_url, :string
    field :meal_plan_multiplier, :integer
    field :user_id, non_null(:id)

    field :ingredients, non_null(list_of(non_null(:ingredient))) do
      resolve(&RecipesResolver.list_ingredients/3)
    end
  end

  input_object :create_recipe_input do
    field :name, non_null(:string)
    field :total_time, :string
    field :image_url, :string
  end

  mutation_response_object(:create_recipe_response, :recipe)

  input_object :create_ingredient_input do
    field :recipe_id, non_null(:id)
    field :name, non_null(:string)
    field :amount, :string
  end

  mutation_response_object(:create_ingredient_response, :ingredient)

  object :clear_meal_plan_response do
    field(:success, non_null(:boolean),
      description: "Indicates if the mutation completed successfully or not."
    )

    field(:count, non_null(:integer),
      description: "The number of recipes that were removed from the plan."
    )
  end

  input_object :delete_recipe_input do
    field :recipe_id, non_null(:id)
  end

  mutation_response_object(:delete_recipe_response, :recipe)

  input_object :delete_ingredient_input do
    field :ingredient_id, non_null(:id)
  end

  mutation_response_object(:delete_ingredient_response, :ingredient)

  input_object :update_ingredient_input do
    field :id, non_null(:id)
    field :name, :string
    field :amount, :string
  end

  input_object :update_recipe_input do
    field :id, non_null(:id)
    field :name, :string
    field :instructions, :string
    field :total_time, :string
    field :image_url, :string
    field :meal_plan_multiplier, :integer
    field :ingredients, list_of(non_null(:update_ingredient_input))
  end

  mutation_response_object(:update_recipe_response, :recipe)

  mutation_response_object(:update_ingredient_response, :ingredient)

  object :recipe_mutations do
    @desc "Create a new ingredient"
    field :create_ingredient, :create_ingredient_response do
      arg(:input, non_null(:create_ingredient_input))

      resolve(&RecipesResolver.create_ingredient/3)
    end

    @desc "Create a new recipe"
    field :create_recipe, :create_recipe_response do
      arg(:input, non_null(:create_recipe_input))

      resolve(&RecipesResolver.create_recipe/3)
    end

    @desc "Update a recipe"
    field :update_recipe, :create_recipe_response do
      arg(:input, non_null(:update_recipe_input))

      resolve(&RecipesResolver.update_recipe/3)
    end

    @desc "Update an ingredient"
    field :update_ingredient, :update_ingredient_response do
      arg(:input, non_null(:update_ingredient_input))

      resolve(&RecipesResolver.update_ingredient/3)
    end

    @desc "Clear the meal plan"
    field :clear_meal_plan, :clear_meal_plan_response do
      resolve(&RecipesResolver.clear_meal_plan/3)
    end

    @desc "Delete a recipe"
    field :delete_recipe, :delete_recipe_response do
      arg(:input, non_null(:delete_recipe_input))

      resolve(&RecipesResolver.delete_recipe/3)
    end

    @desc "Delete an ingredient"
    field :delete_ingredient, :delete_ingredient_response do
      arg(:input, non_null(:delete_ingredient_input))

      resolve(&RecipesResolver.delete_ingredient/3)
    end
  end
end
