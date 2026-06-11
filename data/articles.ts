import { Article } from "../types"

export const articles: Article[] = [
  {
    slug: "what-is-syllable",
    title: "音節とは何か",
    description: "英語の音節（syllable）の定義、日本語との違い、数え方のルールを解説。",
    sections: [
      {
        heading: "音節（syllable）の定義",
        paragraphs: [
          "音節とは「音の節目」を指します。英語では「Syllable（シラブル）」と呼ばれ、「母音を含む音のまとまり」を1単位とします（discoveringsounds.com）。",
          "重要なのは「スペル上の母音」ではなく「発音上の母音の数」で判定する点です。長母音（/ɔː/ など）は1音節、二重母音（/eɪ/ など）も1つのまとまりとして1音節にカウントします。",
          "各シラブルは必ず母音を1つだけ含み、子音との組み合わせパターンは「母音のみ」「子音＋母音」「母音＋子音」「子音＋母音＋子音」などがあります（eikaiwa.weblio.jp）。",
        ],
      },
      {
        heading: "日本語との違い",
        paragraphs: [
          "日本語は「拍（モーラ）」を単位とし、文字数とほぼ一致します。たとえば「ビューティフル」は5拍ですが、英語の beautiful は3音節（beau・ti・ful）です（east-education.jp）。",
          "英語の音節は子音が重なります。spring（1音節）は日本語感覚だと「ス・プ・リ・ン・グ」の5拍ですが、発音上の母音 /ɪ/ は1つだけです。",
          "英語を英語のリズムで話すには、モーラ感覚を手放して音節単位で発音することが不可欠です。",
        ],
      },
      {
        heading: "音節の数え方",
        paragraphs: [
          "基本ルール：発音上の母音の数 ＝ 音節の数（語末のサイレント e は除く）。",
          "・cake → /keɪk/、二重母音 /eɪ/ は1つ、語末 e は無音 → 1音節",
          "・August → /ˈɔːgʌst/、母音 /ɔː/ と /ʌ/ の2つ → 2音節",
          "・strawberry → /ˈstrɑːberi/、母音3つ → 3音節（discoveringsounds.com）",
          "接辞は分離（pre・view）、連続子音は基本的に分割（ob・ject）、二重母音は分割しない（book は1音節）（eikaiwa.weblio.jp）。",
        ],
      },
      {
        heading: "音節学習のメリット",
        paragraphs: [
          "①アクセント位置が分かる：英語のアクセントは音節単位で決まるため、音節を知ることがアクセント習得の前提になります。",
          "②発音が安定する：音節ごとに口の形を意識すると、子音の連続で詰まりにくくなります。",
          "③スペリングが覚えやすい：im・por・tant と分けると、塊で覚えられます。",
          "④長い単語が怖くなくなる：com・mu・ni・ca・tion（5音節）も5つのパーツに分解すれば記憶しやすくなります。",
        ],
      },
    ],
    references: [
      {
        title: "音節とは？英語を学ぶなら知っておきたい「音節」について | discoveringsounds.com",
        url: "https://discoveringsounds.com/column/syllable/",
      },
      {
        title: "英語の「シラブル」って知っている？発音が一気に上達する基本法則 | eikaiwa.weblio.jp",
        url: "https://eikaiwa.weblio.jp/column/study/pronunciation/syllable-basic-rules",
      },
      {
        title: "正しく発音したい方必見！英単語の「音節区切り」とは？ | east-education.jp（DONGRI）",
        url: "https://www.east-education.jp/dongri_academy/column/dongri-articles/9057/",
      },
    ],
  },
  {
    slug: "what-is-accent",
    title: "アクセントとは何か",
    description: "英語の強勢（stress）の定義、3つのレベル、品詞によるアクセント変化を解説。",
    sections: [
      {
        heading: "英語のアクセント＝強勢（stress）",
        paragraphs: [
          "英語のアクセントは「強勢（stress）」と呼ばれ、語・句・文の3つのレベルで機能します。特定の音節を目立たせる音声表現です（discoveringsounds.com）。",
          "重大な誤解として「アクセントは強く読む」という認識があります。実際は「長く」発音することが本質で、過度に強く読むと聞き手に不自然な語気を与えます（discoveringsounds.com）。",
          "アクセント音節は声が大きく・高く・長くなりますが、「長さ」が最も重要な特徴です。",
        ],
      },
      {
        heading: "品詞によるアクセント変化（2音節語）",
        paragraphs: [
          "2音節語では品詞によってアクセント位置が変わります。基本則は「名詞は第1音節、動詞は第2音節」（sugis.co.jp）。",
          "・import：名詞（輸入品）/ˈɪmpɔːrt/ ↔ 動詞（輸入する）/ɪmˈpɔːrt/",
          "・record：名詞（記録）/ˈrekərd/ ↔ 動詞（録音する）/rɪˈkɔːrd/",
          "・present：名詞/形容詞（現在の・贈り物）/ˈpreznt/ ↔ 動詞（提示する）/prɪˈzent/",
          "アクセント位置を間違えると、ネイティブスピーカーには別の単語に聞こえることがあります（migaku.com）。",
        ],
      },
      {
        heading: "弱化する音節（シュワー /ə/）",
        paragraphs: [
          "アクセントのない音節は弱く短く発音され、多くの場合 /ə/（シュワー：あいまい母音）になります。",
          "important の /ɪmˈpɔːrtənt/ では、im と tant がシュワーに近い弱音になります。日本語の均等な拍感覚と違い、英語は強い音節を際立たせるために弱い音節を圧縮します。",
          "シュワーを適切に使えると発音が自然になり、リスニングでも弱化した音を聞き取れるようになります。",
        ],
      },
      {
        heading: "アクセントの確認と練習方法",
        paragraphs: [
          "①辞書の発音記号を確認：/ˈ/ が第一アクセント記号。/ɪmˈpɔːrtənt/ は por の直前に /ˈ/ → por がアクセント。",
          "②手をたたきながら発音：音節ごとにたたき、アクセント音節だけ強くたたく（im「タン」・POR「ター！」・tant「タン」）。",
          "③このサイトのアクセントクイズで繰り返し練習する。",
        ],
      },
    ],
    references: [
      {
        title: "英語のアクセントとは？ | discoveringsounds.com",
        url: "https://discoveringsounds.com/english-stress",
      },
      {
        title: "【発音ルール】ストレス付与の法則について（Day1）| sugis.co.jp",
        url: "https://sugis.co.jp/20210524/",
      },
      {
        title: "英語のストレス（アクセント）の位置！基本ルールを解説 | migaku.com",
        url: "https://migaku.com/ja/blog/language-fun/eigo-accent-stress-ichi",
      },
    ],
  },
  {
    slug: "english-japanese-rhythm",
    title: "英語と日本語のリズムの違い",
    description: "強勢拍（stress-timed）と モーラ拍（mora-timed）の違い。英語らしいリズムを身につける方法。",
    sections: [
      {
        heading: "言語のリズム分類",
        paragraphs: [
          "言語学では言語のリズム型を「強勢拍リズム（stress-timed）」「音節拍リズム（syllable-timed）」「モーラ拍リズム（mora-timed）」の3つに分類します。英語は強勢拍、日本語はモーラ拍に属します（discoveringsounds.com）。",
        ],
      },
      {
        heading: "モーラ拍リズム（日本語）",
        paragraphs: [
          "日本語では「モーラ」という最小の音の単位が一定の時間的長さで発音されます。「コンピュータ」は4拍で、各拍がほぼ等間隔です。",
          "この等時性がリズムの特徴で、聞こえ方は「ゆったり・均等・滑らか」になります（discoveringsounds.com）。",
        ],
      },
      {
        heading: "強勢拍リズム（英語）",
        paragraphs: [
          "英語では強勢のある音節（ストレス音節）が一定間隔で現れ、その間の弱い音節は圧縮されます。強勢拍と弱勢拍の交互が生む「ダイナミズムのあるリズム」が英語の特徴です（discoveringsounds.com）。",
          "com・PU・ter は PU が強く長く、com と ter は短くつぶれます。音節数が多くても少なくても、強勢間隔が一定に保たれるよう調整されます。",
          "聞こえ方は「速く・強弱が鮮明」で、日本語の均等なリズムとは対照的です。",
        ],
      },
      {
        heading: "日本人が英語で躓く理由と対策",
        paragraphs: [
          "日本人学習者はモーラ感覚を英語に持ち込んでしまいがちです。computer を「コ・ン・ピュ・ー・タ・ー」の6拍で読むと、ネイティブには聞き取りにくくなります。",
          "対策：手をたたきながら音節ごとに発音し、アクセント音節だけ強くたたく練習が効果的です。",
          "英語のリズムを理解するとリスニングにも効果があります。聞き取れなかった部分が「弱化された音節だった」と気づけるようになります。",
        ],
      },
    ],
    references: [
      {
        title: "英語のリズムの秘密は強勢拍リズムにある！ | discoveringsounds.com",
        url: "https://discoveringsounds.com/stress-rhythm",
      },
      {
        title: "英語と日本語の音の違い ～モーラ拍言語と強勢拍言語～ | note.com",
        url: "https://note.com/dandy_flax6447/n/nb94853cc7a17",
      },
      {
        title: "英語学習における正しいリズムの重要性 | bilingualscience.com",
        url: "https://bilingualscience.com/english/%E8%8B%B1%E8%AA%9E%E5%AD%A6%E7%BF%92%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E6%AD%A3%E3%81%97%E3%81%84%E3%83%AA%E3%82%BA%E3%83%A0%E3%81%AE%E9%87%8D%E8%A6%81%E6%80%A7/",
      },
    ],
  },
  {
    slug: "how-to-remember-long-words",
    title: "長い単語の覚え方",
    description: "音節分解・語根・接頭辞を使って、長い英単語を効率よく記憶する方法。",
    sections: [
      {
        heading: "音節分解が有効な理由",
        paragraphs: [
          "英語の音節は「発音上の母音を中心とした音のまとまり」です（discoveringsounds.com）。communication（15文字）をそのまま丸暗記するのではなく、com・mu・ni・ca・tion と5パーツに分けると、各パーツは2〜4文字で覚えやすくなります。",
          "また、音節分解すると「どこにアクセントがあるか」が可視化されます。com・mu・ni・CA・tion のように CA を強調して覚えると、発音も記憶も同時に定着します。",
        ],
      },
      {
        heading: "音節分解の手順",
        paragraphs: [
          "1. 単語を音節に分解する（辞書やこのサイトで確認）",
          "2. アクセント音節を確認する（/ˈ/ 記号の直後の音節）",
          "3. アクセントを意識しながら声に出して発音する",
          "4. 意味・語根・接辞と結びつける",
          "例：sophisticated → so・PHIS・ti・ca・ted。アクセントは2番目の phis。",
        ],
      },
      {
        heading: "語根・接頭辞・接尾辞を活用する",
        paragraphs: [
          "英語の長い単語の多くは、語根（root）＋接頭辞（prefix）＋接尾辞（suffix）の組み合わせです。接辞は分離されて別の音節を作ることが多く（pre・view など）、音節分解と語形成の分析が一致します（eikaiwa.weblio.jp）。",
          "・in・de・pen・dent = in（否定）+ depend（依存する）+ ent（〜な）",
          "・en・vi・ron・ment = environ（環境に囲む）+ ment（名詞化）",
          "・ac・com・plish・ment = accomplish（達成する）+ ment（名詞化）",
          "接尾辞 -ment、-tion、-ity はすべて名詞を作ります。パターンを知るだけで数百語の品詞が推測できます。",
        ],
      },
    ],
    references: [
      {
        title: "音節とは？英語を学ぶなら知っておきたい「音節」について | discoveringsounds.com",
        url: "https://discoveringsounds.com/column/syllable/",
      },
      {
        title: "英語の「シラブル」って知っている？発音が一気に上達する基本法則 | eikaiwa.weblio.jp",
        url: "https://eikaiwa.weblio.jp/column/study/pronunciation/syllable-basic-rules",
      },
    ],
  },
  {
    slug: "how-to-read-phonetics",
    title: "発音記号の読み方",
    description: "IPA（国際音声記号）の基礎。英語に必要な約45個の記号と、辞書の読み方を解説。",
    sections: [
      {
        heading: "IPA（国際音声記号）とは",
        paragraphs: [
          "IPA（International Phonetic Alphabet）は国際音声学会によって制定された記号体系で、さまざまな言語の発音を文字で正確に表します。英語学習に必要な記号は約45個です（eikaiwa.dmm.com）。",
          "英語は綴りと発音が一致しないことが多いため、発音記号を読めると知らない単語でも正しい発音を辞書から確認できます。多くの英英辞書はIPAを採用しています。",
        ],
      },
      {
        heading: "主要な母音記号",
        paragraphs: [
          "英語の母音記号は約21個。主なものを示します（eikaiwa.dmm.com）：",
          "・/æ/ ... cat, apple の a。口を大きく横に開く「ア」",
          "・/ɪ/ ... bit, important の i。短い「イ」",
          "・/iː/ ... beat, eat。長い「イー」",
          "・/ʌ/ ... cup, student の u。短い「ア」（口を少し開く）",
          "・/ə/ ... about, banana の弱母音。「シュワー」と呼ばれるあいまいな「ア」。アクセントのない音節に頻出",
          "・/ɔː/ ... important, water の or。長い「オー」",
          "・/uː/ ... computer の u。長い「ウー」",
        ],
      },
      {
        heading: "主要な子音記号",
        paragraphs: [
          "英語の子音記号は24個。有声音と無声音のペアが8組あります（eikaiwa.dmm.com）：",
          "・/θ/ ... think, three の th。舌先を上歯に当てて息を出す（無声）",
          "・/ð/ ... this, the の th。/θ/ を濁らせた音（有声）",
          "・/ŋ/ ... sing, interesting の ng。鼻から抜ける「ン」",
          "・/ʃ/ ... she, information の sh。日本語の「シュ」に近い（無声）",
          "・/r/ ... remember の r。舌を口の奥に引いて発音。日本語の「ラ行」とは異なる",
        ],
      },
      {
        heading: "アクセント記号の読み方",
        paragraphs: [
          "・/ˈ/ ... 第一アクセント（最も強い）。この記号の直後の音節を強く発音する",
          "・/ˌ/ ... 第二アクセント（少し強い）。長い単語でサブの強勢を示す",
          "例：/ɪmˈpɔːrtənt/ → ˈp の前の pɔːr が第一アクセント → por を強く発音",
          "例：/ˌedjʊˈkeɪʃən/ → ˌe が第二アクセント（ed）、ˈk が第一アクセント（ca）→ ed・u・CA・tion",
          "音節分解と発音記号を組み合わせると、どの音節をどう発音するかが一目で分かります。",
        ],
      },
    ],
    references: [
      {
        title: "英語の発音記号45個を徹底解説！【イラスト＆音声つき】| eikaiwa.dmm.com",
        url: "https://eikaiwa.dmm.com/blog/learning-english/tips/phonetic-alphabets/",
      },
      {
        title: "国際音声記号 | Wikipedia",
        url: "https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E9%9F%B3%E5%A3%B0%E8%A8%98%E5%8F%B7",
      },
      {
        title: "英語の発音記号の読み方 | migaku.com",
        url: "https://migaku.com/ja/blog/language-fun/eigo-hatsuon-kigou-yomikata",
      },
    ],
  },
  {
    slug: "syllable-spelling",
    title: "音節でスペリングを覚える",
    description: "音節分解を使うと英単語のスペリングミスが減る。そのメカニズムと実践法を解説。",
    sections: [
      {
        heading: "なぜスペリングを間違えるのか",
        paragraphs: [
          "英語のスペリングミスの多くは、単語を「視覚的な1つの塊」として丸ごと記憶しようとすることが原因です。音節分解は「スペルではなく発音ベース」で単語を切り分けるため、音と文字が結びつきやすくなります（discoveringsounds.com）。",
          "たとえば comfortable を「comfirtable」と書き間違える場合、音節 com・for・ta・ble を意識できていない可能性があります。各パーツを声に出しながら書くことで、どこで間違えたかを特定できます。",
        ],
      },
      {
        heading: "音節分解スペリングの実践法",
        paragraphs: [
          "ステップ1：単語を音節に分解する（辞書またはこのサイトで確認）",
          "ステップ2：各音節を声に出しながら書く",
          "ステップ3：音節ごとに正しいかチェックする",
          "例：interesting → in・ter・est・ing。「in」→「ter」→「est」→「ing」と順に書く。",
          "辞書によって音節の区切り記号が「・」と「-」で異なりますが、どちらも音節の区切りを表します。お気に入りの辞書を1つ決めてその表記に親しむことが大切です（east-education.jp）。",
        ],
      },
      {
        heading: "音節と接辞のスペリングパターン",
        paragraphs: [
          "接辞（接頭辞・接尾辞）は音節と一致することが多く、スペリングの予測に使えます（eikaiwa.weblio.jp）。",
          "・接頭辞が1音節になる：pre・view、un・do、re・turn",
          "・接尾辞 -tion：na・tion、in・for・ma・tion、ed・u・ca・tion",
          "・接尾辞 -ment：man・age・ment、de・vel・op・ment",
          "・接尾辞 -ble：ta・ble、com・for・ta・ble",
          "接尾辞の音節パターンを知ると、初見の単語でも音節の境界が推測しやすくなります。",
        ],
      },
    ],
    references: [
      {
        title: "音節とは？英語を学ぶなら知っておきたい「音節」について | discoveringsounds.com",
        url: "https://discoveringsounds.com/column/syllable/",
      },
      {
        title: "正しく発音したい方必見！英単語の「音節区切り」とは？ | east-education.jp（DONGRI）",
        url: "https://www.east-education.jp/dongri_academy/column/dongri-articles/9057/",
      },
      {
        title: "英語の「シラブル」って知っている？ | eikaiwa.weblio.jp",
        url: "https://eikaiwa.weblio.jp/column/study/pronunciation/syllable-basic-rules",
      },
    ],
  },
  {
    slug: "stress-patterns",
    title: "英語のストレスパターン",
    description: "2音節語・3音節以上・接尾辞によるアクセントルールを体系的に解説。",
    sections: [
      {
        heading: "2音節語のパターン",
        paragraphs: [
          "2音節語では「名詞・形容詞は第1音節、動詞は第2音節」にアクセントが来ることが多いです（sugis.co.jp）。",
          "・import（名詞: 輸入品）/ˈɪmpɔːrt/ ↔ import（動詞: 輸入する）/ɪmˈpɔːrt/",
          "・export（名詞: 輸出品）/ˈekspɔːrt/ ↔ export（動詞: 輸出する）/ɪkˈspɔːrt/",
          "・object（名詞: 物体）/ˈɒbdʒɪkt/ ↔ object（動詞: 反対する）/əbˈdʒekt/",
          "ただし例外も存在するため、辞書で確認する習慣が大切です（sugis.co.jp）。",
        ],
      },
      {
        heading: "3音節以上のパターン",
        paragraphs: [
          "3音節以上の名詞・形容詞は「語末から2番目の音節」を見てアクセント位置を判定します（sugis.co.jp）。",
          "・語末2番目の音節に母音が2つ（または長母音）→ その音節にアクセント：im・POR・tant、con・CLU・sion",
          "・語末2番目の音節に短母音が1つ → 語末3番目の音節にアクセント：BEAu・ti・ful、CU・ri・ous、WON・der・ful",
        ],
      },
      {
        heading: "接尾辞によるアクセントパターン",
        paragraphs: [
          "特定の接尾辞は、その直前の音節にアクセントを置く規則があります（migaku.com）。",
          "・-tion / -sion：直前の音節にアクセント → ed・u・CA・tion、in・for・MA・tion",
          "・-ic：直前の音節にアクセント → e・co・NO・mic、pho・NE・tic",
          "・-ity：直前の音節にアクセント → op・por・TU・ni・ty、u・ni・VER・si・ty",
          "これら3パターンを覚えると、-tion/-ic/-ity で終わる単語のアクセントはほぼ自動的に判定できます。",
        ],
      },
      {
        heading: "接尾辞がアクセントを移動させないパターン",
        paragraphs: [
          "-ment / -ness / -ful / -less / -ous が付いても、元の単語のアクセント位置は変わりません（migaku.com）。",
          "・MAN・age → MAN・age・ment（アクセントは man のまま）",
          "・DE・vel・op → DE・vel・op・ment（アクセントは vel のまま）",
          "語根のアクセントを先に覚えておくと、接尾辞が付いた派生語でも迷わずに済みます。",
        ],
      },
    ],
    references: [
      {
        title: "【発音ルール】ストレス付与の法則について（Day1）| sugis.co.jp",
        url: "https://sugis.co.jp/20210524/",
      },
      {
        title: "【発音ルール】ストレス付与の法則について（Day2）| sugis.co.jp",
        url: "https://sugis.co.jp/20210531/",
      },
      {
        title: "英語のストレス（アクセント）の位置！基本ルールを解説 | migaku.com",
        url: "https://migaku.com/ja/blog/language-fun/eigo-accent-stress-ichi",
      },
    ],
  },
  {
    slug: "toeic-syllables",
    title: "TOEICによく出る単語の音節パターン",
    description: "TOEIC頻出語を音節とアクセントで整理。リスニングスコアアップに直結する学習法。",
    sections: [
      {
        heading: "TOEICで音節・アクセントが重要な理由",
        paragraphs: [
          "TOEICのPart 1〜4はすべてリスニングです。正確に聞き取るには単語の発音・アクセントを知っていることが前提になります。",
          "英語は強勢拍リズム（stress-timed）を持つため、アクセント音節が際立ち、弱い音節は圧縮されます（discoveringsounds.com）。アクセント位置を知らないと、頻出語でも聞き取れない場合があります。",
        ],
      },
      {
        heading: "TOEIC頻出の4音節語",
        paragraphs: [
          "以下の単語はいずれも第2音節にアクセントがある4音節語です：",
          "・de・VEL・op・ment（発展、開発）：/dɪˈveləpmənt/",
          "・en・VI・ron・ment（環境）：/ɪnˈvaɪrənmənt/",
          "・es・TAB・lish・ment（設立）：/ɪˈstæblɪʃmənt/",
          "・ac・COM・plish・ment（達成）：/əˈkɒmplɪʃmənt/",
          "これら4語はすべて接尾辞 -ment が付いており、-ment はアクセントを移動させないため、元の動詞のアクセント位置が保たれます（migaku.com）。",
        ],
      },
      {
        heading: "TOEIC頻出の5音節語",
        paragraphs: [
          "・op・por・TU・ni・ty（機会）：/ˌɒpəˈtjuːnɪti/ → 第3音節 tu にアクセント",
          "・com・mu・ni・CA・tion（連絡）：/kəˌmjuːnɪˈkeɪʃən/ → 第4音節 ca にアクセント（-tion の直前）",
          "communication は接尾辞 -tion のルール「直前の音節にアクセント」が適用された例です（migaku.com）。",
        ],
      },
      {
        heading: "アクセントで変わる意味（TOEIC注意語）",
        paragraphs: [
          "TOEICでは同綴り異アクセント語も出題されます。アクセントを間違えると別の単語に聞こえます（migaku.com）。",
          "・CON・tract（名詞: 契約書）/ con・TRACT（動詞: 収縮する）",
          "・PRO・gress（名詞: 進歩）/ pro・GRESS（動詞: 進歩する）",
          "・RE・ject（名詞: 不合格品）/ re・JECT（動詞: 拒否する）",
          "このサイトのアクセントクイズで練習を積んでおくと、リスニング問題での聞き取り精度が上がります。",
        ],
      },
    ],
    references: [
      {
        title: "英語のリズムの秘密は強勢拍リズムにある！ | discoveringsounds.com",
        url: "https://discoveringsounds.com/stress-rhythm",
      },
      {
        title: "英語のストレス（アクセント）の位置！基本ルールを解説 | migaku.com",
        url: "https://migaku.com/ja/blog/language-fun/eigo-accent-stress-ichi",
      },
      {
        title: "【発音ルール】ストレス付与の法則について | sugis.co.jp",
        url: "https://sugis.co.jp/20210524/",
      },
    ],
  },
]
