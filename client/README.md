# フロントエンド

## 技術構成

フレームワーク: React+Vite

UI コンポーネント: shadcn/ui

CSS: Tailwind

Linter & Formatter: ESLint + Prettier

その他ライブラリ等: Orval, Tanstack Router, React Hook Form 等

## ディレクトリ構成

```
client/
├── public/                    # 静的ファイル（画像、フォントなど）
├── src/
│   ├── assets/                # 静的リソース（画像、アイコンなど）
│   │   └── icons/             # アイコンファイルを格納するフォルダ
│   ├── components/            # 再利用可能な UI コンポーネント
│   │   ├── common/            # ボタンなどの汎用コンポーネント
│   │   ├── layout/            # レイアウト関連コンポーネント
│   ├── features/              # 特定のページに関連するコンポーネントやロジック
│   │   ├── login/             # ログイン関連
│   │   ├── dashboard/         # ダッシュボード関連
│   ├── hooks/                 # カスタムフック
│   ├── lib/                   # 外部ライブラリのユーティリティ関数
│   ├── routes/                # ルート定義とページコンポーネント
│   ├── types/                 # 型定義
│   ├── main.tsx               # React アプリのエントリーポイント
│   ├── routeTree.gen.ts       # TanStack Router の自動生成ルートツリー
│   ├── tailwind.css           # Tailwind CSSのインポートファイル
│   ├── vite-env.d.ts          # Vite 環境用の TypeScript 定義
├── .gitignore
├── components.json            # shadcn/ui用の設定ファイル
├── eslint.config.js           # ESLint の設定ファイル
├── index.html                 # Vite プロジェクトの エントリーファイル
├── package-lock.json
├── package.json
├── README.md                  # プロジェクトの説明書
├── tsconfig.app.json          # TypeScript のアプリ用設定
├── tsconfig.json              # TypeScript のメイン設定
├── tsconfig.node.json         # Node.js 用の TypeScript 設定
└── vite.config.ts             # Vite の設定ファイル
```

## 環境構築

1. `cd client`
2. `npm install`
3. `npm run dev`で開発環境が立ち上がれば ok

## 命名規則

ケバブケース

ex)`kebab-case.tsx`

## ライブラリ説明

### Tanstack Router

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

### Orval

OpenApiのドキュメントから型安全にAPIリクエストのHooksを作成してくれるライブラリ。モックサーバーも立てられるので、`openapi.yaml`さえあれば、API実装が未完了でも容易に繋ぎ込んでいける。

TODO:`openapi.yaml`ファイルが作られた後に、設定ファイルを生成し、`npx orval`を実行

TODO: フックの使い方について追記

### SVGR

SVG画像をReactコンポーネントとして変換するツール。

`npm run svgr`を実行すると、`src/assets/icons`フォルダ内のsvg画像が一括でReactコンポーネントとして`src/components/common/icons`フォルダに変換される。命名やコード生成に一部難があるので適宜手動で解決してほしい。すまぬ。

...
