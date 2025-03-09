## フロントエンド

### 技術構成

フレームワーク: React+Vite
UI コンポーネント: shadcn/ui
CSS: Tailwind
Linter & Formatter: ESLint + Prettier
その他ライブラリ等: Orval, Tanstack Router, React Hook Form 等

### ディレクトリ構成

```
src/
├── components/ # UI コンポーネントの管理（ボタン、モーダル、フォームなどの再利用可能なコンポーネント）
├── features/ # 特定の機能に関連するコンポーネントやロジック（例：認証、ダッシュボード、ユーザー管理）
├── hooks/ # カスタムフックの管理（例：useAuth、useFetch、useToggle などの再利用可能なフック）
├── lib/ # 外部ライブラリやユーティリティ関数の管理（例：API クライアント、フォーマッター、エラーハンドリング）
├── routes/ # ルート定義とページコンポーネント（ページごとのレイアウトやルーティングを管理）
├── types/ # 型定義（TypeScript の型、API のレスポンス型、コンポーネントの Props 型などを管理）
```

### 環境構築

1. `cd client`
2. `npm install`
3. `npm run dev`で開発環境が立ち上がれば ok

### 命名規則

ケバブケース
ex)`kebab-case.tsx`

### ライブラリ説明

#### Orval

TODO:追記
...
