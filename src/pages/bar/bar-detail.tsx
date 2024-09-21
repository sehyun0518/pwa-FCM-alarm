import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from '@styles/BarList/BarDetail.module.css';
import { stores, Store, MenuItem } from './bar-types.ts';
import { BarPage } from './bar.tsx';

import GoBack from '@assets/bar/goBack.png';
import MapMoveButton from '@assets/bar/지도이동버튼.png';

export const BarDetail = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const { storeName } = useParams<{ storeName: string }>();
  const store: Store | undefined = stores.find(
    (store) => store.name === storeName
  );

  if (!store) {
    return <div>가게를 찾을 수 없습니다.</div>;
  }
  console.log(store.imageUrl);

  const MoveMap = () => {
    navigate(`/bar/${BarPage}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles['barDetail-image']}>
        <img
          src={store.imageUrl}
          alt={`${store.name}`}
          className={styles.barMainImage}
        />
        <img
          src={GoBack}
          alt={`뒤로 가기`}
          className={styles.goBack}
          onClick={handleGoBack}
        />

        <div className={styles.barDetail}>
          <div className={styles['barDetail-title']}>
            <div className={styles['barDetail-storeName']}>{store.name}</div>
            <div className={styles['barDetail-storeRepre']}>
              {store.representative}
            </div>
            <img
              src={MapMoveButton}
              alt={'지도이동버튼'}
              className={styles.MoveToMap}
              onClick={MoveMap}
            />
          </div>

          <div className={styles.detailLine}></div>

          <div className={styles['barDetail-menu']}>
            <h3>메뉴</h3>
            <ul>
              {store.menu.map((item: MenuItem, index: number) => (
                <li key={index}>
                  {item.name}
                  <br />
                  {item.price}원
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
