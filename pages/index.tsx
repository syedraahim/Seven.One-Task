import { useQuery, gql } from '@apollo/client';
import { Grid, Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';
import Link from 'next/link';
import ApolloProvider from '../components/ApolloProvider';

const GET_PLACES = gql`
  query GetPlaces {
    placeList {
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
      }
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PLACES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const flights = [
    { id: '1', origin: 'New York', destination: 'Los Angeles', price: '$300' },
    { id: '2', origin: 'Chicago', destination: 'Miami', price: '$200' },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>Places</Typography>
      <Grid container spacing={3}>
        {data.placeList.map((place: { id: string; desciption: string; mainPhoto: string; priceByNight: string }) => (
          <Grid item key={place.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Main Photo"
                height="140"
                image={place.mainPhoto}
                title="Main Photo"
              />
              <CardContent>
                <Typography variant="h5">Place ID: {place.id}</Typography>
                <Typography>{place.desciption}</Typography>
                <Typography>Price per Night: {place.priceByNight}</Typography>
              </CardContent>
              <CardActions>
                <Link href={`/place/${place.id}`} passHref>
                  <Button size="small" color="primary">View Details</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom>Flights</Typography>
      <Grid container spacing={3}>
        {flights.map((flight) => (
          <Grid item key={flight.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{flight.origin} to {flight.destination}</Typography>
                <Typography>Price: {flight.price}</Typography>
                <Link href={`/flight/${flight.id}`} passHref>
                  <Button size="small" color="primary">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const HomePage: React.FC = () => (
  <ApolloProvider>
    <Home />
  </ApolloProvider>
);

export default HomePage;
