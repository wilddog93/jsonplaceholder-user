import { MenuItem, Typography } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import type { LinkProps } from "react-router-dom";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={to}
      {...props}
    >
      <MenuItem
        sx={{ py: '6px', px: '12px' }}
      >
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontWeight: match ? 600 : 400 }}
        >
          {children}
        </Typography>
      </MenuItem>
    </Link>
  );
}

export default CustomLink;
