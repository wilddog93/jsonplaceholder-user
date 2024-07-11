import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CardUser } from '@/components/CardUser';
import { useAppDispatch, useAppSelector } from '@/stores/Hooks';
import { getUsers, selectUsers, UserProps } from '@/stores/features/users/userReducers';
import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button'
import { Add } from '@mui/icons-material';
import { FormUser } from '@/components/FormUser';

export default function UserPages() {
  const dispatch = useAppDispatch();
  const { users, pending } = useAppSelector(selectUsers);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const filters = useMemo(() => {
    const params = {}
    return params
  }, []);

  useEffect(() => {
    dispatch(getUsers(filters))
  }, [filters])

  const UserData = useMemo(() => {
    const result: UserProps[] = []
    if(users?.length > 0) {
      users?.map((user) => {
        result.push({
          ...user,
          avatar: `https://picsum.photos/id/${user.id}/200/300`
        })
      })
    }
    return result
  }, [users])

  return (
    <Container
      id="users"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Users
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button 
          variant="contained"
          sx={{ 
            display: "inline-flex",
            alignItems: 'center',
            gap: 1
          }}
          onClick={() => setIsOpenForm(true)}
        >
          <Add />
          <Typography variant="body2">
            New user
          </Typography>
        </Button>
      </Box>

      <Grid container spacing={2}>
        {UserData.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <CardUser user={user} loading={pending}/>
          </Grid>
        ))}
      </Grid>

      <FormUser 
        isOpen={isOpenForm}
        onClose={() => {
          setIsOpenForm(false)
        }}
      />
    </Container>
  );
}