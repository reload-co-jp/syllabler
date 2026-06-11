# 音節英単語 (Syllable English)

## 概要

英単語を「スペル」ではなく「音節（Syllable）」単位で学習するためのクイズ・解説サイト。

利用者は単語を音のまとまりとして認識し、

* 発音しやすくなる
* アクセント位置を覚えやすくなる
* 長い単語を記憶しやすくなる

ことを目的とする。

---

# コンセプト

従来

```text
important
```

↓

音節で学習

```text
im・por・tant
```

↓

リズムで覚える

```text
im POR tant
```

英単語を音節に分解し、クイズと解説を通して自然に定着させる。

---

# ターゲット

## メイン

* 中学生
* 高校生
* 英検受験者
* TOEIC受験者

## サブ

* 発音を学びたい社会人
* 英会話初心者
* 英語教師

---

# 学習フロー

## Step1

音節を見る

```text
banana

ba・na・na
```

## Step2

音節数を当てる

```text
banana は何音節？

A.2
B.3
C.4
```

## Step3

アクセントを学ぶ

```text
ba・NA・na
```

## Step4

音声を聞く

## Step5

復習する

---

# コンテンツ構成

## 1. トップページ

### 内容

* サービス説明
* 今日のクイズ
* 人気単語
* レベル別学習

### URL

```text
/
```

---

## 2. 単語ページ

### URL

```text
/word/[word]
```

### 例

```text
/word/important
```

### 表示内容

単語

```text
important
```

発音記号

```text
/ɪmˈpɔːrtənt/
```

音節

```text
im・por・tant
```

音節数

```text
3
```

アクセント

```text
POR
```

意味

```text
重要な
```

例文

```text
This is important.
```

解説

```text
important は3音節。

im / por / tant に分けて覚える。

アクセントは por。
```

---

## 3. 音節数クイズ

### URL

```text
/quiz/syllable-count
```

### 出題例

```text
interesting
```

選択肢

```text
2
3
4
5
```

回答後

```text
in・ter・est・ing

4音節
```

---

## 4. アクセントクイズ

### URL

```text
/quiz/stress
```

### 出題例

```text
important

im
por
tant
```

回答後

```text
im POR tant
```

---

## 5. 並び替えクイズ

### URL

```text
/quiz/order
```

### 出題例

```text
remember

[ber]
[mem]
[re]
```

正解

```text
re・mem・ber
```

---

## 6. ランダム10問チャレンジ

### URL

```text
/challenge
```

### 内容

10問連続出題

結果

```text
正答率
平均回答時間
苦手音節
```

を表示

---

# 解説記事

## URL

```text
/article/[slug]
```

### 記事例

```text
音節とは何か
```

```text
アクセントとは何か
```

```text
英語と日本語のリズムの違い
```

```text
長い単語の覚え方
```

```text
発音記号の読み方
```

---

# データモデル

## Word

```ts
type Word = {
  id: number

  word: string

  phonetic: string

  meaningJa: string

  syllables: string[]

  syllableCount: number

  stressIndex: number

  level:
    | "junior"
    | "high"
    | "toeic"
    | "eiken"

  example: string

  explanation: string
}
```

### サンプル

```json
{
  "word": "important",
  "phonetic": "/ɪmˈpɔːrtənt/",
  "meaningJa": "重要な",
  "syllables": ["im", "por", "tant"],
  "syllableCount": 3,
  "stressIndex": 1,
  "level": "junior",
  "example": "This is important.",
  "explanation": "important は3音節。アクセントは por。"
}
```

---

# SEO戦略

## ロングテール

```text
important 音節
```

```text
banana 音節
```

```text
interesting 音節数
```

```text
computer 発音
```

```text
英単語 音節一覧
```

## 自動生成

単語ごとにページ生成

```text
/word/apple
/word/banana
/word/important
```

数万ページ規模まで拡張可能

---

# MVP

初期リリース対象

* 単語ページ
* 音節数クイズ
* アクセントクイズ
* 記事ページ

DB不要

JSONデータのみ

Next.js Static Export対応

---

# 将来機能

* 発音波形表示
* AI発音評価
* 苦手音節分析
* 学習履歴
* 英検別出題
* TOEIC別出題
* スマホアプリ化
* 音節カルタゲーム
* 音節タイピングゲーム
* シャドーイング機能

