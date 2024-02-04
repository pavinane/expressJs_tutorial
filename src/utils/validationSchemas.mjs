export const createProductValidationSchemas = {
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

export const createUserValidationSchemas = {
  userName: {
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "userName must be min 2 character",
    },
    notEmpty: true,
  },
  email: {
    isLength: {
      options: {
        min: 2,
        max: 25,
      },
      errorMessage: "email must be min 2 character",
    },
    notEmpty: {
      errorMessage: "email not empty",
    },
    isString: {
      errorMessage: "email must be string",
    },
  },
  password: {
    notEmpty: true,
  },
  displayName: {
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "displayName must be min 2 character",
    },
    notEmpty: {
      errorMessage: "displayName not empty",
    },
    isString: {
      errorMessage: "displayName must be string",
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
