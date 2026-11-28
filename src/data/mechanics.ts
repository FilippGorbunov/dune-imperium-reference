export interface Mechanic {
  id: string;
  name: string;
  image: string;
  wideFormat?: boolean;
}

export interface Expansion {
  id: string;
  name: string;
  mechanics: Mechanic[];
}

export const expansions: Expansion[] = [
  {
    id: "base-game",
    name: "Base Game",
    mechanics: [
      {
        id: "acquire-foldspace",
        name: "Acquire Foldspace",
        image: "mechanics/base-game/acquire-foldspace.png",
      },
      {
        id: "acquire",
        name: "Acquire",
        image: "mechanics/base-game/acquire.png",
      },
      {
        id: "agent",
        name: "Agent",
        image: "mechanics/base-game/agent.png",
      },
      {
        id: "alliance",
        name: "Alliance",
        image: "mechanics/base-game/alliance.png",
      },
      {
        id: "control",
        name: "Control",
        image: "mechanics/base-game/control.png",
      },
      {
        id: "draw-a-card",
        name: "Draw a Card",
        image: "mechanics/base-game/draw-a-card.png",
      },
      {
        id: "draw-intrigue-card",
        name: "Draw Intrigue Card",
        image: "mechanics/base-game/draw-intrigue-card.png",
      },
      {
        id: "fremen-bond",
        name: "Fremen Bond",
        image: "mechanics/base-game/fremen-bond.png",
      },
      {
        id: "in-play",
        name: "In Play",
        image: "mechanics/base-game/in-play.png",
      },
      {
        id: "influence",
        name: "Influence",
        image: "mechanics/base-game/influence.png",
      },
      {
        id: "lose-troop",
        name: "Lose Troop",
        image: "mechanics/base-game/lose-troop.png",
      },
      {
        id: "maker",
        name: "Maker",
        image: "mechanics/base-game/maker.png",
      },
      {
        id: "mentat",
        name: "Mentat",
        image: "mechanics/base-game/mentat.png",
      },
      {
        id: "persuasion",
        name: "Persuasion",
        image: "mechanics/base-game/persuasion.png",
      },
      {
        id: "recall-agent",
        name: "Recall Agent",
        image: "mechanics/base-game/recall-agent.png",
      },
      {
        id: "resources",
        name: "Resources",
        image: "mechanics/base-game/resources.png",
      },
      {
        id: "retreat",
        name: "Retreat",
        image: "mechanics/base-game/retreat.png",
      },
      {
        id: "signet-ring",
        name: "Signet Ring",
        image: "mechanics/base-game/signet-ring.png",
      },
      {
        id: "steal-intrigue",
        name: "Steal Intrigue",
        image: "mechanics/base-game/steal-intrigue.png",
      },
      {
        id: "sword",
        name: "Sword",
        image: "mechanics/base-game/sword.png",
      },
      {
        id: "trash-card",
        name: "Trash Card",
        image: "mechanics/base-game/trash-card.png",
      },
      {
        id: "troop",
        name: "Troop",
        image: "mechanics/base-game/troop.png",
      },
      {
        id: "victory-point",
        name: "Victory Point",
        image: "mechanics/base-game/victory-point.png",
      },
    ],
  },
  {
    id: "uprising",
    name: "Uprising",
    mechanics: [
      {
        id: "acquire",
        name: "Acquire",
        image: "mechanics/uprising/acquire.png",
      },
      {
        id: "agent",
        name: "Agent",
        image: "mechanics/uprising/agent.png",
      },
      {
        id: "alliance",
        name: "Alliance",
        image: "mechanics/uprising/alliance.png",
      },
      {
        id: "battle-icon",
        name: "Battle Icon",
        image: "mechanics/uprising/battle-icon.png",
      },
      {
        id: "contract",
        name: "Contract",
        image: "mechanics/uprising/contract.png",
      },
      {
        id: "control",
        name: "Control",
        image: "mechanics/uprising/control.png",
      },
      {
        id: "discard",
        name: "Discard",
        image: "mechanics/uprising/discard.png",
      },
      {
        id: "draw-a-card",
        name: "Draw a Card",
        image: "mechanics/uprising/draw-a-card.png",
      },
      {
        id: "draw-intrigue-card",
        name: "Draw Intrigue Card",
        image: "mechanics/uprising/draw-intrigue-card.png",
      },
      {
        id: "fremen-bond",
        name: "Fremen Bond",
        image: "mechanics/uprising/fremen-bond.png",
      },
      {
        id: "gain-influence",
        name: "Gain Influence",
        image: "mechanics/uprising/gain-influence.png",
      },
      {
        id: "in-play",
        name: "In Play",
        image: "mechanics/uprising/in-play.png",
      },
      {
        id: "influence",
        name: "Influence",
        image: "mechanics/uprising/influence.png",
      },
      {
        id: "maker-hook",
        name: "Maker Hook",
        image: "mechanics/uprising/maker-hook.png",
      },
      {
        id: "maker",
        name: "Maker",
        image: "mechanics/uprising/maker.png",
      },
      {
        id: "paying-a-cost",
        name: "Paying a Cost",
        image: "mechanics/uprising/paying-a-cost.png",
      },
      {
        id: "persuasion",
        name: "Persuasion",
        image: "mechanics/uprising/persuasion.png",
      },
      {
        id: "recall-agent",
        name: "Recall Agent",
        image: "mechanics/uprising/recall-agent.png",
      },
      {
        id: "recall-spy",
        name: "Recall Spy",
        image: "mechanics/uprising/recall-spy.png",
      },
      {
        id: "resources",
        name: "Resources",
        image: "mechanics/uprising/resources.png",
      },
      {
        id: "retreat",
        name: "Retreat",
        image: "mechanics/uprising/retreat.png",
      },
      {
        id: "sandworm",
        name: "Sandworm",
        image: "mechanics/uprising/sandworm.png",
      },
      {
        id: "shield-wall",
        name: "Shield Wall",
        image: "mechanics/uprising/shield-wall.png",
      },
      {
        id: "signet-ring",
        name: "Signet Ring",
        image: "mechanics/uprising/signet-ring.png",
      },
      {
        id: "spy",
        name: "Spy",
        image: "mechanics/uprising/spy.png",
      },
      {
        id: "steal-intrigue",
        name: "Steal Intrigue",
        image: "mechanics/uprising/steal-intrigue.png",
      },
      {
        id: "sword",
        name: "Sword",
        image: "mechanics/uprising/sword.png",
      },
      {
        id: "trash-card",
        name: "Trash Card",
        image: "mechanics/uprising/trash-card.png",
      },
      {
        id: "trash-intrigue",
        name: "Trash Intrigue",
        image: "mechanics/uprising/trash-intrigue.png",
      },
      {
        id: "troop",
        name: "Troop",
        image: "mechanics/uprising/troop.png",
      },
      {
        id: "victory-point",
        name: "Victory Point",
        image: "mechanics/uprising/victory-point.png",
      },
    ],
  },
  {
    id: "rise-of-ix",
    name: "Rise of Ix",
    mechanics: [
      {
        id: "acquire-tech",
        name: "Acquire Tech",
        image: "mechanics/rise-of-ix/acquire-tech.png",
      },
      {
        id: "dividends",
        name: "Dividends",
        image: "mechanics/rise-of-ix/dividends.png",
      },
      {
        id: "dreadnought",
        name: "Dreadnought",
        image: "mechanics/rise-of-ix/dreadnought.png",
      },
      {
        id: "flip",
        name: "Flip",
        image: "mechanics/rise-of-ix/flip.png",
      },
      {
        id: "freighter",
        name: "Freighter",
        image: "mechanics/rise-of-ix/freighter.png",
      },
      {
        id: "infiltration",
        name: "Infiltration",
        image: "mechanics/rise-of-ix/infiltration.png",
      },
      {
        id: "tech-negotiation",
        name: "Tech Negotiation",
        image: "mechanics/rise-of-ix/tech-negotiation.png",
      },
      {
        id: "unload",
        name: "Unload",
        image: "mechanics/rise-of-ix/unload.png",
      },
      {
        id: "discard",
        name: "Discard",
        image: "mechanics/rise-of-ix/discard.png",
      },
    ],
  },
  {
    id: "immortality",
    name: "Immortality",
    mechanics: [
      {
        id: "combat",
        name: "Combat",
        image: "mechanics/immortality/combat.png",
      },
      {
        id: "genetic-markers",
        name: "Genetic Markers",
        image: "mechanics/immortality/genetic-markers.png",
      },
      {
        id: "research",
        name: "Research",
        image: "mechanics/immortality/research.png",
      },
      {
        id: "specimen",
        name: "Specimen",
        image: "mechanics/immortality/specimen.png",
      },
      {
        id: "tleilaxu",
        name: "Tleilaxu",
        image: "mechanics/immortality/tleilaxu.png",
      },
      {
        id: "graft",
        name: "Graft",
        image: "mechanics/immortality/graft.png",
        wideFormat: true,
      },
      {
        id: "family-atomics",
        name: "Family Atomics",
        image: "mechanics/immortality/family-atomics.png",
        wideFormat: true,
      },
      {
        id: "trash-intrigue",
        name: "Trash Intrigue",
        image: "mechanics/immortality/trash-intrigue.png",
      },
    ],
  },
  {
    id: "bloodlines",
    name: "Bloodlines",
    mechanics: [
      {
        id: "command",
        name: "Command",
        image: "mechanics/bloodlines/command.png",
      },
      {
        id: "spy-deep-cover",
        name: "Spy Deep Cover",
        image: "mechanics/bloodlines/spy-deep-cover.png",
      },
      {
        id: "sardukar-commanders",
        name: "Sardukar Commanders",
        image: "mechanics/bloodlines/sardukar-commanders.png",
        wideFormat: true,
      },
      {
        id: "acquire-tech",
        name: "Acquire Tech",
        image: "mechanics/bloodlines/acquire-tech.png",
      },
      {
        id: "combat",
        name: "Combat",
        image: "mechanics/bloodlines/combat.png",
      },
      {
        id: "discard",
        name: "Discard",
        image: "mechanics/bloodlines/discard.png",
      },
      {
        id: "flip",
        name: "Flip",
        image: "mechanics/bloodlines/flip.png",
      },
      {
        id: "trash-intrigue",
        name: "Trash Intrigue",
        image: "mechanics/bloodlines/trash-intrigue.png",
      },
    ],
  },
  {
    id: "conspiracy",
    name: "Conspiracy",
    mechanics: [
      {
        id: "conspiracy-acquire",
        name: "Conspiracy Acquire",
        image: "mechanics/conspiracy/conspiracy-acquire.png",
      },
      {
        id: "conspiracy-chip",
        name: "Conspiracy Chip",
        image: "mechanics/conspiracy/conspiracy-chip.png",
      },
      {
        id: "foldspace-or-contract",
        name: "Foldspace or Contract",
        image: "mechanics/conspiracy/foldspace-or-contract.png",
      },
      {
        id: "raid-bonus",
        name: "Raid Bonus",
        image: "mechanics/conspiracy/raid-bonus.png",
      },
      {
        id: "stoneburners",
        name: "Stoneburners",
        image: "mechanics/conspiracy/stoneburners.png",
        wideFormat: true,
      },
      {
        id: "ongoing-agent-box-effect",
        name: "Ongoing Agent Box effect",
        image: "mechanics/conspiracy/ongoing-agent-box-effect.png",
        wideFormat: true,
      },
      {
        id: "raids",
        name: "Raids",
        image: "mechanics/conspiracy/raids.png",
        wideFormat: true,
      },
      {
        id: "conspiracy-card",
        name: "Conspiracy Cards",
        image: "mechanics/conspiracy/conspiracy-cards.png",
        wideFormat: true,
      },
      {
        id: "discard",
        name: "Discard",
        image: "mechanics/conspiracy/discard.png",
      },
      {
        id: "graft",
        name: "Graft",
        image: "mechanics/conspiracy/graft.png",
        wideFormat: true,
      },
      {
        id: "trash-intrigue",
        name: "Trash Intrigue",
        image: "mechanics/conspiracy/trash-intrigue.png",
      },
    ],
  },
];
