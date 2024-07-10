import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { FC } from 'react'

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
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        p: 1,
      }}
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
  )
}
