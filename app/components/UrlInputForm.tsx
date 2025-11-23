// app/components/UrlInputForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { isValidUrl } from '@/lib/validateUrl';

export default function UrlInputForm({
  onSubmit,
  disabled,
}: {
  // onSubmit 함수가 Promise<void>를 반환하도록 타입 정의
  onSubmit: (url: string) => Promise<void>;
  disabled: boolean;
}) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (disabled) return; // disabled 상태일 때 제출 방지

    if (!url.trim()) {
      setError('URL을 입력해주세요.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('올바른 URL 형식이 아닙니다.');
      return;
    }

    onSubmit(url);
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          검사할 URL
        </label>

        <input
          type="text"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={disabled}
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            disabled
              ? 'bg-slate-500 text-slate-300 cursor-not-allowed'
              : 'bg-emerald-500 text-slate-900 hover:bg-emerald-600'
          }`}
          disabled={disabled}
        >
          {disabled ? '분석 중...' : '분석하기'}
        </button>
      </form>
    </section>
  );
}
