// Each prompt lists valid answers from most common to rarest.
// A slash separates accepted spellings of the same answer ("usa/united states").
// Position in the list decides the depth tier, so order matters.

export type Pack = "animals" | "food" | "places" | "science" | "sports" | "everyday" | "words";

export type Prompt = {
  id: string;
  pack: Pack;
  text: string;
  answers: string;
};

export const PACKS: { id: Pack; name: string; blurb: string }[] = [
  { id: "animals", name: "Animals", blurb: "Beasts, birds and bugs" },
  { id: "food", name: "Food & drink", blurb: "Things you can eat or sip" },
  { id: "places", name: "Places", blurb: "Countries, cities, landmarks" },
  { id: "science", name: "Science", blurb: "Elements, planets, the body" },
  { id: "sports", name: "Sports & games", blurb: "Play, compete, win" },
  { id: "everyday", name: "Everyday things", blurb: "Stuff around the house" },
  { id: "words", name: "Words", blurb: "Letters, sounds and spelling" },
];

export const PROMPTS: Prompt[] = [
  // Animals
  {
    id: "ocean-animals",
    pack: "animals",
    text: "Name an animal that lives in the ocean",
    answers:
      "shark, whale, dolphin, octopus, jellyfish, fish, seal, sea turtle/turtle, crab, starfish/sea star, squid, orca/killer whale, lobster, clownfish, stingray/ray, seahorse, eel, shrimp, sea urchin, sea lion, walrus, manatee, tuna, blue whale, humpback whale, narwhal, pufferfish/blowfish, swordfish, manta ray, coral, sea otter, hammerhead, anglerfish, barracuda, clam, oyster, mussel, sea cucumber, sponge, beluga, great white, marlin, sardine, cod, halibut, anemone/sea anemone, krill, plankton, lionfish, moray eel, nautilus, cuttlefish, sperm whale, dugong, sunfish/mola, flounder, grouper, triggerfish, sea slug/nudibranch, horseshoe crab, barnacle, isopod, vampire squid, oarfish, sea pen, sea butterfly, lanternfish, goblin shark, frilled shark, sea spider",
  },
  {
    id: "farm-animals",
    pack: "animals",
    text: "Name an animal you'd see on a farm",
    answers:
      "cow, pig, chicken, horse, sheep, goat, duck, dog, cat, rooster, turkey, donkey, goose, mouse, rabbit, llama, alpaca, bull, lamb, pony, mule, hen, calf, ox, piglet, chick, rat, barn owl/owl, bee, peacock, guinea fowl, quail, emu, ostrich, water buffalo/buffalo, yak, ferret, pheasant, bison, pigeon, swallow, fox, crow, mole, snake, spider, fly, worm, beetle, zebu, capybara, guinea pig",
  },
  {
    id: "birds",
    pack: "animals",
    text: "Name a bird",
    answers:
      "eagle, robin, parrot, owl, penguin, crow, pigeon, flamingo, sparrow, blue jay, hawk, cardinal, duck, chicken, ostrich, hummingbird, peacock, seagull/gull, swan, falcon, pelican, toucan, woodpecker, goose, turkey, vulture, raven, emu, bald eagle, canary, dove, stork, heron, crane, kiwi, magpie, finch, parakeet/budgie, cockatoo, macaw, albatross, puffin, kingfisher, starling, condor, osprey, quail, pheasant, roadrunner, oriole, wren, swallow, lark, nightingale, cuckoo, egret, ibis, loon, mockingbird, chickadee, bluebird, cassowary, kookaburra, hornbill, shoebill, lyrebird, bowerbird, secretary bird, kakapo, dodo, frigatebird, booby, tern, sandpiper, plover, grebe, nuthatch, tanager, waxwing, bittern, hoopoe",
  },
  {
    id: "insects",
    pack: "animals",
    text: "Name a creepy crawly",
    answers:
      "ant, bee, butterfly, spider, fly, mosquito, ladybug, beetle, grasshopper, cockroach/roach, moth, dragonfly, wasp, caterpillar, cricket, firefly, termite, flea, tick, praying mantis/mantis, hornet, stink bug, centipede, millipede, worm, bumblebee, gnat, cicada, earwig, louse/lice, scorpion, silverfish, aphid, bed bug, fruit fly, horsefly, walking stick/stick insect, weevil, locust, katydid, damselfly, dung beetle, june bug, mayfly, lacewing, water strider, pill bug/roly poly, stag beetle, firebrat, thrips, leafhopper, cochineal, hercules beetle, atlas moth, bullet ant, tarantula hawk",
  },
  {
    id: "pets",
    pack: "animals",
    text: "Name an animal people keep as a pet",
    answers:
      "dog, cat, fish, hamster, rabbit/bunny, bird, guinea pig, turtle, snake, parrot, goldfish, lizard, mouse, ferret, rat, horse, gerbil, bearded dragon, hedgehog, chinchilla, frog, tortoise, gecko, iguana, spider/tarantula, pig, chicken, budgie/parakeet, canary, axolotl, hermit crab, cockatiel, sugar glider, duck, goat, betta fish/betta, chameleon, snail, degu, stick insect, scorpion, rabbit, monkey, pony, alpaca, cockroach, koi, sea monkey, skunk, fox, quail, millipede",
  },

  // Food
  {
    id: "fruits",
    pack: "food",
    text: "Name a fruit",
    answers:
      "apple, banana, orange, strawberry, grape, watermelon, mango, pineapple, blueberry, peach, pear, cherry, kiwi, lemon, raspberry, plum, lime, pomegranate, coconut, grapefruit, cantaloupe, blackberry, apricot, papaya, tomato, avocado, fig, nectarine, dragon fruit, passion fruit, honeydew, cranberry, tangerine, clementine, date, guava, lychee, persimmon, star fruit, jackfruit, durian, mulberry, gooseberry, kumquat, quince, elderberry, boysenberry, currant, olive, plantain, rambutan, mangosteen, loquat, pawpaw, salak, feijoa, soursop, cherimoya, jabuticaba, yuzu, bergamot, ugli fruit, medlar, sapodilla",
  },
  {
    id: "vegetables",
    pack: "food",
    text: "Name a vegetable kids refuse to eat",
    answers:
      "carrot, broccoli, potato, lettuce, spinach, corn, onion, cucumber, tomato, celery, pepper/bell pepper, green bean, pea, cabbage, cauliflower, zucchini, kale, asparagus, sweet potato, mushroom, garlic, eggplant, brussels sprout, radish, beet, squash, pumpkin, artichoke, leek, turnip, okra, bok choy, arugula, parsnip, yam, chard/swiss chard, bean sprout, collard greens, fennel, shallot, jalapeno, rutabaga, kohlrabi, watercress, endive, jicama, daikon, taro, cassava, celeriac, rhubarb, edamame, chayote, romanesco, radicchio, salsify, fiddlehead, lotus root, burdock",
  },
  {
    id: "pizza-toppings",
    pack: "food",
    text: "Name a pizza topping",
    answers:
      "pepperoni, cheese, mushroom, sausage, pineapple, olive, onion, bacon, ham, green pepper/pepper, chicken, spinach, tomato, jalapeno, anchovy, basil, mozzarella, ground beef/beef, salami, garlic, bbq chicken, red onion, feta, artichoke, meatball, parmesan, broccoli, arugula, prosciutto, egg, corn, ricotta, goat cheese, sun dried tomato, shrimp, tuna, chorizo, banana pepper, zucchini, eggplant, capers, pesto, buffalo chicken, pickles, potato, fig, honey, truffle, kale, clams, gorgonzola, hot honey, kimchi, pear, duck",
  },
  {
    id: "breakfast",
    pack: "food",
    text: "Name something you'd eat for breakfast",
    answers:
      "eggs, pancakes, cereal, bacon, toast, waffles, oatmeal, french toast, sausage, yogurt, bagel, fruit, muffin, hash browns, omelette, cinnamon roll, croissant, smoothie, granola, donut, breakfast burrito, grits, biscuits, avocado toast, porridge, scrambled eggs, crepes, english muffin, sandwich, pop tart, eggs benedict, banana, coffee cake, quiche, bread, ham, danish, scone, congee, chilaquiles, shakshuka, huevos rancheros, kippers, black pudding, beans, dosa, idli, paratha, dim sum, miso soup, natto, arepa, menemen, kedgeree, poha",
  },
  {
    id: "desserts",
    pack: "food",
    text: "Name a dessert",
    answers:
      "cake, ice cream, cookie, brownie, pie, cupcake, cheesecake, pudding, donut, apple pie, chocolate, tiramisu, cobbler, sundae, macaron, creme brulee, mousse, jello, churro, cannoli, fudge, milkshake, banana split, eclair, pavlova, flan, gelato, sorbet, key lime pie, lava cake, cinnamon roll, trifle, baklava, strudel, panna cotta, souffle, parfait, crepe, mochi, popsicle, custard, bread pudding, snickerdoodle, blondie, s'mores, profiterole, rice pudding, tres leches, baked alaska, gulab jamun, halo halo, knafeh, galette, clafoutis, zabaglione, sticky toffee pudding, spotted dick, kulfi, affogato, semifreddo, frangipane, mille feuille",
  },
  {
    id: "cheeses",
    pack: "food",
    text: "Name a cheese",
    answers:
      "cheddar, mozzarella, swiss, parmesan, american, brie, gouda, provolone, feta, pepper jack, blue cheese, cream cheese, colby jack/colby, goat cheese, ricotta, monterey jack, camembert, havarti, muenster, cottage cheese, gruyere, string cheese, manchego, asiago, gorgonzola, burrata, mascarpone, halloumi, romano, stilton, roquefort, emmental, edam, queso fresco, paneer, fontina, limburger, jarlsberg, brick cheese, cotija, oaxaca, pecorino, taleggio, raclette, comte, wensleydale, gjetost/brunost, epoisses, reblochon, casu marzu, stinking bishop, vacherin, mimolette, leerdammer, tilsit, caciocavallo",
  },
  {
    id: "drinks",
    pack: "food",
    text: "Name something to drink (no alcohol)",
    answers:
      "water, coffee, tea, milk, orange juice, soda, lemonade, apple juice, hot chocolate, juice, iced tea, smoothie, milkshake, coke/cola, sprite, root beer, gatorade, sparkling water, energy drink, chocolate milk, boba/bubble tea, coconut water, ginger ale, kombucha, latte, espresso, cappuccino, fruit punch, grape juice, cranberry juice, dr pepper, mountain dew, chai, matcha, horchata, eggnog, tonic water, cream soda, lassi, cider, kefir, mate/yerba mate, agua fresca, arnold palmer, ayran, sweet tea, cold brew, frappuccino, tomato juice, prune juice, sarsaparilla, birch beer, kvass, thai iced tea, amazake, sikhye, barley tea, chicha morada",
  },

  // Places
  {
    id: "countries-europe",
    pack: "places",
    text: "Name a country in Europe",
    answers:
      "france, germany, italy, spain, england/uk/united kingdom, portugal, greece, ireland, switzerland, netherlands/holland, sweden, norway, poland, belgium, austria, denmark, russia, finland, ukraine, iceland, scotland, croatia, czech republic/czechia, hungary, romania, turkey, wales, serbia, bulgaria, luxembourg, monaco, slovakia, slovenia, albania, lithuania, latvia, estonia, belarus, bosnia, montenegro, malta, moldova, north macedonia/macedonia, cyprus, andorra, liechtenstein, san marino, vatican city/vatican, kosovo, georgia, armenia, azerbaijan",
  },
  {
    id: "countries-africa",
    pack: "places",
    text: "Name a country in Africa",
    answers:
      "egypt, south africa, nigeria, kenya, morocco, ethiopia, ghana, madagascar, congo, algeria, sudan, somalia, tanzania, uganda, zimbabwe, libya, tunisia, rwanda, senegal, cameroon, angola, mali, namibia, botswana, zambia, ivory coast/cote d'ivoire, mozambique, niger, chad, liberia, sierra leone, south sudan, eritrea, malawi, burkina faso, guinea, benin, togo, gabon, mauritania, lesotho, eswatini/swaziland, djibouti, gambia, burundi, cape verde, mauritius, seychelles, comoros, equatorial guinea, guinea bissau, central african republic, sao tome",
  },
  {
    id: "us-states",
    pack: "places",
    text: "Name a US state",
    answers:
      "california, texas, florida, new york, hawaii, alaska, washington, ohio, arizona, nevada, colorado, georgia, illinois, michigan, oregon, pennsylvania, virginia, massachusetts, new jersey, north carolina, tennessee, utah, louisiana, kentucky, alabama, south carolina, minnesota, wisconsin, indiana, missouri, oklahoma, maine, maryland, idaho, kansas, iowa, montana, new mexico, mississippi, arkansas, nebraska, connecticut, vermont, west virginia, new hampshire, rhode island, wyoming, delaware, south dakota, north dakota",
  },
  {
    id: "capitals",
    pack: "places",
    text: "Name a capital city",
    answers:
      "london, paris, washington dc/washington, tokyo, rome, berlin, madrid, beijing, moscow, ottawa, canberra, cairo, mexico city, athens, dublin, lisbon, seoul, amsterdam, vienna, brussels, stockholm, oslo, copenhagen, bangkok, new delhi/delhi, buenos aires, brasilia, lima, helsinki, prague, warsaw, budapest, nairobi, ankara, tehran, baghdad, jakarta, manila, hanoi, havana, santiago, bogota, caracas, kyiv/kiev, bern, reykjavik, wellington, singapore, kuala lumpur, riyadh, doha, abu dhabi, islamabad, kabul, dhaka, kathmandu, colombo, quito, montevideo, asuncion, la paz, addis ababa, accra, abuja, dakar, rabat, tunis, algiers, tbilisi, yerevan, baku, tashkent, astana, ulaanbaatar, thimphu, vientiane, phnom penh, naypyidaw, suva, port moresby, valletta, vaduz, andorra la vella, ljubljana, bratislava, vilnius, riga, tallinn, chisinau, skopje, tirana, podgorica, sarajevo",
  },
  {
    id: "landmarks",
    pack: "places",
    text: "Name a landmark people travel to see",
    answers:
      "eiffel tower, statue of liberty, great wall of china/great wall, pyramids/pyramids of giza, taj mahal, colosseum, big ben, mount rushmore, golden gate bridge, grand canyon, leaning tower of pisa, sydney opera house, stonehenge, machu picchu, christ the redeemer, empire state building, niagara falls, mount everest, burj khalifa, times square, white house, acropolis/parthenon, sphinx, petra, angkor wat, buckingham palace, louvre, space needle, hollywood sign, kremlin, sagrada familia, chichen itza, mount fuji, arc de triomphe, tower bridge, notre dame, gateway arch, brandenburg gate, cn tower, alcatraz, easter island/moai, forbidden city, neuschwanstein castle, great barrier reef, victoria falls, uluru, hagia sophia, trevi fountain, lincoln memorial, london eye, st peters basilica, palace of versailles/versailles, mont saint michel, alhambra, blue mosque, golden temple, borobudur, tikal, meteora, pamukkale, hallgrimskirkja, shwedagon pagoda, potala palace",
  },
  {
    id: "rivers",
    pack: "places",
    text: "Name a river",
    answers:
      "nile, amazon, mississippi, thames, colorado, yangtze, danube, rhine, ganges, hudson, missouri, seine, rio grande, ohio, volga, mekong, tigris, euphrates, jordan, congo, st lawrence, columbia, yellow river/huang he, niger, zambezi, tiber, potomac, delaware, snake, murray, indus, loire, elbe, arkansas, tennessee, charles, chicago river, yukon, mackenzie, orinoco, parana, ob, lena, yenisei, amur, brahmaputra, irrawaddy, po, dnieper, ural, shannon, severn, tagus, douro, ebro, rhone, oder, vistula, limpopo, orange river, salween, darling, fraser, platte, susquehanna, sacramento",
  },

  // Science
  {
    id: "elements",
    pack: "science",
    text: "Name an element on the periodic table",
    answers:
      "oxygen, hydrogen, carbon, gold, iron, helium, nitrogen, silver, sodium, copper, calcium, lead, aluminum/aluminium, neon, uranium, chlorine, zinc, potassium, mercury, magnesium, platinum, lithium, sulfur, tin, silicon, nickel, titanium, fluorine, phosphorus, argon, iodine, plutonium, cobalt, radon, radium, boron, tungsten, chromium, manganese, beryllium, krypton, xenon, bromine, arsenic, barium, cesium/caesium, francium, strontium, palladium, cadmium, bismuth, selenium, gallium, germanium, polonium, thorium, vanadium, zirconium, osmium, iridium, rhodium, indium, antimony, tellurium, molybdenum, scandium, yttrium, lanthanum, cerium, neodymium, europium, gadolinium, einsteinium, americium, californium, nobelium, lawrencium, rutherfordium, dubnium, seaborgium, bohrium, hassium, meitnerium, darmstadtium, roentgenium, copernicium, nihonium, flerovium, moscovium, livermorium, tennessine, oganesson, praseodymium, promethium, samarium, terbium, dysprosium, holmium, erbium, thulium, ytterbium, lutetium, hafnium, tantalum, rhenium, thallium, astatine, actinium, protactinium, neptunium, curium, berkelium, fermium, mendelevium, technetium, ruthenium, niobium, rubidium",
  },
  {
    id: "body-parts",
    pack: "science",
    text: "Name a part of the body",
    answers:
      "heart, hand, arm, leg, head, eye, nose, foot, brain, finger, mouth, ear, knee, lung, stomach, toe, elbow, shoulder, liver, kidney, hair, neck, teeth/tooth, tongue, skin, chest, back, lips, chin, ankle, wrist, hip, thumb, nail, eyebrow, cheek, forehead, bone, skull, rib, spine, intestine, bladder, pancreas, thigh, calf, heel, knuckle, belly button/navel, eyelash, jaw, throat, spleen, appendix, gallbladder, femur, tibia, esophagus, diaphragm, pelvis, collarbone/clavicle, tendon, cartilage, uvula, cornea, retina, pupil, iris, eardrum, cochlea, tonsils, thyroid, larynx, trachea, sternum, patella, scapula, fibula, ulna, radius, humerus, coccyx, hypothalamus, cerebellum, hippocampus, medulla, philtrum, lunula, septum",
  },
  {
    id: "space",
    pack: "science",
    text: "Name something you'd find in outer space",
    answers:
      "star, planet, moon, sun, asteroid, comet, black hole, galaxy, meteor, satellite, mars, earth, jupiter, saturn, nebula, astronaut, space station, alien, rocket, milky way, venus, mercury, neptune, uranus, pluto, meteorite, constellation, supernova, dust, dwarf planet, space junk/debris, quasar, pulsar, neutron star, white dwarf, red giant, wormhole, dark matter, cosmic rays, solar wind, exoplanet, kuiper belt, oort cloud, asteroid belt, andromeda, ceres, europa, titan, io, ganymede, phobos, hubble, voyager, radiation, vacuum, gamma ray burst, magnetar, brown dwarf, protostar, accretion disk, event horizon, eris, makemake, haumea, sedna, enceladus, triton, charon",
  },
  {
    id: "dinosaurs",
    pack: "science",
    text: "Name a dinosaur or prehistoric creature",
    answers:
      "t rex/tyrannosaurus/tyrannosaurus rex, triceratops, velociraptor/raptor, stegosaurus, brachiosaurus, pterodactyl, spinosaurus, ankylosaurus, diplodocus, brontosaurus, mammoth, allosaurus, parasaurolophus, pachycephalosaurus, dilophosaurus, saber tooth tiger/smilodon, megalodon, apatosaurus, iguanodon, mosasaurus, plesiosaur, carnotaurus, gallimimus, compsognathus, archaeopteryx, giganotosaurus, pteranodon, dimetrodon, therizinosaurus, utahraptor, deinonychus, oviraptor, baryonyx, microraptor, argentinosaurus, quetzalcoatlus, ichthyosaur, trilobite, dodo, mastodon, woolly rhino, dunkleosteus, protoceratops, maiasaura, edmontosaurus, styracosaurus, amargasaurus, kentrosaurus, troodon, coelophysis, herrerasaurus, eoraptor, suchomimus, ceratosaurus, megalosaurus, sauropelta, nodosaurus, anomalocaris, titanoboa, glyptodon, megatherium, andrewsarchus, hallucigenia",
  },
  {
    id: "weather",
    pack: "science",
    text: "Name a type of weather",
    answers:
      "rain, snow, sunny, cloudy, windy, thunderstorm/storm, hail, fog, tornado, hurricane, sleet, lightning, thunder, drizzle, blizzard, humid, heat wave, frost, mist, overcast, rainbow, monsoon, typhoon, cyclone, drought, dust storm/sandstorm, freezing rain, ice storm, flurries, breeze, gale, haze, smog, dew, partly cloudy, downpour, flood, whiteout, derecho, squall, microburst, waterspout, graupel, virga, sun shower, chinook, haboob, polar vortex, nor'easter, sirocco, mistral, bora, diamond dust, petrichor",
  },

  // Sports
  {
    id: "sports",
    pack: "sports",
    text: "Name a sport",
    answers:
      "soccer/football, basketball, baseball, tennis, american football, hockey/ice hockey, golf, volleyball, swimming, boxing, cricket, rugby, track, wrestling, gymnastics, lacrosse, badminton, softball, table tennis/ping pong, skiing, snowboarding, surfing, skateboarding, cycling, bowling, fencing, archery, karate, mma, rowing, water polo, handball, field hockey, figure skating, curling, polo, squash, diving, equestrian, judo, taekwondo, triathlon, pickleball, dodgeball, ultimate frisbee, bobsled, luge, skeleton, biathlon, sailing, kayaking, rock climbing, darts, snooker, billiards/pool, netball, kabaddi, sepak takraw, hurling, jai alai, korfball, bandy, underwater hockey, bossaball, sumo, cornhole, hacky sack",
  },
  {
    id: "board-games",
    pack: "sports",
    text: "Name a board game",
    answers:
      "monopoly, chess, checkers, scrabble, clue/cluedo, sorry, candy land, risk, the game of life/life, battleship, trouble, connect four, catan/settlers of catan, operation, guess who, backgammon, go, mouse trap, chutes and ladders/snakes and ladders, pictionary, trivial pursuit, stratego, ticket to ride, mancala, othello, parcheesi/ludo, yahtzee, jenga, boggle, pandemic, codenames, carcassonne, chinese checkers, taboo, cranium, apples to apples, hungry hungry hippos, axis and allies, dominion, azul, splendor, wingspan, gloomhaven, mahjong, shogi, xiangqi, agricola, puerto rico, twilight struggle, terraforming mars, root, scythe, diplomacy, hive, blokus, quoridor, onitama, tak, hnefatafl, nine men's morris, pente",
  },
  {
    id: "olympic",
    pack: "sports",
    text: "Name an Olympic event",
    answers:
      "swimming, gymnastics, track, 100m/100 meter dash, diving, basketball, soccer, volleyball, boxing, wrestling, figure skating, hockey, skiing, snowboarding, marathon, long jump, high jump, pole vault, javelin, shot put, discus, hurdles, relay, fencing, archery, cycling, rowing, tennis, beach volleyball, bobsled, luge, curling, speed skating, weightlifting, judo, taekwondo, triathlon, water polo, equestrian, shooting, sailing, canoe, kayak, table tennis, badminton, handball, golf, rugby sevens, surfing, skateboarding, sport climbing, breaking, synchronized swimming/artistic swimming, trampoline, rhythmic gymnastics, decathlon, heptathlon, hammer throw, triple jump, steeplechase, modern pentathlon, biathlon, skeleton, ski jumping, nordic combined, moguls, slalom, halfpipe, race walking, keirin, omnium, madison",
  },

  // Everyday
  {
    id: "kitchen",
    pack: "everyday",
    text: "Name something you'd find in a kitchen",
    answers:
      "fridge/refrigerator, stove, oven, microwave, sink, knife, spoon, fork, plate, cup, bowl, toaster, pan, pot, dishwasher, blender, spatula, cutting board, kettle, coffee maker, table, chair, cabinet, freezer, mug, glass, napkin, oven mitt, whisk, ladle, colander, grater, can opener, measuring cup, rolling pin, tongs, peeler, apron, paper towel, trash can, sponge, dish soap, timer, mixer, air fryer, slow cooker/crock pot, cookbook, tupperware, foil, cling wrap, baking sheet, wok, mortar and pestle, salad spinner, zester, mandoline, pastry brush, garlic press, sieve, funnel, skillet, dutch oven, trivet, butter dish, bread box, spice rack, lazy susan, ramekin, cheesecloth, baster, bench scraper",
  },
  {
    id: "school",
    pack: "everyday",
    text: "Name something you'd find at school",
    answers:
      "desk, teacher, pencil, book, whiteboard, chair, student, backpack, locker, paper, chalkboard, pen, eraser, computer, notebook, ruler, principal, cafeteria, gym, library, clock, calculator, scissors, glue, marker, crayon, flag, map, globe, bus, projector, homework, textbook, stapler, bell, bathroom, hallway, playground, nurse, janitor, binder, folder, highlighter, lunchbox, trophy, microscope, poster, bulletin board, water fountain, pencil sharpener, lab, auditorium, fire alarm, tape, protractor, compass, bleachers, hall pass, lost and found, detention, tardy slip, periodic table, beaker, bunsen burner, yearbook, scantron, mascot",
  },
  {
    id: "clothing",
    pack: "everyday",
    text: "Name something you can wear",
    answers:
      "shirt, pants, socks, shoes, jacket, hat, dress, skirt, sweater, shorts, hoodie, jeans, t shirt, coat, underwear, scarf, gloves, boots, tie, belt, sweatpants, leggings, pajamas, bra, vest, blouse, suit, sandals, sneakers, beanie, cardigan, tank top, swimsuit, mittens, overalls, robe, polo, blazer, flip flops, jumpsuit, romper, tuxedo, poncho, kimono, sari, turtleneck, cap, bow tie, apron, cape, tights, crop top, windbreaker, parka, slippers, loafers, heels, onesie, kilt, sarong, toga, fedora, beret, bandana, suspenders, corset, tunic, caftan, dashiki, hanbok, cummerbund, ascot, balaclava, spats, jodhpurs",
  },
  {
    id: "instruments",
    pack: "everyday",
    text: "Name a musical instrument",
    answers:
      "guitar, piano, drums, violin, flute, trumpet, saxophone, clarinet, cello, bass, harp, ukulele, trombone, keyboard, harmonica, tuba, xylophone, banjo, accordion, french horn, oboe, tambourine, recorder, viola, bagpipes, triangle, organ, cymbals, bongos, bassoon, mandolin, synthesizer, electric guitar, harpsichord, piccolo, maracas, glockenspiel, kazoo, sitar, marimba, didgeridoo, steel drum, cowbell, castanets, lute, timpani, double bass, kalimba, tabla, erhu, koto, shamisen, balalaika, bouzouki, theremin, hurdy gurdy, zither, dulcimer, ocarina, sousaphone, euphonium, cornet, flugelhorn, djembe, cajon, gong, oud, kora, hang drum/handpan, celesta, bandoneon, nyckelharpa",
  },
  {
    id: "jobs",
    pack: "everyday",
    text: "Name a job",
    answers:
      "doctor, teacher, nurse, firefighter, police officer/cop, lawyer, chef, engineer, dentist, pilot, farmer, scientist, artist, programmer/software engineer, accountant, mechanic, cashier, waiter/waitress/server, plumber, electrician, veterinarian/vet, construction worker, astronaut, actor, singer, writer/author, architect, pharmacist, janitor, mail carrier/mailman, baker, carpenter, judge, surgeon, soldier, banker, barber, hairdresser, librarian, photographer, journalist, therapist, designer, truck driver, athlete, lifeguard, dj, zookeeper, florist, tailor, butcher, welder, plumber, locksmith, paramedic, psychologist, translator, economist, geologist, archaeologist, sommelier, actuary, cartographer, taxidermist, farrier, cooper, chandler, luthier, ombudsman, stenographer, glazier, falconer, embalmer, horologist",
  },
  {
    id: "colors",
    pack: "everyday",
    text: "Name a color",
    answers:
      "red, blue, green, yellow, purple, orange, pink, black, white, brown, gray/grey, teal, turquoise, magenta, maroon, navy, gold, silver, violet, indigo, cyan, lavender, beige, tan, lime, coral, peach, cream, burgundy, mint, olive, crimson, scarlet, aqua, lilac, salmon, mauve, rust, emerald, sapphire, ruby, amber, bronze, charcoal, ivory, khaki, fuchsia, periwinkle, chartreuse, taupe, ochre, sienna, vermilion, cerulean, cobalt, mustard, plum, sepia, umber, puce, celadon, viridian, heliotrope, gamboge, smaragdine, wenge, falu red, glaucous, xanadu, zaffre",
  },
  {
    id: "bathroom",
    pack: "everyday",
    text: "Name something in a bathroom",
    answers:
      "toilet, sink, shower, bathtub, toothbrush, toothpaste, towel, soap, mirror, toilet paper, shampoo, conditioner, comb, brush, razor, deodorant, floss, mouthwash, plunger, trash can, rug/bath mat, shower curtain, lotion, hair dryer, cabinet, scale, faucet, loofah, body wash, cotton swabs/q tips, cotton balls, tissues, nail clippers, tweezers, makeup, perfume, cologne, sponge, toilet brush, air freshener, candle, bidet, towel rack, drain, hand sanitizer, shaving cream, face wash, sunscreen, bath bomb, rubber duck, pumice stone, squeegee, exhaust fan, grout, caulk, bath salts, loofah, tongue scraper, waterpik",
  },

  // Words
  {
    id: "words-q",
    pack: "words",
    text: "Name a word that starts with Q",
    answers:
      "queen, quiet, quick, question, quilt, quit, quarter, quite, quiz, quack, quail, quality, quote, queue, quest, quarrel, quench, quirky, quartz, quarantine, quiver, quaint, quake, quantum, quantity, quarry, query, quibble, quiche, quill, quinoa, quota, quotient, quasar, quadrant, quadrilateral, quagmire, qualm, quandary, quark, quash, queasy, quell, quietude, quintessential, quintet, quip, quirk, quixotic, quorum, quokka, quetzal, quahog, quaff, quiescent, quidnunc, quisling, quincunx, quoin, quotidian",
  },
  {
    id: "words-x",
    pack: "words",
    text: "Name a word with an X in it",
    answers:
      "box, fox, six, fix, mix, tax, wax, taxi, next, text, sixty, extra, exit, exam, example, excited, expert, explain, oxygen, xylophone, x ray, relax, index, complex, galaxy, toxic, boxer, mixer, axe, flex, lynx, sphinx, onyx, climax, detox, saxophone, luxury, anxiety, exotic, maximum, taxidermy, xenophobia, paradox, syntax, suffix, prefix, vortex, apex, annex, hoax, jinx, coax, pixel, vixen, axolotl, xenon, xerox, xylem, flux, calyx, borax, larynx, pharynx, oryx, ibex, phlox, exegesis, xeric, xanthic, xiphoid",
  },
  {
    id: "rhymes-cat",
    pack: "words",
    text: "Name a word that rhymes with CAT",
    answers:
      "hat, bat, rat, mat, sat, fat, pat, that, chat, flat, splat, vat, brat, spat, gnat, slat, drat, scat, at, tat, acrobat, format, combat, habitat, doormat, laundromat, diplomat, aristocrat, democrat, thermostat, wombat, hazmat, cravat, begat, caveat, dingbat, fiat, nougat, sprat, frat, plat, stat, tomcat, bobcat, polecat, copycat, fruit bat, welcome mat, top hat, format, spermaceti, ziggurat, autocrat, bureaucrat, technocrat, plutocrat, apparat, samizdat",
  },
  {
    id: "compound-sun",
    pack: "words",
    text: "Name a word that starts with SUN",
    answers:
      "sunflower, sunshine, sunglasses, sunset, sunrise, sunburn, sunday, sunscreen, sunny, sundae, sunlight, sundown, sunbathe, sunroof, sunblock, sunspot, sundial, sunbeam, suntan, sunken, sunk, sunstroke, sundry, sunfish, sunlit, sunroom, sundress, sunhat, sunbird, sunder, sunlamp, sunporch, sunup, sunbelt, sunshade, sunbonnet, sunrise industry, sunstone, sundew, sunward, sunna, sunnah, sunnite",
  },
  // ---- Expansion so every pack has enough prompts for chapters ----

  // Animals
  {
    id: "jungle-animals",
    pack: "animals",
    text: "Name an animal that lives in the rainforest",
    answers:
      "monkey, jaguar, parrot, sloth, toucan, snake, frog, gorilla, tiger, orangutan, chimpanzee, anaconda, tree frog/poison dart frog, leopard, macaw, lemur, boa, iguana, chameleon, tapir, capybara, ocelot, spider monkey, howler monkey, bat, ant, butterfly, gecko, okapi, bonobo, kinkajou, coati, piranha, caiman, harpy eagle, hornbill, cassowary, pangolin, binturong, tarsier, slow loris, quetzal, agouti, peccary, bushmaster, glass frog, hoatzin, saki, tamarin, marmoset",
  },
  {
    id: "big-animals",
    pack: "animals",
    text: "Name an animal bigger than you",
    answers:
      "elephant, giraffe, whale, horse, hippo, rhino, bear, cow, shark, moose, gorilla, crocodile, camel, polar bear, bison, buffalo, grizzly bear, walrus, tiger, lion, orca, dolphin, alligator, elk, ostrich, yak, zebra, manatee, giant squid, anaconda, komodo dragon, sea lion, elephant seal, okapi, tapir, wildebeest, kudu, eland, manta ray, sunfish, whale shark, leatherback turtle, musk ox, water buffalo, gaur, beluga, narwhal, dugong, saltwater crocodile",
  },
  {
    id: "dog-breeds",
    pack: "animals",
    text: "Name a dog breed",
    answers:
      "golden retriever, labrador/lab, german shepherd, poodle, bulldog, beagle, chihuahua, husky, pug, dachshund, corgi, rottweiler, pit bull, boxer, shih tzu, border collie, great dane, yorkie/yorkshire terrier, pomeranian, doberman, french bulldog, dalmatian, maltese, cocker spaniel, australian shepherd, saint bernard, bernese mountain dog, greyhound, bichon frise, schnauzer, shiba inu, akita, chow chow, samoyed, mastiff, jack russell, basset hound, bloodhound, newfoundland, weimaraner, whippet, vizsla, sheltie, cavalier king charles, papillon, pekingese, malamute, havanese, basenji, borzoi, saluki, komondor, puli, xoloitzcuintli, otterhound, lagotto romagnolo, kooikerhondje, mudi, azawakh",
  },
  {
    id: "reptiles",
    pack: "animals",
    text: "Name a reptile or amphibian",
    answers:
      "snake, lizard, turtle, frog, crocodile, alligator, iguana, gecko, chameleon, toad, tortoise, salamander, komodo dragon, rattlesnake, python, cobra, newt, axolotl, bearded dragon, anaconda, boa, sea turtle, gila monster, monitor lizard, king cobra, black mamba, viper, garter snake, skink, caiman, tree frog, bullfrog, horned lizard, anole, tuatara, gharial, frilled lizard, basilisk, caecilian, mudpuppy, hellbender, olm, thorny devil, taipan, boomslang, sidewinder, tegu, uromastyx, matamata",
  },
  {
    id: "baby-animals",
    pack: "animals",
    text: "Name a word for a baby animal",
    answers:
      "puppy, kitten, calf, foal, cub, chick, lamb, piglet, duckling, kid, bunny, fawn, joey, tadpole, pup, gosling, colt, filly, caterpillar, larva, hatchling, owlet, eaglet, cygnet, kit, leveret, poult, squab, elver, fry, fingerling, spat, cria, nymph, maggot, grub, hoglet, eyas, codling, porcupette, keet, puggle, smolt, parr",
  },

  // Food
  {
    id: "candy",
    pack: "food",
    text: "Name a candy",
    answers:
      "chocolate, gummy bears, lollipop, skittles, m&ms, snickers, jelly beans, licorice, starburst, kit kat, reese's, sour patch kids, twix, cotton candy, jolly rancher, peppermint, candy cane, caramel, toffee, gumdrop, taffy, nerds, airheads, milky way, butterfinger, hershey's, warheads, smarties, nougat, fudge, marshmallow, rock candy, gobstopper, pez, tootsie roll, peanut brittle, mints, life savers, haribo, sugar daddy, mike and ike, dots, laffy taffy, bit-o-honey, turkish delight, marzipan, halva, praline, dragee, pastille, nonpareils, jordan almonds, charleston chew, necco wafers, abba zaba",
  },
  {
    id: "sandwich",
    pack: "food",
    text: "Name something you'd put in a sandwich",
    answers:
      "cheese, ham, turkey, lettuce, tomato, peanut butter, jelly, mayo/mayonnaise, mustard, bacon, chicken, pickles, onion, tuna, egg, salami, roast beef, avocado, cucumber, ketchup, hummus, butter, pepperoni, spinach, bologna, nutella, banana, pastrami, sprouts, peppers, jam, pesto, sauerkraut, coleslaw, egg salad, falafel, meatball, tofu, prosciutto, brie, fried green tomato, apple, honey, aioli, chutney, kimchi, marshmallow fluff, giardiniera, mortadella, capicola, olive tapenade, pimento cheese",
  },
  {
    id: "spices",
    pack: "food",
    text: "Name a spice or herb",
    answers:
      "salt, pepper, cinnamon, garlic, basil, oregano, paprika, cumin, ginger, nutmeg, rosemary, thyme, parsley, cilantro, turmeric, chili powder, mint, dill, bay leaf, sage, cayenne, curry, vanilla, clove, onion powder, cardamom, chives, coriander, saffron, allspice, mustard seed, fennel, star anise, tarragon, marjoram, lemongrass, sesame, poppy seed, celery seed, sumac, fenugreek, za'atar, garam masala, juniper, caraway, asafoetida, galangal, mace, annatto, epazote, grains of paradise, long pepper, nigella, amchur, lovage, savory",
  },

  // Places
  {
    id: "countries-asia",
    pack: "places",
    text: "Name a country in Asia",
    answers:
      "china, japan, india, korea/south korea, thailand, vietnam, philippines, indonesia, north korea, pakistan, malaysia, singapore, russia, saudi arabia, iran, iraq, israel, turkey, afghanistan, nepal, bangladesh, sri lanka, mongolia, taiwan, cambodia, laos, myanmar/burma, uae/united arab emirates, qatar, syria, jordan, lebanon, kazakhstan, uzbekistan, bhutan, maldives, kuwait, oman, yemen, bahrain, brunei, kyrgyzstan, tajikistan, turkmenistan, timor leste/east timor, georgia, armenia, azerbaijan, cyprus",
  },
  {
    id: "us-cities",
    pack: "places",
    text: "Name a US city",
    answers:
      "new york, los angeles, chicago, miami, houston, san francisco, seattle, boston, las vegas, dallas, atlanta, denver, phoenix, philadelphia, washington dc, san diego, austin, detroit, nashville, orlando, portland, new orleans, minneapolis, baltimore, san antonio, honolulu, salt lake city, charlotte, pittsburgh, cleveland, st louis, kansas city, indianapolis, columbus, sacramento, memphis, milwaukee, tampa, albuquerque, tucson, omaha, anchorage, boise, savannah, charleston, buffalo, richmond, spokane, tulsa, fresno, des moines, birmingham, louisville, el paso, santa fe, burlington, juneau, duluth, fargo, cheyenne, bismarck, montpelier, pierre",
  },
  {
    id: "islands",
    pack: "places",
    text: "Name an island",
    answers:
      "hawaii, greenland, madagascar, iceland, japan, ireland, cuba, jamaica, bali, australia, puerto rico, new zealand, sicily, britain/great britain, manhattan, maui, fiji, tahiti, bermuda, bahamas, sri lanka, crete, cyprus, sardinia, corsica, taiwan, borneo, sumatra, java, tasmania, galapagos, easter island, santorini, malta, mallorca, ibiza, aruba, barbados, martha's vineyard, nantucket, long island, vancouver island, newfoundland, baffin island, sumba, socotra, zanzibar, svalbard, faroe islands, tristan da cunha, st helena, pitcairn, kerguelen, novaya zemlya, bora bora, lanai, molokai, kauai",
  },
  {
    id: "mountains",
    pack: "places",
    text: "Name a mountain or mountain range",
    answers:
      "mount everest/everest, rocky mountains/rockies, alps, himalayas, andes, appalachian mountains/appalachians, kilimanjaro, mount fuji, k2, mount rainier, mount st helens, matterhorn, denali, mont blanc, mount olympus, pikes peak, mount whitney, sierra nevada, pyrenees, urals, mount vesuvius, mount etna, mount kenya, smoky mountains, mount hood, aconcagua, atlas mountains, carpathians, mount elbrus, kangchenjunga, annapurna, table mountain, ben nevis, mount shasta, mount kosciuszko, cascades, teton/grand teton, mount ararat, mount sinai, mauna kea, mount cook/aoraki, eiger, dolomites, hindu kush, karakoram, tian shan, brooks range, zagros, ruwenzori, mount erebus, vinson massif, nanga parbat, lhotse, makalu, cho oyu",
  },

  // Science
  {
    id: "body-organs",
    pack: "science",
    text: "Name something your body makes or needs",
    answers:
      "blood, water, oxygen, sweat, tears, saliva/spit, food, protein, vitamins, sleep, calcium, iron, hair, skin cells, energy, mucus/snot, earwax, bile, hormones, insulin, sugar/glucose, fat, salt, potassium, adrenaline, antibodies, red blood cells, white blood cells, plasma, carbon dioxide, urine, collagen, melatonin, serotonin, dopamine, keratin, enzymes, platelets, lymph, cortisol, estrogen, testosterone, vitamin d, fiber, magnesium, zinc, endorphins, histamine, lactic acid, stomach acid, oxytocin, sebum, myelin, surfactant",
  },
  {
    id: "rocks-minerals",
    pack: "science",
    text: "Name a rock, mineral or gemstone",
    answers:
      "diamond, granite, ruby, emerald, quartz, marble, sapphire, gold, limestone, obsidian, coal, amethyst, sandstone, basalt, jade, opal, pumice, slate, topaz, pearl, salt/halite, turquoise, graphite, garnet, onyx, shale, mica, talc, gypsum, flint, chalk, pyrite, lava rock, aquamarine, citrine, agate, malachite, lapis lazuli, feldspar, hematite, magnetite, calcite, fluorite, gneiss, schist, tourmaline, peridot, jasper, moonstone, bloodstone, alexandrite, tanzanite, zircon, beryl, galena, cinnabar, labradorite, rhodochrosite, benitoite, painite, kimberlite, serpentinite, travertine, tuff",
  },
  {
    id: "inventions",
    pack: "science",
    text: "Name an invention that changed the world",
    answers:
      "wheel, internet, electricity, light bulb, phone/telephone, car, airplane, computer, printing press, fire, smartphone, television/tv, radio, steam engine, penicillin, vaccine, camera, refrigerator, gun, compass, clock, telescope, microscope, train, writing, paper, money, plow, electric battery/battery, x ray, gps, nuclear power, rocket, satellite, transistor, plastic, glass, concrete, antibiotics, eyeglasses, sewing machine, typewriter, elevator, air conditioning, washing machine, microwave, vacuum cleaner, toilet, anesthesia, pasteurization, barcode, shipping container, laser, solar panel, cotton gin, telegraph, gunpowder, stirrup, abacus, aqueduct, movable type, lithium ion battery, haber process",
  },
  {
    id: "scientists",
    pack: "science",
    text: "Name a famous scientist or inventor",
    answers:
      "albert einstein/einstein, isaac newton/newton, thomas edison/edison, nikola tesla/tesla, marie curie/curie, charles darwin/darwin, galileo, stephen hawking/hawking, benjamin franklin/franklin, leonardo da vinci/da vinci, alexander graham bell/bell, wright brothers, archimedes, copernicus, aristotle, louis pasteur/pasteur, alan turing/turing, ada lovelace/lovelace, kepler, mendel, carl sagan/sagan, neil degrasse tyson, bill nye, rosalind franklin, richard feynman/feynman, niels bohr/bohr, max planck/planck, james watt, faraday, alexander fleming/fleming, jane goodall/goodall, euclid, pythagoras, hippocrates, oppenheimer, enrico fermi/fermi, marconi, gutenberg, dmitri mendeleev/mendeleev, rutherford, maxwell, heisenberg, schrodinger, dirac, lise meitner/meitner, emmy noether/noether, ibn al haytham, al khwarizmi, hypatia, tycho brahe, chien shiung wu, barbara mcclintock, srinivasa ramanujan/ramanujan, katherine johnson",
  },
  {
    id: "phobias",
    pack: "science",
    text: "Name something people are afraid of",
    answers:
      "spiders, heights, snakes, the dark, clowns, death, public speaking, needles, sharks, ghosts, flying, bugs, failure, being alone, small spaces, dogs, the ocean, thunder, blood, germs, doctors, dentist, crowds, rejection, bees, fire, drowning, monsters, rats, birds, change, commitment, holes/trypophobia, aliens, dolls, the unknown, cockroaches, deep water, elevators, bridges, mirrors, open spaces, frogs, horses, butterflies, buttons, the number 13, long words, beards, belly buttons, cotton balls, chopsticks, peanut butter, palindromes",
  },

  // Sports
  {
    id: "video-games",
    pack: "sports",
    text: "Name a video game",
    answers:
      "minecraft, fortnite, mario/super mario, tetris, pac man, call of duty, roblox, zelda/legend of zelda, pokemon, grand theft auto/gta, among us, sonic, halo, mario kart, fifa, the sims, overwatch, league of legends, animal crossing, donkey kong, street fighter, mortal kombat, space invaders, pong, galaga, final fantasy, skyrim, red dead redemption, apex legends, valorant, counter strike, world of warcraft, portal, half life, doom, kirby, metroid, smash bros/super smash bros, wii sports, angry birds, candy crush, flappy bird, stardew valley, terraria, undertale, celeste, hollow knight, hades, elden ring, dark souls, bloodborne, tomb raider, bioshock, journey, katamari, okami, outer wilds, disco elysium, myst, lemmings, frogger, qbert, dig dug",
  },
  {
    id: "card-games",
    pack: "sports",
    text: "Name a card game",
    answers:
      "poker, uno, go fish, solitaire, blackjack, war, crazy eights, old maid, rummy, hearts, spades, bridge, gin rummy, slapjack, president, speed, euchre, cribbage, spit, bs/cheat, egyptian ratscrew, magic the gathering, pokemon cards, yugioh, baccarat, canasta, texas holdem, pinochle, exploding kittens, skip bo, phase 10, cards against humanity, rook, durak, bezique, piquet, skat, sheepshead, pitch, whist, briscola, scopa, belote, mus, tarot, hanafuda, dou dizhu, big two, mau mau, klondike, freecell, spider solitaire",
  },
  {
    id: "sport-gear",
    pack: "sports",
    text: "Name a piece of sports equipment",
    answers:
      "ball, bat, helmet, racket, glove, net, goal, hockey stick, skates, cleats, skis, snowboard, basketball, football, soccer ball, golf club, shin guards, mouthguard, puck, tennis ball, baseball, jersey, hoop, surfboard, skateboard, bicycle, paddle, goggles, frisbee, dumbbell, jump rope, whistle, kneepads, pads, sled, shuttlecock, javelin, discus, hurdle, pole vault pole, oar, bow, arrow, foil/epee/sabre, boxing gloves, punching bag, trampoline, balance beam, pommel horse, chalk, starting block, curling stone, broom, mallet, wicket, stumps, cricket bat, lacrosse stick, jai alai cesta, sliotar, hurley, caman",
  },
  {
    id: "athletes",
    pack: "sports",
    text: "Name a famous athlete",
    answers:
      "michael jordan, lebron james, serena williams, tom brady, usain bolt, cristiano ronaldo/ronaldo, lionel messi/messi, muhammad ali, tiger woods, kobe bryant, michael phelps, simone biles, babe ruth, wayne gretzky, roger federer, pele, stephen curry, shaq/shaquille o'neal, venus williams, rafael nadal, novak djokovic, david beckham, jackie robinson, mike tyson, derek jeter, peyton manning, magic johnson, larry bird, kevin durant, neymar, mbappe, tony hawk, shaun white, lindsey vonn, mia hamm, megan rapinoe, carl lewis, jesse owens, bo jackson, jim thorpe, nadia comaneci, eliud kipchoge, sachin tendulkar, diego maradona, zinedine zidane, johan cruyff, ayrton senna, lewis hamilton, michael schumacher, katie ledecky, florence griffith joyner, bill russell, wilt chamberlain, kareem abdul jabbar, gordie howe, bobby orr, martina navratilova, steffi graf, greg louganis, sugar ray robinson",
  },
  {
    id: "playground",
    pack: "sports",
    text: "Name a game kids play at recess",
    answers:
      "tag, hide and seek, hopscotch, jump rope, kickball, freeze tag, red rover, capture the flag, four square, dodgeball, tetherball, duck duck goose, simon says, red light green light, hot potato, marbles, sardines, kick the can, hacky sack, wall ball, foursquare, jacks, chalk, catch, frisbee, cops and robbers, manhunt, sharks and minnows, ghost in the graveyard, mother may i, statues, tug of war, leapfrog, sack race, three legged race, spud, hula hoop, pogo stick, stickball, cornhole, bocce, horseshoes, ring around the rosie, london bridge, british bulldog, what's the time mr wolf, elastics, pooh sticks, conkers, knucklebones, kabaddi, kho kho, gilli danda, tumbang preso",
  },
  {
    id: "chess-words",
    pack: "sports",
    text: "Name a word you'd hear during a chess game",
    answers:
      "checkmate, king, queen, pawn, rook/castle, bishop, knight, check, castling, stalemate, opening, gambit, en passant, promotion, draw, resign, fork, pin, board, square, file, rank, endgame, middlegame, blunder, grandmaster, tempo, sacrifice, skewer, zugzwang, fianchetto, discovered check, sicilian, queen's gambit, ruy lopez, french defense, caro kann, elo, blitz, bullet, rapid, threefold repetition, fifty move rule, zwischenzug, outpost, isolated pawn, passed pawn, doubled pawns, back rank, smothered mate, opposition, triangulation, j'adoube, patzer, kibitzer, desperado",
  },
  {
    id: "team-names",
    pack: "sports",
    text: "Name an animal a sports team is named after",
    answers:
      "eagles, bears, tigers, lions, panthers, wolves, bulls, hawks, falcons, dolphins, sharks, jaguars, broncos, colts, rams, ravens, cardinals, bengals, wildcats, mustangs, raptors, grizzlies, hornets, penguins, ducks, coyotes, bucks, cubs, orioles, blue jays, marlins, rays, seahawks, pelicans, timberwolves, badgers, gators, bulldogs, huskies, gophers, wolverines, longhorns, razorbacks, cougars, buffaloes, owls, beavers, terrapins, hokies, anteaters, banana slugs, horned frogs, gamecocks, jackrabbits, roadrunners, ospreys, mudhens, sea dogs",
  },

  // Everyday
  {
    id: "car-brands",
    pack: "everyday",
    text: "Name a car brand",
    answers:
      "toyota, ford, honda, chevrolet/chevy, tesla, bmw, mercedes/mercedes benz, audi, nissan, jeep, volkswagen/vw, hyundai, kia, subaru, lexus, ferrari, lamborghini, porsche, dodge, mazda, cadillac, gmc, ram, buick, volvo, jaguar, land rover, mitsubishi, acura, infiniti, lincoln, chrysler, bugatti, maserati, rolls royce, bentley, aston martin, mclaren, mini, fiat, alfa romeo, genesis, rivian, lucid, polestar, peugeot, renault, citroen, skoda, seat, saab, suzuki, pagani, koenigsegg, lotus, lada, dacia, tata, mahindra, byd, geely, proton, holden, studebaker, delorean, pontiac, oldsmobile, plymouth, saturn, hummer",
  },
  {
    id: "camping",
    pack: "everyday",
    text: "Name something you'd pack for camping",
    answers:
      "tent, sleeping bag, flashlight, water, food, marshmallows, matches, lighter, firewood, bug spray, pillow, lantern, hot dogs, cooler, chairs, sunscreen, first aid kit, map, compass, knife, rope, tarp, backpack, jacket, hiking boots, s'mores, graham crackers, chocolate, toilet paper, stove, pots, axe, hammock, headlamp, batteries, water bottle, blanket, radio, binoculars, fishing rod, cards, guitar, bear spray, water filter, multitool, duct tape, trowel, paracord, carabiner, whistle, mosquito net, tent stakes, mallet, bivy, trekking poles, bear canister, sit pad, firestarter, dutch oven, percolator, camp shower",
  },
  {
    id: "office",
    pack: "everyday",
    text: "Name something you'd find in an office",
    answers:
      "computer, desk, chair, printer, phone, pen, paper, stapler, coffee maker, keyboard, mouse, monitor, filing cabinet, whiteboard, calendar, laptop, sticky notes, paper clips, folder, scissors, tape, water cooler, clock, trash can, copier, scanner, plant, lamp, notepad, binder, envelope, calculator, desk organizer, cubicle, conference room, projector, shredder, hole punch, rubber band, mug, badge, headset, vending machine, fridge, microwave, fax machine, label maker, laminator, rolodex, inbox tray, letter opener, paperweight, swivel chair, ergonomic keyboard, standing desk, bulletin board, thumbtack, highlighter, post it, filing tray, franking machine",
  },
  {
    id: "superpowers",
    pack: "everyday",
    text: "Name a superpower you'd want",
    answers:
      "flying/flight, invisibility, super strength, teleportation, mind reading/telepathy, time travel, super speed, x ray vision, shape shifting, healing, telekinesis, immortality, laser eyes, fire, ice, controlling water, breathing underwater, talking to animals, stopping time, force fields, elasticity, super hearing, night vision, weather control, mind control, cloning, shrinking, growing, wall crawling, electricity, regeneration, precognition, invulnerability, phasing, sonic scream, magnetism, gravity control, plant control, luck, duplication, power absorption, technopathy, empathy, astral projection, dream walking, probability manipulation, echolocation, photographic memory, omnilingualism, chlorokinesis, umbrakinesis, cryokinesis",
  },
  {
    id: "rainy-day",
    pack: "everyday",
    text: "Name something to do on a rainy day",
    answers:
      "watch a movie, read, play video games, sleep/nap, board games, bake, puzzle, draw, cook, watch tv, play cards, clean, build a fort, listen to music, write, take a bath, craft, paint, play in puddles, call a friend, knit, journal, yoga, homework, online shopping, organize closet, scroll phone, play an instrument, learn something, museum, bowling, indoor rock climbing, library, coffee shop, movie theater, aquarium, sew, scrapbook, origami, meditate, binge a show, make soup, write letters, karaoke, dance, lego, model building, calligraphy, terrarium, bread baking, jigsaw, crossword, sudoku, chess",
  },
  {
    id: "birthday",
    pack: "everyday",
    text: "Name something you'd see at a birthday party",
    answers:
      "cake, balloons, presents/gifts, candles, ice cream, party hats, friends, games, pizza, music, decorations, cupcakes, streamers, banner, piñata, goody bags, wrapping paper, cards, confetti, punch, juice, chips, candy, singing, party poppers, noisemakers, plates, napkins, clown, magician, bounce house, face painting, photo booth, dancing, pin the tail on the donkey, musical chairs, karaoke, party favors, tiara, crown, sparklers, cake topper, sprinkles, frosting, guest list, invitations, thank you notes, kazoo, bubble machine, balloon animals, petting zoo, scavenger hunt, treasure map",
  },

  // Words
  {
    id: "words-z",
    pack: "words",
    text: "Name a word that starts with Z",
    answers:
      "zebra, zoo, zero, zip, zipper, zombie, zone, zoom, zucchini, zigzag, zap, zest, zen, zany, zeal, zinc, zodiac, zit, zing, zillion, zealous, zenith, zephyr, zeppelin, zinnia, ziti, zither, zloty, zoology, zoned, zest, zealot, zebu, zydeco, zygote, zircon, zombify, zori, zabaglione, zaftig, zarf, zeitgeist, zemstvo, ziggurat, zinger, zircon, zoetrope, zonked, zounds, zugzwang, zwieback, zymurgy, zyzzyva",
  },
  {
    id: "double-letters",
    pack: "words",
    text: "Name a word with a double O",
    answers:
      "book, moon, food, cool, door, good, look, room, school, boot, foot, pool, tooth, spoon, soon, zoo, floor, cook, wood, roof, noon, balloon, broom, hook, loop, mood, poop, shoot, stool, tool, cartoon, raccoon, igloo, bamboo, shampoo, kangaroo, cookie, goose, moose, noodle, poodle, rooster, scooter, choose, smooth, gloomy, bloom, groom, snooze, voodoo, typhoon, monsoon, lagoon, harpoon, maroon, macaroon, boondoggle, hoopla, swoop, snoop, droop, coop, brooch, schooner, troop, uncool, cuckoo, zooplankton, doohickey, kerfuffle",
  },
  {
    id: "rhymes-day",
    pack: "words",
    text: "Name a word that rhymes with DAY",
    answers:
      "say, play, way, may, pay, stay, hay, gray/grey, bay, ray, day, clay, pray, tray, spray, sway, okay, away, today, hooray, stray, they, weigh, sleigh, neigh, prey, obey, delay, display, birthday, holiday, monday, friday, buffet, ballet, bouquet, cafe, decay, essay, relay, survey, x ray, betray, convey, dismay, portray, array, bidet, gourmet, cabaret, cliche, fiance, matinee, negligee, protege, resume, soiree, beret, filet, parfait, risque, touche, cachet, entree, valet, dossier, consomme",
  },
  {
    id: "body-idioms",
    pack: "words",
    text: "Name a saying with a body part in it",
    answers:
      "break a leg, cold feet, piece of cake, keep an eye on, give a hand, cost an arm and a leg, head over heels, all ears, bite your tongue, pull my leg, by the skin of your teeth, heart of gold, get off my back, keep your chin up, face the music, turn a blind eye, lend an ear, play it by ear, on the tip of my tongue, foot in mouth, sweet tooth, thumbs up, green thumb, rule of thumb, elbow grease, shoulder to cry on, cold shoulder, chip on your shoulder, stick your neck out, pain in the neck, butterflies in my stomach, nose to the grindstone, keep your nose clean, under your nose, hand in hand, wrapped around your finger, heart on your sleeve, finger on the pulse, back to square one, bend over backwards, get cold feet, toe the line, knee jerk, lily livered, shin splints, bone to pick, skeleton in the closet, spineless, bare bones, a leg up, armed to the teeth, cheek by jowl, hair of the dog",
  },
  {
    id: "palindromes",
    pack: "words",
    text: "Name a word that's spelled the same backwards",
    answers:
      "racecar, mom, dad, wow, level, noon, kayak, radar, madam, civic, refer, eye, pop, bob, anna, hannah, otto, rotor, stats, tenet, deed, peep, sis, nun, toot, gag, pup, did, ere, solos, redder, sagas, shahs, minim, reviver, rotator, deified, repaper, tattarrattat, malayalam, aibohphobia, kinnikinnik, detartrated, redivider, murdrum, rotavator, wassamassaw",
  },
  {
    id: "onomatopoeia",
    pack: "words",
    text: "Name a word that sounds like the noise it describes",
    answers:
      "boom, bang, pop, buzz, meow, woof, moo, splash, crash, bark, hiss, ding, beep, honk, oink, quack, tick tock, knock, zap, pow, sizzle, crunch, whoosh, thud, boing, clap, snap, crackle, drip, ring, roar, growl, chirp, tweet, ribbit, neigh, baa, cluck, squeak, slurp, burp, achoo, hiccup, vroom, zoom, kaboom, splat, thump, rustle, gurgle, murmur, clang, clink, jingle, twang, plop, fizz, swish, whirr, purr, howl, hoot, caw, cuckoo, bleat, bray, kerplunk, kerfuffle, thwack, ker-ching, brrr, tsk, glug, plink, schwing, fwoosh",
  },
  // ---- Conversational everyday prompts ----
  {
    id: "junk-drawer",
    pack: "everyday",
    text: "Name something you'd find in a junk drawer",
    answers:
      "batteries, rubber bands, pens, tape, scissors, keys, takeout menus, paper clips, coins, twist ties, matches, lighter, screwdriver, birthday candles, sticky notes, flashlight, receipts, chopsticks, soy sauce packets, glue, string, measuring tape, thumbtacks, safety pins, old phone, charger, cables, coupons, stamps, sunglasses, playing cards, zip ties, allen wrench, super glue, notepad, highlighter, marbles, bottle opener, hair ties, gum, magnets, warranty cards, spare buttons, sewing kit, nail clippers, birthday cards, instruction manuals, spork, fuse, picture hooks, golf tee, sim card ejector, cork, dice, compass",
  },
  {
    id: "late-excuses",
    pack: "everyday",
    text: "Name an excuse for being late",
    answers:
      "traffic, overslept, alarm didn't go off, car broke down, missed the bus, flat tire, lost my keys, got lost, phone died, train was late, bad weather, kids, dog, couldn't find parking, doctor's appointment, sick, accident, construction, forgot, wardrobe malfunction, spilled coffee, wrong address, road closed, emergency, power outage, gps, family emergency, locked out, ran out of gas, flooded street, school run, package delivery, babysitter canceled, stuck in elevator, bridge was up, parade, cows on the road, time zones, daylight saving, train strike, solar eclipse",
  },
  {
    id: "sticky",
    pack: "everyday",
    text: "Name something sticky",
    answers:
      "glue, honey, tape, gum, syrup, sap, slime, peanut butter, jam, candy, caramel, cotton candy, maple syrup, sticky notes, molasses, lollipop, marshmallow, band aid, stickers, glue stick, duct tape, spider web, velcro, tar, toffee, frosting, mud, fly paper, sweat, rice, dough, chewing gum, jelly, nutella, resin, wax, putty, lip gloss, hair gel, sticky hands toy, cinnamon roll, toffee apple, burdock, gecko feet, rubber cement, epoxy, mochi, okra, natto",
  },
  {
    id: "duos",
    pack: "everyday",
    text: "Name a famous duo",
    answers:
      "peanut butter and jelly, batman and robin, salt and pepper, tom and jerry, mario and luigi, romeo and juliet, mickey and minnie, sherlock and watson, bert and ernie, spongebob and patrick, mac and cheese, simon and garfunkel, ben and jerry, rick and morty, laurel and hardy, bonnie and clyde, timon and pumbaa, phineas and ferb, lilo and stitch, woody and buzz, han and chewie, key and peele, daft punk, the white stripes, venus and serena, shaggy and scooby, frodo and sam, wallace and gromit, jay and silent bob, abbott and costello, lewis and clark, hall and oates, penn and teller, statler and waldorf, calvin and hobbes, sonny and cher, cheech and chong, mulder and scully, holmes and moriarty, ren and stimpy, pinky and the brain, siegfried and roy, beavis and butthead, starsky and hutch, tango and cash, thelma and louise, outkast, milli vanilli, the proclaimers",
  },
  {
    id: "collect",
    pack: "everyday",
    text: "Name something people collect",
    answers:
      "stamps, coins, cards, trading cards, rocks, shells, comic books, records, vinyl, sneakers, action figures, dolls, books, magnets, postcards, stickers, legos, funko pops, keychains, autographs, art, antiques, cars, watches, mugs, snow globes, spoons, baseball cards, pokemon cards, toy cars, teddy bears, plants, perfume, wine, bottle caps, pins, patches, figurines, crystals, fossils, model trains, video games, movie posters, tickets, thimbles, matchbooks, beer cans, butterflies, insects, typewriters, cameras, maps, globes, sand, pez dispensers, rubber ducks, lunchboxes, vintage tins, meteorites",
  },
  {
    id: "has-wheels",
    pack: "everyday",
    text: "Name something with wheels",
    answers:
      "car, bike, skateboard, truck, bus, train, motorcycle, scooter, wagon, stroller, shopping cart, roller skates, wheelchair, suitcase, tricycle, wheelbarrow, office chair, tractor, plane, golf cart, go kart, unicycle, rollerblades, lawn mower, segway, forklift, tank, ambulance, fire truck, trailer, rv, monster truck, hoverboard, dolly, hand truck, toy car, roller coaster, cannon, chariot, hamster wheel, pizza cutter, mars rover, rickshaw, tuk tuk, penny farthing, zamboni, steamroller, cable car, mine cart, gurney, hospital bed, grill",
  },
  {
    id: "round-things",
    pack: "everyday",
    text: "Name something that's round",
    answers:
      "ball, circle, wheel, pizza, sun, moon, earth, coin, plate, clock, donut, orange, cookie, button, ring, tire, globe, bubble, pancake, cd, frisbee, hula hoop, lollipop, marble, pearl, eyeball, bagel, cake, bowl, steering wheel, basketball, apple, grape, pea, cherry, balloon, drum, record, compass, manhole cover, dartboard, hockey puck, bottle cap, lid, doughnut, tortilla, peppercorn, ferris wheel, snow globe, crystal ball, dime, porthole, saturn, roundabout, wreath, tambourine, yo yo, bowling ball, gumball, olive, meatball, macaron, oreo, washer",
  },
  {
    id: "fast-food",
    pack: "food",
    text: "Name a fast food chain",
    answers:
      "mcdonald's, burger king, wendy's, taco bell, kfc, subway, chick fil a, pizza hut, domino's, popeyes, chipotle, five guys, sonic, arby's, jack in the box, in n out, dairy queen, panda express, little caesars, papa john's, shake shack, white castle, carl's jr, hardee's, whataburger, culver's, wingstop, jimmy john's, del taco, raising cane's, zaxby's, bojangles, qdoba, panera, dunkin, starbucks, krispy kreme, church's chicken, long john silver's, el pollo loco, checkers, rally's, steak n shake, a&w, freddy's, wienerschnitzel, nathan's, sbarro, auntie anne's, cinnabon, jollibee, tim hortons, pret a manger, nando's, greggs, mos burger, lotteria",
  },
  {
    id: "cereal",
    pack: "food",
    text: "Name a breakfast cereal",
    answers:
      "cheerios, frosted flakes, lucky charms, froot loops, cinnamon toast crunch, cocoa puffs, rice krispies, corn flakes, special k, raisin bran, honey nut cheerios, cap'n crunch, frosted mini wheats, trix, apple jacks, honey bunches of oats, fruity pebbles, cocoa pebbles, reese's puffs, golden grahams, kix, chex, life, cookie crisp, count chocula, wheaties, granola, oatmeal, grape nuts, honey smacks, corn pops, cracklin oat bran, frosted cheerios, cheerios oat crunch, crispix, total, fiber one, shredded wheat, muesli, weetabix, alpha bits, boo berry, franken berry, golden crisp, oops all berries, krave, waffle crisp, kellogg's smorz, quisp, mr t cereal",
  },
  {
    id: "cartoon-characters",
    pack: "everyday",
    text: "Name a cartoon character",
    answers:
      "mickey mouse, spongebob, bugs bunny, homer simpson, scooby doo, tom, jerry, donald duck, pikachu, patrick star, bart simpson, goofy, daffy duck, tweety, garfield, snoopy, charlie brown, popeye, fred flintstone, shrek, winnie the pooh, peter griffin, dora, elmo, road runner, wile e coyote, porky pig, sylvester, scrappy doo, stewie, rick, morty, finn, jake, ben 10, dexter, johnny bravo, courage, ed, edd, eddy, powerpuff girls, ren, stimpy, hey arnold, rugrats, tommy pickles, doug, daria, beavis, phineas, ferb, perry the platypus, steven universe, gumball, mabel, dipper, bluey, peppa pig, aang, zuko, avatar korra, invader zim, samurai jack, cow and chicken",
  },
  {
    id: "smells",
    pack: "everyday",
    text: "Name a smell people love",
    answers:
      "fresh bread, coffee, rain, cookies, flowers, cut grass, vanilla, popcorn, bacon, new car, lavender, cinnamon, campfire, pine, ocean, chocolate, baby, roses, laundry, perfume, gasoline, books, candles, lemon, pizza, cake, pumpkin spice, coconut, sunscreen, christmas tree, petrichor, oranges, mint, garlic, onions, barbecue, leather, cedar, eucalyptus, sharpies, play doh, crayons, chlorine, new shoes, old books, nail polish, sawdust, tar, matches, skunk, horse",
  },
  {
    id: "says-goodbye",
    pack: "words",
    text: "Name a way to say goodbye",
    answers:
      "bye, see you later, goodbye, later, see ya, take care, peace, farewell, adios, ciao, cya, catch you later, have a good one, so long, bye bye, toodles, au revoir, sayonara, cheerio, ta ta, see you soon, until next time, peace out, later gator, after a while crocodile, auf wiedersehen, arrivederci, hasta la vista, godspeed, bon voyage, ttyl, gotta go, i'm out, deuces, laters, cheers, smell ya later, toodle oo, adieu, aloha, shalom, namaste, salaam, zai jian, annyeong, do svidaniya, vale, hwyl, slan, totsiens",
  },
  {
    id: "school-subjects",
    pack: "everyday",
    text: "Name a school subject",
    answers:
      "math, english, science, history, art, pe/gym, music, spanish, french, biology, chemistry, physics, geography, social studies, reading, writing, computer science, health, drama, economics, algebra, geometry, calculus, psychology, government, latin, german, chinese, band, choir, home economics, shop, statistics, philosophy, sociology, journalism, debate, photography, business, accounting, astronomy, anatomy, environmental science, civics, theater, ceramics, woodworking, robotics, latin, japanese, ethics, logic, mythology, rhetoric",
  },
  {
    id: "beach",
    pack: "everyday",
    text: "Name something you'd bring to the beach",
    answers:
      "towel, sunscreen, umbrella, sunglasses, swimsuit, water, snacks, chair, cooler, hat, book, ball, sandals, flip flops, bucket, shovel, boogie board, surfboard, speaker, frisbee, phone, blanket, goggles, snorkel, kite, volleyball, sandwiches, lotion, aloe, water bottle, cover up, magazine, tent, pool noodle, floatie, camera, money, beach bag, headphones, wet wipes, paddleboard, metal detector, fishing rod, sand castle molds, windbreak, crab net, shell bag, hammock, coconut",
  },
  {
    id: "zoo-sounds",
    pack: "animals",
    text: "Name an animal that makes a lot of noise",
    answers:
      "dog, lion, rooster, monkey, donkey, cow, goose, parrot, elephant, wolf, crow, frog, cricket, cicada, hyena, howler monkey, pig, cat, seagull, coyote, peacock, owl, bird, horse, sheep, goat, duck, turkey, mosquito, whale, bear, tiger, chimpanzee, kookaburra, bullfrog, loon, sea lion, walrus, gibbon, raven, blue jay, mockingbird, kakapo, lyrebird, pistol shrimp, bellbird, kakapo, tree hyrax, fox, koala, red deer, capercaillie, siamang",
  },
  {
    id: "spicy",
    pack: "food",
    text: "Name something spicy",
    answers:
      "jalapeno, hot sauce, salsa, chili, wasabi, sriracha, curry, pepper, cayenne, habanero, ghost pepper, buffalo wings, hot cheetos, takis, kimchi, tabasco, horseradish, mustard, ginger, carolina reaper, chili powder, red pepper flakes, chipotle, serrano, thai food, mapo tofu, vindaloo, jerk chicken, nashville hot chicken, gochujang, harissa, sambal, scotch bonnet, poblano, paprika, kung pao chicken, pepperoni, radish, arugula, cinnamon, szechuan peppercorn, chili oil, nduja, piri piri, berbere, mole, tom yum, laksa, phaal",
  },
];
