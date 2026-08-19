# ── 빌드 스테이지: package.json이 생기면 React 앱을 빌드합니다 ──
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
# package.json 있으면 npm 빌드 (Vite=dist, CRA=build 모두 대응), 없으면 public/을 그대로 사용
RUN if [ -f package.json ]; then \
      npm ci && npm run build && \
      { [ -d dist ] && mv dist /out || mv build /out; }; \
    else \
      mkdir /out && cp -r public/. /out/ 2>/dev/null || true; \
      [ -f /out/index.html ] || cp placeholder.html /out/index.html; \
    fi

# ── 서빙 스테이지 ──
FROM nginx:alpine
COPY --from=build /out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
