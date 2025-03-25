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
│   ├── contexts/              # ContextAPIのコンテキスト定義
│   ├── hooks/                 # カスタムフック
│   │   ├── orval/             # Orvalのカスタムフック置き場
│   ├── lib/                   # 外部ライブラリのユーティリティ関数
│   │   ├── custom-instance.ts # Orvalのaxiosリクエスト用のインスタンス
│   ├── routes/                # ルート定義とページコンポーネント
│   ├── types/                 # 型定義
│   ├── main.tsx               # React アプリのエントリーポイント
│   ├── routeTree.gen.ts       # TanStack Router の自動生成ルートツリー
│   ├── tailwind.css           # Tailwind CSSのインポートファイル
│   ├── vite-env.d.ts          # Vite 環境変数用の TypeScript 定義
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
3. `npm run dev`で開発環境が立ち上がることを確認
4. `cp .env.example .env.local`でファイルをコピーした後、.env.localに必要な値を入れていく

なお、環境変数を呼び出す時は、以下のようにすること。

```
import { env } from "../env";

const { API_URL } = env;
```

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
│   ├── $postId/     # `/posts/:postId/`
│   │   ├── index.tsx  # `/posts/:postId`
│   │   ├── edit.tsx   # `/posts/:postId/edit`
```

その他の設定は[こちら](https://zenn.dev/calloc134/articles/6680b272a2c2c5#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E6%8C%87%E5%AE%9A)を参照。

### Orval

OpenApiのドキュメントから型安全にAPIリクエストのHooksを作成してくれるライブラリ。モックサーバーも立てられるので、`openapi.yaml`さえあれば、API実装が未完了でも容易に繋ぎ込んでいける。

`openapi.yaml`ファイルが作られた後に、設定ファイル`orval.config.ts`を生成し、`npm run orval`を実行すると、カスタムフックが出来上がる(実施済み)。

カスタムフックは`hooks/orval`下に配置され、フォルダ毎に分けられている。
`orval/xx/xx.ts`の中をのぞくと、中にフックが用意されている。

使用例) `getUsers`

```
import { getUsers } from "@/hooks/orval/users/users";

...
  useEffect(() => {
    const fetchUserData = async () => {
      try {
	...
        // ローカルストレージからユーザーIDを取得
        const userId = localStorage.getItem('userId');

        if (!userId) {
	  //userIdが取得できなかった場合の処理
        }

        // 例: getUsersの中のgetUsersHomeを叩く場合
        // APIリクエストパラメータを設定
        const params = {
          params: {
            userId: userId
          }
        };

        const { data } = await getUsers().getUsersHome(params);
	...
        }
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
	//エラーの処理の追加
      }
    };

    fetchUserData();
  }, []);
```

### SVGR

SVG画像をReactコンポーネントとして変換するツール。

`npm run svgr`を実行すると、`src/assets/icons`フォルダ内のsvg画像が一括でReactコンポーネントとして`src/components/common/icons`フォルダに変換される。

### react-toastify

トーストを簡単に表示することができるライブラリ。
デフォルトスタイルで良ければ、下記のように呼び出すだけで簡単に使える。

```
toast.success("成功メッセージ")
toast.warning("警告メッセージ")
toast.error("エラーメッセージ")
toast.info("通知メッセージ")
```

スタイルのカスタムも可能。[こちら](https://saunabouya.com/2022/11/16/react-toastify/#i-2)を参考に
...
