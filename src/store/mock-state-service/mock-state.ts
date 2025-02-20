import { IBuilding } from '../../api/buildings/buildings-api';
import { TechTreeItemType } from '../../api/tech-tree-item-api';
import { ITech } from '../../api/techs/techs-api';
import { IUnit } from '../../api/units/units-api';
import { FetchStatus } from '../fetch-status-service';
import { FilterMode } from '../slices/tech-tree-filter-slice';
import { SortBy } from '../slices/tech-tree-filter-slice/tech-tree-filter-service/sort-service';

import { RootState } from '../';

export const MOCK_STATE: RootState = {
  auth: {
    signupStatus: FetchStatus.FULFILLED,
    loginStatus: FetchStatus.FULFILLED,
    logoutStatus: FetchStatus.INIT,
    refreshStatus: FetchStatus.FULFILLED,
  },
  users: {
    user: {
      id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: 'test@test.com',
      username: 'test username',
    },
    userGetStatus: FetchStatus.FULFILLED,
    userUpdateStatus: FetchStatus.INIT,
    userDeleteStatus: FetchStatus.INIT,
  },
  civs: {
    allCivs: [
      {
        id: 1363,
        civName: 'Aztecs',
      },
      {
        id: 1377,
        civName: 'Franks',
      },
      {
        id: 1387,
        civName: 'Lithuanians',
      },
      {
        id: 1394,
        civName: 'Poles',
      },
      {
        id: 1404,
        civName: 'Vikings',
      },
    ],
    civPool: [],
    civsStatus: FetchStatus.FULFILLED,
  },
  units: {
    allUnits: [
      {
        id: 1000,
        itemName: 'archer',
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        buildings: [
          {
            id: 1340,
            itemName: 'archery range',
            kind: TechTreeItemType.BUILDING,
            isUnique: false,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.UNIT,
      },
      {
        id: 1012,
        itemName: 'knight',
        age: {
          id: 3,
          ageName: 'castle age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        buildings: [
          {
            id: 1341,
            itemName: 'stable',
            kind: TechTreeItemType.BUILDING,
            isUnique: false,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.UNIT,
      },
      {
        id: 1003,
        itemName: 'skirmisher',
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        buildings: [
          {
            id: 1340,
            itemName: 'archery range',
            kind: TechTreeItemType.BUILDING,
            isUnique: false,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.UNIT,
      },
    ],
    unitsStatus: FetchStatus.FULFILLED,
  },
  techs: {
    allTechs: [
      {
        id: 1195,
        itemName: 'architecture',
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1368,
            civName: 'Bulgarians',
          },
        ],
        buildings: [
          {
            id: 1347,
            itemName: 'university',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.TECH,
      },
      {
        id: 1186,
        itemName: 'loom',
        age: {
          id: 1,
          ageName: 'dark age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        buildings: [
          {
            id: 1335,
            itemName: 'town center',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.TECH,
      },
      {
        id: 1228,
        itemName: 'wheelbarrow',
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        buildings: [
          {
            id: 1335,
            itemName: 'town center',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.TECH,
      },
    ],
    techsStatus: FetchStatus.FULFILLED,
  },
  buildings: {
    allBuildings: [
      {
        id: 1340,
        itemName: 'archery range',
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        units: [
          {
            id: 1000,
            itemName: 'archer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1001,
            itemName: 'hand cannoneer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1003,
            itemName: 'skirmisher',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1253,
            itemName: 'parthian tactics',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1254,
            itemName: 'thumb ring',
            kind: TechTreeItemType.TECH,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.BUILDING,
      },
      {
        id: 1329,
        itemName: 'barracks',
        age: {
          id: 1,
          ageName: 'dark age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        units: [
          {
            id: 1019,
            itemName: 'militia',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1021,
            itemName: 'long swordsman',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1023,
            itemName: 'spearman',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1229,
            itemName: 'squires',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1296,
            itemName: 'arson',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1314,
            itemName: 'supplies',
            kind: TechTreeItemType.TECH,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.BUILDING,
      },
      {
        id: 1342,
        itemName: 'blacksmith',
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1369,
            civName: 'Burgundians',
          },
          {
            id: 1365,
            civName: 'Berbers',
          },
        ],
        units: [],
        techs: [
          {
            id: 1204,
            itemName: 'forging',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1205,
            itemName: 'iron casting',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1206,
            itemName: 'scale mail armor',
            kind: TechTreeItemType.TECH,
          },
        ],
        isUnique: false,
        kind: TechTreeItemType.BUILDING,
      },
    ],
    buildingsStatus: FetchStatus.FULFILLED,
  },
  ages: {
    allAges: [
      {
        id: 1,
        ageName: 'dark age',
        units: [
          {
            id: 1006,
            itemName: 'fishing ship',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1019,
            itemName: 'militia',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1022,
            itemName: 'villager',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1186,
            itemName: 'loom',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1215,
            itemName: 'feudal age',
            kind: TechTreeItemType.TECH,
          },
        ],
        buildings: [
          {
            id: 1332,
            itemName: 'farm',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1334,
            itemName: 'house',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1336,
            itemName: 'palisade wall',
            kind: TechTreeItemType.BUILDING,
          },
        ],
      },
      {
        id: 2,
        ageName: 'feudal age',
        units: [
          {
            id: 1000,
            itemName: 'archer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1003,
            itemName: 'skirmisher',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1007,
            itemName: 'trade cog',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1175,
            itemName: 'town watch',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1181,
            itemName: 'horse collar',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1198,
            itemName: 'gold mining',
            kind: TechTreeItemType.TECH,
          },
        ],
        buildings: [
          {
            id: 1337,
            itemName: 'watch tower',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1346,
            itemName: 'fish trap',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1344,
            itemName: 'stone wall',
            kind: TechTreeItemType.BUILDING,
          },
        ],
      },
      {
        id: 3,
        ageName: 'castle age',
        units: [
          {
            id: 1129,
            itemName: 'battle elephant',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1140,
            itemName: 'battering ram',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1142,
            itemName: 'steppe lancer',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1180,
            itemName: 'heavy plow',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1187,
            itemName: 'coinage',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1189,
            itemName: 'husbandry',
            kind: TechTreeItemType.TECH,
          },
        ],
        buildings: [
          {
            id: 1345,
            itemName: 'fortified wall',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1331,
            itemName: 'siege workshop',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1348,
            itemName: 'guard tower',
            kind: TechTreeItemType.BUILDING,
          },
        ],
      },
      {
        id: 4,
        ageName: 'imperial age',
        units: [
          {
            id: 1001,
            itemName: 'hand cannoneer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1011,
            itemName: 'bombard cannon',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1016,
            itemName: 'trebuchet',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1179,
            itemName: 'crop rotation',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1182,
            itemName: 'guilds',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1191,
            itemName: 'chemistry',
            kind: TechTreeItemType.TECH,
          },
        ],
        buildings: [
          {
            id: 1351,
            itemName: 'wonder',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1350,
            itemName: 'bombard tower',
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 1349,
            itemName: 'keep',
            kind: TechTreeItemType.BUILDING,
          },
        ],
      },
    ],
    agesStatus: FetchStatus.FULFILLED,
  },
  version: {
    gameVersion: '66692',
    versionStatus: FetchStatus.FULFILLED,
  },
  techTreeFilter: {
    filteredCivPool: [
      {
        id: 1387,
        civName: 'Lithuanians',
      },
      {
        id: 1394,
        civName: 'Poles',
      },
    ],
    itemsFilter: [
      {
        id: 1154,
        itemName: 'winged hussar',
        kind: TechTreeItemType.UNIT,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1387,
            civName: 'Lithuanians',
          },
          {
            id: 1394,
            civName: 'Poles',
          },
        ],
        buildings: [
          {
            id: 1341,
            itemName: 'stable',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [0, 7, 23],
      } as IUnit,
    ],
    filterMode: FilterMode.HAS_ALL,
    taggedItems: [
      {
        id: 1183,
        itemName: 'anarchy',
        kind: TechTreeItemType.TECH,
        isUnique: true,
        age: {
          id: 3,
          ageName: 'castle age',
        },
        civs: [
          {
            id: 1378,
            civName: 'Goths',
          },
        ],
        buildings: [
          {
            id: 1338,
            itemName: 'castle',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [1, 3, 6, 11],
      } as ITech,
      {
        id: 1049,
        itemName: 'arbalester',
        kind: TechTreeItemType.UNIT,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1363,
            civName: 'Aztecs',
          },
          {
            id: 1384,
            civName: 'Japanese',
          },
          {
            id: 1403,
            civName: 'Vietnamese',
          },
        ],
        buildings: [
          {
            id: 1340,
            itemName: 'archery range',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [0, 7, 8],
      } as IUnit,
      {
        id: 1340,
        itemName: 'archery range',
        kind: TechTreeItemType.BUILDING,
        isUnique: false,
        age: {
          id: 2,
          ageName: 'feudal age',
        },
        civs: [
          {
            id: 1363,
            civName: 'Aztecs',
          },
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1404,
            civName: 'Vikings',
          },
        ],
        units: [
          {
            id: 1000,
            itemName: 'archer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1001,
            itemName: 'hand cannoneer',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1002,
            itemName: 'elite skirmisher',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1253,
            itemName: 'parthian tactics',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1254,
            itemName: 'thumb ring',
            kind: TechTreeItemType.TECH,
          },
        ],
        tagIds: [2, 5],
      } as IBuilding,
      {
        id: 1195,
        itemName: 'architecture',
        kind: TechTreeItemType.TECH,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1373,
            civName: 'Chinese',
          },
          {
            id: 1391,
            civName: 'Mayans',
          },
          {
            id: 1404,
            civName: 'Vikings',
          },
        ],
        buildings: [
          {
            id: 1347,
            itemName: 'university',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [1, 7, 25],
      } as ITech,
      {
        id: 1329,
        itemName: 'barracks',
        kind: TechTreeItemType.BUILDING,
        isUnique: false,
        age: {
          id: 1,
          ageName: 'dark age',
        },
        civs: [
          {
            id: 1363,
            civName: 'Aztecs',
          },
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1404,
            civName: 'Vikings',
          },
        ],
        units: [
          {
            id: 1019,
            itemName: 'militia',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1039,
            itemName: 'pikeman',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1082,
            itemName: 'elite eagle warrior',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1229,
            itemName: 'squires',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1296,
            itemName: 'arson',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1314,
            itemName: 'supplies',
            kind: TechTreeItemType.TECH,
          },
        ],
        tagIds: [2, 4],
      } as IBuilding,
      {
        id: 1154,
        itemName: 'winged hussar',
        kind: TechTreeItemType.UNIT,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1387,
            civName: 'Lithuanians',
          },
          {
            id: 1394,
            civName: 'Poles',
          },
        ],
        buildings: [
          {
            id: 1341,
            itemName: 'stable',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [0, 7, 23],
      } as IUnit,
    ],
    shownItems: [
      {
        id: 1183,
        itemName: 'anarchy',
        kind: TechTreeItemType.TECH,
        isUnique: true,
        age: {
          id: 3,
          ageName: 'castle age',
        },
        civs: [
          {
            id: 1378,
            civName: 'Goths',
          },
        ],
        buildings: [
          {
            id: 1338,
            itemName: 'castle',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [1, 3, 6, 11],
      } as ITech,
      {
        id: 1049,
        itemName: 'arbalester',
        kind: TechTreeItemType.UNIT,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1363,
            civName: 'Aztecs',
          },
          {
            id: 1384,
            civName: 'Japanese',
          },
          {
            id: 1403,
            civName: 'Vietnamese',
          },
        ],
        buildings: [
          {
            id: 1340,
            itemName: 'archery range',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [0, 7, 8],
      } as IUnit,
      {
        id: 1195,
        itemName: 'architecture',
        kind: TechTreeItemType.TECH,
        isUnique: false,
        age: {
          id: 4,
          ageName: 'imperial age',
        },
        civs: [
          {
            id: 1373,
            civName: 'Chinese',
          },
          {
            id: 1391,
            civName: 'Mayans',
          },
          {
            id: 1404,
            civName: 'Vikings',
          },
        ],
        buildings: [
          {
            id: 1347,
            itemName: 'university',
            kind: TechTreeItemType.BUILDING,
          },
        ],
        tagIds: [1, 7, 25],
      } as ITech,
      {
        id: 1329,
        itemName: 'barracks',
        kind: TechTreeItemType.BUILDING,
        isUnique: false,
        age: {
          id: 1,
          ageName: 'dark age',
        },
        civs: [
          {
            id: 1363,
            civName: 'Aztecs',
          },
          {
            id: 1377,
            civName: 'Franks',
          },
          {
            id: 1404,
            civName: 'Vikings',
          },
        ],
        units: [
          {
            id: 1019,
            itemName: 'militia',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1039,
            itemName: 'pikeman',
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 1082,
            itemName: 'elite eagle warrior',
            kind: TechTreeItemType.UNIT,
          },
        ],
        techs: [
          {
            id: 1229,
            itemName: 'squires',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1296,
            itemName: 'arson',
            kind: TechTreeItemType.TECH,
          },
          {
            id: 1314,
            itemName: 'supplies',
            kind: TechTreeItemType.TECH,
          },
        ],
        tagIds: [2, 4],
      } as IBuilding,
    ],
    searchTerm: '',
    sortMode: SortBy.ALPHA,
    selectedTags: [],
  },
  draftResult: {
    civ: {
      id: 1377,
      civName: 'Franks',
    },
    draftCount: 1,
  },
  drafts: {
    drafts: [],
    draftsGetStatus: FetchStatus.INIT,
    draftUpdateStatus: FetchStatus.INIT,
    draftDeleteStatus: FetchStatus.INIT,
  },
  snackbar: {
    message: 'test snackbar message',
  },
};
