import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../hook/useAuth';

const defaultValues = {
  login: '',
  password: '',
};

type LoginPageProps = {
  openAlert: boolean;
  handleCloseAlert(): void;
};

const LoginPage: FC<LoginPageProps> = ({ openAlert, handleCloseAlert }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const { login, password } = formValues;

  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    signin(formValues, () => navigate(fromPage, { replace: true }));
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography variant="h3" my={3}>
        Авторизация
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} maxWidth={400}>
          <TextField
            id="login"
            name="login"
            fullWidth
            required
            label="Логин"
            value={login}
            onChange={handleChange}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            fullWidth
            required
            label="Пароль"
            value={password}
            onChange={handleChange}
          />

          <Box>
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </Box>

          <Fade in={openAlert}>
            <Alert
              severity="error"
              closeText="Закрыть"
              onClose={handleCloseAlert}
            >
              Неправильный логин или пароль
            </Alert>
          </Fade>
        </Stack>
      </form>
    </Container>
  );
};

export default LoginPage;
