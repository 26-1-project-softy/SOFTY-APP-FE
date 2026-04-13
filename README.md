# 🧑‍🏫 SOFTY

> 교사-학부모 소통 분쟁 리스크 완화를 위한 NLP 기반 AI 메시지 검토·기록 서비스입니다.

## 📖 Overview

SOFTY는 교사와 학부모가 필요한 내용을 기록으로 남기며 주고받을 수 있는 비동기 소통 서비스입니다.  
응답에 대한 부담을 줄이고, 필요한 내용을 구조적으로 전달하고 확인할 수 있는 소통 경험을 제공합니다.

학부모는 앱에서 카카오 로그인을 통해 서비스를 시작하고, 학급 코드로 교사와 연결된 뒤 문의를 작성하고 답변을 확인할 수 있습니다.  
또한 문의 전송 전 AI가 메시지의 문의 의도를 분석해주며, 필요 시 의도를 직접 수정해 보다 정확한 소통이 가능하도록 돕습니다.

## ✨ Main Features

### Parent

- 카카오 로그인
  - 카카오 계정으로 간편하게 로그인할 수 있습니다.
  - 로그인 후 학급 참여 및 문의 기능을 이용할 수 있습니다.

- 학급 참여
  - 학부모 정보, 자녀 정보, 학급 코드를 입력해 교사와 연결할 수 있습니다.
  - 학급 코드 인증을 통해 올바른 학급에 참여할 수 있습니다.

- 문의함
  - 작성한 문의 목록과 교사의 답변 현황을 확인할 수 있습니다.
  - 문의 의도, 처리 상태, 마지막 메시지 등을 한눈에 확인할 수 있습니다.

- 문의 상세 확인
  - 교사와 주고받은 메시지를 대화 형태로 확인할 수 있습니다.
  - 문의 의도와 처리 상태를 함께 보며 소통 흐름을 파악할 수 있습니다.

- 새 문의 작성
  - 교사에게 전달할 문의를 작성해 전송할 수 있습니다.
  - 필요한 내용을 기록 중심으로 정리해 전달할 수 있습니다.

- AI 문의 의도 분석
  - 전송 전 AI가 작성한 문의의 의도를 분석합니다.
  - 분석된 의도가 적절하지 않은 경우 사용자가 직접 수정할 수 있습니다.

- 설정
  - 학부모 정보와 자녀 정보, 연결된 학급 정보를 확인할 수 있습니다.
  - 교사의 근무시간을 확인하고 로그아웃 및 회원 탈퇴를 진행할 수 있습니다.

## 🛠️ Tech Stack

### Frontend

- **React Native**
- **Expo**
- **TypeScript**
- **React Navigation**
- **Emotion**

### State & API

- **TanStack Query**
- **Zustand**
- **Axios**

### Tooling

- **ESLint**
- **Prettier**

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18 이상
- npm
- Expo CLI 환경
- Android Studio Emulator 또는 Expo Go 앱

### 1. Repository Clone

```bash
git clone [레포지토리 주소]
cd [프로젝트 폴더명]
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm start
```

## 🗂️ Project Structure

```markdown
src/
├─ assets/ # 프로젝트 내부에서 사용하는 정적 리소스
├─ components/ # 재사용 UI 컴포넌트
│ └─ common/ # 공통 컴포넌트
├─ constants/ # 상수, 라벨 맵, enum 매핑, 정규식
├─ features/ # 도메인별 상태 관리, TanStack Query 훅, 캐시 키, 타입 정의
├─ hooks/ # 공통 커스텀 훅
├─ navigation/ # 네비게이터 및 화면 전환 구조
├─ providers/ # QueryProvider, ThemeProvider 등 전역 Provider
├─ screens/ # 화면 단위 컴포넌트
├─ services/ # API 호출 로직
│ └─ http/ # axios 인스턴스, 인터셉터 설정
├─ stores/ # 전역 상태 관리 스토어
├─ styles/ # 디자인 시스템, 테마, 공통 스타일
├─ utils/ # 범용 유틸 함수
├─ App.tsx
└─ index.ts
```
