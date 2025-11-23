// app/api/history/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '@/lib/db-connect';
import ScanResultModel from '@/lib/models/ScanResult';

export async function GET() {
  // 1. 인증 확인
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Authentication Required', { status: 401 });
  }

  try {
    // 2. DB 연결 및 기록 조회
    await dbConnect();

    const history = await ScanResultModel.find({ userId: userId })
      .select('url score trustLevel scanDate')
      .sort({ scanDate: -1 })
      .limit(50);

    // 3. 결과 반환
    return NextResponse.json(history);
  } catch (error: any) {
    console.error('History API Error:', error.message);
    return NextResponse.json(
      { error: '기록 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}
