# README

## 概要
こちらはプログラミング学習のためカリキュラム内で作成したチャット型アプリケーションです。
実装した機能は下記の通りです。
また、本番環境はAWSを使用し、投稿画像はS３バケットへの保存を設定しました。

- 新規登録機能
- グループ内でのチャット機能
- 複数人によるグループチャット機能
- チャット相手の検索機能（インクリメンタルサーチ）
- チャットグループへのユーザー招待機能
- チャットの履歴表示機能
- 画像送信機能
- チャットの自動更新

## サンプル画像
TOP画面
[![Image from Gyazo](https://i.gyazo.com/34f64016bb1693c51cd36e2a5b3a55db.png)](https://gyazo.com/34f64016bb1693c51cd36e2a5b3a55db)
インクリメンタルサーチ
[![Image from Gyazo](https://i.gyazo.com/7ed540be199ed1018ca7722ba37c3bf8.gif)](https://gyazo.com/7ed540be199ed1018ca7722ba37c3bf8)
非同期通信
[![Image from Gyazo](https://i.gyazo.com/614dd4f12e6845dd020db2951760d628.gif)](https://gyazo.com/614dd4f12e6845dd020db2951760d628)

# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|index: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, througt: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, througt: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## 感想
データベース設計、マークアップ、GithubやAWSの活用など、アプリケーションなどの作成に必須な基礎知識を学ぶことができた。
ただ、まだ浅く広くで身につけなければいけないこと・固めなければいけない基礎がほとんどなので、特にJavaScriptについてはしっかり学習の時間を確保したい。
(完成：2019.8.31)


