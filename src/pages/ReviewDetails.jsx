import React from 'react';
import { useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client';
import ReactMarkDown from 'react-markdown';

const REVIEW = gql`
  query GetReview($id: ID!) {
    # ID - in this case is a special type which is not null
    review(id: $id) {
      # id: $id means id is equal to id
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

const ReviewDetails = () => {
  const { id } = useParams();
  let response;

  /* using REST API approach */
  // const { error, loading, data } = useFetch(
  //   'http://localhost:1337/api/reviews/' + id
  // );

  /* using GraphQL approach */
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <h2>Loading ...</h2>;
  if (error) return <h2>Error :(</h2>;
  if (data) {
    /* using REST API approach */
    // response = data.data.attributes;

    /* using GraphQL approach */
    response = data.review.data.attributes;
    // console.log(response.categories.data[0]);
  }

  return (
    <>
      <div className="review-card">
        {response && (
          <>
            <div className="rating">{response.rating}</div>
            <h2 style={{ color: 'rgb(99, 93, 93)' }}>{response.title}</h2>

            {response.categories.data.map((cat) => (
              <small key={cat.id}>{cat.attributes.name}</small>
            ))}

            {/* <p>{response.body}</p> */}

            {/* Make use of the "ReactMarkDown" library to format RTF texts  */}
            <ReactMarkDown>{response.body}</ReactMarkDown>
          </>
        )}
      </div>
    </>
  );
};

export default ReviewDetails;
