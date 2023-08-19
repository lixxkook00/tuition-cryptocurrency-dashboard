import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      <Box
        component="img"
        src="/favicon/logo.png"
        sx={{ width: 80, height: 80, cursor: 'pointer', ...sx }}
      />
    </Link>
  )
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
