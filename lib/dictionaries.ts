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
  closing: { title: string; status: string; cta: string };
  footer: {
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
      title: "Ttush Push: 밀어서 떨어뜨리는 보드게임",
      description:
        "5×5 발판 위에서 탐험가를 움직이고, 상대를 무너진 자리로 밀어 넣는 추상 전략 보드게임. 한 기기로 둘이 두거나 네 단계의 AI를 상대할 수 있고, 규칙 판정은 Rust 엔진이 맡습니다.",
      ogAlt:
        "황혼의 공중 폐허를 배경으로, 아주르와 엠버 탐험가가 하나의 돌 발판 위에 서 있는 Ttush Push 대표 이미지.",
    },
    hero: {
      tagline: "밀어내거나, 무너진 자리에 빠지거나",
      sub: "발판 스물다섯 칸. 지나온 발판은 금이 가고, 다시 떠나면 무너집니다. 상대를 그 구멍으로 밀어 넣으세요.",
      cta: "테스트 참여 문의",
      boardCaption: "한 라운드가 끝나는 세 수",
      boardAlt: "5×5 발판 위에서 아주르 탐험가가 엠버 탐험가를 무너진 발판으로 밀어내는 장면.",
      boardStill: "엠버가 방금 자기 발판을 무너뜨렸고, 아주르가 바로 옆 칸까지 다가와 있습니다.",
    },
    footholds: {
      title: "발판은 세 단계로 무너집니다",
      sub: "탐험가가 자기 차례에 딛고 나갈 때마다 그 발판이 한 단계씩 내려앉습니다. 들어설 때가 아니라 나갈 때이고, 밀려난 탐험가가 비운 자리는 그대로 남습니다.",
      states: [
        { name: "멀쩡한 발판", desc: "아직 아무도 딛고 나가지 않은 칸." },
        { name: "금이 간 발판", desc: "한 번 딛고 나간 칸. 아직 올라설 수 있습니다." },
        { name: "무너진 발판", desc: "두 번 딛고 나간 칸. 이제 아무도 들어갈 수 없습니다." },
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
      sub: "둘은 색만 다른 것이 아닙니다. 아주르의 두건은 둥글고 엠버의 두건은 각져 있어서, 색이 잘 구분되지 않는 화면에서도 실루엣으로 갈라집니다. 스프라이트는 방금 움직인 방향을 바라봅니다.",
      teams: [
        { name: "아주르", desc: "둥근 두건과 짧은 망토, 깊은 남색." },
        { name: "엠버", desc: "각진 두건과 각진 외투, 짙은 진홍색." },
      ],
    },
    closing: {
      title: "아직 스토어에는 없습니다",
      status:
        "Google Play는 프로덕션 전환을 앞둔 비공개 테스트 중이고, App Store는 심사에 다시 올라가 있습니다. 어느 쪽도 아직 공개된 스토어 페이지가 없어서 이 페이지에는 스토어 링크를 걸지 않았습니다. 먼저 해 보고 싶으시면 메일로 알려 주세요.",
      cta: "테스트 참여 문의",
    },
    footer: {
      developer: "만든 사람: 유동민",
      contact: "연락처",
      privacy: "개인정보처리방침",
      language: "English",
      languageHref: "/en",
    },
  },
  en: {
    meta: {
      title: "Ttush Push: a push-and-fall board game",
      description:
        "An abstract strategy board game for one or two players. Move an explorer across twenty-five footholds and push the other side into the floor you broke. Share one device, or let four AI levels take the second seat. A Rust engine decides every rule.",
      ogAlt:
        "Ttush Push, over the twilight sky of the ancient air ruins: one stone foothold carrying the Azure and Ember explorers.",
    },
    hero: {
      tagline: "Push, or fall through the floor you broke",
      sub: "Twenty-five footholds. The square you leave cracks, and the next time it collapses. Push the other side into it.",
      cta: "Ask to join",
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
        { name: "Cracked", desc: "Moved off once. It still carries an explorer." },
        { name: "Collapsed", desc: "Moved off twice. Nothing can enter it now." },
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
      sub: "The two differ by more than colour. Azure's hood is round and Ember's is angular, so they stay apart on a screen where the colours are hard to tell. Each sprite faces the direction it just moved.",
      teams: [
        { name: "Azure", desc: "Rounded hood, short cape, deep indigo." },
        { name: "Ember", desc: "Angular hood, squared coat, dark crimson." },
      ],
    },
    closing: {
      title: "Not on a store yet",
      status:
        "Google Play is in closed testing on the way to a production listing, and the App Store submission is back in review. Neither has a public store page yet, so this page carries no store links. Write if you want to play it early.",
      cta: "Ask to join",
    },
    footer: {
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
