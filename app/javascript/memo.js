const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    //eはイベントオブジェクト。イベント発生時の情報を持ったオブジェクト。
    //↑の場合「投稿ボタンをクリックした」という情報を持ったオブジェクトになる。
    //preventDefaultの対象をeにすることで「投稿ボタンをクリックした」という現象を無効化し、ブラウザから直接サーバーに(JSを経由せずに)送信されることを防ぐため。
    const form = document.getElementById("form");
    const formData = new FormData(form);
    //FormData→フォームに入力された値を取得できるオブジェクト。
    const XHR = new XMLHttpRequest();
    //↑XHRはXMLHttpRequestの略(XHRはJSを用いてサーバーとHTTP通信を行うオブジェクト)
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    //↑レスポンスのフォーマット(どのような形式のデータでレスポンスして欲しいか)を決めるプロパティ
    XHR.send(formData);
    //↑send()メソッド→リクエストを送信するメソッド。
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load',post);