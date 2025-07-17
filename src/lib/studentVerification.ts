// 학생 인증 관련 유틸리티 함수들

export interface StudentVerificationData {
  email?: string;
  institution?: string;
  studentId?: string;
  graduationYear?: string;
  country: string;
  verificationMethod: 'email' | 'studentId';
}

// 교육기관 이메일 도메인 검증
export const validateStudentEmail = (
  email: string,
  country: string
): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();

  switch (country) {
    case 'korea':
      return domain?.endsWith('.ac.kr') || domain?.endsWith('.edu.kr');
    case 'uk':
      return domain?.endsWith('.ac.uk') || domain?.endsWith('.sch.uk');
    case 'france':
      return (
        domain?.includes('.fr') &&
        (domain?.includes('univ') || domain?.includes('ac'))
      );
    default:
      return false;
  }
};

// 학생 인증 서비스 API 호출
export const verifyStudentStatus = async (
  data: StudentVerificationData
): Promise<boolean> => {
  try {
    // 실제 구현에서는 다음 중 하나를 사용할 수 있습니다:

    // 1. SheerID API
    // const response = await fetch('https://api.sheerid.com/verification', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.SHEERID_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     type: 'STUDENT',
    //     organizationId: getOrganizationId(data.country),
    //     data: {
    //       email: data.email,
    //       firstName: data.firstName,
    //       lastName: data.lastName
    //     }
    //   })
    // });

    // 2. Student Beans API
    // const response = await fetch('https://api.studentbeans.com/v1/verification', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-API-Key': process.env.STUDENTBEANS_API_KEY
    //   },
    //   body: JSON.stringify({
    //     email: data.email,
    //     country: data.country
    //   })
    // });

    // 3. UNiDAYS API
    // const response = await fetch('https://api.myunidays.com/v1.0/verification', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.UNIDAYS_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     email: data.email,
    //     country: data.country
    //   })
    // });

    // 임시 구현 - 실제로는 위의 API 중 하나를 사용
    console.log('학생 인증 요청:', data);

    // 시뮬레이션을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 임시로 90% 확률로 성공
    return Math.random() > 0.1;
  } catch (error) {
    console.error('학생 인증 오류:', error);
    return false;
  }
};

// 국가별 교육기관 ID 매핑 (SheerID용)
export const getOrganizationId = (country: string): string => {
  const organizationIds = {
    korea: 'korea-universities',
    uk: 'uk-universities',
    france: 'france-universities',
  };

  return organizationIds[country as keyof typeof organizationIds] || '';
};

// 학생증 이미지 업로드 및 검증
export const uploadStudentIdImage = async (file: File): Promise<string> => {
  try {
    // 실제 구현에서는 이미지 업로드 서비스 사용
    // 예: AWS S3, Cloudinary, Firebase Storage 등

    const formData = new FormData();
    formData.append('file', file);

    // const response = await fetch('/api/upload-student-id', {
    //   method: 'POST',
    //   body: formData
    // });

    // const { imageUrl } = await response.json();
    // return imageUrl;

    // 임시 구현
    console.log('학생증 이미지 업로드:', file.name);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return `https://example.com/student-id/${Date.now()}.jpg`;
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};

// 이메일 인증 코드 발송
export const sendVerificationEmail = async (
  email: string
): Promise<boolean> => {
  try {
    // 실제 구현에서는 이메일 서비스 사용
    // 예: SendGrid, AWS SES, Nodemailer 등

    console.log('인증 이메일 발송:', email);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return true;
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    return false;
  }
};

// 인증 코드 검증
export const verifyEmailCode = async (
  email: string,
  code: string
): Promise<boolean> => {
  try {
    // 실제 구현에서는 저장된 인증 코드와 비교

    console.log('이메일 인증 코드 검증:', email, code);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 임시로 '123456' 코드로 성공
    return code === '123456';
  } catch (error) {
    console.error('인증 코드 검증 오류:', error);
    return false;
  }
};
