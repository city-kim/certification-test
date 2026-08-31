import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 로컬 dev/build 는 루트(/)에서 동작. GitHub Pages 프로젝트 페이지는 /<repo>/ 하위에
// 배포되므로, 배포 워크플로(deploy.yml)에서 BASE_PATH=/<repo>/ 를 주입해 덮어쓴다.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  // 5173 이 다른 프로젝트에 점유된 경우를 위해 PORT 환경변수로 포트 지정 가능
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      input: {
        // 기존 모바일 앱
        main: "index.html",
        // 시크릿(뉴스 게시판 위장) 모드 — dev: /certification-test-secret/
        secret: "certification-test-secret/index.html",
      },
    },
  },
});
