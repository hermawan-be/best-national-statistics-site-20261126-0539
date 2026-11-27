/* main.ts — Entrypoint.
   Menyalin folder app/ dan screenshots/ dari repo ini ke direktori output,
   lalu menulis dossier.json dengan memanggil buildDossier dari vendor.
   Hanya memakai standard library Node.js. Deterministik dan idempoten:
   tidak ada tanggal, angka acak, atau urutan tak berurutan dalam apa pun
   yang ditulis, dan tidak ada tulisan apa pun di luar direktori output. */

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

const dossierOptions = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTreeIfPresent(source, target) {
  rmSync(target, { recursive: true, force: true });
  if (existsSync(source)) {
    cpSync(source, target, { recursive: true });
  }
}

function build() {
  mkdirSync(outDir, { recursive: true });
  copyTreeIfPresent(join(repoDir, "app"), join(outDir, "app"));
  mkdirSync(join(outDir, "screenshots"), { recursive: true });
  copyTreeIfPresent(join(repoDir, "screenshots"), join(outDir, "screenshots"));
  const dossier = buildDossier(outDir, dossierOptions);
  writeFileSync(join(outDir, "dossier.json"), dossier);
}

function verifyOutput() {
  for (const name of ["app", "screenshots", "dossier.json"]) {
    const target = join(outDir, name);
    if (!existsSync(target)) {
      console.log(`output check: missing ${name}`);
      continue;
    }
    const size = statSync(target).size;
    const extra = name === "dossier.json" ? "" : ` (${readdirSync(target, { recursive: true }).length} entries)`;
    console.log(`output check: ${name} ${size} bytes${extra}`);
  }
}

function fallbackDossier(message) {
  return JSON.stringify({ error: message }, null, 2) + "\n";
}

try {
  build();
} catch (firstError) {
  try {
    mkdirSync(outDir, { recursive: true });
    const dossier = buildDossier(outDir, dossierOptions);
    writeFileSync(join(outDir, "dossier.json"), dossier);
  } catch {
    try {
      mkdirSync(outDir, { recursive: true });
      const message =
        firstError instanceof Error ? firstError.message : String(firstError);
      writeFileSync(join(outDir, "dossier.json"), fallbackDossier(message));
    } catch {
      /* Tidak ada lagi yang bisa dilakukan; keluar tetap dengan kode 0. */
    }
  }
}

verifyOutput();
