import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RouterIcon from '@mui/icons-material/Router';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Pontos de Serviço', icon: <LocationOnIcon />, path: '/service-points' },
  { text: 'Equipamentos', icon: <RouterIcon />, path: '/devices' },
  { text: 'Ordens de Serviço', icon: <BuildIcon />, path: '/service-orders' },
  { text: 'Financeiro', icon: <AttachMoneyIcon />, path: '/financial' },
];

export const NavMenu = () => {
  return (
    <>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          component={Link}
          to={item.path}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </>
  );
};

export default NavMenu;
