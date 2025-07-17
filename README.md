# stone

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 인증 시스템

이 프로젝트는 Gmail 로그인 기반의 사용자 인증 시스템과 학생 작가 인증 시스템을 포함하고 있습니다.

### 사용자 플로우

1. **일반 회원가입/로그인**: Gmail 계정으로 간편 가입
2. **바이어 모드**: 기본적으로 모든 사용자는 상품 구매 가능
3. **작가 등록**: 마이페이지에서 학생 인증 후 작가 권한 획득
4. **작품 판매**: 작가 인증 완료 후 작품 업로드 및 판매 가능

### 마이페이지 기능

1. **프로필 작성** 👤

   - 자기소개, 위치, 웹사이트, 전화번호 관리
   - 개인 정보 수정 및 저장

2. **작가 등록** 🎨

   - AI 학생증 자동 인증
   - 한국, 영국, 프랑스 학생 지원
   - 실시간 신뢰도 점수 및 검증 결과
   - 인증 완료 시 작가 권한 부여

3. **주문내역** 📦
   - 구매한 상품 목록 및 배송 상태 확인
   - 주문 번호, 날짜, 총액 정보

### 학생 인증 방법

1. **AI 학생증 자동 인증** 🤖

   - 학생증 사진 업로드
   - AI가 OCR로 텍스트 추출 및 검증
   - 실시간 신뢰도 점수 제공
   - 자동 승인 또는 수동 검토 필요 판단
   - 국가별 학번 형식 검증

2. **지원 국가**
   - 🇰🇷 한국: `.ac.kr`, `.edu.kr` 도메인
   - 🇬🇧 영국: `.ac.uk`, `.sch.uk` 도메인
   - 🇫🇷 프랑스: `.fr` 도메인 (univ, ac 포함)

### 학생 인증 API 서비스

실제 운영 시 다음 서비스 중 하나를 연동할 수 있습니다:

#### AI 인증 서비스

- **OpenAI GPT-4 Vision**: 이미지 분석 및 텍스트 추출
- **Google Cloud Vision API**: OCR 및 문서 검증
- **Azure Computer Vision**: 이미지 분석 및 텍스트 인식
- **AWS Rekognition + Textract**: 이미지 및 문서 분석

#### 학생 인증 서비스

- **SheerID**: 글로벌 학생 인증 전문 서비스
- **Student Beans**: 영국 중심 학생 인증 및 할인 서비스
- **UNiDAYS**: 글로벌 학생 인증 플랫폼

### 환경 설정

```bash
# 환경 변수 설정 (.env.local)

# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Gmail OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI 서비스 API 키
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_api_key
AZURE_COMPUTER_VISION_KEY=your_azure_vision_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# 학생 인증 서비스 API 키
SHEERID_API_KEY=your_sheerid_api_key
STUDENTBEANS_API_KEY=your_studentbeans_api_key
UNIDAYS_API_KEY=your_unidays_api_key
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
