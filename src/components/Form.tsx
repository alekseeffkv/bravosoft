import type { userType } from '../types';
import { FC, useEffect, useState } from 'react';
import { createOrder, checkOrder, getUsers } from '../utils/api';
import {
  Alert,
  Box,
  Button,
  Fade,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

const defaultValues = {
  userName: '',
  docName: '',
};

const Form: FC = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [users, setUsers] = useState<userType[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  const { userName, docName } = formValues;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    checkOrder(formValues).then((res) => {
      if (res.length !== 0) {
        setOpenAlert(true);
        return;
      }
    });

    createOrder(formValues);

    setFormValues(defaultValues);
  };

  const handleCloseAlert = () => setOpenAlert(false);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
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

        <Fade in={openAlert}>
          <Alert
            severity="error"
            closeText="Закрыть"
            onClose={handleCloseAlert}
          >
            Вы уже отправляли заявку на этот документ, она уже была учтена
          </Alert>
        </Fade>
      </Stack>
    </form>
  );
};

export default Form;
