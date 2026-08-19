# 프론트 배포 파이프라인 (자동)

| 브랜치 | 환경 | 주소 | API 프록시 |
|---|---|---|---|
| `develop` | 개발 | http://1.201.116.27:8080 | /api → 백엔드 :8001 |
| `main` | 데모(심사 제출) | https://timebank.hbinserver.cloud | /api → 백엔드 :8000 |

- push하면 자동 배포. main 직접 push 금지(develop → PR)
- React 앱을 레포 루트에 세팅(package.json + npm run build)하면 **자동으로 빌드·배포로 전환**됨 (Vite/CRA 모두 지원, Dockerfile 수정 불필요)
- API 호출은 상대경로 `/api/...`로 하면 환경별 백엔드로 자동 연결 (CORS 문제 없음)
