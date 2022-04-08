import React from 'react';
import { Link } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client';

/* using GraphQL approach */
const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const Homepage = () => {
  let response;

  /* using REST API approach */
  // const { loading, error, data } = useFetch(
  //   'http://localhost:1337/api/reviews'
  // );

  /* using GraphQL approach */
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <h2>Loading ...</h2>;
  if (error) return <h2>Error :(</h2>;
  if (data) {
    /* using REST API approach */
    // response = Object.values(data.data);

    /* using GraphQL approach */
    response = data.reviews.data;
    // console.log(response[0].attributes.categories.data);
  }

  return (
    <div>
      {response &&
        response.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>
              <Link
                to={`/details/${review.id}`}
                style={{ borderBottom: 'none' }}
              >
                {review.attributes.title}
              </Link>
            </h2>

            {review.attributes.categories.data.map((cat) => (
              <small key={cat.id}>{cat.attributes.name}</small>
            ))}

            <p>
              {review.attributes.body.length > 200
                ? review.attributes.body.substring(0, 200)
                : review.attributes.body}{' '}
              ...
            </p>
            <Link to={`/details/${review.id}`}>Read more</Link>
          </div>
        ))}
    </div>
  );
};

export default Homepage;
