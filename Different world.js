'use strict';
const userNameInput = document.getElementById('Different-name');
const assessmentButton = document.getElementById('Different');
const resultDivided = document.getElementById('Different-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたが異世界に転生したら') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたが異世界に転生したら';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}が異世界転生したら、魔王になり、ユニークスキル:唯我独尊を取得(攻撃するたびに攻撃力が倍になる)+'<br>'+スキル:全属性攻撃無効を取得。(あらゆる属性攻撃を無効化します),スキル:絶対零度を取得。(戦意を消失した相手を永遠に解けることのない氷で凍らせます),スキル:痛覚無効を取得(痛覚を無効にする)、スキル:起死回生を取得(死なない限りどんな攻撃を受けても再生する)',
  '{userName}が異世界転生したら、ユニークスキル:魔術錬成を取得(自分が思いついた魔術を作ることができる)+'<br>'+スキル:献上を取得。(自分のスキルを相手に与えることができる),スキル:特攻を取得。(どこを攻撃しても相手の弱点となる),スキル:強眼を取得(100倍の速さで動くことができる)、スキル:防壁を取得(あらゆる攻撃を防ぐことができます)',
  '{userName}が異世界転生したら、冒険者になり、ユニークスキル:変身を取得(あらゆる生物、物に変身できる)+'<br>'+スキル:予知を取得。(相手の行動を予知します),スキル:波動を取得。(相手の戦意を消失させる),スキル:絶望を取得(相手の強さを調節することができる)、スキル:痛覚無効を取得(痛覚を無効にする)',
  '{userName}が異世界転生したら、ユニークスキル:オーバーパワーを取得(自分より弱い敵の動きを止めることができる)+'<br>'+スキル:スペック上昇を取得。(戦いが続く度に能力が上昇する),スキル:リセットを取得。(時を戻すことができる),スキル:強眼を取得(100倍の速さで動くことができる)、スキル:ワールドを取得(世界の因果を操作できる)',
  '{userName}が異世界転生したら、一般市民です+'<br>'+スキル:なし',
  '{userName}が異世界転生したら、一般的な冒険者です+'<br>'+スキル:今後の成長に期待',
  '{userName}が異世界転生したら、勇者になり、ユニークスキル:剣聖を取得(剣の熟年度が極限を超える)+'<br>'+スキル:ジーニアスを取得。(あらゆるものを使いこなす),スキル:神の加護を取得。(神の加護を受け取ることができる),スキル:痛覚無効を取得(痛覚を無効にする)、スキル:超起死回生を取得(死んでも復活する)',
  '{userName}が異世界転生したら、転生失敗',
  '{userName}が異世界転生したら、エルフになり、ユニークスキル:全回復を取得(攻撃を受ける度に回復する)+'<br>'+スキル:回復無効。(相手の回復を無効にします),スキル:女神を取得。(奇跡を自在に起こせる),スキル:全属性攻撃無効を取得(あらゆる属性攻撃を無効化します)。、スキル:起死回生を取得(死なない限りどんな攻撃を受けても再生する)',
  '{userName}が異世界転生したら、ドラゴンとのハーフになり、ユニークスキル:爆竜を取得(竜の力を呼び覚まし、超新星爆発を起こす)+'<br>'+スキル:ドラゴンバスターを取得。(あらゆる物質を破壊する),スキル:天眼を取得。(相手の心を読むことができる),スキル:痛覚無効を取得(痛覚を無効にする)、スキル:使徒を取得(自分より弱い相手を支配する)',
  '{userName}が異世界転生したら、ユニークスキル:リスペクトを取得(どんな相手も服従するようになる)',
  '{userName}が異世界転生したら、ユニークスキル:絶対領土を取得(フィールドを展開し、自分の思ったことが現実となる)+'<br>'+スキル:全属性攻撃無効を取得。(あらゆる属性攻撃を無効化します),スキル:状態異常攻撃無効を取得。(状態異常攻撃を無効にする),スキル:痛覚無効を取得(痛覚を無効にする)、スキル:生成を取得(あらゆる物質を作ることができる)',
  '{userName}が異世界転生したら、ユニークスキル:インフィニティを取得(あらゆるものを無限にすることができる)+'<br>'+スキル:牢獄を取得。(相手を閉じ込める),スキル:暴君。(一時的に相手を上回る力を出せる),スキル:暴食を取得(あらゆるものを吸収する)、スキル:特攻(どこを攻撃しても相手の弱点となる)',
  '{userName}が異世界転生したら、ユニークスキル:見えざるものを取得(あらゆるものから視認できないぐらい透明になることができる)+'<br>'+スキル:ゲットを取得。(相手の装備品をランダムで盗む),スキル:盗乃王。(ゲットのスキルがあれば、盗むものを決めることができる),スキル:天眼を取得(相手の心を読むことができる)、スキル:生成を取得(あらゆる物質を作ることができる)',
   '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
