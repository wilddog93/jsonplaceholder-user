import { FC, Fragment, MouseEvent, useState } from 'react'
import { 
  Avatar, 
  Card, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  IconButton, 
  ListItemIcon, 
  ListItemText, 
  Menu, 
  MenuItem, 
  Skeleton, 
  Typography 
} from '@mui/material'
import { UserProps } from '@/stores/features/users/userReducers';
import { ContentCopy, Delete, Edit, MoreVert } from '@mui/icons-material';
import { DetailUser } from './DetailUser';

type Users = {
  user?: UserProps;
  loading?: boolean;
};

// const logoStyle = {
//   width: '64px',
//   opacity: 0.3,
// };

export const CardUser: FC<Users> = ({ user, loading }) => {
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const onOpenCardDetail = () => {
    setIsOpenDetail(true)
  }

  const onCloseCardDetail = () => {
    setIsOpenDetail(false)
  }

  // setting-button
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Card sx={{ width: "100%", minWidth: 345, m: 2 }}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt={user.username}
                src={user.avatar}
              />
            )
          }
          action={
            loading ? null : (
              <Fragment>
                <IconButton 
                  aria-label="settings"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  variant='menu'
                >
                  <MenuItem onClick={() => {
                    onOpenCardDetail()
                    handleClose()
                  }}>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Detail</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </Menu>
              </Fragment>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (user.name)
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (user.email)
          }
        />
        {loading ? (
          <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image={user.avatar}
            alt={user.name}
            sx={{ width: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        )}
        <CardContent>
          {loading ? (
            <Fragment>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="body2" color="text.secondary" component="p">
              {user.address.street}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p">
              {user.address.suite}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p">
              {user.address.city}
            </Typography>
            </Fragment>
          )}
        </CardContent>
      </Card>

      {/* modal-detail */}
      <DetailUser 
        isOpen={isOpenDetail}
        onClose={onCloseCardDetail}
        user={user}
      />
    </Fragment>
  )
}
