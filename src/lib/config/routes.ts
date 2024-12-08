interface Route {
  path: string;
}

interface Routes {
  home: Route;
  login: Route;
  dashboard: Route;
  categories: Route;
  products: Route;
  productCombos: Route
  providers: Route
  zones: Route;
  inventory: Route;
  municipalities: Route;
  provinces: Route
  users: Route;
  userForm: Route
}
export const routes: Routes = {
  home: { path: "/" },
  login: { path: "/login" },
  dashboard: { path: "/dashboard" },
  categories: { path: "/categories" },
  products: { path: "/products" },
  productCombos: {path: "/product-combos"},
  providers: { path: "/providers" },
  zones: { path: "/zones" },
  inventory: { path: "/inventory" },
  municipalities: { path: "/municipalities" },
  provinces: { path: "/provinces" },
  users: { path: "/users" },
  userForm: {path: "/users/user-form"}
};
