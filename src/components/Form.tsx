import type { userType } from '../types';
import { FC, useEffect, useState } from 'react';
import { createOrder, checkOrder, getUsers } from '../utils/api';
import { useAuth } from '../hook/useAuth';
import {
  Alert,
  Box,
  Button,
  Fade,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

const defaultFormValues = {
  userName: '',
  docName: '',
};

const defaultAlert = {
  isOpen: false,
  message: '',
};

const orderError =
  'Вы уже отправляли заявку на этот документ, она уже была учтена';

const authError = 'Заявку можно отправить только под своим именем';

const Form: FC = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [users, setUsers] = useState<userType[]>([]);
  const [openAlert, setOpenAlert] = useState(defaultAlert);

  const { user } = useAuth();

  const { userName, docName } = formValues;
  const { isOpen, message } = openAlert;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    checkOrder(formValues).then((res) => {
      if (res.length !== 0) {
        setOpenAlert({ isOpen: true, message: orderError });
      } else {
        if (userName === user?.name) {
          createOrder(formValues);
        } else {
          setOpenAlert({ isOpen: true, message: authError });
        }
      }
    });

    setFormValues(defaultFormValues);
  };

  const handleCloseAlert = () => setOpenAlert(defaultAlert);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          id="userName"
          name="userName"
          fullWidth
          select
          required
          label="ФИО конструктора"
          value={userName}
          onChange={handleChange}
        >
          {users.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="docName"
          name="docName"
          fullWidth
          required
          label="Наименование документа"
          value={docName}
          onChange={handleChange}
        />

        <Box>
          <Button variant="contained" type="submit">
            Отправить заявку
          </Button>
        </Box>

        <Fade in={isOpen}>
          <Alert
            severity="error"
            closeText="Закрыть"
            onClose={handleCloseAlert}
          >
            {message}
          </Alert>
        </Fade>
      </Stack>
    </form>
  );
};

export default Form;
