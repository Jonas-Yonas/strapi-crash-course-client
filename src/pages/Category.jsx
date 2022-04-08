import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

// query GetReview($id: ID!) {
//   review(id: $id) {
//     data {
//       id
//       attributes {
//         title
//         rating
//         body
//       }
//     }
//   }
// }

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    # ID - in this case is a special type which is not null
    category(id: $id) {
      # id: $id means id is equal to id
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                body
                rating
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
      }
    }
  }
`;

const Category = () => {
  let title;
  let response;
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    title = data.category.data.attributes.name;
    response = data.category.data.attributes.reviews.data;

    // console.log('title: ', title);
    // console.log(response);
  }

  return (
    <div>
      <h2>{title}</h2>
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

export default Category;
