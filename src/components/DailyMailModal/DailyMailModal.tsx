import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useGetTickets } from "generated/hook";
import { getDailyPoints } from "./DailyMailModal.service";

interface Props extends DialogProps {
    onClose: VoidFunction
}


const DailyMailModal = (props: Props) => {
    const getTickets = useGetTickets()

    const sprintGoal = "AAU ... "
    const { lateBy, toValidate, pointsDone, budget } = getDailyPoints(getTickets.data ?? [])

    // TODO: Explore MDX (limited with CRA) or React-markdown for rendering markdown 
    const daily = `
Hello everyone,

We are late by ${lateBy} points with ${toValidate} points to validate
Sprint Goal: ${sprintGoal}

Done: ${pointsDone} / ${budget} points
To be validated: ${toValidate} points
Behind: ${lateBy} points
`

    // TODO: copy with rich text https://dev.to/stegriff/copy-rich-html-with-the-native-clipboard-api-5ah8
    const onCopy = () => navigator.clipboard.writeText(daily)

    return (
        <Dialog {...props} fullWidth >
            <DialogTitle>
                Daily Mail
            </DialogTitle>

            <DialogContent >
                <textarea>{daily}</textarea>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={onCopy}>Copy to clipboard</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DailyMailModal;
