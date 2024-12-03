export interface SectionModal {
  details: {
    name: string;
    title: string;
  };
  form: {
    name: string;
    title: string;
  };
}
export interface ModalTypes {
  products: SectionModal;
  providers: SectionModal;
  provinces: SectionModal;
  zones: SectionModal;
  users: SectionModal;
  municipalities: SectionModal;
  inventory: SectionModal;
  categories: SectionModal;
  subcategories: SectionModal
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
  }
};
