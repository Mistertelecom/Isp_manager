import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RouterIcon from '@mui/icons-material/Router';
import BuildIcon from '@mui/icons-material/Build';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';

interface Customer {
  id: number;
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  servicePoints: number;
  pendingOrders: number;
  dueDate: number;
  lastPayment: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'João Silva',
    cpfCnpj: '123.456.789-00',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Centro',
    plan: 'Fibra 300MB',
    status: 'ACTIVE',
    servicePoints: 2,
    pendingOrders: 1,
    dueDate: 10,
    lastPayment: '2024-01-10',
  },
  {
    id: 2,
    name: 'Maria Santos',
    cpfCnpj: '987.654.321-00',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    address: 'Av. Principal, 500 - Jardim América',
    plan: 'Fibra 500MB',
    status: 'ACTIVE',
    servicePoints: 1,
    pendingOrders: 0,
    dueDate: 15,
    lastPayment: '2024-01-15',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'error';
    case 'SUSPENDED':
      return 'warning';
    default:
      return 'default';
  }
};

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState<Customer[]>(mockCustomers);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cpfCnpj.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerClick = (customerId: number) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <Box>
      <Card 
        sx={{ 
          mb: 3, 
          background: (theme) => 
            `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          color: 'primary.contrastText',
        }}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Clientes
              </Typography>
              <Typography variant="body1">
                Gerencie todos os seus clientes
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Novo Cliente
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nome, CPF/CNPJ ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button startIcon={<FilterListIcon />}>Filtros</Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Plano</TableCell>
              <TableCell>Pontos</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Vencimento</TableCell>
              <TableCell>Ordens Pendentes</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handleCustomerClick(customer.id)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="action" />
                    <Box>
                      <Typography variant="subtitle2">{customer.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customer.cpfCnpj}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{customer.plan}</TableCell>
                <TableCell>
                  <Chip
                    icon={<RouterIcon />}
                    label={customer.servicePoints}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={getStatusColor(customer.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Dia {customer.dueDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  {customer.pendingOrders > 0 ? (
                    <Chip
                      icon={<BuildIcon />}
                      label={customer.pendingOrders}
                      color="warning"
                      size="small"
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Nova OS">
                    <IconButton size="small" color="primary">
                      <BuildIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Pagamento">
                    <IconButton size="small" color="primary">
                      <PaymentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement edit functionality
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement delete functionality
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
