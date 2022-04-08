import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import SiteHeader from './components/SiteHeader';

import HomePage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';
import Category from './pages/Category';

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div className="app">
      <Router>
        <ApolloProvider client={client}>
          <SiteHeader />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/details/:id" element={<ReviewDetails />} />

            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </ApolloProvider>
      </Router>

      {/* <Switch>
        <Route path="/">
          <HomePage />
        </Route>

        <Route path="/details/:id">
          <ReviewDetails />
        </Route>

        <Route path="/category/:id">
          <Category />
        </Route>
      </Switch> */}
    </div>
  );
};

export default App;
