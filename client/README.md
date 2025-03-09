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

#### Tanstack Router

型安全かつファイルベースルーティングを備えているルーティングライブラリ。
`npm run dev`で`routeTree.gen.ts`が自動更新され、勝手にルーティング設定が追加されていく仕組み。
ページを作る際はsrc/routes/下に作成していく。命名規則は下記の通り。

```
src/routes/
├── __root.tsx        # エントリポイントの定義
├── _layout.tsx       # レイアウトファイル
├── _layout/          # このディレクトリ配下にレイアウトが適用される
├── index.tsx         # `/`
├── posts.tsx         # `/posts`
├── posts/            # `/posts/`
│   ├── profile.tsx  # `/posts/profile`
│   ├── index.tsx    # `/posts`
│   ├── $postId.tsx  # `/posts/:postId`
│   ├── $postId.edit.tsx  # `/posts/:postId/edit`
```

その他の設定は[こちら](https://zenn.dev/calloc134/articles/6680b272a2c2c5#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E6%8C%87%E5%AE%9A)を参照。

#### Orval

TODO:追記
...
