import { MouseEvent } from 'react';

const ButtonSize = {
  small: {
    width: '18',
    heigth: '31',
  },
  big: {
    width: '19',
    heigth: '33',
  },
};

type ButtonPropsType = {
  isFavorite: boolean,
  isSmall: boolean,
  handleFavoriteButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void,
}

function FavoriteButtonComponent({ handleFavoriteButtonClick, isFavorite, isSmall }: ButtonPropsType): JSX.Element {

  return (
    <button
      className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={isSmall ? ButtonSize.small.width : ButtonSize.small.heigth}
        height={isSmall ? ButtonSize.big.width : ButtonSize.big.heigth}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">bookmarks</span>
    </button>
  );
}

export default FavoriteButtonComponent;
