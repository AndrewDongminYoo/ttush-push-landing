import type { Locale } from "./i18n";

// Copy lives here rather than in the components so the two locales stay
// visibly parallel: a missing translation is a type error, not a silent
// fallback to English.
//
// Every sentence describing a rule below was read out of the app's rules
// engine (`engine/src/lib.rs` in AndrewDongminYoo/ttush_push), not out of an
// earlier version of this page. The push, the blocked push, the two-step
// foothold decay, the counter-push ban, the two win conditions and the
// loser-plays-first reset are all decided there.
//
// The rules group by what the engine does with them rather than by reading
// order. `resolve_move` rejects a move onto a hole outright
// (`IllegalMove::Hole`), but a piece pushed onto one is not rejected at all:
// that is the `knockout` branch, and it ends the round. A legality constraint
// and a termination condition are different things, so they sit in different
// groups. An earlier version of this file welded them into one sentence that
// contradicted itself.
//
// The decay rule is the other place these sentences have been wrong.
// `apply_resolved_move` steps down exactly one tile per move: the square the
// mover departed, never the square a pushed piece vacated. "Each time an
// explorer leaves a square" over-states that, because a pushed explorer leaves
// one too and it stays intact. `components/board-replay.tsx` already encoded
// the rule correctly while this file did not, so when the two disagree, the
// replay is the one that was checked against the engine.
export type Dictionary = {
  meta: { title: string; description: string; ogAlt: string };
  hero: {
    tagline: string;
    sub: string;
    cta: string;
    boardCaption: string;
    boardAlt: string;
    boardStill: string;
  };
  footholds: {
    title: string;
    sub: string;
    states: readonly { name: string; desc: string }[];
  };
  rules: {
    title: string;
    groups: readonly { name: string; items: readonly string[] }[];
    /** Who enforces the rules, said where the rules are. */
    engine: string;
  };
  explorers: {
    title: string;
    sub: string;
    teams: readonly { name: string; desc: string }[];
  };
  closing: {
    title: string;
    status: string;
    appStore: string;
    playStore: string;
  };
  landing: {
    navigation: string;
    nav: { about: string; how: string; faq: string; download: string };
    heroLines: readonly [string, string];
    platforms: string;
    discover: string;
    genre: string;
    facts: readonly { title: string; detail: string }[];
    replay: {
      play: string;
      pause: string;
      next: string;
      position: string;
      frames: readonly string[];
    };
    guideTitle: readonly [string, string];
    guideIntro: string;
    terrainTitle: string;
    moveLabel: string;
    pushLabel: string;
    legendNote: string;
    winTitle: string;
    winBody: string;
    winCondition: string;
    detailedRules: string;
    opponentsTitle: readonly [string, string];
    opponentsIntro: string;
    teams: readonly [string, string];
    localTitle: string;
    localBody: string;
    aiTitle: string;
    aiBody: string;
    difficulties: readonly string[];
    faqTitle: string;
    faqIntro: string;
    questions: readonly { question: string; answer: string }[];
    downloadTitle: string;
    downloadBody: string;
    downloadNote: string;
    storePrompt: string;
  };
  footer: {
    trademarks: string;
    developer: string;
    contact: string;
    privacy: string;
    language: string;
    languageHref: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    meta: {
      title: "Ttush Push — 푸시하고, 버티고. 두 라운드를 먼저.",
      description:
        "한 수마다 보드가 달라지는 턴제 전략 게임. 공중 유적에서 상대를 밀어내고 두 라운드를 먼저 차지하세요. 한 기기 2인 대전, 네 단계 AI, 오프라인 플레이. iOS와 Android에서 만나보세요.",
      ogAlt:
        "황혼의 공중 폐허를 배경으로, 아주르와 엠버 탐험가가 하나의 돌 발판 위에 서 있는 Ttush Push 대표 이미지.",
    },
    hero: {
      tagline: "밀어내거나, 무너진 자리에 빠지거나",
      sub: "한 수마다 보드가 달라지는 턴제 전략 게임, Ttush Push. 공중 유적 위에서 상대를 밀어내고, 아군의 발판을 지키세요.",
      cta: "지금 다운로드",
      boardCaption: "한 라운드가 끝나는 세 수",
      boardAlt:
        "5×5 발판 위에서 아주르 탐험가가 엠버 탐험가를 무너진 발판으로 밀어내는 장면.",
      boardStill:
        "엠버가 방금 자기 발판을 무너뜨렸고, 아주르가 바로 옆 칸까지 다가와 있습니다.",
    },
    footholds: {
      title: "발판은 세 단계로 무너집니다",
      sub: "탐험가가 자기 차례에 딛고 나갈 때마다 그 발판이 한 단계씩 내려앉습니다. 들어설 때가 아니라 나갈 때이고, 밀려난 탐험가가 비운 자리는 그대로 남습니다.",
      states: [
        { name: "멀쩡한 발판", desc: "아직 아무도 딛고 나가지 않은 칸." },
        {
          name: "금이 간 발판",
          desc: "한 번 딛고 나간 칸. 아직 올라설 수 있습니다.",
        },
        {
          name: "무너진 발판",
          desc: "두 번 딛고 나간 칸. 이제 아무도 들어갈 수 없습니다.",
        },
      ],
    },
    rules: {
      title: "규칙",
      groups: [
        {
          name: "한 수",
          items: [
            "자기 탐험가 두 명 중 하나를 골라 상하좌우로 한 칸 움직입니다. 무너진 자리로는 들어갈 수 없습니다.",
            "상대가 선 칸으로 들어가면 그 탐험가를 같은 방향으로 한 칸 밀어냅니다. 그 뒤에 또 다른 탐험가가 서 있으면 애초에 둘 수 없는 수입니다.",
            "방금 밀려난 탐험가는 자기를 민 상대를 곧바로 되밀 수 없습니다.",
          ],
        },
        {
          name: "승부",
          items: [
            "상대 탐험가를 무너진 자리나 판 밖으로 밀어내면 그 탐험가는 떨어지고 라운드가 끝납니다. 상대가 둘 수 있는 수가 하나도 남지 않아도 마찬가지입니다.",
            "두 라운드를 먼저 가져가면 매치를 이깁니다. 다음 라운드는 직전 라운드를 진 쪽이 먼저 둡니다.",
          ],
        },
      ],
      engine:
        "위의 판정은 전부 Rust로 쓴 규칙 엔진이 계산합니다. 둘 수 있는 수인지, 밀어낸 결과가 어디로 가는지, 라운드가 언제 끝나는지까지. 혼자 둘 때 두 번째 자리를 맡는 쉬움·보통·어려움·전문가 네 단계의 AI도 같은 엔진이 고릅니다. Flutter 화면은 그 결과를 그리기만 합니다.",
    },
    explorers: {
      title: "아주르와 엠버",
      sub: "둘은 색만 다른 것이 아닙니다. 아주르의 두건은 둥글고 엠버의 두건은 각져 있어서, 색이 잘 구분되지 않는 화면에서도 실루엣으로 갈라집니다. 스프라이트는 방금 움직인 방향을 바라보고, 발판 사이를 뛰어서 옮겨 가며, 상대를 두 손으로 밀어냅니다. 밀려난 탐험가는 발판에 내려앉거나, 무너진 자리나 판 밖으로 떨어집니다.",
      teams: [
        { name: "아주르", desc: "둥근 두건과 짧은 망토, 깊은 남색." },
        { name: "엠버", desc: "각진 두건과 각진 외투, 짙은 진홍색." },
      ],
    },
    closing: {
      // A no-break space keeps "Google Play" on one line: `keep-all` breaks
      // Korean only at spaces, and the plain one fell inside the name at 1440px.
      title: "App Store와 Google Play에서 받을 수 있습니다",
      status:
        "iPhone과 iPad에서는 App Store에서, Android에서는 Google Play에서 받을 수 있습니다.",
      appStore: "App Store에서 보기",
      playStore: "Google Play에서 보기",
    },
    landing: {
      navigation: "주요 메뉴",
      nav: {
        about: "게임 소개",
        how: "플레이 방법",
        faq: "자주 묻는 질문",
        download: "게임 다운로드",
      },
      heroLines: ["푸시하고, 버티고.", "두 라운드를 먼저."],
      platforms: "iOS · Android  /  오프라인 플레이 지원",
      discover: "보드 위의 모험을 만나보세요",
      genre: "턴제 전략 보드게임",
      facts: [
        { title: "혼자, 또는 둘이", detail: "4단계 AI · 한 기기 2인 대전" },
        { title: "한 수마다 새로운 판", detail: "이동 · 푸시 · 무너지는 발판" },
        { title: "두 라운드면 승리", detail: "짧은 승부, 깊은 전략" },
      ],
      replay: {
        play: "재생",
        pause: "일시정지",
        next: "다음 수",
        position: "리플레이 장면",
        frames: [
          "서로의 다음 수를 읽으세요",
          "푸른 탐험가가 한 칸 다가갑니다",
          "불씨 탐험가 뒤의 발판이 무너집니다",
          "푸시! 푸른 원정대의 라운드 승리",
        ],
      },
      guideTitle: ["단순한 한 수.", "달라지는 모든 것."],
      guideIntro:
        "움직이고, 밀어내고, 발판을 지키세요. 지나온 길이 함정이 되는 보드 위에서는 마지막 한 수까지 승부를 알 수 없습니다.",
      terrainTitle: "보드를 읽으세요",
      moveLabel: "이동 가능한 칸",
      pushLabel: "푸시 가능한 탐험가",
      legendNote:
        "게임에서는 채워진 점이 이동을, 탐험가를 둘러싼 원이 푸시를 알려줍니다.",
      winTitle: "밀어내거나, 가로막거나.",
      winBody:
        "상대 탐험가를 무너진 발판이나 보드 밖으로 푸시하세요. 또는 상대가 더 이상 움직일 수 없도록 길을 막으세요. 두 가지 방법 모두 라운드를 가져옵니다.",
      winCondition: "두 라운드를 먼저 차지하면, 매치 승리.",
      detailedRules: "자세한 규칙 살펴보기",
      opponentsTitle: ["마주 앉은 친구와.", "만만치 않은 AI와."],
      opponentsIntro:
        "푸른 원정대와 불씨 원정대. 당신의 원정대를 이끌고 다음 한 수를 겨뤄보세요.",
      teams: ["푸른 원정대", "불씨 원정대"],
      localTitle: "한 기기, 두 플레이어",
      localBody:
        "기기 하나를 사이에 두고 번갈아 플레이하세요. 계정도, 각자의 기기도 필요 없습니다. 친구의 다음 수를 바로 눈앞에서 읽어보세요.",
      aiTitle: "나에게 맞는 도전",
      aiBody:
        "처음엔 가볍게, 익숙해지면 더 치열하게. 쉬움부터 전문가까지 네 단계의 AI가 기다립니다.",
      difficulties: ["쉬움", "보통", "어려움", "전문가"],
      faqTitle: "시작하기 전에",
      faqIntro: "궁금한 점을 먼저 확인하세요.",
      questions: [
        {
          question: "처음 하는데, 규칙을 배우기 어렵지 않나요?",
          answer:
            "첫 매치 안내가 탐험가 선택, 이동, 푸시, 무너지는 발판을 간결하게 설명합니다. 직접 한 수씩 플레이하며 익힐 수 있습니다.",
        },
        {
          question: "인터넷 연결 없이 플레이할 수 있나요?",
          answer:
            "네. Ttush Push는 오프라인 플레이를 지원합니다. AI 대전과 한 기기에서의 2인 대전을 즐길 수 있습니다. 앱에는 광고가 포함되어 있습니다.",
        },
        {
          question: "친구와 온라인으로 대전할 수 있나요?",
          answer:
            "온라인 멀티플레이는 제공하지 않습니다. 친구와는 하나의 기기에서 번갈아 플레이하며, 계정을 만들 필요도 없습니다.",
        },
        {
          question: "어떤 기기와 언어를 지원하나요?",
          answer:
            "iPhone과 iPad에서는 App Store에서, Android에서는 Google Play에서 다운로드하세요. 게임 화면은 한국어와 영어로 제공됩니다.",
        },
      ],
      downloadTitle: "다음 한 수는, 당신의 차례.",
      downloadBody:
        "공중 유적 위에서 시작되는 작은 대결. 지금 Ttush Push를 만나보세요.",
      downloadNote: "오프라인 플레이 · 계정 불필요 · 광고 포함",
      storePrompt: "다운로드하기",
    },
    footer: {
      trademarks:
        "Apple, Apple 로고, iPhone 및 iPad는 미국 및 기타 국가에 등록된 Apple Inc.의 상표입니다. App Store는 Apple Inc.의 서비스 상표입니다. Google Play 및 Google Play 로고는 Google LLC의 상표입니다.",
      developer: "만든 사람: 유동민",
      contact: "연락처",
      privacy: "개인정보처리방침",
      language: "English",
      languageHref: "/en",
    },
  },
  en: {
    meta: {
      title: "Ttush Push — Push. Hold your ground. Take two rounds.",
      description:
        "A turn-based strategy game where every move changes the board. Push your rivals and take two rounds first. Local two-player, four AI levels, and offline play. Available on iOS and Android.",
      ogAlt:
        "Ttush Push, over the twilight sky of the ancient air ruins: one stone foothold carrying the Azure and Ember explorers.",
    },
    hero: {
      tagline: "Push, or fall through the floor you broke",
      sub: "Ttush Push is a turn-based strategy game where every move changes the board. Push your rivals and protect your footholds in ruins above the clouds.",
      cta: "Get the game",
      boardCaption: "The three moves that end a round",
      boardAlt:
        "On a five-by-five field of footholds, an Azure explorer pushes an Ember explorer into a collapsed square.",
      boardStill:
        "Ember has just collapsed its own foothold, and Azure has closed to the next square.",
    },
    footholds: {
      title: "A foothold falls in three states",
      sub: "Each time an explorer moves off a square on its own turn, that square drops one state. It is leaving that breaks it, not arriving, and the square a pushed explorer vacates is left exactly as it was.",
      states: [
        { name: "Intact", desc: "Nobody has moved off this square yet." },
        {
          name: "Cracked",
          desc: "Moved off once. It still carries an explorer.",
        },
        {
          name: "Collapsed",
          desc: "Moved off twice. Nothing can enter it now.",
        },
      ],
    },
    rules: {
      title: "Rules",
      groups: [
        {
          name: "A move",
          items: [
            "Move one of your two explorers a single square up, down, left, or right. You cannot move onto a collapsed square.",
            "Move onto a square the other side holds and that explorer is pushed one square the same way. If a third explorer stands behind it, the move is not available at all.",
            "An explorer that was just pushed cannot immediately push the same explorer back.",
          ],
        },
        {
          name: "Winning",
          items: [
            "Push the other side's explorer onto a collapsed square, or off the edge of the board, and it falls. That round is yours. So is a round in which the other side has no legal move left.",
            "Two rounds win the match. Whoever lost the last round plays first in the next one.",
          ],
        },
      ],
      engine:
        "Every ruling above is computed by a rules engine written in Rust: whether a move is available, where a push resolves to, when a round ends. The same engine picks the moves for the four AI levels — Easy, Normal, Hard and Expert — that take the second seat when you play alone. The Flutter screen only draws what it returns.",
    },
    explorers: {
      title: "Azure and Ember",
      sub: "The two differ by more than colour. Azure's hood is round and Ember's is angular, so they stay apart on a screen where the colours are hard to tell. Each sprite faces the direction it just moved, jumps from foothold to foothold, and pushes with both hands. A pushed explorer lands, or falls into a collapsed square or off the edge of the board.",
      teams: [
        { name: "Azure", desc: "Rounded hood, short cape, deep indigo." },
        { name: "Ember", desc: "Angular hood, squared coat, dark crimson." },
      ],
    },
    closing: {
      title: "On the App Store and Google Play",
      status:
        "On iPhone and iPad, get it from the App Store. On Android, get it from Google Play.",
      appStore: "View on the App Store",
      playStore: "View on Google Play",
    },
    landing: {
      navigation: "Main navigation",
      nav: {
        about: "The game",
        how: "How to play",
        faq: "FAQ",
        download: "Get the game",
      },
      heroLines: ["Push. Hold your ground.", "Take two rounds."],
      platforms: "iOS · Android  /  Play offline",
      discover: "Discover the world on the board",
      genre: "Turn-based strategy",
      facts: [
        {
          title: "Solo or side by side",
          detail: "4 AI levels · Local two-player",
        },
        {
          title: "Every move changes it",
          detail: "Move · Push · Crumbling ground",
        },
        {
          title: "Two rounds to victory",
          detail: "Small battles. Deep strategy.",
        },
      ],
      replay: {
        play: "Play",
        pause: "Pause",
        next: "Next move",
        position: "Replay frame",
        frames: [
          "Read your opponent’s next move",
          "Azure moves one square closer",
          "The foothold behind Ember collapses",
          "Push! Azure takes the round",
        ],
      },
      guideTitle: ["One simple move.", "Everything changes."],
      guideIntro:
        "Move, push, and protect your footholds. When the path behind you becomes a trap, the last move can change everything.",
      terrainTitle: "Read the board",
      moveLabel: "Available move",
      pushLabel: "Available push",
      legendNote:
        "In the game, filled dots mark moves. Rings around explorers mark pushes.",
      winTitle: "Push them out. Or box them in.",
      winBody:
        "Push an opposing explorer onto a collapsed foothold or off the board. Or leave your opponent with no legal moves. Either way, the round is yours.",
      winCondition: "Take two rounds first to win the match.",
      detailedRules: "Explore the full rules",
      opponentsTitle: ["Face a friend.", "Challenge the AI."],
      opponentsIntro:
        "The Azure Expedition or the Ember Expedition. Lead your explorers and make your next move count.",
      teams: ["Azure Expedition", "Ember Expedition"],
      localTitle: "One device. Two players.",
      localBody:
        "Sit together and take turns on a single device. No accounts or second screens required. Read your friend’s next move, face to face.",
      aiTitle: "Find your challenge",
      aiBody:
        "Start easy, then raise the stakes. Four AI levels, from Easy to Expert, give you room to learn and a reason to return.",
      difficulties: ["Easy", "Normal", "Hard", "Expert"],
      faqTitle: "Before your first move",
      faqIntro: "A few things worth knowing.",
      questions: [
        {
          question: "Is it easy to learn?",
          answer:
            "Your first-match guide introduces selecting an explorer, moving, pushing, and collapsing footholds. Learn by making your first moves.",
        },
        {
          question: "Can I play without an internet connection?",
          answer:
            "Yes. Ttush Push supports offline play, both against AI and with a friend on one device. The app contains ads.",
        },
        {
          question: "Can I play with friends online?",
          answer:
            "There is no online multiplayer. Share one device and take turns with a friend. You do not need an account.",
        },
        {
          question: "Which devices and languages are supported?",
          answer:
            "Get it on the App Store for iPhone and iPad, or Google Play for Android. The game is available in English and Korean.",
        },
      ],
      downloadTitle: "Your move. Your adventure.",
      downloadBody:
        "A small battle above the clouds. Discover Ttush Push today.",
      downloadNote: "Offline play · No account needed · Contains ads",
      storePrompt: "Download on",
    },
    footer: {
      trademarks:
        "Apple, the Apple logo, iPhone, and iPad are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.",
      developer: "Built by Dongmin Yu",
      contact: "Contact",
      privacy: "Privacy policy",
      language: "한국어",
      languageHref: "/ko",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
