// app/api/score/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '@/lib/db-connect';
import ScanResultModel from '@/lib/models/ScanResult';
import { checkGoogleSafeBrowsing } from '@/lib/gsb';
import { checkVirusTotal } from '@/lib/virustotal';
import { calculateScore } from '@/lib/scoring';
import { normalizeUrl } from '@/lib/utils';
import { ScanResult } from '@/lib/types';

export async function POST(request: Request) {
  // 1. 인증 확인
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Authentication Required', { status: 401 });
  }

  const { url } = await request.json();
  const normalizedUrl = normalizeUrl(url);

  if (!normalizedUrl) {
    return NextResponse.json(
      { error: '유효하지 않은 URL 형식입니다.' },
      { status: 400 }
    );
  }

  try {
    // 2. 외부 API 호출 및 점수 계산
    const gsbThreats = await checkGoogleSafeBrowsing(normalizedUrl);
    const vtStats = await checkVirusTotal(normalizedUrl);

    let scanResultBase = calculateScore(gsbThreats, vtStats);

    let scanResult: ScanResult = {
      ...scanResultBase,
      url: normalizedUrl,
    };

    // 3. DB 연결 및 기록 저장
    await dbConnect();

    await ScanResultModel.create({
      userId: userId,
      url: normalizedUrl,
      score: scanResult.score,
      trustLevel: scanResult.trustLevel,
      apiResults: {
        googleSafeBrowsing: gsbThreats,
        virusTotal: vtStats,
      },
    });

    // 4. 결과 반환
    return NextResponse.json(scanResult);
  } catch (error: any) {
    console.error('URL 분석 서버 오류:', error.message);
    return NextResponse.json(
      {
        status: 'error',
        detail: '분석 중 서버 오류가 발생했습니다. 로그를 확인하세요.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'URL 분석 POST 엔드포인트입니다.' });
}
