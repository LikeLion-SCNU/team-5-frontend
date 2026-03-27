<div align="center">

# 🦁 [팀명] - Frontend

### 멋쟁이사자처럼 순천대학교 14기 - [프로젝트명]

[![Status](https://img.shields.io/badge/상태-개발중-FF7F00?style=flat-square)]()
[![LikeLion](https://img.shields.io/badge/LikeLion--SCNU-14기-FF7F00?style=flat-square)]()
[![Backend](https://img.shields.io/badge/Backend-Repo-blue?style=flat-square)](https://github.com/LikeLion-SCNU/team-N-backend)

</div>

---

## 📌 프로젝트 소개

> 한 줄로 프로젝트를 설명해주세요.

<!-- 프로젝트에 대한 자세한 설명을 작성해주세요 -->

## 👥 팀원

| 이름 | 역할 | GitHub |
|:---:|:---:|:---:|
| 홍길동 | 🎨 프론트엔드 | [@github](https://github.com/) |
| 김철수 | 🎨 프론트엔드 | [@github](https://github.com/) |
| 이영희 | ✏️ 디자인 | [@github](https://github.com/) |

## 🛠️ 기술 스택

<!-- 사용하는 기술에 [x] 체크해주세요. 목록에 없으면 직접 추가해도 됩니다! -->

**Framework**

- [ ] ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
- [ ] ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
- [ ] ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
- [ ] ![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=svelte&logoColor=white)

**Language**

- [ ] ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
- [ ] ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

**Styling**

- [ ] ![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
- [ ] ![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)
- [ ] ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=flat-square&logo=css3&logoColor=white)

**상태 관리**

- [ ] ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
- [ ] ![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square&logoColor=white)
- [ ] ![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

**배포**

- [ ] ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
- [ ] ![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflarepages&logoColor=white)
- [ ] ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

**협업 도구**

- [ ] ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
- [ ] ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
- [ ] ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)

## 📂 프로젝트 구조

```
📦 frontend
├── 📁 public/               ← 정적 파일
├── 📁 src/
│   ├── 📁 components/       ← 재사용 컴포넌트
│   ├── 📁 pages/            ← 페이지 컴포넌트
│   ├── 📁 styles/           ← 스타일 파일
│   ├── 📁 hooks/            ← 커스텀 훅
│   ├── 📁 utils/            ← 유틸 함수
│   ├── 📁 api/              ← API 호출 함수
│   └── App.jsx
├── .env.example
├── package.json
└── README.md
```

## 🚀 실행 방법

```bash
# 프로젝트 클론
git clone https://github.com/LikeLion-SCNU/team-N-frontend.git

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 백엔드 API 주소 입력

# 개발 서버 실행
npm run dev
```

## 🔗 API 연동

백엔드 API 주소를 `.env` 파일에 설정합니다:

```
VITE_API_URL=http://localhost:8000
```

## 🌿 브랜치 전략

| 브랜치 | 용도 |
|:---:|:---|
| `main` | 배포용 (항상 안정된 코드) |
| `develop` | 개발 통합 브랜치 (PR은 여기로) |
| `feat/기능명` | 기능 개발 (예: `feat/login-page`, `feat/header`) |
| `fix/버그명` | 버그 수정 (예: `fix/css-layout`) |
| `design/작업명` | 디자인 작업 (예: `design/main-page`) |

### 작업 흐름

```
1. develop에서 새 브랜치 생성  →  git checkout -b feat/login-page develop
2. 작업 후 커밋                →  git add . && git commit -m "feat: 로그인 페이지 UI 구현"
3. develop으로 PR 생성         →  GitHub에서 PR 생성
4. 코드 리뷰 후 머지           →  PM이 확인 후 머지
5. 배포 시 main으로 머지       →  develop → main
```

## 📅 개발 일정

| 주차 | 기간 | 내용 |
|:---:|:---:|:---|
| 1주차 | MM/DD ~ MM/DD | 기획 및 UI 설계 |
| 2-3주차 | MM/DD ~ MM/DD | 핵심 UI 개발 |
| 4-5주차 | MM/DD ~ MM/DD | API 연동 및 고도화 |
| 6주차 | MM/DD ~ MM/DD | 테스트 및 배포 |

## 📎 관련 자료

- [기획서]()
- [디자인 (Figma)]()
- [Backend Repo](https://github.com/LikeLion-SCNU/team-N-backend)

---

<div align="center">

**🦁 멋쟁이사자처럼 순천대학교 14기 🦁**

</div>
