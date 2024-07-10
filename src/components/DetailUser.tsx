import React, { FC } from 'react'
import ModalComponent from '@/components/common/ModalComponent'
import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { UserProps } from '@/stores/features/users/userReducers';
import { Email, FmdGood, Phone, Work } from '@mui/icons-material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProps
}

export const DetailUser:FC<Props> = ({ isOpen, onClose, user }) => {
  return (
    <ModalComponent isOpen={isOpen} handleClose={onClose} size='md' position='center'>
      <Container maxWidth="lg" sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        py: 5
      }}>
        <Avatar
          src={user.avatar}
          alt={user.username}
          sx={{ height: 200, width:200, mx: "auto" }}
        />
        <Box
          sx={{
            width: { sm: '100%' },
            textAlign: { sm: 'center', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            {user.name}
          </Typography>
          <Typography component="p" variant="body1" color="text.primary">
            @{user.username}
          </Typography>
        </Box>

        <Divider />

        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Work />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Company" secondary={user.company.name} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Phone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Phone" secondary={user.phone} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FmdGood />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Address"
              secondary={`${user.address.street}. ${user.address.suite}, ${user.address.zipcode}, ${user.address.city}`}
            />
          </ListItem>
        </List>
      </Container>
    </ModalComponent>
  )
}
