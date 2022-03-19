const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'shadow',
]

const characteristics = Object.freeze({
    1: "Loves to eat",
    2: 'Proud of its power',
    3: "Sturdy body",
    4: "Highly curious",
    5: "Strong willed",
    6: "Likes to run",
    7: "Takes plenty of siestas",
    8: "Likes to thrash about",
    9: "Capable of taking hits",
    10: "Mischievous", 
    11: "Somewhat vain",
    12: "Alert to sounds",
    13: "Nods off a lot",
    14: "A little quick tempered",
    15: "Highly persistent",
    16: "Thoroughly cunning",
    17: "Strongly defiant",
    18: "Impetuous and silly",
    19: "Scatters things often",
    20: "Likes to fight",
    21: "Good endurance",
    22: "Often lost in thought",
    23: "Hates to lose",
    24: "Somewhat of a clown",
    25: "Likes to relax",
    26: "Quick tempered",
    27: "Good perseverance",
    28: "Very finicky",
    29: "Somewhat stubborn",
    30: "Quick to flee",
});

const generations = [
    "Generation I",
    "Generation II",
    "Generation III",
    "Generation IV",
    "Generation V",
    "Generation VI",
    "Generation VII",
    "Generation VIII",
];

export default {
    types,
    characteristics,
    generations,
}