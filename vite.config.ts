import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 로컬 dev/build 는 루트(/)에서 동작. GitHub Pages 프로젝트 페이지는 /<repo>/ 하위에
// 배포되므로, 배포 워크플로(deploy.yml)에서 BASE_PATH=/<repo>/ 를 주입해 덮어쓴다.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
});
