# `delta-cms/file-system`
[![codecov](https://codecov.io/gh/delta-cms/file-system/branch/master/graph/badge.svg)](https://codecov.io/gh/delta-cms/file-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`delta-cms/file-system`はJavaScript/TypeScript向けのファイル操作ライブラリです。

PHPのFlySystemのようなAPIを提供します。

また、アダプターを作成することでDropboxやGoogle Driveといったクラウドストレージのファイル操作も可能です。

デフォルトではローカルアダプター(Node.jsのfsパッケージを使用したアダプター)が付属しています。

またにわかの高校生が、勝手に独断と偏見でAPIを設計し、開発したためセキュリティーや品質については保証できません。

なので、問題箇所等が見つかりましたら`issues`に投げてくれると幸いです。
