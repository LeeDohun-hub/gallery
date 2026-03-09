import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItems, removeItem } from '../services/cardService.ts';
import type { ItemSummary } from '../types/models.ts';
import { getData, getStatus } from '../utils/http.ts';
import { formatWon, getDiscountedPrice, normalizeItem, toImgSrc } from '../utils/item.ts';
import './Cart.css';

type CartItem = ItemSummary;

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const load = useCallback(async () => {
    const res = await getItems();
    const status = getStatus(res);
    const data = getData<Record<string, unknown>[]>(res);

    if (status === 200 && Array.isArray(data)) {
      setItems(data.map(normalizeItem));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (itemId: number) => {
    const res = await removeItem(itemId);
    if (getStatus(res) === 200) {
      window.alert('선택하신 장바구니의 상품을 삭제했습니다.');
      await load();
    }
  };

  return (
    <div className="cart">
      <div className="container">
        {items.length > 0 ? (
          <>
            <ul className="cart-items">
              {items.map((i) => (
                <li key={i.id}>
                  <img
                    alt={`상품 사진(${i.name})`}
                    src={toImgSrc(i.imgPath)}
                  />
                  <b className="cart-item-name">{i.name}</b>
                  <span className="cart-item-price">
                    {formatWon(getDiscountedPrice(i.price, i.discountPer))}
                  </span>
                  <span
                    className="cart-item-remove float-end"
                    onClick={() => remove(i.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        remove(i.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    title="삭제"
                  >
                    &times;
                  </span>
                </li>
              ))}
            </ul>
            <div className="cart-act">
              <Link to="/order" className="btn btn-primary">
                주문하기
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-5">장바구니가 비어있습니다.</div>
        )}
      </div>
    </div>
  );
}
