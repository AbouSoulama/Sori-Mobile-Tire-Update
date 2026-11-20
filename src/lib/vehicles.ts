// Make -> model catalog carried over from the original quote/appointment forms.
// Also used to seed the vehicle_makes / vehicle_models tables.
export const vehicleCatalog: Record<string, string[]> = {
  Acura: ["ILX", "MDX", "MDX SH-AWD", "RDX 2WD", "RDX AWD", "RLX", "TLX", "TLX SH-AWD", "ZDX"],
  Audi: [
    "A3 Premium", "A3 Prestige", "A4 Premium", "A4 Prestige", "A5 Premium", "A5 Prestige",
    "A6 Premium", "A6 Prestige", "A7 Premium", "A7 Prestige", "A8 L Quattro", "A8 L TDI Quattro",
    "A8 L W12 Quattro", "A8 Quattro", "Allroad Premium", "Allroad Prestige", "Q3 Premium",
    "Q3 Prestige", "Q5 Hybrid Prestige", "Q5 Premium", "Q5 Premium TDI", "Q5 Prestige",
    "Q5 Prestige TDI", "Q7 Premium", "Q7 Prestige", "Q7 TDI Premium", "Q7 TDI Prestige",
    "R8 Plus Quattro", "R8 Quattro", "R8 Spyder Quattro", "RS 5", "RS 7", "S3 Premium",
    "S3 Prestige", "S4 Premium", "S4 Prestige", "S5 Premium", "S5 Prestige", "S6 Quattro",
    "S7 Quattro", "S8 Quattro", "SQ5 Premium", "SQ5 Prestige", "SQ8 e-tron", "TT Quattro",
    "TTS Quattro",
  ],
  BMW: [
    "228i", "320i", "328d", "328i", "335i", "428i", "435i", "528i", "535d", "535i", "550i",
    "640i", "650i", "740i", "740Ld", "740Li", "750i", "750Li", "ActiveHybrid", "Alpina", "i3",
    "i8", "M235i", "M3", "M4", "M5", "M6", "X Series", "XM", "Z4",
  ],
  Buick: ["Enclave", "Encore", "LaCrosse", "Regal", "Envision", "Verano"],
  Cadillac: ["ATS", "CTS", "ELR", "Escalade", "SRX", "XTS"],
  Chevrolet: [
    "Camaro", "Caprice", "Captiva", "City Express", "Colorado", "Corvette", "Cruze", "Equinox",
    "Express", "Impala", "Malibu", "Silverado", "Sonic", "Spark", "SS", "Suburban", "Tahoe",
    "Trailblazer", "Traverse", "Trax", "Volt",
  ],
  Chrysler: ["200", "300", "Town & Country"],
  Dodge: [
    "Challenger", "Charger", "Dart", "Durango", "Grand Caravan", "Hornet", "Journey",
    "ProMaster", "Ram", "Viper",
  ],
  Ford: [
    "C-Max", "E-Series", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250", "F-350",
    "F-450", "Fiesta", "Flex", "Focus", "Fusion", "Mustang", "Police Interceptor", "Ranger",
    "Taurus", "Transit",
  ],
  GMC: [
    "Acadia AT4", "Acadia Denali", "Acadia Elevation", "Acadia SLE", "Acadia SLT", "Canyon",
    "Hummer EV", "Savana", "Sierra", "Terrain", "Yukon",
  ],
  Honda: [
    "Accord", "Civic", "CR-V", "CR-Z", "Crosstour", "Fit", "HR-V", "Odyssey", "Passport",
    "Pilot", "Ridgeline",
  ],
  Hyundai: [
    "Accent", "Azera", "Elantra", "Equus", "Genesis", "Ioniq", "Kona", "Palisade",
    "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue",
  ],
  Infiniti: ["Q40", "Q50", "Q60", "Q70", "QX50", "QX55", "QX60", "QX70", "QX80"],
  Isuzu: ["FTR", "FVR", "NPR", "NPR-HD", "NPR-XD", "NQR", "NRR", "Reach"],
  Jaguar: [
    "F-Type", "F-Pace", "I-Pace", "XF", "XFR", "XFR-S", "XJ", "XJL", "XJR", "XJR L", "XK",
    "XKR", "XKR-S",
  ],
  Jeep: [
    "Cherokee", "Compass", "Grand Cherokee", "Grand Wagoneer", "Patriot", "Renegade",
    "Wagoneer", "Wrangler",
  ],
  Kia: [
    "Cadenza", "EV6", "EV9", "Forte", "K5", "K900", "Niro", "Optima", "Rio", "Sedona",
    "Seltos", "Sorento", "Soul", "Sportage",
  ],
  Lamborghini: [
    "Aventador LP700-4", "Aventador LP700-4 Roadster", "Huracán", "Revuelto", "Urus",
  ],
  "Land Rover": ["Defender", "Discovery", "LR Series", "Range Rover"],
  Lexus: [
    "CT200h", "ES300h", "ES350", "GS350", "GS450h", "GX460", "IS250", "IS350", "LS460",
    "LS600h", "LX570", "NX200t", "NX300", "RC", "RX", "RZ",
  ],
  Lincoln: ["Aviator", "MKC", "MKS", "MKT", "MKX", "MKZ", "Navigator", "Nautilus"],
  Maserati: ["Ghibli", "GranTurismo", "Quattroporte"],
  Mazda: ["CX-5", "CX-9", "Mazda3", "Mazda5", "Mazda6", "MX-5"],
  "Mercedes-Benz": [
    "AMG GT", "B Electric Drive", "C250", "C300", "C350", "C400", "C63", "CLA250", "CLA45",
    "CLE", "CLS400", "CLS550", "CLS63", "E250", "E350", "E400", "E550", "E63", "G550", "G63",
    "GL350", "GL450", "GL550", "GL63", "GLA250", "GLA45", "GLK250", "GLK350", "ML250", "ML350",
    "ML400", "ML63", "S550", "S600", "S63 AMG", "S65 AMG", "SL400", "SL550", "SL63", "SL65",
    "SLK250", "SLK350", "SLK55", "SLS AMG GT", "Sprinter 2500", "Sprinter 3500",
  ],
  Mini: ["Cooper", "Cooper SE"],
  Mitsubishi: ["Canter", "Lancer", "Mirage", "Outlander"],
  "Nissan/Datsun": [
    "370Z", "Altima", "Ariya", "Armada", "Frontier", "GT-R", "Juke", "Kicks", "Leaf",
    "Murano", "NV Series", "Pathfinder", "Quest", "Rogue", "Sentra", "Z", "Titan", "Versa",
    "Xterra",
  ],
  Porsche: ["911", "918 Spyder", "Boxster", "Cayenne", "Macan", "Panamera"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Phantom", "Spectre", "Wraith"],
  Scion: ["FR-S", "iQ", "tC", "xB"],
  Subaru: [
    "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX", "XV",
  ],
  Tesla: [
    "Model 3", "Model 3 Long Range", "Model 3 Performance", "Cybertruck", "Model S Long Range",
    "Model S Plaid", "Model X Long Range", "Model X Plaid", "Model Y",
  ],
  Toyota: [
    "4Runner", "Avalon", "bZ4X", "Camry", "Corolla", "Crown", "GR Corolla", "Highlander",
    "Land Cruiser", "Prius C", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza", "Yaris",
  ],
  "Van Hool": ["Commuter Coach CX", "TD925", "TDX DDC", "Tourist"],
  Volkswagen: [
    "Atlas", "Beetle", "CC", "e-Golf", "Eos", "Golf", "GTI", "Jetta", "Passat", "Tiguan",
    "Touareg",
  ],
  Volvo: [
    "VNL", "VNM", "VNX", "VAH", "VHD", "9700", "EX Series", "S Series", "S60", "S80", "V60",
    "XC60", "XC70",
  ],
};

export type VehicleCatalog = Record<string, string[]>;
