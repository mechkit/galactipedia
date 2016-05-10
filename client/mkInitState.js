import createUniverse from './universe/universe';

export default function(seed) {
  var initState = {
    chance: new Chance(seed),
    db: [],
    ui: {
      treeFocus: 'u',
      selectedItem: 'u'
    }
  };

  initState = createUniverse(initState);

  return initState;
}