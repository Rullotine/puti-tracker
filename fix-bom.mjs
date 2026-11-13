import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const exts = new Set([".ts",".tsx",".js",".jsx",".mjs",".cjs",".json",".css",".html"]);
const skip = new Set(["node_modules",".git","dist",".output",".vercel",".tanstack",".nitro"]);
const fixed = [];
// Any leading invisible / format / control / separator char is never valid at the start of a source file.
const LEADING_JUNK = /^[\p{Cf}\p{Cc}\p{Zs}\p{Zl}\p{Zp}\uFEFF]+/u;

function walk(dir){
  for(const name of readdirSync(dir)){
    if(skip.has(name)) continue;
    const p = join(dir,name);
    try{
      if(statSync(p).isDirectory()){ walk(p); continue; }
      if(!exts.has(extname(name).toLowerCase())) continue;
      const b = readFileSync(p);
      let text, changed = false;
      if(b[0]===0xff && b[1]===0xfe){ text=b.toString("utf16le"); changed=true; }          // UTF-16 LE
      else if(b[0]===0xfe && b[1]===0xff && b.length%2===0){ text=Buffer.from(b).swap16().toString("utf16le"); changed=true; } // UTF-16 BE
      else{
        const s=b.subarray(0,Math.min(b.length,200));
        let nulls=0; for(const x of s) if(x===0) nulls++;
        if(nulls > s.length*0.2){ text=b.toString("utf16le"); changed=true; }              // UTF-16, no BOM
        else text=b.toString("utf8");
      }
      const cleaned=text.replace(LEADING_JUNK,"");
      if(cleaned!==text){ text=cleaned; changed=true; }
      if(changed){ writeFileSync(p,text,"utf8"); fixed.push(p); }
    }catch(e){ console.log("Skipped",p,"-",e.message); }
  }
}
walk(process.cwd());
console.log(fixed.length ? ("Fixed:\n"+fixed.join("\n")) : "No encoding issues found.");