# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# Chat-Space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|unique: true｜
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|content|text||
|img|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key:true|
### Association
- belongs_to :users
- belongs_to :groups

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, through::groups_users
- has_many :message


## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group