// serviceWorker.js とは？

// WA（Progressive Web App）にとっての「裏方スタッフ」
// ウェブアプリを「オフラインでも動くアプリ」にするための、
// ブラウザの裏で動く**常駐型スクリプト（サービスワーカー）**です。

// 何をしてくれるの？

// オフライン対応
// 一度読み込んだHTMLや画像をキャッシュ（保存）して、
// 次回からはネットがなくても表示可能に

// 表示高速化
// キャッシュから素早くファイルを読み込めるため、
// ページ表示が速くなる

// PWA化に必須
// スマホホーム画面に追加できるPWAの仕組みには必須


// installイベント：最初にサービスワーカーが登録されたときに実行される
self.addEventListener("install", (e) => {
  // この中でキャッシュ処理をする
  e.waitUntil(
    // キャッシュストレージを開く（名前は "shapenshot-cache" に設定）
    caches.open("shapenshot-cache").then((cache) => {
      // このリストにあるファイルをキャッシュに保存しておく
      return cache.addAll([
        "/",              // ルート（トップページ）
        "index.html",     // フレーム選択画面
        "icon-512.png",   // アプリアイコン
        "manifest.json"   // PWAの設定ファイル
      ]);
    })
  );
});

// fetchイベント：ページがネットやキャッシュからファイルを読み込もうとしたときに反応
self.addEventListener("fetch", (e) => {
  // キャッシュに同じファイルがあればそれを返す。なければネットから取得
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});