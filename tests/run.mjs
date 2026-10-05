import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await mkdir('.qa',{recursive:true});
for(const [source,name] of [['src/App.tsx','app'],['src/domain.ts','domain']]) await build({entryPoints:[source],bundle:true,platform:'node',format:'cjs',packages:'external',outfile:`.qa/${name}.cjs`,jsx:'automatic'});
execFileSync(process.execPath,['tests/domain.cjs'],{stdio:'inherit'});
execFileSync(process.execPath,['tests/ui.cjs'],{stdio:'inherit'});
execFileSync(process.execPath,['tests/styles.cjs'],{stdio:'inherit'});
execFileSync(process.execPath,['tests/home-type.cjs'],{stdio:'inherit'});
