export const createUserValidationSchemas = {
  product: {
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "product must be min 2 character",
    },
    notEmpty: {
      errorMessage: "Product not empty",
    },
    isString: {
      errorMessage: "Product must be string",
    },
  },
  price: {
    isLength: {
      options: {
        min: 2,
        max: 5,
      },
      errorMessage: "price must be min 2 character",
    },
    notEmpty: {
      errorMessage: "price not empty",
    },
    isString: {
      errorMessage: "price must be string",
    },
  },
};

export const createQuerrySchemas = {
  filter: {
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "filter must be min 3 to max 10 character",
    },
    notEmpty: {
      errorMessage: "filter not empty",
    },
    isString: {
      errorMessage: "filter must be string",
    },
  },
};
