import fs from 'fs';
import path from 'path';

const metadataTemplate = [
  {
    "name": "Ascendent Succubus",
    "rarity": "Common",
    "id": "354"
  },
  {
    "name": "Blades of Shadow",
    "rarity": "Common",
    "id": "355"
  },
  {
    "name": "Burned Mage",
    "rarity": "Common",
    "id": "356"
  },
  {
    "name": "Cherub",
    "rarity": "Common",
    "id": "357"
  },
  {
    "name": "Commander of Knights",
    "rarity": "Common",
    "id": "358"
  },
  {
    "name": "Crystal Protector",
    "rarity": "Common",
    "id": "359"
  },
  {
    "name": "Devoured by Chaos",
    "rarity": "Common",
    "id": "360"
  },
  {
    "name": "Dragonborn",
    "rarity": "Common",
    "id": "361"
  },
  {
    "name": "Golden Golem",
    "rarity": "Common",
    "id": "362"
  },
  {
    "name": "Golden Maiden",
    "rarity": "Common",
    "id": "363"
  },
  {
    "name": "Herald of Damnation",
    "rarity": "Common",
    "id": "364"
  },
  {
    "name": "Herald of the Curse",
    "rarity": "Common",
    "id": "365"
  },
  {
    "name": "Infernal Hound",
    "rarity": "Common",
    "id": "366"
  },
  {
    "name": "Infernal Knight",
    "rarity": "Common",
    "id": "367"
  },
  {
    "name": "Kabuto",
    "rarity": "Common",
    "id": "368"
  },
  {
    "name": "Krampus",
    "rarity": "Common",
    "id": "369"
  },
  {
    "name": "Lava Golem",
    "rarity": "Common",
    "id": "370"
  },
  {
    "name": "Lord of Sin",
    "rarity": "Common",
    "id": "371"
  },
  {
    "name": "Marked by Uruk",
    "rarity": "Common",
    "id": "372"
  },
  {
    "name": "Scarlet Hunter",
    "rarity": "Common",
    "id": "373"
  },
  {
    "name": "Scarlet Zephyr",
    "rarity": "Common",
    "id": "374"
  },
  {
    "name": "Swamp Monster",
    "rarity": "Common",
    "id": "375"
  },
  {
    "name": "The Animal Within",
    "rarity": "Common",
    "id": "376"
  },
  {
    "name": "The Dark Knight",
    "rarity": "Common",
    "id": "377"
  },
  {
    "name": "The Hollow Warrior",
    "rarity": "Common",
    "id": "378"
  },
  {
    "name": "Undead Berserker",
    "rarity": "Common",
    "id": "379"
  },
  {
    "name": "Undead General",
    "rarity": "Common",
    "id": "380"
  },
  {
    "name": "Uruk_s Disciple",
    "rarity": "Common",
    "id": "381"
  },
  {
    "name": "Uruk_s Priest",
    "rarity": "Common",
    "id": "382"
  },
  {
    "name": "Winter Defender",
    "rarity": "Common",
    "id": "383"
  },
  {
    "name": "Ascendent Succubus",
    "rarity": "Epic",
    "id": "384"
  },
  {
    "name": "Blades of Shadow",
    "rarity": "Epic",
    "id": "385"
  },
  {
    "name": "Burned Mage",
    "rarity": "Epic",
    "id": "386"
  },
  {
    "name": "Cherub",
    "rarity": "Epic",
    "id": "387"
  },
  {
    "name": "Commander of Knights",
    "rarity": "Epic",
    "id": "388"
  },
  {
    "name": "Crystal Protector",
    "rarity": "Epic",
    "id": "389"
  },
  {
    "name": "Devoured by Chaos",
    "rarity": "Epic",
    "id": "390"
  },
  {
    "name": "Dragonborn",
    "rarity": "Epic",
    "id": "391"
  },
  {
    "name": "Golden Golem",
    "rarity": "Epic",
    "id": "392"
  },
  {
    "name": "Golden Maiden",
    "rarity": "Epic",
    "id": "393"
  },
  {
    "name": "Herald of Damnation",
    "rarity": "Epic",
    "id": "394"
  },
  {
    "name": "Herald of the Curse",
    "rarity": "Epic",
    "id": "395"
  },
  {
    "name": "Infernal Hound",
    "rarity": "Epic",
    "id": "396"
  },
  {
    "name": "Infernal Knight",
    "rarity": "Epic",
    "id": "397"
  },
  {
    "name": "Kabuto",
    "rarity": "Epic",
    "id": "398"
  },
  {
    "name": "Krampus",
    "rarity": "Epic",
    "id": "399"
  },
  {
    "name": "Lava Golem",
    "rarity": "Epic",
    "id": "400"
  },
  {
    "name": "Lord of Sin",
    "rarity": "Epic",
    "id": "401"
  },
  {
    "name": "Marked by Uruk",
    "rarity": "Epic",
    "id": "402"
  },
  {
    "name": "Scarlet Hunter",
    "rarity": "Epic",
    "id": "403"
  },
  {
    "name": "Scarlet Zephyr",
    "rarity": "Epic",
    "id": "404"
  },
  {
    "name": "Swamp Monster",
    "rarity": "Epic",
    "id": "405"
  },
  {
    "name": "The Animal Within",
    "rarity": "Epic",
    "id": "406"
  },
  {
    "name": "The Dark Knight",
    "rarity": "Epic",
    "id": "407"
  },
  {
    "name": "The Hollow Warrior",
    "rarity": "Epic",
    "id": "408"
  },
  {
    "name": "Undead Berserker",
    "rarity": "Epic",
    "id": "409"
  },
  {
    "name": "Undead General",
    "rarity": "Epic",
    "id": "410"
  },
  {
    "name": "Uruk_s Disciple",
    "rarity": "Epic",
    "id": "411"
  },
  {
    "name": "Uruk_s Priest",
    "rarity": "Epic",
    "id": "412"
  },
  {
    "name": "Winter Defender",
    "rarity": "Epic",
    "id": "413"
  },
  {
    "name": "Ascendent Succubus",
    "rarity": "Legendary",
    "id": "414"
  },
  {
    "name": "Blades of Shadow",
    "rarity": "Legendary",
    "id": "415"
  },
  {
    "name": "Burned Mage",
    "rarity": "Legendary",
    "id": "416"
  },
  {
    "name": "Cherub",
    "rarity": "Legendary",
    "id": "417"
  },
  {
    "name": "Commander of Knights",
    "rarity": "Legendary",
    "id": "418"
  },
  {
    "name": "Crystal Protector",
    "rarity": "Legendary",
    "id": "419"
  },
  {
    "name": "Devoured by Chaos",
    "rarity": "Legendary",
    "id": "420"
  },
  {
    "name": "Dragonborn",
    "rarity": "Legendary",
    "id": "421"
  },
  {
    "name": "Golden Golem",
    "rarity": "Legendary",
    "id": "422"
  },
  {
    "name": "Golden Maiden",
    "rarity": "Legendary",
    "id": "423"
  },
  {
    "name": "Herald of Damnation",
    "rarity": "Legendary",
    "id": "424"
  },
  {
    "name": "Herald of the Curse",
    "rarity": "Legendary",
    "id": "425"
  },
  {
    "name": "Infernal Hound",
    "rarity": "Legendary",
    "id": "426"
  },
  {
    "name": "Infernal Knight",
    "rarity": "Legendary",
    "id": "427"
  },
  {
    "name": "Kabuto",
    "rarity": "Legendary",
    "id": "428"
  },
  {
    "name": "Krampus",
    "rarity": "Legendary",
    "id": "429"
  },
  {
    "name": "Lava Golem",
    "rarity": "Legendary",
    "id": "430"
  },
  {
    "name": "Lord of Sin",
    "rarity": "Legendary",
    "id": "431"
  },
  {
    "name": "Marked by Uruk",
    "rarity": "Legendary",
    "id": "432"
  },
  {
    "name": "Scarlet Hunter",
    "rarity": "Legendary",
    "id": "433"
  },
  {
    "name": "Scarlet Zephyr",
    "rarity": "Legendary",
    "id": "434"
  },
  {
    "name": "Swamp Monster",
    "rarity": "Legendary",
    "id": "435"
  },
  {
    "name": "The Animal Within",
    "rarity": "Legendary",
    "id": "436"
  },
  {
    "name": "The Dark Knight",
    "rarity": "Legendary",
    "id": "437"
  },
  {
    "name": "The Hollow Warrior",
    "rarity": "Legendary",
    "id": "438"
  },
  {
    "name": "Undead Berserker",
    "rarity": "Legendary",
    "id": "439"
  },
  {
    "name": "Undead General",
    "rarity": "Legendary",
    "id": "440"
  },
  {
    "name": "Uruk_s Disciple",
    "rarity": "Legendary",
    "id": "441"
  },
  {
    "name": "Uruk_s Priest",
    "rarity": "Legendary",
    "id": "442"
  },
  {
    "name": "Winter Defender",
    "rarity": "Legendary",
    "id": "443"
  },
  {
    "name": "Ascendent Succubus",
    "rarity": "Rare",
    "id": "444"
  },
  {
    "name": "Blades of Shadow",
    "rarity": "Rare",
    "id": "445"
  },
  {
    "name": "Burned Mage",
    "rarity": "Rare",
    "id": "446"
  },
  {
    "name": "Cherub",
    "rarity": "Rare",
    "id": "447"
  },
  {
    "name": "Commander of Knights",
    "rarity": "Rare",
    "id": "448"
  },
  {
    "name": "Crystal Protector",
    "rarity": "Rare",
    "id": "449"
  },
  {
    "name": "Devoured by Chaos",
    "rarity": "Rare",
    "id": "450"
  },
  {
    "name": "Dragonborn",
    "rarity": "Rare",
    "id": "451"
  },
  {
    "name": "Golden Golem",
    "rarity": "Rare",
    "id": "452"
  },
  {
    "name": "Golden Maiden",
    "rarity": "Rare",
    "id": "453"
  },
  {
    "name": "Herald of Damnation",
    "rarity": "Rare",
    "id": "454"
  },
  {
    "name": "Herald of the Curse",
    "rarity": "Rare",
    "id": "455"
  },
  {
    "name": "Infernal Hound",
    "rarity": "Rare",
    "id": "456"
  },
  {
    "name": "Infernal Knight",
    "rarity": "Rare",
    "id": "457"
  },
  {
    "name": "Kabuto",
    "rarity": "Rare",
    "id": "458"
  },
  {
    "name": "Krampus",
    "rarity": "Rare",
    "id": "459"
  },
  {
    "name": "Lava Golem",
    "rarity": "Rare",
    "id": "460"
  },
  {
    "name": "Lord of Sin",
    "rarity": "Rare",
    "id": "461"
  },
  {
    "name": "Marked by Uruk",
    "rarity": "Rare",
    "id": "462"
  },
  {
    "name": "Scarlet Hunter",
    "rarity": "Rare",
    "id": "463"
  },
  {
    "name": "Scarlet Zephyr",
    "rarity": "Rare",
    "id": "464"
  },
  {
    "name": "Swamp Monster",
    "rarity": "Rare",
    "id": "465"
  },
  {
    "name": "The Animal Within",
    "rarity": "Rare",
    "id": "466"
  },
  {
    "name": "The Dark Knight",
    "rarity": "Rare",
    "id": "467"
  },
  {
    "name": "The Hollow Warrior",
    "rarity": "Rare",
    "id": "468"
  },
  {
    "name": "Undead Berserker",
    "rarity": "Rare",
    "id": "469"
  },
  {
    "name": "Undead General",
    "rarity": "Rare",
    "id": "470"
  },
  {
    "name": "Uruk_s Disciple",
    "rarity": "Rare",
    "id": "471"
  },
  {
    "name": "Uruk_s Priest",
    "rarity": "Rare",
    "id": "472"
  },
  {
    "name": "Winter Defender",
    "rarity": "Rare",
    "id": "473"
  }
];

const rarityCounts = {
  Common: 28,
  Rare: 16,
  Epic: 4,
  Legendary: 2
};

const imagesPath = path.join(process.cwd(), 'images.json');
const images = JSON.parse(await fs.promises.readFile(imagesPath, 'utf8'))

const generateMetadata = (template, images, counts) => {
  let metadata = [];

  for (const nft of template) {
    console.log(nft);
    //console.log(template);
    const searchTerm = `Etherlink ${nft.rarity} ${nft.name}.png`
    const match = images.find((entry => entry.file === searchTerm));

    if (!match) {
      console.error(`No match found for ${searchTerm}`);
      return null;
    }

    console.log(`Found URI for ${nft.name}: ${match.uri}`);

    for (let x = 0; x < rarityCounts[nft.rarity]; x++) {
      metadata.push({
        name: `${nft.name}`,
        description: "We need a description here",
        image: `${match.uri}`,
        attributes: [
          { trait_type: "Rarity", value: nft.rarity },
          { trait_type: "ID", value: nft.id }
        ]
      });
    }
  }
  //const imageBaseUrl = "ipfs://QmfAA9HM9FrtAYM7AmHNCVneYp7sqoMyWWsryab8hCXCaC/";

  // Group templates by rarity
  /*const templatesByRarity = template.reduce((acc, item) => {
    acc[item.rarity] = acc[item.rarity] || [];
    acc[item.rarity].push(item);
    return acc;
  }, {});
  
  Object.entries(counts).forEach(([rarity, count]) => {
    const templates = templatesByRarity[rarity] || [];
    const templateCount = templates.length;

    /*for (let i = 0; i < count; i++) {
      const template = templates[i % templateCount];
      metadata.push({
        name: `${template.name}`,
        description: "Some description",
        image: 'ipfs://QmfAA9HM9FrtAYM7AmHNCVneYp7sqoMyWWsryab8hCXCaC/0.png',
        attributes: [
          { trait_type: "Rarity", value: rarity }
        ]
      });
    }*/
  /*for (let x = 0; x < templateCount; x++) {
   const template = templates[x % templateCount];
     for (let i = 0; i < count; i++) {
       metadata.push({
         name: `${template.name}`,
         description: "We need a description here",
         image: `${template.uri}`,
         attributes: [
           { trait_type: "Rarity", value: rarity },
           { trait_type: "ID", value: template.id }
         ]
       });
     }
   }*/
  return metadata;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};


const outputDir = "metadataEtherlink";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create individual JSON files
const createMetadataFiles = (metadata) => {
  metadata.forEach((item, index) => {
    const filePath = path.join(outputDir, `${index}`);
    fs.writeFile(filePath, JSON.stringify(item, null, 2), (err) => {
      if (err) {
        console.error(`Error writing file for index ${index}:`, err);
      } else {
        console.log(`Metadata file created: ${filePath}`);
      }
    });
  });
};

// Generate metadata
let collectionMetadata = generateMetadata(metadataTemplate, images, rarityCounts);

// Shuffle the metadata array
collectionMetadata = shuffleArray(collectionMetadata);

// Create individual files for each NFT
createMetadataFiles(collectionMetadata);

// Write to a JSON file
/*const filePath = 'src/scripts/metadata.json';

fs.writeFile(filePath, JSON.stringify(collectionMetadata, null, 2), (err) => {
  if (err) {
    console.error('Error writing metadata to file:', err);
  } else {
    console.log(`Metadata successfully written to ${filePath}`);
  }
});*/