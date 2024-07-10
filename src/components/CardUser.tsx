import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { FC, Fragment, useState } from 'react'
import ModalComponent from './common/ModalComponent';

type Users = {
  avatar?: string;
  name?: string;
  occupation?: string;
  description?: string;
};

// const logoStyle = {
//   width: '64px',
//   opacity: 0.3,
// };

export const CardUser: FC<Users> = ({ avatar, name, occupation, description }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenCard = () => {
    setIsOpen(true)
  }

  const onCloseCard = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          p: 1,
          ":hover": {
            cursor: "pointer"
          }
        }}
        onClick={onOpenCard}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            pr: 2,
          }}
        >
          <CardHeader
            avatar={<Avatar alt={name} src={avatar} />}
            title={name}
            subheader={occupation}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>

      <ModalComponent isOpen={isOpen} handleClose={onCloseCard} size='md' position='center'>
        <div>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </ModalComponent>
    </Fragment>
  )
}
