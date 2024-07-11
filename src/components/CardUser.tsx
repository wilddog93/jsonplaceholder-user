/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Fragment, MouseEvent, useState } from 'react'
import { 
  Alert,
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  CircularProgress, 
  Container, 
  Divider, 
  IconButton, 
  ListItemIcon, 
  ListItemText, 
  Menu, 
  MenuItem, 
  Skeleton, 
  Snackbar, 
  Typography 
} from '@mui/material'
import { deleteUser, selectUsers, UserProps } from '@/stores/features/users/userReducers';
import { ContentCopy, Delete, Edit, MoreVert } from '@mui/icons-material';
import { DetailUser } from './DetailUser';
import { FormUser } from './FormUser';
import ModalComponent from './common/ModalComponent';
import { useAppDispatch, useAppSelector } from '@/stores/Hooks';

type Users = {
  user?: UserProps;
  loading?: boolean;
};

// const logoStyle = {
//   width: '64px',
//   opacity: 0.3,
// };

export const CardUser: FC<Users> = ({ user, loading }) => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector(selectUsers);

  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<UserProps>({});

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

  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState<string>("");

  const handleCloseAlert = () => {
    setIsMessage("");
    setIsOpenAlert(false);
  }

  const onDeleteUser = (id?:number | string) => {
    if(!id) return;
    dispatch(deleteUser({
      id: user.id,
      isSuccess: async () => {
        setIsOpenDelete(false)
        setIsOpenAlert(true);
        setIsMessage("User has been deleted.");
      },
      isError: async(error: any) => {
        console.log(error)
      }
    }))
  }

  return (
    <Fragment>
      <Card sx={{ width: "100%", minWidth: 345 }}>
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
                  <MenuItem 
                    onClick={() => {
                      onOpenCardDetail()
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Detail</ListItemText>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setIsOpenUpdate(true)
                      setFormValue(user)
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setIsOpenDelete(true)
                      handleClose()
                    }}
                  >
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

      {/* modal-update */}
      <FormUser 
        isOpen={isOpenUpdate}
        onClose={() => {
          setIsOpenUpdate(false)
          setFormValue({});
        }}
        user={formValue}
        isUpdate
      />

      {/* modal-delete */}
      <ModalComponent isOpen={isOpenDelete} handleClose={()=> setIsOpenDelete(false)} size='sm' position='center'>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            gap: 2,
            p: 2
          }}
        >
          <Typography 
            variant="h6" 
            color="text.primary"
          >
            {`Are you sure to delete, ${user.name}`}
          </Typography>
        </Box>

        <Divider />

        <Container
          component="div" 
          maxWidth="lg" 
          sx={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "end",
            gap: 3,
            py: 3,
          }}
        >
          <Button 
            type='button'
            variant="outlined" 
            color="primary"
            sx={{ maxWidth: 'fit-content' }}
            disabled={pending}
            onClick={() => setIsOpenDelete(false)}
          >
            Dismiss
          </Button>

          <Button 
            type='button'
            variant="contained" 
            color="primary"
            sx={{ maxWidth: 'fit-content' }}
            disabled={pending}
            onClick={() => onDeleteUser(user?.id)}
          >
            {pending ? 
            <Box sx={{ display: 'flex' }}>
              <span>Loading...</span>
              <CircularProgress size={20} />
            </Box> : "Delete"
            }
          </Button>
        </Container>
      </ModalComponent>

      {/* snackbar-alert-succes */}
      <Snackbar
        open={isOpenAlert} 
        autoHideDuration={3000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}
