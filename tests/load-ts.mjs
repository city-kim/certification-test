import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Transpile the real source in memory so tests work on the project's Node 20 CI
// as well as newer Node versions, without changing source or build artifacts.
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cache=new Map();
async function moduleURL(file) {
  if(cache.has(file))return cache.get(file);
  const source=await readFile(file,'utf8');
  let code=extname(file)==='.json'?`export default ${source};`:ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext}}).outputText;
  const imports=[...code.matchAll(/from\s+["']([^"']+)["']/g)];
  for(const match of imports) {
    const spec=match[1];
    const target=spec.startsWith('.')?await moduleURL(resolve(dirname(file),spec+(extname(spec)?'':'.ts'))):import.meta.resolve(spec);
    code=code.replace(match[0],`from ${JSON.stringify(target)}`);
  }
  const url='data:text/javascript;base64,'+Buffer.from(code).toString('base64');
  cache.set(file,url);return url;
}
export async function loadTS(file) { return import(await moduleURL(resolve(root,file))); }
