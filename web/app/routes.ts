import { index, route, type RouteConfig } from "@react-router/dev/routes";

function testRoutes() {
  if (process.env.INCLUDE_TEST_ROUTES) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "WARNING: NODE_ENV is set to 'production', so we are going to skip creating test routes"
      );
      return [];
    }
    return [
      route("__tests/login", "__test-routes__/login.tsx"),
      route("__tests/delete-user", "__test-routes__/delete-user.tsx"),
    ];
  }

  return [];
}

export default [
  index("routes/_index.tsx"),
  route("app", "routes/app.tsx", [
    index("routes/app._index.tsx"),
    route("grocery-list", "routes/app.grocery-list/route.tsx"),
    route("pantry", "routes/app.pantry/route.tsx"),
    route("recipes", "routes/app.recipes/route.tsx", [
      route(":recipeId", "routes/app.recipes.$recipeId/route.tsx", [
        route(
          "update-meal-plan",
          "routes/app.recipes.$recipeId.update-meal-plan/route.tsx"
        ),
      ]),
    ]),
  ]),
  route("discover", "routes/discover/route.tsx"),
  route("discover/:recipeId", "routes/discover_.$recipeId/route.tsx"),
  route("login", "routes/login/route.tsx"),
  route("logout", "routes/logout.tsx"),
  route("settings", "routes/settings.tsx", [
    index("routes/settings._index.tsx"),
    route("app", "routes/settings.app.tsx"),
  ]),
  route("theme.css", "routes/theme[.]css.tsx"),

  ...testRoutes(),
] satisfies RouteConfig;
