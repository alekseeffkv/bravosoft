import { FC, useState } from 'react';
import { Box, Container, Tabs, Tab, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import Form from './Form';
import Table from './Table';

const tabProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const HomePage: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ flexGrow: 1 }}>
      <Typography variant="h3" my={3}>
        Заказ документов
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Форма для заявки" {...tabProps(0)} />
          <Tab label="Сводная таблица" {...tabProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Table />
      </TabPanel>
    </Container>
  );
};

export default HomePage;
