// app/detail/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';

export default function DetailPage() {
  // URL에서 동적 파라미터 [id] 값을 가져옵니다.
  const params = useParams();
  const scanId = params.id;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">분석 상세 보고서</h1>

      <p className="text-slate-400 text-sm mb-4">
        요청 ID: <span className="font-mono text-indigo-300">{scanId}</span>
      </p>

      {/* --- 분석 상세 내용 섹션 --- */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          API 응답 원본 (추가 구현 필요)
        </h2>
        <p className="text-slate-500">
          이 페이지는 현재 더미 데이터로 표시됩니다.
          <br />
          **백엔드/DB 연동**을 통해 해당 ID의 상세 API 응답 데이터(예: GSB 위협
          목록, VirusTotal JSON 리포트)를 가져와 표시하도록 구현해야 합니다.
        </p>

        <div className="bg-black p-4 rounded text-xs font-mono text-green-300 overflow-x-auto">
          {/* 여기에 실제 API 응답 JSON 원본이 표시될 예정 */}
          <pre>{`{
  "status": "warning",
  "score": 75,
  "gsb_matches": ["PHISHING_ATTEMPT"],
  "vt_positives": 3
}`}</pre>
        </div>
      </div>
    </div>
  );
}
