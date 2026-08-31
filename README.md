# sample-app2

予定を登録・一覧表示・削除できるシンプルな予定管理アプリです。

## 構成

- `front/`: React + TypeScript + Vite のフロントエンド
- `php/`: PHP のAPI
- `php/data/database.sqlite`: SQLiteデータベース

## 主な機能

- 予定一覧の表示
- 予定の新規登録
- 予定の削除
- 入力チェック
- PHP APIとの連携

## 必要な環境

- Node.js
- npm
- PHP
- SQLite
- Laragon などのローカルWebサーバー

## セットアップ

フロントエンドの依存関係をインストールします。

```bash
cd front
npm install
```

## 起動方法

PHP側は、プロジェクトをWebサーバーから参照できる場所に配置します。

このプロジェクトでは、APIのURLは以下を想定しています。

```text
http://localhost/sample-app2/php/api/events.php
```

フロントエンドは次のコマンドで起動します。

```bash
cd front
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:5173
```

## ビルド

本番用にビルドする場合は、次のコマンドを実行します。

```bash
cd front
npm run build
```

## API

予定データは `php/api/events.php` で操作します。

対応しているメソッドは以下です。

- `GET`: 予定一覧を取得
- `POST`: 予定を登録
- `DELETE`: 予定を削除

## 注意点

フロントエンドは `http://localhost:5173` からのアクセスを想定しています。

CORS設定は `php/config.php` にあります。ポートやURLを変更した場合は、必要に応じて設定を変更してください。
