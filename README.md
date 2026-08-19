<div align="center">

# 🦁 되는코드입니다. - Frontend

### 멋쟁이사자처럼 순천대학교 14기 - 내일은행

[![Status](https://img.shields.io/badge/상태-개발중-FF7F00?style=flat-square)]()
[![LikeLion](https://img.shields.io/badge/LikeLion--SCNU-14기-FF7F00?style=flat-square)]()
[![Backend](https://img.shields.io/badge/Backend-Repo-blue?style=flat-square)](https://github.com/LikeLion-SCNU/team-5-backend)

</div>

---

## 📌 프로젝트 소개

> **내일은행** — 매일의 습관을 논문 근거 기반 '수명 시간'으로 환산해 은행 잔고처럼 보여주는 AI 웰니스 뱅크

**React 웹 + PWA** 형식입니다. 심사위원은 URL로 즉시 사용하고, 홈 화면에 추가하면 앱처럼 실행됩니다.

### 핵심 화면 (피그마 와이어프레임 기준)
- 🏠 **홈** — 누적 수명 잔고(은행 잔고 문법) + 어제 순증감
- 🧾 **일별 명세서** — 습관별 증감 거래내역 + 출처 보기
- 📷 **식사 사진 분개** — 촬영/업로드 → AI 인식 항목 수정·확정
- 📚 **논문 출처 상세** — 근거·DOI 링크·적용 한계
- 👴 **얼굴 시뮬레이션** — 현재 추세 vs 개선 2분할 비교
- 🛡️ **보호 모드** — 손실 숨김·회복 중심 표현

## 🛠 기술 스택

| 구분 | 기술 |
|---|---|
| Framework | React (웹) + PWA (manifest·서비스워커는 인프라에서 지원) |
| Infra | Gabia Cloud, nginx, Docker, GitHub Actions CI/CD |
| Design | Figma "시간은행" 파일 (와이어프레임 23화면) |

## 🚀 배포 (자동)

**push만 하면 배포됩니다.** 자세한 내용은 [docs/DEPLOY.md](docs/DEPLOY.md)

| 브랜치 | 환경 | 주소 |
|---|---|---|
| `develop` | 개발 | http://1.201.116.27:8080 |
| `main` | 운영(심사 제출 URL) | **https://timebank.hbinserver.cloud** |

### 개발 규칙
1. **`main` 직접 push 금지** — develop → main PR로만
2. **API는 반드시 상대경로 `/api/...`** 로 호출 — 환경별 백엔드로 자동 프록시 (CORS 없음, 주소 하드코딩 금지)
3. React 프로젝트(package.json)를 레포 루트에 올리면 **자동으로 빌드·배포로 전환** (Vite·CRA 모두 지원, Dockerfile 수정 불필요)
4. 현재 `placeholder.html`은 파이프라인 검증용 — React 세팅 후 삭제

## 🏁 시작하기 (로컬)

```bash
# 예: Vite 기준 (레포 루트에 세팅)
npm create vite@latest . -- --template react
npm install
npm run dev
```

## 👥 Team 되는코드입니다.

| 이름 | 역할 | GitHub |
|---|---|---|
| 박현빈 | PM · 인프라 | [@Hbin77](https://github.com/Hbin77) |
| 허찬 | 백엔드 | [@heochan7](https://github.com/heochan7) |
| 김민수 | 백엔드 |  |
| 서예슬 | 프론트엔드 |  |
| 정연수 | 디자인 | [@wjddustn1](https://github.com/wjddustn1) |