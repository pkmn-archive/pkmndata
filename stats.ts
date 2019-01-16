import {extend} from './extend';
import {ID} from './id';

export type Stat = 'hp'|'atk'|'def'|'spa'|'spd'|'spe';
export type Boost = 'atk'|'def'|'spa'|'spd'|'spe'|'evasion'|'accuracy'|'spc';

export type StatsTable = {
  hp: number,
  atk: number,
  def: number,
  spe: number,
  spa: number,
  spd: number,
};

export type BoostsTable = {
  atk: number,
  def: number,
  spa: number,
  spd: number,
  spe: number,
  accuracy: number,
  evasion: number
};

export const HP: Stat = 'hp';
export const ATK: Stat = 'atk';
export const DEF: Stat = 'def';
export const SPA: Stat = 'spa';
export const SPD: Stat = 'spd';
export const SPE: Stat = 'spe';

const STAT_IDS: {[id: string]: Stat} = {
  'HP': 'hp',
  'hp': 'hp',
  'Atk': 'atk',
  'atk': 'atk',
  'Def': 'def',
  'def': 'def',
  'SpA': 'spa',
  'SAtk': 'spa',
  'SpAtk': 'spa',
  'spa': 'spa',
  'spc': 'spa',
  'Spc': 'spa',
  'SpD': 'spd',
  'SDef': 'spd',
  'SpDef': 'spd',
  'spd': 'spd',
  'Spe': 'spe',
  'Spd': 'spe',
  'spe': 'spe',
};

// TODO redo
export function display(stat: Stat) {
  switch (stat) {
    case HP:
      return 'HP';
    case ATK:
      return 'Atk';
    case DEF:
      return 'Def';
    case SPA:
      return 'SpA';
    case SPD:
      return 'SpD';
    case SPE:
      return 'Spe';
    default:
      throw new Error('unknown stat ' + stat);
  }
}

export class Stats {
  private static fill(p: Partial<StatsTable>, val: number): StatsTable {
    return extend(true, {}, {
      'hp': val,
      'atk': val,
      'def': val,
      'spa': val,
      'spd': val,
      'spe': val
    });
  }

  static fillIVs(pivs: Partial<StatsTable>): StatsTable {
    return Stats.fill(pivs, 31);
  }

  static itod(iv: number) {
    return Math.floor(iv / 2);
  }

  static dtoi(dv: number) {
    return dv * 2 + 1;
  }
}
