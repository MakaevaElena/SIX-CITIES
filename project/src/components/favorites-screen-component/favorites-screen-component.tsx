import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import HeaderComponent from '../common-components/header-component/header-component';
import FavoriteListComponent from '../common-components/favorite-list-component/favorite-list-component';
import EmptyFavoriteListComponent from '../common-components/favorite-list-component/empty-favorite-list-component';
import FooterComponent from '../common-components/footer-component/footer-component';

import { loadFavoriteAction } from '../../store/api-actions/api-actions';
import { useAppSelector } from '../../hooks/index';

function FavoritesScreenComponent(): JSX.Element {
  const favorites = useAppSelector(({ DATA }) => DATA.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoriteAction());
  }, [dispatch]);

  return (
    <div className="page">
      <HeaderComponent />
      <main className={`page__main page__main--favorites ${favorites ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {
            favorites.length === 0 ? <EmptyFavoriteListComponent /> : <FavoriteListComponent favorites={favorites} />
          }
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default FavoritesScreenComponent;
