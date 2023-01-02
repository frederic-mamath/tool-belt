import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAuthenticationCtx } from "contexts/authenticationCtx";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { axiosClient } from "services/network";

interface FormValues {
  email: string;
  password: string;
}

const SignInPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authenticationCtx = useAuthenticationCtx();
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (authenticationCtx.isAuthenticated) {
      navigate("/daily");
    }
  }, [authenticationCtx.isAuthenticated]);
  const onSubmit = async (values: FormValues) => {
    const { email, password } = values;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const response = await axiosClient({
      method: "post",
      url: "/api/login",
      data: formData,
    });

    if (!response) {
      return;
    }

    if (response.status === 200) {
      enqueueSnackbar("You are signed in !", { variant: "success" });
      authenticationCtx.setIsAuthenticated(true);
      authenticationCtx.setConnectedUser({
        email: "frederic.mamath@gmail.com",
        isClearstreamUser: false,
      });
      navigate("/daily");

      return;
    }
  };

  return (
    <Stack direction="row" flex={1}>
      <Stack flex={1}>
        <img
          src="https://res.cloudinary.com/pokpok/image/upload/c_scale,q_15,w_567/v1669758803/conference-room-sketch_mwacth.jpg"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Stack>
      <Stack flex={1} p={4}>
        <Typography sx={{ textAlign: "center" }} variant="h2">
          Welcome
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="body2">
          Everybody has a different way of doing things. That&apos;s why our web
          application provides users with an easy way to prepare their daily
          meetings and technical sprints for teams
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Stack gap={2} flex={1} justifyContent="center">
            <TextField label="Username" {...register("email")} />
            <TextField
              label="Password"
              {...register("password")}
              type="password"
              sx={{ mb: 4 }}
            />
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default SignInPage;
