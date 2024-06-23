import { ApolloProvider as Provider } from '@apollo/client';
import client from '../lib/apolloClient';

const ApolloProvider: React.FC = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;