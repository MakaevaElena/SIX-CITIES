import { useState } from 'react';
import { memo } from 'react';

import { setSortType } from '../../../store/offers-process/offers-process';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { SortingType } from '../../../utils';

function SortingComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(({ OFFERS }) => OFFERS.sortType);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        &nbsp;&nbsp;{sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
      >
        {
          Object.values(SortingType).map((type: string) => (
            <li
              key={type}
              className={`places__option${type === sortType ? ' places__option--active' : ''}`}
              tabIndex={0}
              onClick={
                () => {
                  setIsOpen(false);
                  dispatch(setSortType(type));
                }
              }
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form >
  );
}

export default memo(SortingComponent);
