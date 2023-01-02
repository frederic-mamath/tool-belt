import { Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { SPRINTS } from "./SprintsPage.service";

const SprintsPage = () => {
  return (
    <Stack>
      <Typography variant="h1">Sprints</Typography>
      {SPRINTS.map((sprint) => (
        <Link key={sprint.id} to={`/sprints/${sprint.id}`}>
          <Card sx={{ p: 2, mb: 2 }} elevation={4}>
            {sprint.sprintCount}
          </Card>
        </Link>
      ))}
    </Stack>
  );
};

export default SprintsPage;
