import type { Locale } from "./i18n";

// Copy lives here rather than in the components so the two locales stay
// visibly parallel: a missing translation is a type error, not a silent
// fallback to English.
type Dictionary = {
  tagline: string;
  intro: string;
  rulesHeading: string;
  rules: readonly string[];
  statusHeading: string;
  status: string;
  privacy: string;
};

const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    tagline: "밀어서 떨어뜨리는 보드게임",
    intro:
      "5×5 발판 위에서 탐험가를 움직이고, 상대를 밀어내고, 무너지는 발판을 읽어 3판 2선승을 가져갑니다. 규칙 판정은 전부 Rust 엔진이 하고 화면은 그 결과만 그립니다.",
    rulesHeading: "규칙",
    rules: [
      "탐험가를 골라 인접한 칸으로 움직입니다.",
      "상대가 서 있는 칸으로 움직이면 그 탐험가를 같은 방향으로 밀어냅니다.",
      "탐험가가 떠난 발판은 금이 가고, 다시 떠나면 무너져 구멍이 됩니다.",
      "상대를 구멍에 빠뜨리거나 움직일 수 없게 만들면 라운드를 가져갑니다.",
      "먼저 두 라운드를 이기면 매치를 가져갑니다.",
    ],
    statusHeading: "지금 상태",
    status:
      "Android 비공개 테스트를 진행하고 있습니다. 공개 스토어 페이지는 아직 없습니다.",
    privacy: "개인정보처리방침",
  },
  en: {
    tagline: "A push-and-fall board game",
    intro:
      "Move an explorer across a 5×5 field of footholds, push the other one off, and read the collapsing floor to take two rounds out of three. Every rule is decided by a Rust engine; the screen only draws what it returns.",
    rulesHeading: "Rules",
    rules: [
      "Pick an explorer and move it to an adjacent square.",
      "Moving onto an occupied square pushes that explorer the same way.",
      "A foothold an explorer leaves cracks, and collapses into a hole the second time.",
      "Drop the other explorer into a hole, or leave it unable to move, and the round is yours.",
      "The first to two rounds takes the match.",
    ],
    statusHeading: "Where this is",
    status:
      "In closed testing on Android. There is no public store page yet.",
    privacy: "Privacy policy",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
