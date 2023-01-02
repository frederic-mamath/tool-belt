export const getIsToValidateStyle = (isToValidate: boolean) => {
  if (isToValidate) {
    return {
      backgroundColor: "orange",
      color: "white",
    };
  }

  return {};
};

export const getIsProblemSolvingMaterial = (
  isProblemSolvingMaterial: boolean
) => {
  if (isProblemSolvingMaterial) {
    return {
      backgroundColor: "red",
      color: "white",
    };
  }

  return {};
};
