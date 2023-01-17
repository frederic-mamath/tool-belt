import { TicketsOutboundDto } from "generated/model";

export const getDailyPoints = (tickets: TicketsOutboundDto[]) => {
    let lateBy = 0, toValidate = 0, pointsDone = 0


    for (const ticket of tickets) {
        switch (ticket.status) {
            case "DONE":
                pointsDone += ticket.ticketPoint ?? 0 // WHY NULLABLE
                break;

            case "TO_VALIDATE":
                toValidate += ticket.ticketPoint ?? 0
                break;

            default:
                if (ticket.isProblemSolvingMaterial)
                    lateBy += ticket.ticketPoint ?? 0

                break;
        }
    }

    return { lateBy, toValidate, pointsDone, budget: lateBy + toValidate + pointsDone }
}

