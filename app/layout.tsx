// app/layout.tsx (ClerkProvider 추가)
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Score-URL',
  description: 'URL 보안 점수 분석 서비스',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth(); // 서버 컴포넌트에서 userId 확인

  return (
    <ClerkProvider>
      <html lang="ko">
        <body className="min-h-screen bg-slate-950 text-slate-100">
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
              <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold text-white">
                  Score-URL
                </Link>

                <div className="flex items-center gap-4">
                  <nav className="flex gap-4 text-xs text-slate-300">
                    <Link href="/" className="cursor-pointer hover:text-white">
                      홈
                    </Link>
                    <Link
                      href="/history"
                      className="cursor-pointer hover:text-white"
                    >
                      기록
                    </Link>
                    <Link
                      href="/about"
                      className="cursor-pointer hover:text-white"
                    >
                      소개
                    </Link>
                  </nav>

                  {/* 로그인 상태에 따라 UserButton 또는 로그인 링크 표시 */}
                  {userId ? (
                    // UserButton은 클라이언트 컴포넌트이므로, 최종 UI는 클라이언트에서 렌더링됨
                    <div style={{ paddingRight: '10px' }}>
                      {/* UserButton을 렌더링할 클라이언트 컴포넌트 필요 */}
                    </div>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700"
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </div>
            </header>

            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">{children}</div>
            </main>

            <footer>
              <div className="container mx-auto flex h-10 items-center justify-between px-4 text-xs text-slate-400">
                <span>© 2025 Score-URL Project</span>
                <span>중부대 웹 서버 보안 프로그래밍</span>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
