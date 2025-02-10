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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RouterIcon from '@mui/icons-material/Router';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface ServicePoint {
  id: number;
  customerName: string;
  address: string;
  type: 'FIBER' | 'WIRELESS' | 'CABLE';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  equipment: string;
  signal: number;
}

const mockServicePoints: ServicePoint[] = [
  {
    id: 1,
    customerName: 'João Silva',
    address: 'Rua das Flores, 123 - Centro',
    type: 'FIBER',
    status: 'ACTIVE',
    equipment: 'ONU Huawei HG8245H',
    signal: -20,
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    address: 'Av. Principal, 500 - Jardim América',
    type: 'WIRELESS',
    status: 'ACTIVE',
    equipment: 'Ubiquiti LiteBeam AC',
    signal: -65,
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

const getTypeColor = (type: string) => {
  switch (type) {
    case 'FIBER':
      return 'primary';
    case 'WIRELESS':
      return 'secondary';
    case 'CABLE':
      return 'info';
    default:
      return 'default';
  }
};

const getSignalQuality = (signal: number, type: string) => {
  if (type === 'FIBER') {
    if (signal > -25) return { color: 'success', text: 'Excelente' };
    if (signal > -30) return { color: 'success', text: 'Bom' };
    return { color: 'error', text: 'Ruim' };
  }
  
  // Wireless
  if (signal > -65) return { color: 'success', text: 'Excelente' };
  if (signal > -75) return { color: 'success', text: 'Bom' };
  if (signal > -85) return { color: 'warning', text: 'Regular' };
  return { color: 'error', text: 'Ruim' };
};

const ServicePoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [points] = useState<ServicePoint[]>(mockServicePoints);

  const filteredPoints = points.filter(
    (point) =>
      point.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase())
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
                Pontos de Serviço
              </Typography>
              <Typography variant="body1">
                Gerencie todos os pontos de conexão da sua rede
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
                Novo Ponto
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
              placeholder="Buscar por cliente ou endereço..."
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
              <TableCell>Endereço</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Equipamento</TableCell>
              <TableCell>Sinal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPoints.map((point) => {
              const signalQuality = getSignalQuality(point.signal, point.type);
              return (
                <TableRow key={point.id}>
                  <TableCell>{point.customerName}</TableCell>
                  <TableCell>{point.address}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<RouterIcon />}
                      label={point.type}
                      color={getTypeColor(point.type) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{point.equipment}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<SignalCellularAltIcon />}
                      label={`${point.signal} dBm - ${signalQuality.text}`}
                      color={signalQuality.color as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={point.status}
                      color={getStatusColor(point.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicePoints;
