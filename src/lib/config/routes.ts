interface Route {
  path: string;
}

interface Routes {
  home: Route;
  login: Route;
  dashboard: Route;
  categories: Route;
  products: Route;
  zone: Route;
  inventory: Route;
  users: Route;
  userForm: Route
}
export const routes: Routes = {
  home: { path: "/" },
  login: { path: "/login" },
  dashboard: { path: "/dashboard" },
  categories: { path: "/categories" },
  products: { path: "/products" },
  zone: { path: "/zone" },
  inventory: { path: "/inventory" },
  users: { path: "/users" },
  userForm: {path: "/users/user-form"}
};
