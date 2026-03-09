import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../services/cardService.ts';
import { addOrder } from '../services/orderService.ts';
import type { ItemSummary, PaymentMethod } from '../types/models.ts';
import { getData, getStatus } from '../utils/http.ts';
import { getDiscountedPrice } from '../utils/item.ts';

type OrderItem = ItemSummary;

type OrderFormState = {
  name: string;
  address: string;
  payment: PaymentMethod;
  cardNumber: string;
};

function itemPrice(price: number, discountPer: number): number {
  return getDiscountedPrice(price, discountPer);
}

export default function OrderForm() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [form, setForm] = useState<OrderFormState>({
    name: '',
    address: '',
    payment: 'card',
    cardNumber: '',
  });

  const nameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, i) => sum + itemPrice(i.price, i.discountPer),
    0
  );

  const loadItems = useCallback(async () => {
    const res = await getItems();
    const status = getStatus(res);
    const data = getData<OrderItem[]>(res);
    if (status === 200) {
      setItems(Array.isArray(data) ? data : []);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const handleChange =
    (field: keyof OrderFormState) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value =
        event.target.type === 'radio'
          ? (event.target.value as 'card' | 'bank')
          : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      window.alert('이름을 입력해주세요.');
      nameRef.current?.focus();
      return;
    }

    if (!form.address.trim()) {
      window.alert('주소를 입력해주세요.');
      addressRef.current?.focus();
      return;
    }

    if (form.payment === 'card') {
      if (!form.cardNumber.trim()) {
        window.alert('카드 번호를 입력해주세요.');
        cardNumberRef.current?.focus();
        return;
      }

      const numericCard = parseInt(form.cardNumber, 10).toString();
      if (
        form.cardNumber.length > 16 ||
        numericCard !== form.cardNumber
      ) {
        window.alert('카드 번호는 16자 이하의 숫자로만 입력해주세요.');
        cardNumberRef.current?.focus();
        return;
      }
    }

    const payload = {
      ...form,
      cardNumber: form.payment === 'card' ? form.cardNumber : '',
      itemIds: items.map((i) => i.id),
    };

    const res = await addOrder(payload);
    const status = getStatus(res);

    if (status === 200) {
      const messages = ['주문이 완료되었습니다.'];
      if (form.payment === 'bank') {
        const priceStr = totalPrice.toLocaleString();
        messages.push(
          `한국은행 123-456789-777 계좌로 ${priceStr}원을 입금해주시기 바랍니다.`
        );
      }
      window.alert(messages.join('\n'));
      navigate('/');
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="container">
        <div className="py-5 text-center">
          <div className="h4">
            <b>주문하기</b>
          </div>
          <p className="h6 font-lg mt-3">
            주문 내역을 확인하시고 주문하기 버튼을 클릭해주세요
          </p>
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="mb-3">
              <span className="h5 mb-3 align-middle me-2">
                <b>구입 목록</b>
              </span>
              <span className="badge bg-primary rounded-pill align-middle">
                {items.length}
              </span>
            </div>
            <ul className="items list-group mb-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="p-3 list-group-item d-flex justify-content-between"
                >
                  <div>
                    <h6 className="my-0">{i.name}</h6>
                  </div>
                  <span className="text-muted">
                    {itemPrice(i.price, i.discountPer).toLocaleString()}원
                  </span>
                </li>
              ))}
            </ul>
            <div className="border p-4 bg-light h5 rounded text-center total-price">
              <span>합계 </span>
              <b>{totalPrice.toLocaleString()}원</b>
            </div>
            <button type="submit" className="w-100 btn btn-primary py-4 mt-4">
              결제하기
            </button>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="h5 mb-3">
              <b>주문자 정보</b>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="name" className="form-label">
                  이름
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  className="form-control p-3"
                  id="name"
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </div>
              <div className="col-12 pt-1">
                <label htmlFor="address" className="form-label">
                  주소
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  className="form-control p-3"
                  id="address"
                  value={form.address}
                  onChange={handleChange('address')}
                />
              </div>
            </div>
            <div className="h5 mt-5 mb-3">
              <b>결제 수단</b>
            </div>
            <div className="my-3">
              <div className="form-check">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  value="card"
                  checked={form.payment === 'card'}
                  onChange={handleChange('payment')}
                />
                <label className="form-check-label" htmlFor="card">
                  신용카드
                </label>
              </div>
              <div className="form-check">
                <input
                  id="bank"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  value="bank"
                  checked={form.payment === 'bank'}
                  onChange={handleChange('payment')}
                />
                <label className="form-check-label" htmlFor="bank">
                  무통장입금
                </label>
              </div>
            </div>
            {form.payment === 'card' && (
              <div className="pt-1">
                <label htmlFor="cardNum" className="form-label">
                  카드 번호
                </label>
                <input
                  ref={cardNumberRef}
                  type="text"
                  className="form-control p-3"
                  id="cardNum"
                  value={form.cardNumber}
                  onChange={handleChange('cardNumber')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
