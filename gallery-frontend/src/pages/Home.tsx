import { useEffect, useState } from 'react';
import { getItems } from '../services/itemService.ts';
import Card, { type CardItem } from '../components/Card.tsx';
import { getData, getStatus } from '../utils/http.ts';
import { normalizeItem } from '../utils/item.ts';

export default function HomeView() {
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    const run = async () => {
      const res = await getItems();
      const status = getStatus(res);
      const data = getData<Record<string, unknown>[]>(res);

      if (status === 200 && Array.isArray(data)) {
        setItems(data.map(normalizeItem));
      }
    };
    void run();
  }, []);

  return (
    <div className="home">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
            {items.map((item) => (
              <div key={item.id} className="col">
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


