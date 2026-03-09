import { useNavigate } from 'react-router-dom';
import { addItem } from '../services/cardService.ts';
import { useAccountStore } from '../stores/account.tsx';
import type { ItemSummary } from '../types/models.ts';
import { getStatus } from '../utils/http.ts';
import { formatWon, getDiscountedPrice, toImgSrc } from '../utils/item.ts';
import './Card.css';

export type CardItem = ItemSummary;

type CardProps = {
  item: CardItem;
};

export default function Card({ item }: CardProps) {
  const { state } = useAccountStore();
  const navigate = useNavigate();
  const discountPrice = formatWon(
    getDiscountedPrice(item.price, item.discountPer)
  );
  const imgSrc = toImgSrc(item.imgPath ?? '');

  const put = async () => {
    if (!state.loggedIn) {
      if (window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login');
      }
      return;
    }

    const res = await addItem(item.id);
    if (getStatus(res) === 200 && window.confirm('장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?')) {
      navigate('/cart');
    }
  };

  return (
    <div className="card shadow-sm">
      <div
        className="card-img-wrap"
        style={{
          backgroundImage: imgSrc ? `url(${imgSrc})` : undefined,
        }}
        role="img"
        aria-label={item.name ? `상품 사진(${item.name})` : '상품 사진'}
      />
      <div className="card-body">
        <p className="card-text">
          <span className="me-2">{item.name}</span>
          <span className="discount badge bg-danger">{item.discountPer}%</span>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={put}
          >
            장바구니 담기
          </button>
          <small className="price text-muted">{formatWon(item.price)}</small>
          <small className="real text-danger">{discountPrice}</small>
        </div>
      </div>
    </div>
  );
}
