import { useRouter } from 'next/router';
import { Card, CardContent, Typography, Box } from '@mui/material';

const FlightDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const flights = [
    { id: '1', origin: 'New York', destination: 'Los Angeles', price: '$300' },
    { id: '2', origin: 'Chicago', destination: 'Miami', price: '$200' },
  ];

  const flight = flights.find((flight) => flight.id === id);

  if (!flight) return <Typography variant="h6" color="error">Flight not found</Typography>;

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Flight Detail</Typography>
          <Typography variant="body1"><strong>Origin:</strong> {flight.origin}</Typography>
          <Typography variant="body1"><strong>Destination:</strong> {flight.destination}</Typography>
          <Typography variant="body1"><strong>Price:</strong> {flight.price}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FlightDetail;
