export const getIsToValidateStyle = (isToValidate: boolean) => {
  if (isToValidate) {
    return {
      backgroundColor: "orange",
      color: "white",
    };
  }

  return {};
};
