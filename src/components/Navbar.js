import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';

const HoverButton = styled(Button)`
  position: relative;
  transition: all 0.3s ease;
  font-weight: bold;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: white;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    color: #ffcc00;

    &::after {
      width: 100%;
      left: 0;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.9) 30%, rgba(103, 58, 183, 0.9) 90%)',
    color: 'white',
    width: '70%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Users', to: '/users' },
    { label: 'Roles', to: '/roles' },
    { label: 'Permissions', to: '/permissions' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(45deg, rgba(74, 20, 140, 0.8) 30%, rgba(123, 31, 162, 0.8) 90%)',
        boxShadow: '0 4px 6px 2px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(5px)', // Optional: adds a blur effect
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            color: 'white',
          }}
        >
          VRV Security
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <StyledDrawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Menu
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                {navItems.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    component={Link}
                    to={item.to}
                    onClick={toggleDrawer(false)}
                    sx={{
                      padding: '1rem 2rem',
                      '&:hover': {
                        backgroundColor: '#ffcc00',
                        color: '#4A148C',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </StyledDrawer>
          </>
        ) : (
          navItems.map((item) => (
            <HoverButton
              key={item.label}
              component={Link}
              to={item.to}
              color="inherit"
            >
              {item.label}
            </HoverButton>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
