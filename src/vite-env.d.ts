/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENCIES_API_URL: string;
  readonly VITE_RATE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

