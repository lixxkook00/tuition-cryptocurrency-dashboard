import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';

import { ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

NavItem.propTypes = {
  item: PropTypes.object,
};

export default function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
