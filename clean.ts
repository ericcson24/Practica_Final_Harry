import { walk } from "$std/fs/walk.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

// Detecta archivos tipo ._archivo en raíz y subcarpetas
const macJunk = /^\._.*$/;

// 1. Archivos en el directorio actual
for await (const entry of Deno.readDir(".")) {
  if (!entry.isFile) continue;

  if (macJunk.test(entry.name)) {
    const fullPath = join(".", entry.name);
    try {
      await Deno.remove(fullPath);
      console.log(`🧹 Deleted (root): ${fullPath}`);
    } catch (err) {
      console.error(`❌ Error deleting ${fullPath}:`, err);
    }
  }
}

// 2. Archivos en subcarpetas
for await (const entry of walk(".", { includeDirs: false })) {
  const fileName = entry.name.split("/").pop(); // obtiene el nombre del archivo
  if (fileName && macJunk.test(fileName)) {
    try {
      await Deno.remove(entry.path);
      console.log(`🧹 Deleted (subdir): ${entry.path}`);
    } catch (err) {
      console.error(`❌ Error deleting ${entry.path}:`, err);
    }
  }
}
