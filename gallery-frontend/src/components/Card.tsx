import { useMemo } from 'react';
import './Card.scss';

export type CardItem = {
  id: number;
  imgPath: string;
  name: string;
  price: number;
  discountPer: number;
};

type CardProps = {
  item: CardItem;
};

export default function Card({ item }: CardProps) {
  const discountPrice = useMemo(() => {
    const discounted =
      item.price - (item.price * item.discountPer) / 100;
    return `${discounted.toLocaleString()}원`;
  }, [item.price, item.discountPer]);

  const put = async () => {
    window.alert('준비 중입니다.');
  };

  return (
    <div className="card shadow-sm">
      <span
        className="img"
        style={{ backgroundImage: `url(${item.imgPath})` }}
        aria-label={`상품 사진(${item.name})`}
      />
      <div className="card-body">
        <p className="card-text">
          <span className="me-2">{item.name}</span>
          <span className="discount badge bg-danger">
            {item.discountPer}%
          </span>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={put}
          >
            장바구니 담기
          </button>
          <small className="price text-muted">
            {item.price.toLocaleString()}원
          </small>
          <small className="real text-danger">{discountPrice}</small>
        </div>
      </div>
    </div>
  );
}

