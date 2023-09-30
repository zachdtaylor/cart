defmodule CartWeb.Schema.RecipesSchema do
  @moduledoc """
  Defines the GraphQL schema (types and mutations) for the
  recipes context.
  """
  use Absinthe.Schema.Notation
  import CartWeb.Helpers.Mutations
  import CartWeb.Connection

  alias CartWeb.Resolvers.RecipesResolver

  object :ingredient do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :amount, :string
    field :recipe_id, non_null(:id)
    field :user_id, non_null(:id)
  end

  connection object(:recipe) do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :instructions, :string
    field :total_time, :string
    field :image_url, :string
    field :meal_plan_multiplier, :integer
    field :original_id, :id

    @desc "Indicates if the current user has copied this recipe. Will be null if not logged in."
    field :copied_by_current_user, :boolean do
      resolve(&RecipesResolver.copied_by_current_user/3)
    end

    field :user, non_null(:user) do
      resolve(&RecipesResolver.get_recipe_user/3)
    end

    field :ingredients, non_null(list_of(non_null(:ingredient))) do
      resolve(&RecipesResolver.list_ingredients/3)
    end
  end

  object :grocery_list_item_use do
    field :id, non_null(:id)
    field :amount, :string
    field :recipe_name, non_null(:string)
    field :multiplier, non_null(:integer)
  end

  object :grocery_list_item do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :uses, non_null(list_of(non_null(:grocery_list_item_use)))
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

  input_object :check_off_grocery_list_item_input do
    field :item_name, non_null(:string)
  end

  object :check_off_grocery_list_item_response do
    field(:success, non_null(:boolean),
      description: "Indicates if the mutation completed successfully or not. "
    )

    field(:errors, non_null(list_of(:mutation_error)),
      description: "A list of failed validations. May be blank or null if mutation succeeded."
    )

    field(:data, :pantry_item,
      description: "The pantry item created. May be null if mutation failed."
    )
  end

  mutation_response_object(:copy_recipe_response, :recipe)

  object :recipe_mutations do
    @desc "Copy a recipe"
    field :copy_recipe, :copy_recipe_response do
      arg(:recipe_id, non_null(:id))

      resolve(&RecipesResolver.copy_recipe/3)
    end

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

    @desc "Check off an item from the grocery list by adding it to the pantry"
    field :check_off_grocery_list_item, :check_off_grocery_list_item_response do
      arg(:input, non_null(:check_off_grocery_list_item_input))

      resolve(&RecipesResolver.check_off_grocery_list_item/3)
    end
  end
end
