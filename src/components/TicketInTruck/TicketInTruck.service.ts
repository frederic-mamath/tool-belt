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

export const findAndReplaceInvestigationLabel = (ticketName: string) => {
  const investigationLabelRegEx = /\[.*?\]/;

  const investigationLabelMatch = ticketName.match(investigationLabelRegEx);

  if (!investigationLabelMatch) {
    return {
      oldName: ticketName,
      isInvestigation: false,
      newName: null,
    };
  }

  const newName = ticketName.replace(/\[INVESTIGATION.*?\]/, "");

  return {
    oldName: ticketName,
    isInvestigation: true,
    newName,
  };
};

export const findAndReplaceInvestigationLabel = (ticketName: string) => {
  const investigationLabelRegEx = /\[.*?\]/;

  const investigationLabelMatch = ticketName.match(investigationLabelRegEx);

  if (!investigationLabelMatch) {
    return {
      oldName: ticketName,
      isInvestigation: false,
      newName: null,
    };
  }

  const newName = ticketName.replace("[R]", "");

  return {
    oldName: ticketName,
    isInvestigation: true,
    newName,
  };
};

export const getFilteredTicketName = (ticketName: string) => {
  let filteredTicketName = ticketName;
  const replacedInvestigationLabel =
    findAndReplaceInvestigationLabel(ticketName);

  filteredTicketName = replacedInvestigationLabel.newName || ticketName;
  filteredTicketName = filteredTicketName.replace("[R]", ""); // @debt plugin "Fred: Should be move to corresponding plugin"

  return {
    filteredTicketName,
    isInvestigation: replacedInvestigationLabel.isInvestigation,
  };
};
