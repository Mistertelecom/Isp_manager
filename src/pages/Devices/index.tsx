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
import RouterIcon from '@mui/icons-material/Router';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TerminalIcon from '@mui/icons-material/Terminal';

interface Device {
  id: number;
  name: string;
  type: 'OLT' | 'ROUTER' | 'SWITCH';
  model: string;
  ipAddress: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  uptime: string;
  load: number;
}

const mockDevices: Device[] = [
  {
    id: 1,
    name: 'OLT-PRINCIPAL',
    type: 'OLT',
    model: 'Huawei MA5608T',
    ipAddress: '192.168.1.1',
    location: 'Data Center Principal',
    status: 'ACTIVE',
    uptime: '45 dias',
    load: 35,
  },
  {
    id: 2,
    name: 'ROUTER-CORE',
    type: 'ROUTER',
    model: 'MikroTik CCR1036',
    ipAddress: '192.168.1.2',
    location: 'Data Center Principal',
    status: 'ACTIVE',
    uptime: '60 dias',
    load: 45,
  },
  {
    id: 3,
    name: 'SW-DIST-01',
    type: 'SWITCH',
    model: 'Cisco SG350X-24',
    ipAddress: '192.168.1.3',
    location: 'Distribuição - Setor 1',
    status: 'MAINTENANCE',
    uptime: '30 dias',
    load: 60,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'error';
    case 'MAINTENANCE':
      return 'warning';
    default:
      return 'default';
  }
};

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'OLT':
      return <SettingsInputHdmiIcon />;
    case 'ROUTER':
      return <RouterIcon />;
    case 'SWITCH':
      return <SettingsEthernetIcon />;
    default:
      return <RouterIcon />;
  }
};

const getLoadColor = (load: number) => {
  if (load < 50) return 'success';
  if (load < 80) return 'warning';
  return 'error';
};

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [devices] = useState<Device[]>(mockDevices);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.includes(searchTerm) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())
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
                Equipamentos
              </Typography>
              <Typography variant="body1">
                Gerencie todos os equipamentos da sua rede
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
                Novo Equipamento
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
              placeholder="Buscar por nome, IP ou localização..."
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
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uptime</TableCell>
              <TableCell>Carga</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.name}</TableCell>
                <TableCell>
                  <Chip
                    icon={getDeviceIcon(device.type)}
                    label={device.type}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{device.ipAddress}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <Chip
                    label={device.status}
                    color={getStatusColor(device.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{device.uptime}</TableCell>
                <TableCell>
                  <Chip
                    icon={<SignalCellularAltIcon />}
                    label={`${device.load}%`}
                    color={getLoadColor(device.load) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Acessar Terminal">
                    <IconButton size="small" color="primary">
                      <TerminalIcon />
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

export default Devices;
