import React, { useState, useCallback, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Typography, 
  Drawer,
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const ResizableContainer = styled(Box, { 
  shouldForwardProp: (prop) => prop !== 'width' 
})(({ theme, width }) => ({
  position: 'fixed',
  top: '64px',
  left: 0,
  height: 'calc(100vh - 64px)',
  width: `${width}px`,
  background: 'rgba(50, 50, 50, 0.9)',
  backdropFilter: 'blur(15px)',
  transition: 'width 0.3s ease',
  overflowX: 'hidden',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const ResizeHandle = styled(Box)(({ theme }) => ({
  width: '10px',
  height: '100%',
  position: 'absolute',
  right: '-5px',
  top: 0,
  cursor: 'col-resize',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001,
  background: 'transparent',
  '&:hover': {
    background: 'rgba(255,255,255,0.1)',
  },
}));

const MobileMenuButton = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '',
  left: '5px',
  zIndex: 1200,
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
  cursor: 'pointer',
}));

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'User Management', to: '/users' },
    { label: 'Role Management', to: '/roles' },
    { label: 'Permission Management', to: '/permissions' },
  ];

  const handleMouseMove = useCallback((e) => {
    e.preventDefault();
    
    if (isResizing) {
      // Constrain width between 200 and 500 pixels
      const newWidth = Math.max(200, Math.min(e.clientX, window.innerWidth * 0.5));
      setSidebarWidth(newWidth);
    }
  }, [isResizing]);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.userSelect = 'auto';
  }, [handleMouseMove]);

  const startResize = useCallback((e) => {
    e.preventDefault();
    
    setIsResizing(true);
    document.body.style.userSelect = 'none';
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
  }, [handleMouseMove, stopResize]);

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [handleMouseMove, stopResize]);

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          key={item.label} 
          component={Link} 
          to={item.to}
          onClick={() => isMobile && setIsMobileDrawerOpen(false)}
          sx={{
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <MobileMenuButton onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}>
          {isMobileDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </MobileMenuButton>
      )}

      {/* Desktop Sidebar */}
      <ResizableContainer width={!isMobile ? sidebarWidth : 0}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#fff', 
            textAlign: 'center', 
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Admin Dashboard
        </Typography>
        
        {renderMenuItems()}
        
        {!isMobile && (
          <ResizeHandle onMouseDown={startResize}>
            <DragIndicatorIcon 
              sx={{ 
                color: 'white', 
                opacity: 0.5,
                fontSize: '20px' 
              }} 
            />
          </ResizeHandle>
        )}
      </ResizableContainer>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px',
            background: 'rgba(50, 50, 50, 0.9)',
            backdropFilter: 'blur(15px)',
            color: '#fff',
          }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#fff', 
            textAlign: 'center', 
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Admin Dashboard
        </Typography>
        {renderMenuItems()}
      </Drawer>
    </>
  );
};

export default Sidebar;