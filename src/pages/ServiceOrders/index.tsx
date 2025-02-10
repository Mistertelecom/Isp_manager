import { useState } from 'react';
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
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ServiceOrder {
  id: number;
  type: 'INSTALLATION' | 'MAINTENANCE' | 'REMOVAL' | 'SUPPORT';
  customerName: string;
  address: string;
  status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  technician?: string;
  scheduledDate?: string;
  description: string;
  createdAt: string;
}

const mockOrders: ServiceOrder[] = [
  {
    id: 1001,
    type: 'INSTALLATION',
    customerName: 'João Silva',
    address: 'Rua das Flores, 123 - Centro',
    status: 'SCHEDULED',
    priority: 'NORMAL',
    technician: 'Carlos Técnico',
    scheduledDate: '2024-02-15 14:00',
    description: 'Instalação de internet fibra ótica 300MB',
    createdAt: '2024-02-10 09:30',
  },
  {
    id: 1002,
    type: 'MAINTENANCE',
    customerName: 'Maria Santos',
    address: 'Av. Principal, 500 - Jardim América',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    technician: 'Pedro Técnico',
    description: 'Cliente sem conexão - Verificar ONU',
    createdAt: '2024-02-10 10:15',
  },
  {
    id: 1003,
    type: 'SUPPORT',
    customerName: 'José Oliveira',
    address: 'Rua Quinze, 789 - Vila Nova',
    status: 'PENDING',
    priority: 'URGENT',
    description: 'Cliente relata lentidão na conexão',
    createdAt: '2024-02-10 11:00',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'success';
    case 'IN_PROGRESS':
      return 'info';
    case 'SCHEDULED':
      return 'primary';
    case 'PENDING':
      return 'warning';
    case 'CANCELLED':
      return 'error';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'LOW':
      return 'success';
    case 'NORMAL':
      return 'info';
    case 'HIGH':
      return 'warning';
    case 'URGENT':
      return 'error';
    default:
      return 'default';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'INSTALLATION':
      return <BuildIcon />;
    case 'MAINTENANCE':
      return <BuildIcon />;
    case 'REMOVAL':
      return <DeleteIcon />;
    case 'SUPPORT':
      return <AssignmentIcon />;
    default:
      return <BuildIcon />;
  }
};

const ServiceOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders] = useState<ServiceOrder[]>(mockOrders);

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
  );

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
                Ordens de Serviço
              </Typography>
              <Typography variant="body1">
                Gerencie todas as ordens de serviço
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
                Nova Ordem
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
              placeholder="Buscar por cliente, endereço ou número da OS..."
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
              <TableCell>OS</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Prioridade</TableCell>
              <TableCell>Técnico</TableCell>
              <TableCell>Agendamento</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <Chip
                    icon={getTypeIcon(order.type)}
                    label={order.type}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">{order.customerName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.address}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.priority}
                    color={getPriorityColor(order.priority) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {order.technician ? (
                    <Chip
                      icon={<PersonIcon />}
                      label={order.technician}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  {order.scheduledDate ? (
                    <Chip
                      icon={<ScheduleIcon />}
                      label={order.scheduledDate}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Concluir">
                    <IconButton size="small" color="success">
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" color="error">
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

export default ServiceOrders;
