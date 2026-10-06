import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";
import fs from "node:fs";

function autoSyncCartoonsPlugin(): Plugin {
  const sync = () => {
    try {
      const srcDir = resolve(__dirname, "cartoon_image");
      const destDir = resolve(__dirname, "public/assets/cartoons");
      const destDir2 = resolve(__dirname, "public/cartoons");
      const dataDir = resolve(__dirname, "src/data");
      if (!fs.existsSync(srcDir)) return;
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      if (!fs.existsSync(destDir2)) fs.mkdirSync(destDir2, { recursive: true });
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

      const files = fs
        .readdirSync(srcDir)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort();

      const manifest: Array<{ id: number; src: string; filename: string; alt: string }> = [];

      files.forEach((f, idx) => {
        const ext = f.substring(f.lastIndexOf("."));
        const cleanName = `cartoon-${String(idx + 1).padStart(2, "0")}${ext}`;
        const srcPath = resolve(srcDir, f);
        const destCleanPath = resolve(destDir, cleanName);
        const destCleanPath2 = resolve(destDir2, cleanName);

        if (
          !fs.existsSync(destCleanPath) ||
          fs.statSync(srcPath).mtimeMs > fs.statSync(destCleanPath).mtimeMs
        ) {
          fs.copyFileSync(srcPath, destCleanPath);
        }
        if (
          !fs.existsSync(destCleanPath2) ||
          fs.statSync(srcPath).mtimeMs > fs.statSync(destCleanPath2).mtimeMs
        ) {
          fs.copyFileSync(srcPath, destCleanPath2);
        }

        let cleanTitle = f
          .replace(/\.(jpg|jpeg|png|webp)$/i, "")
          .replace(/[^\w\s-]/g, "")
          .trim();
        if (!cleanTitle || cleanTitle.startsWith("download")) {
          cleanTitle = `Playful Cartoon Friend ${idx + 1}`;
        }

        manifest.push({
          id: idx + 1,
          src: `/assets/cartoons/${cleanName}`,
          filename: f,
          alt: cleanTitle,
        });
      });

      fs.writeFileSync(resolve(destDir, "manifest.json"), JSON.stringify(manifest, null, 2));

      const tsCode =
        "/* Auto-generated from cartoon_image/ directory */\n" +
        "export interface CartoonItem {\n" +
        "  id: number;\n" +
        "  src: string;\n" +
        "  alt: string;\n" +
        "}\n\n" +
        "export const ALL_CARTOONS: CartoonItem[] = " +
        JSON.stringify(
          manifest.map((m) => ({ id: m.id, src: m.src, alt: m.alt })),
          null,
          2
        ) +
        ";\n\n" +
        "export function getCartoon(id: number): CartoonItem {\n" +
        "  const index = ((id - 1) % ALL_CARTOONS.length + ALL_CARTOONS.length) % ALL_CARTOONS.length;\n" +
        "  return ALL_CARTOONS[index]!;\n" +
        "}\n";

      const tsPath = resolve(dataDir, "cartoons.ts");
      if (!fs.existsSync(tsPath) || fs.readFileSync(tsPath, "utf-8") !== tsCode) {
        fs.writeFileSync(tsPath, tsCode);
      }
    } catch (e) {
      console.error("Failed to auto-sync cartoon assets:", e);
    }
  };

  return {
    name: "auto-sync-cartoons",
    buildStart() {
      sync();
    },
    configureServer(server) {
      sync();
      server.watcher.add(resolve(__dirname, "cartoon_image"));
      server.watcher.on("all", (_event, filePath) => {
        if (filePath.includes("cartoon_image")) {
          sync();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    autoSyncCartoonsPlugin(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    nitro(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: true,
    port: 5173,
  },
  optimizeDeps: {
    include: ["leaflet"],
  },
});

