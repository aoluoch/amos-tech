/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_PAGES_TABLE_ID: string;
  readonly VITE_APPWRITE_PAGES_COLLECTION_ID?: string;
  readonly VITE_APPWRITE_CONTACT_TABLE_ID?: string;
  readonly VITE_APPWRITE_QUOTE_TABLE_ID?: string;
  readonly VITE_CONTENTFUL_SPACE_ID?: string;
  readonly VITE_CONTENTFUL_DELIVERY_TOKEN?: string;
  readonly VITE_CONTENTFUL_ENVIRONMENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
