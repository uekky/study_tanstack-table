# Tanstack Table 学習プロジェクト

このリポジトリは、React、TypeScript、Tanstack Tableを使用したモダンなテーブルコンポーネント開発の学習用プロジェクトです。

## 概要

- React 18
- TypeScript
- Tanstack Table v8
- Vite (開発環境)

## 前提条件

- Node.js 18以上
- npm または yarn
- TypeScriptの基本的な理解

## 環境構築手順

```bash

#プロジェクトのクローン
git clone <リポジトリURL>
cd <プロジェクト名>

#依存パッケージのインストール
npm install

#開発サーバーの起動
npm run dev

#ブラウザでアクセス
http://localhost:5173
```


# 主な機能

- データテーブルの基本的な表示
- カラムのソート機能
- フィルタリング機能
- ページネーション
- カラムのリサイズ
- カラムの表示/非表示切り替え

```typescript
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
const BasicTable = () => {
const table = useReactTable({
data,
columns,
getCoreRowModel: getCoreRowModel(),
})
return (
<table>
{/ テーブルの実装 /}
</table>
)
}
```

# 開発のポイント

1. **型安全性**
   - TypeScriptを活用した型安全なテーブル実装
   - カラム定義の型チェック

2. **パフォーマンス最適化**
   - メモ化による再レンダリングの最適化
   - 仮想化によるパフォーマンス向上

3. **アクセシビリティ**
   - WAI-ARIAに準拠した実装
   - キーボード操作のサポート

## トラブルシューティング

よくある問題と解決方法：

1. TypeScriptの型エラー

```bash
npm install --save-dev @types/react @types/react-dom
```

2. Viteの開発サーバーエラー

```bash
#node_modulesを削除して再インストール
rm -rf node_modules
npm install
```

## 参考資料

- [TanStack Table 公式ドキュメント](https://tanstack.com/table/latest)
- [React TypeScript チートシート](https://react-typescript-cheatsheet.netlify.app/)
- [Headless UIのTanStack Tableライブラリでテーブルの実装方法を学ぶ](https://reffect.co.jp/react/tanstack-table)

## 謝辞

Reffectの皆様には、いつも大変参考になる技術記事を提供していただき、心より感謝申し上げます。

## ライセンス

[MIT license](https://opensource.org/licenses/MIT)