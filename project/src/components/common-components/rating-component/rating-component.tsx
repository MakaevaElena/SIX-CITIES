import { ChangeEvent, Fragment } from 'react';

import { RatingName, RATING_VALUES } from '../../../const';

type RatingProps = {
  getRating: (evt: ChangeEvent<HTMLInputElement>) => void;
  rating: number;
}

function RatingComponent({ rating, getRating }: RatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating" >
      {
        RATING_VALUES.map((rank) => (
          <Fragment key={rank}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rank}
              id={`rating-${rank}-star`}
              type="radio"
              checked={rank === rating}
              onChange={getRating}
            />
            <label
              htmlFor={`rating-${rank}-star`}
              className="reviews__rating-label form__rating-label"
              title={RatingName[rank - 1].toLowerCase()}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </div>
  );
}
export default RatingComponent;


