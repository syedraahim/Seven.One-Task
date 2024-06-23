import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, Typography, CardMedia, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Box } from '@mui/material';
import ApolloProvider from '../../components/ApolloProvider';

const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($id: ID!) {
    place(id: $id) {
      id
      owner {
        id
      }
      desciption
      mainPhoto
      photos
      priceByNight
      reviews {
        id
        author {
          id
          name
          email
          photo
        }
        feedback
        rate
        place
      }
    }
  }
`;

const PlaceDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PLACE_DETAIL, {
    variables: { id },
    skip: !id,
  });

  if (!id) return <p>Invalid place ID</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { place } = data;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>{place.name}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              alt="Main Photo"
              height="400"
              image={place.mainPhoto}
              title="Main Photo"
            />
            <CardContent>
              <Typography variant="h5">Description</Typography>
              <Typography paragraph>{place.desciption}</Typography>
              <Typography variant="h6">Price per Night: {place.priceByNight}</Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Additional Photos</Typography>
          <Grid container spacing={2}>
            {place.photos.map((photo: string, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={`Photo ${index + 1}`}
                    height="200"
                    image={photo}
                    title={`Photo ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Reviews</Typography>
          <List>
            {place.reviews.map((review: { id: string; feedback: string; rate: number; author: { name: string; email: string; photo: string } }) => (
              <React.Fragment key={review.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={review.author.name} src={review.author.photo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.author.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {review.feedback}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Rating: {review.rate}/5
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Email: {review.author.email}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

const PlaceDetailPage: React.FC = () => (
  <ApolloProvider>
    <PlaceDetail />
  </ApolloProvider>
);

export default PlaceDetailPage;
