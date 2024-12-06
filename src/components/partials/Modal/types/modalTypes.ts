export interface SectionModal {
  details: {
    name: string;
    title: string;
  };
  form: {
    name: string;
    title: string;
  };
  delete: {
    name: string;
    title: string;
    subTitle: string;
    message: string;
  };
}
export interface ModalTypes {
  products: SectionModal;
  productCombos: SectionModal;
  promotions: SectionModal;
  providers: SectionModal;
  provinces: SectionModal;
  zones: SectionModal;
  users: SectionModal;
  municipalities: SectionModal;
  inventory: SectionModal;
  categories: SectionModal;
  subcategories: SectionModal;
  deliveryMethods: SectionModal;
}

export const modalTypes: ModalTypes = {
  products: {
    details: {
      name: "details-product",
      title: "Información del producto",
    },
    form: {
      name: "form-product",
      title: "Formulario de Producto",
    },
    delete: {
      name: "delete-product",
      title: "Eliminación de producto",
      subTitle: "¿Seguro que desea eliminar el producto?",
      message:
        "La acción de eliminación de un producto es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  productCombos: {
    details: {
      name: "details-product-combo",
      title: "Información del Combo",
    },
    form: {
      name: "form-product-combo",
      title: "Formulario de Combo",
    },
    delete: {
      name: "delete-product-combo",
      title: "Eliminación de combo",
      subTitle: "¿Seguro que desea eliminar el combo de producto?",
      message:
        "Todos los productos relacionados permanecerán en el sistema, pero este combo se eliminará de forma permanente.",
    },
  },
  promotions: {
    details: {
      name: "details-promotion",
      title: "Información de la Promoción",
    },
    form: {
      name: "form-promotion",
      title: "Formulario de Promoción",
    },
    delete: {
      name: "delete-promotion",
      title: "Eliminación de promoción",
      subTitle: "¿Seguro que desea eliminar la promoción?",
      message:
        "La acción de eliminación de una promoción es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  providers: {
    details: {
      name: "details-provider",
      title: "Información del Proveedor",
    },
    form: {
      name: "form-providers",
      title: "Formualario de Proveedor",
    },
    delete: {
      name: "delete-provider",
      title: "Eliminación de proveedor",
      subTitle: "¿Seguro que desea eliminar el proveedor?",
      message:
        "La acción de eliminación de un proveedor es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  provinces: {
    details: {
      name: "details-province",
      title: "Información de la provincia",
    },
    form: {
      name: "form-province",
      title: "Formulario de Provincia",
    },
    delete: {
      name: "delete-province",
      title: "Eliminación de provincia",
      subTitle: "¿Seguro que desea eliminar la provincia?",
      message:
        "La acción de eliminación de una provincia es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  zones: {
    details: {
      name: "details-zone",
      title: "Información de la Zona",
    },
    form: {
      name: "form-zone",
      title: "Formulario de Zona",
    },
    delete: {
      name: "delete-zone",
      title: "Eliminación de zona",
      subTitle: "¿Seguro que desea eliminar la zona?",
      message:
        "La acción de eliminación de una zona es irreversible y no se prodrá recuperar la información una vez se haya eliminado. Esto podría afectar los datos relacionados con la distribución y los envíos.",
    },
  },
  users: {
    details: {
      name: "details-user",
      title: "Información de Usuario",
    },
    form: {
      name: "form-user",
      title: "Formulario de Usuario",
    },
    delete: {
      name: "delete-user",
      title: "Eliminación de usuario",
      subTitle: "¿Seguro que desea eliminar el usuario?",
      message:
        "La acción de eliminación de un usuario es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  municipalities: {
    details: {
      name: "details-municipality",
      title: "Información del Municipio",
    },
    form: {
      name: "form-municipality",
      title: "Formulario de Municipio",
    },
    delete: {
      name: "delete-municipality",
      title: "Eliminación de municipio",
      subTitle: "¿Seguro que desea eliminar el municipio?",
      message:
        "La acción de eliminación de un municipio es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  inventory: {
    details: {
      name: "details-inventory-entry",
      title: "Información de la Entrada de Inventario ",
    },
    form: {
      name: "form-inventory-entry",
      title: "Formulario de Entrada de Inventario",
    },
    delete: {
      name: "delete-inventory-entry",
      title: "Eliminación de entrada de iventario",
      subTitle: "¿Seguro que desea eliminar la entrada de inventario?",
      message:
        "La acción de eliminación de una entrada de iventario es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  categories: {
    details: {
      name: "details-categories",
      title: "Información de la Categoría",
    },
    form: {
      name: "form-categories",
      title: "Formulario de Categoría",
    },
    delete: {
      name: "delete-category",
      title: "Eliminación de categoría",
      subTitle: "¿Seguro que desea eliminar la categoría?",
      message:
        "La acción de eliminación de una categoría es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  subcategories: {
    details: {
      name: "details-subcategories",
      title: "Información de la Categoría",
    },
    form: {
      name: "form-subcategories",
      title: "Formulario de Subcategoría",
    },
    delete: {
      name: "delete-subcategory",
      title: "Eliminación de subcategoría",
      subTitle: "¿Seguro que desea eliminar la subcategoría?",
      message:
        "La acción de eliminación de una subcategoría es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
  deliveryMethods: {
    details: {
      name: "details-delivery-method",
      title: "Información del Método de Entrega",
    },
    form: {
      name: "form-delivery-method",
      title: "Formualrio de Método de Entrega",
    },
    delete: {
      name: "delete-delivery-method",
      title: "Eliminación de Método de Entrega",
      subTitle: "¿Seguro que desea eliminar el Método de entrega?",
      message:
        "La acción de eliminación de un método de entrega es irreversible y no se prodrá recuperar la información una vez se haya eliminado.",
    },
  },
};
