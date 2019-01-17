import {Generation} from '../gen';
import {Natures} from '../natures';
import {Stat, Stats, StatsTable} from '../stats';

describe('Stats', () => {
  test('fromString', () => {
    expect(Stats.fromString('foo')).not.toBeDefined();
    expect(Stats.fromString('Atk')).toBe('atk');
    expect(Stats.fromString('Spc')).toBe('spa');
    expect(Stats.fromString('SpDef')).toBe('spd');
    expect(Stats.fromString('SAtk')).toBe('spa');
  });

  test('display', () => {
    expect(Stats.display('foo')).toBe('foo');
    expect(Stats.display('Atk')).toBe('Atk');
    expect(Stats.display('Spc')).toBe('SpA');
    expect(Stats.display('SpDef')).toBe('SpD');
    expect(Stats.display('SAtk', 7, true)).toBe('Special Attack');
    expect(Stats.display('SAtk', 1, true)).toBe('Special');
  });

  test('fillIVs', () => {
    expect(Stats.fillIVs({atk: 10, def: 12, spd: 15}))
        .toEqual({hp: 31, atk: 10, def: 12, spe: 31, spa: 31, spd: 15});
  });

  test('fillEVs', () => {
    expect(Stats.fillEVs({spa: 200, spe: 252}))
        .toEqual({hp: 0, atk: 0, def: 0, spe: 252, spa: 200, spd: 0});
    expect(Stats.fillEVs({spa: 200, def: 240}, 1))
        .toEqual({hp: 252, atk: 252, def: 240, spe: 252, spa: 200, spd: 252});
  });

  test('dstois', () => {
    expect(Stats.dstois({atk: 10, def: 12, spd: 15}))
        .toEqual({atk: 21, def: 25, spd: 31});
  });

  test('istods', () => {
    expect(Stats.istods({hp: 26, atk: 12, spe: 31}))
        .toEqual({hp: 13, atk: 6, spe: 15});
  });

  test('boost', () => {
    expect(Stats.boost(3)).toBe(2.5);
    expect(Stats.boost(4)).toBe(3);
    expect(Stats.boost(10)).toBe(4);
    expect(Stats.boost(-5)).toBe(-3.5);
    expect(Stats.boost(0)).toBe(1);
    expect(Stats.boost(-100)).toBe(-4);
  });

  test('getHPDV', () => {
    expect(Stats.getHPDV({'spa': Stats.dtoi(15), 'spe': Stats.dtoi(15)}))
        .toBe(15);
    expect(Stats.getHPDV({
      'atk': Stats.dtoi(5),
      'def': Stats.dtoi(15),
      'spa': Stats.dtoi(13),
      'spe': Stats.dtoi(13)
    })).toBe(15);
    expect(Stats.getHPDV({
      'def': Stats.dtoi(3),
      'spa': Stats.dtoi(11),
      'spe': Stats.dtoi(10)
    })).toBe(13);
  });

  test('calc', () => {
    const rby: StatsTable =
        {hp: 403, atk: 298, def: 298, spa: 298, spd: 298, spe: 298};
    const adv: StatsTable =
        {hp: 404, atk: 328, def: 299, spa: 269, spd: 299, spe: 299};

    for (let gen = 1; gen <= 7; gen++) {
      let stat: Stat;
      for (stat in rby) {
        const s = Stats.calc(
            gen as Generation, stat, 100, 31, 252, 100,
            Natures.fromString('Adamant'));
        if (gen < 3) {
          expect(s).toBe(rby[stat]);
        } else {
          expect(s).toBe(adv[stat]);
        }
      }
    }

    // Shedinja
    expect(Stats.calc(7, 'hp', 1, 31, 252, 100, Natures.fromString('Jolly')))
        .toBe(1);
    // no nature
    expect(Stats.calc(7, 'atk', 100, 31, 252, 100)).toBe(299);
  });
});
