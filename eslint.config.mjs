import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Original media uses external YouTube posters and static-export gallery images.
  { rules: { '@next/next/no-img-element': 'off' } },
  globalIgnores(['out/**', '.next/**', 'next-env.d.ts']),
]);
