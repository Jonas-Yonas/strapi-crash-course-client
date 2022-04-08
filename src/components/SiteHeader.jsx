import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const SiteHeader = () => {
  let response;
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading categories ...</p>;
  if (error) return <p>Error fetching categories :(</p>;

  if (data) {
    response = data.categories.data;
    // console.log(data.categories.data);
  }

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Nexus Reviews</h1>
      </Link>

      <nav className="categories">
        <span>Filter reviews by category: </span>
        {response.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
