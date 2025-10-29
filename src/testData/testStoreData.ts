export const InvalidOrderData = {
  missingField: {
    quantity: 1,
    status: "placed",
    complete: true,
  },
  invalidDataType: {
    id: "abc",
    petId: "xyz",
    quantity: "three",
    complete: "yes",
  },
  negativeDatas: {
    id: -1,
    petId: -10,
    quantity: -5,
    status: "placed",
    complete: false,
  },
};
