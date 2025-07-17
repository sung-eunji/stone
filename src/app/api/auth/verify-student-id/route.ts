import { NextRequest, NextResponse } from 'next/server';
import {
  verifyStudentIdWithAI,
  validateStudentIdFormat,
  makeFinalVerificationDecision,
} from '@/lib/aiStudentVerification';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const imageFile = formData.get('studentIdImage') as File;
    const institution = formData.get('institution') as string;
    const studentId = formData.get('studentId') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const country = formData.get('country') as string;

    // 기본 검증
    if (
      !imageFile ||
      !institution ||
      !studentId ||
      !firstName ||
      !lastName ||
      !country
    ) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 파일 형식 검증
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (10MB 제한)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '파일 크기는 10MB 이하여야 합니다.' },
        { status: 400 }
      );
    }

    // 학번 형식 검증
    const formatValidation = validateStudentIdFormat(country, studentId);
    if (!formatValidation.isValid) {
      return NextResponse.json(
        { error: formatValidation.error },
        { status: 400 }
      );
    }

    // AI 학생증 검증
    const aiResult = await verifyStudentIdWithAI(imageFile, {
      institution,
      studentId,
      firstName,
      lastName,
    });

    // 최종 인증 결정
    const finalDecision = makeFinalVerificationDecision(aiResult);

    // 결과 반환
    return NextResponse.json({
      success: true,
      aiResult,
      finalDecision,
      message: finalDecision.isApproved
        ? 'AI 인증이 완료되었습니다!'
        : finalDecision.requiresManualReview
        ? 'AI 검증이 완료되었습니다. 수동 검토 후 승인됩니다.'
        : 'AI 검증에 실패했습니다. 정보를 다시 확인해주세요.',
    });
  } catch (error) {
    console.error('AI 학생증 인증 오류:', error);
    return NextResponse.json(
      { error: 'AI 인증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
