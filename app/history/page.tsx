// app/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface HistoryItem {
  _id: string;
  url: string;
  score: number;
  trustLevel: string;
  scanDate: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch('/api/history');

        if (response.status === 401) {
          router.push('/sign-in');
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || '기록 조회에 실패했습니다.');
          setHistory([]);
          return;
        }

        setHistory(data);
      } catch (err) {
        setError('네트워크 오류로 기록을 가져올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [router]);

  if (loading) {
    return (
      <p className="text-center text-xl mt-16 text-slate-300">
        기록을 불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-xl mt-16 text-red-400">오류: {error}</p>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-center text-xl mt-16 text-slate-400">
        분석 기록이 없습니다.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">최근 분석 기록</h1>
      <ul className="space-y-4">
        {history.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between p-4 bg-slate-800 rounded-lg shadow-lg hover:bg-slate-700 transition duration-150"
          >
            <div className="flex flex-col">
              <span className="text-lg font-medium text-indigo-300 truncate w-96 md:w-auto">
                {item.url}
              </span>
              <span className="text-xs text-slate-400">
                분석 일시:{' '}
                {format(new Date(item.scanDate), 'yyyy.MM.dd HH:mm:ss')}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-sm font-bold rounded-full ${
                  item.score >= 80
                    ? 'bg-emerald-500 text-slate-900'
                    : item.score >= 40
                    ? 'bg-yellow-500 text-slate-900'
                    : 'bg-red-500 text-white'
                }`}
              >
                점수: {item.score} ({item.trustLevel})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
