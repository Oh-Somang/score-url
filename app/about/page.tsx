// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-white">
        Score-URL 프로젝트 소개 및 팀 구성
      </h1>

      <p className="text-slate-300 leading-relaxed">
        Score-URL은 사용자가 입력한 웹사이트(URL)의 보안 위험도를 분석해 신뢰도
        점수로 시각화하는 웹 서비스입니다. Google Safe Browsing, VirusTotal 등
        외부 API를 통해 악성 사이트 여부를 자동 분석하고, 그 결과를 점수화하여
        한눈에 위험도를 파악할 수 있도록 지원합니다.
      </p>

      {/* 서비스 기능 섹션 */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">서비스 기능</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>URL 위험도 점수 분석 및 신뢰도 등급 부여 (A~F)</li>
          <li>
            Google Safe Browsing 및 VirusTotal 연동을 통한 **피싱/악성코드
            탐지**
          </li>
          <li>사용자별 URL 분석 기록 저장 및 조회 (MongoDB)</li>
          <li>Clerk을 이용한 안전한 사용자 인증 및 API 보호</li>
        </ul>
      </div>

      {/* 프로젝트 정보 섹션 */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">프로젝트 정보</h2>
        <p className="text-slate-300">
          중부대학교 웹 서버 보안 프로그래밍 팀 프로젝트 (2025)
        </p>
        <div className="mt-4 space-y-1">
          <p className="text-sm text-slate-400">프론트엔드: 곽남호</p>
          <p className="text-sm text-slate-400">백엔드/API: 김민석, 박성준</p>
          <p className="text-sm text-slate-400">DB 설계/관리: 오소망</p>
        </div>
      </div>
    </div>
  );
}
