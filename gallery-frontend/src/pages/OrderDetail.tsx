import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/orderService.ts';
import type { OrderDetailData } from '../types/models.ts';
import { getData, getStatus } from '../utils/http.ts';
import './OrderDetail.css';

const defaultOrder: OrderDetailData = {
  id: 0,
  name: '',
  address: '',
  payment: '',
  amount: 0,
  created: '',
  items: [],
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetailData>(defaultOrder);

  const load = useCallback(async () => {
    if (!id) return;
    const res = await getOrder(id);
    const status = getStatus(res);
    const data = getData<OrderDetailData>(res);

    if (status === 200 && data) {
      setOrder(data);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const createdDisplay =
    typeof order.created === 'number'
      ? order.created.toLocaleString()
      : String(order.created);

  return (
    <div className="order-detail py-5">
      <div className="container">
        <div className="row">
          <div className="order col-lg-8">
            <div className="h5 mb-4">
              <b>주문 내용</b>
            </div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>주문 ID</th>
                  <td>{order.id}</td>
                </tr>
                <tr>
                  <th>주문자명</th>
                  <td>{order.name}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td>{order.address}</td>
                </tr>
                <tr>
                  <th>결제 금액</th>
                  <td>{order.amount.toLocaleString()}원</td>
                </tr>
                <tr>
                  <th>결제 수단</th>
                  <td>
                    {order.payment === 'card'
                      ? '카드'
                      : '무통장입금(한국은행 123-456789-777)'}
                  </td>
                </tr>
                <tr>
                  <th>결제 일시</th>
                  <td>{createdDisplay}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="items col-lg-4">
            <div className="h5 mb-4">
              <b>주문 상품</b>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>상품명</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={item.id ?? idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
