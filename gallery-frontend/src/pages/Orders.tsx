import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/orderService.ts';
import type { OrderSummary, PagedResponse } from '../types/models.ts';
import { getData, getStatus } from '../utils/http.ts';

type OrdersArgs = {
  page: number;
  size: number;
};

type OrdersPage = {
  index: number;
  totalPages: number;
  totalElements: number;
};

export default function Orders() {
  const [args, setArgs] = useState<OrdersArgs>({
    page: 0,
    size: 5,
  });
  const [page, setPage] = useState<OrdersPage>({
    index: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [orders, setOrders] = useState<OrderSummary[]>([]);

  const getListNum = (idx: number) => {
    return page.totalElements - idx - args.size * page.index;
  };

  const load = useCallback(
    async (pageIdx?: number) => {
      const nextArgs = pageIdx === undefined ? args : { ...args, page: pageIdx };

      if (pageIdx !== undefined) {
        setArgs(nextArgs);
      }

      const res = await getOrders(nextArgs);
      const status = getStatus(res);
      const data = getData<PagedResponse<OrderSummary>>(res);

      if (status === 200 && data) {
        setOrders(Array.isArray(data.content) ? data.content : []);
        setPage({
          index: Number(data.number ?? 0),
          totalPages: Number(data.totalPages ?? 0),
          totalElements: Number(data.totalElements ?? 0),
        });
      }
    },
    [args]
  );

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="orders">
      <div className="container">
        <table className="table table-bordered my-4">
          <thead>
            <tr>
              <th className="text-center">번호</th>
              <th>주문자명</th>
              <th>결제 수단</th>
              <th>결제 금액</th>
              <th>결제일시</th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr key={o.id}>
                <td className="text-center">{getListNum(idx)}</td>
                <td>{o.name}</td>
                <td>{o.payment === 'card' ? '카드' : '무통장입금'}</td>
                <td>{Number(o.amount).toLocaleString()}원</td>
                <td>{o.created}</td>
                <td>
                  <Link to={`/orders/${o.id}`}>자세히 보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination d-flex justify-content-center pt-2">
          <div className="btn-group" role="group">
            {Array.from({ length: page.totalPages }, (_, idx) => (
              <button
                key={idx}
                type="button"
                className={`btn py-2 px-3 ${
                  page.index === idx ? 'btn-primary' : 'btn-outline-secondary'
                }`}
                onClick={() => {
                  void load(idx);
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
