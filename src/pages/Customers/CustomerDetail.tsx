import { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RouterIcon from '@mui/icons-material/Router';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportIcon from '@mui/icons-material/Support';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CustomerDetail = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock data
  const customer = {
    id: 1,
    name: 'João Silva',
    cpfCnpj: '123.456.789-00',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    mobilePhone: '(11) 98888-8888',
    address: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    status: 'ACTIVE',
  };

  const activePlan = {
    name: 'Fibra 300MB',
    price: 99.90,
    downloadSpeed: 300,
    uploadSpeed: 150,
    dueDay: 10,
    status: 'ACTIVE',
  };

  const servicePoints = [
    {
      id: 1,
      address: 'Rua das Flores, 123',
      type: 'FIBER',
      status: 'ACTIVE',
      equipment: 'ONT Huawei',
      ipAddress: '192.168.1.100',
    },
  ];

  const serviceOrders = [
    {
      id: 1,
      type: 'INSTALLATION',
      status: 'COMPLETED',
      date: '2024-02-10',
      description: 'Instalação de internet fibra ótica',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {customer.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              CPF/CNPJ: {customer.cpfCnpj}
            </Typography>
            <Chip
              label={customer.status}
              color={customer.status === 'ACTIVE' ? 'success' : 'error'}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Contato
            </Typography>
            <Typography variant="body1">{customer.email}</Typography>
            <Typography variant="body1">{customer.phone}</Typography>
            <Typography variant="body1">{customer.mobilePhone}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Endereço
            </Typography>
            <Typography variant="body1">
              {customer.address}, {customer.number}
              {customer.complement && ` - ${customer.complement}`}
            </Typography>
            <Typography variant="body1">
              {customer.neighborhood} - {customer.city}/{customer.state}
            </Typography>
            <Typography variant="body1">{customer.zipCode}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Plano Atual</Typography>
            <Button startIcon={<EditIcon />} variant="outlined" size="small">
              Alterar Plano
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Plano
              </Typography>
              <Typography variant="body1">{activePlan.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Valor
              </Typography>
              <Typography variant="body1">
                R$ {activePlan.price.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Velocidade
              </Typography>
              <Typography variant="body1">
                ↓ {activePlan.downloadSpeed}MB / ↑ {activePlan.uploadSpeed}MB
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Vencimento
              </Typography>
              <Typography variant="body1">Dia {activePlan.dueDay}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<RouterIcon />} label="Pontos de Acesso" iconPosition="start" />
          <Tab icon={<DescriptionIcon />} label="Faturas" iconPosition="start" />
          <Tab icon={<BuildIcon />} label="Ordens de Serviço" iconPosition="start" />
          <Tab icon={<SupportIcon />} label="Chamados" iconPosition="start" />
          <Tab icon={<PaymentIcon />} label="Financeiro" iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button startIcon={<AddIcon />} variant="contained">
              Novo Ponto
            </Button>
          </Box>
          <Grid container spacing={3}>
            {servicePoints.map((point) => (
              <Grid item xs={12} md={6} key={point.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {point.address}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Tipo
                        </Typography>
                        <Chip label={point.type} size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip
                          label={point.status}
                          color={point.status === 'ACTIVE' ? 'success' : 'error'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Equipamento
                        </Typography>
                        <Typography variant="body2">{point.equipment}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          IP
                        </Typography>
                        <Typography variant="body2">{point.ipAddress}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button startIcon={<AddIcon />} variant="contained">
              Nova Ordem
            </Button>
          </Box>
          <Grid container spacing={3}>
            {serviceOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Tipo
                        </Typography>
                        <Typography variant="body1">{order.type}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip
                          label={order.status}
                          color={order.status === 'COMPLETED' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Descrição
                        </Typography>
                        <Typography variant="body1">{order.description}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CustomerDetail;
