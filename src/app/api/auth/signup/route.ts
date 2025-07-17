import { NextRequest, NextResponse } from 'next/server';
import {
  verifyStudentStatus,
  uploadStudentIdImage,
  sendVerificationEmail,
} from '@/lib/studentVerification';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const country = formData.get('country') as string;
    const verificationMethod = formData.get('verificationMethod') as
      | 'email'
      | 'studentId';
    const institution = formData.get('institution') as string;
    const studentId = formData.get('studentId') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const studentIdImage = formData.get('studentIdImage') as File;

    // 기본 검증
    if (!email || !password || !firstName || !lastName || !country) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 학생 인증 데이터 준비
    const verificationData = {
      email: verificationMethod === 'email' ? email : undefined,
      institution: verificationMethod === 'studentId' ? institution : undefined,
      studentId: verificationMethod === 'studentId' ? studentId : undefined,
      graduationYear:
        verificationMethod === 'studentId' ? graduationYear : undefined,
      country,
      verificationMethod,
    };

    // 학생 인증 수행
    const isStudentVerified = await verifyStudentStatus(verificationData);

    if (!isStudentVerified) {
      return NextResponse.json(
        { error: '학생 인증에 실패했습니다. 정보를 다시 확인해주세요.' },
        { status: 400 }
      );
    }

    // 학생증 이미지 업로드 (필요한 경우)
    let studentIdImageUrl = '';
    if (verificationMethod === 'studentId' && studentIdImage) {
      try {
        studentIdImageUrl = await uploadStudentIdImage(studentIdImage);
      } catch {
        return NextResponse.json(
          { error: '학생증 이미지 업로드에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    // 이메일 인증 코드 발송
    if (verificationMethod === 'email') {
      const emailSent = await sendVerificationEmail(email);
      if (!emailSent) {
        return NextResponse.json(
          { error: '인증 이메일 발송에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    // 사용자 데이터 저장 (실제 구현에서는 데이터베이스에 저장)
    const userData = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      country,
      verificationMethod,
      institution,
      studentId,
      graduationYear,
      studentIdImageUrl,
      isVerified: verificationMethod === 'email' ? false : true, // 이메일 인증은 추가 검증 필요
      createdAt: new Date().toISOString(),
    };

    console.log('새 사용자 등록:', userData);

    return NextResponse.json({
      success: true,
      message:
        verificationMethod === 'email'
          ? '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.'
          : '회원가입이 완료되었습니다.',
      user: userData,
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
