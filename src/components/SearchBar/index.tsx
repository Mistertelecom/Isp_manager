import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Popper,
  CircularProgress,
  ClickAwayListener,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const anchorRef = useRef<HTMLDivElement>(null);
  const { searchResults, loading, searchCustomers } = useCustomerSearch();

  useEffect(() => {
    if (searchTerm) {
      searchCustomers(searchTerm);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchTerm, searchCustomers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCustomerClick = (customerId: number) => {
    setOpen(false);
    setSearchTerm('');
    navigate(`/customers/${customerId}`);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={anchorRef} sx={{ position: 'relative' }}>
        <TextField
          size="small"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: { xs: '100%', sm: 300 },
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
        />

        <Popper
          open={open && searchResults.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ width: anchorRef.current?.clientWidth, zIndex: 1400 }}
        >
          <Paper elevation={3} sx={{ mt: 1, maxHeight: 400, overflow: 'auto' }}>
            <List>
              {searchResults.map((customer) => (
                <ListItem
                  key={customer.id}
                  button
                  onClick={() => handleCustomerClick(customer.id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">{customer.name}</Typography>
                        <Chip
                          label={customer.status}
                          size="small"
                          color={
                            customer.status === 'ACTIVE'
                              ? 'success'
                              : customer.status === 'INACTIVE'
                              ? 'error'
                              : 'warning'
                          }
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" display="block">
                          {customer.cpfCnpj}
                        </Typography>
                        {customer.email && (
                          <Typography variant="caption" display="block">
                            {customer.email}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
