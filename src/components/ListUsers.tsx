import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CardUser } from './CardUser';

// https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg
// https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraLight.svg
const users = [
  {
    avatar: "/static/images/avatar/1.jpg",
    name: 'Remy Sharp',
    occupation: 'Senior Engineer',
    description:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    avatar: "/static/images/avatar/2.jpg",
    name: 'Travis Howard',
    occupation: 'Lead Product Designer',
    description:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    avatar: "/static/images/avatar/3.jpg",
    name: 'Cindy Baker',
    occupation: 'CTO',
    description:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
  },
  {
    avatar: "/static/images/avatar/4.jpg",
    name: 'Julia Stewart',
    occupation: 'Senior Engineer',
    description:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
  },
  {
    avatar: "/static/images/avatar/5.jpg",
    name: 'John Smith',
    occupation: 'Product Designer',
    description:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
  },
  {
    avatar: "/static/images/avatar/6.jpg",
    name: 'Daniel Wolf',
    occupation: 'CDO',
    description:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
  },
];

export default function ListUsers() {
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
      <Grid container spacing={2}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <CardUser 
              avatar={user.avatar}
              name={user.name}
              description={user.description}
              occupation={user.occupation}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}