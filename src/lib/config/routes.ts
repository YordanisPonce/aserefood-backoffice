interface Route {
  path: string;
}

interface Routes {
  home: Route;
  login: Route;
  dashboard: Route;
  orders: Route;
  categories: Route;
  products: Route;
  productCombos: Route;
  promotions: Route;
  providers: Route;
  zones: Route;
  inventory: Route;
  deliveryMethods: Route;
  municipalities: Route;
  provinces: Route;
  users: Route;
  userForm: Route;
  whatsappConf: Route;
}
export const routes: Routes = {
  home: { path: "/" },
  login: { path: "/login" },
  dashboard: { path: "/dashboard" },
  orders: { path: "/orders" },
  categories: { path: "/categories" },
  products: { path: "/products" },
  productCombos: { path: "/product-combos" },
  promotions: { path: "/promotions" },
  providers: { path: "/providers" },
  zones: { path: "/zones" },
  inventory: { path: "/inventory" },
  deliveryMethods: { path: "/delivery-methods" },
  municipalities: { path: "/municipalities" },
  provinces: { path: "/provinces" },
  users: { path: "/users" },
  userForm: { path: "/users/user-form" },
  whatsappConf: { path: "/whatsapp-conf" },
};
