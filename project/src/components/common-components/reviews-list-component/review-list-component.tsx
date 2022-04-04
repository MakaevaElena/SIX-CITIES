import { getRatingWidth } from '../../../utils';

import { ReviewType } from '../../../types/review-type';

type ReviewsListProps = {
  reviews: ReviewType[];
}

const MAX_COUNT_OF_REVIEWS = 10;

function ReviewListComponent({ reviews }: ReviewsListProps): JSX.Element {

  const totalReviews = reviews.slice(0, MAX_COUNT_OF_REVIEWS);
  const sortedReviews = totalReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <li className="reviews__item" key={review.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={review.user.avatarUrl}
                  width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">
                {review.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${getRatingWidth(review.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime="2019-04-24">{review.date}</time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReviewListComponent;
