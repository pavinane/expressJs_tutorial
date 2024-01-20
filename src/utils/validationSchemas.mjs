export const createUserValidationSchemas = {
  product: {
    isLength: {
      options: {
        min: 5,
        max: 10,
      },
      errorMessage: "product must be max 10 character",
    },
    notEmpty: {
      errorMessage: "Product not empty",
    },
    isString: {
      errorMessage: "Product must be string",
    },
  },
  price: {
    isLenght: {
      options: {
        min: 5,
        max: 10,
      },
      errorMessage: "price must be max 10 character",
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
