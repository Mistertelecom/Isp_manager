import { Box, Card, CardContent, Grid, Typography, Paper, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RouterIcon from '@mui/icons-material/Router';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js/auto';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total de Clientes',
      value: '358',
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Pontos Ativos',
      value: '412',
      icon: <RouterIcon />,
      color: theme.palette.success.main,
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Ordens Pendentes',
      value: '27',
      icon: <BuildIcon />,
      color: theme.palette.warning.main,
      trend: '-5%',
      trendUp: false,
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 75.890',
      icon: <AttachMoneyIcon />,
      color: theme.palette.info.main,
      trend: '+15%',
      trendUp: true,
    },
  ];

  const revenueData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receita',
        data: [65000, 68000, 72000, 71000, 75000, 75890],
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}20`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const clientsData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Novos Clientes',
        data: [25, 30, 28, 32, 35, 38],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const planDistributionData = {
    labels: ['Fibra 300MB', 'Fibra 500MB', 'Fibra 1GB'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.primary.main,
          theme.palette.primary.dark,
        ],
        borderWidth: 0,
      },
    ],
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
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="body1">
            Visão geral do seu provedor
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100%',
                  background: `linear-gradient(45deg, transparent, ${stat.color}15)`,
                  borderRadius: '50%',
                  transform: 'translateX(50%)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="h4" gutterBottom>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: stat.trendUp ? 'success.main' : 'error.main',
                    }}
                  >
                    {stat.trendUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {stat.trend}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Receita Mensal
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Planos
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut
                data={planDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Novos Clientes
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={clientsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
