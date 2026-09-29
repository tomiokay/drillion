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
    text: "An animal that lives in the ocean",
    answers:
      "shark, whale, dolphin, octopus, jellyfish, fish, seal, sea turtle/turtle, crab, starfish/sea star, squid, orca/killer whale, lobster, clownfish, stingray/ray, seahorse, eel, shrimp, sea urchin, sea lion, walrus, manatee, tuna, blue whale, humpback whale, narwhal, pufferfish/blowfish, swordfish, manta ray, coral, sea otter, hammerhead, anglerfish, barracuda, clam, oyster, mussel, sea cucumber, sponge, beluga, great white, marlin, sardine, cod, halibut, anemone/sea anemone, krill, plankton, lionfish, moray eel, nautilus, cuttlefish, sperm whale, dugong, sunfish/mola, flounder, grouper, triggerfish, sea slug/nudibranch, horseshoe crab, barnacle, isopod, vampire squid, oarfish, sea pen, sea butterfly, lanternfish, goblin shark, frilled shark, sea spider",
  },
  {
    id: "farm-animals",
    pack: "animals",
    text: "An animal you might find on a farm",
    answers:
      "cow, pig, chicken, horse, sheep, goat, duck, dog, cat, rooster, turkey, donkey, goose, mouse, rabbit, llama, alpaca, bull, lamb, pony, mule, hen, calf, ox, piglet, chick, rat, barn owl/owl, bee, peacock, guinea fowl, quail, emu, ostrich, water buffalo/buffalo, yak, ferret, pheasant, bison, pigeon, swallow, fox, crow, mole, snake, spider, fly, worm, beetle, zebu, capybara, guinea pig",
  },
  {
    id: "birds",
    pack: "animals",
    text: "A kind of bird",
    answers:
      "eagle, robin, parrot, owl, penguin, crow, pigeon, flamingo, sparrow, blue jay, hawk, cardinal, duck, chicken, ostrich, hummingbird, peacock, seagull/gull, swan, falcon, pelican, toucan, woodpecker, goose, turkey, vulture, raven, emu, bald eagle, canary, dove, stork, heron, crane, kiwi, magpie, finch, parakeet/budgie, cockatoo, macaw, albatross, puffin, kingfisher, starling, condor, osprey, quail, pheasant, roadrunner, oriole, wren, swallow, lark, nightingale, cuckoo, egret, ibis, loon, mockingbird, chickadee, bluebird, cassowary, kookaburra, hornbill, shoebill, lyrebird, bowerbird, secretary bird, kakapo, dodo, frigatebird, booby, tern, sandpiper, plover, grebe, nuthatch, tanager, waxwing, bittern, hoopoe",
  },
  {
    id: "insects",
    pack: "animals",
    text: "A bug or insect",
    answers:
      "ant, bee, butterfly, spider, fly, mosquito, ladybug, beetle, grasshopper, cockroach/roach, moth, dragonfly, wasp, caterpillar, cricket, firefly, termite, flea, tick, praying mantis/mantis, hornet, stink bug, centipede, millipede, worm, bumblebee, gnat, cicada, earwig, louse/lice, scorpion, silverfish, aphid, bed bug, fruit fly, horsefly, walking stick/stick insect, weevil, locust, katydid, damselfly, dung beetle, june bug, mayfly, lacewing, water strider, pill bug/roly poly, stag beetle, firebrat, thrips, leafhopper, cochineal, hercules beetle, atlas moth, bullet ant, tarantula hawk",
  },
  {
    id: "pets",
    pack: "animals",
    text: "An animal people keep as a pet",
    answers:
      "dog, cat, fish, hamster, rabbit/bunny, bird, guinea pig, turtle, snake, parrot, goldfish, lizard, mouse, ferret, rat, horse, gerbil, bearded dragon, hedgehog, chinchilla, frog, tortoise, gecko, iguana, spider/tarantula, pig, chicken, budgie/parakeet, canary, axolotl, hermit crab, cockatiel, sugar glider, duck, goat, betta fish/betta, chameleon, snail, degu, stick insect, scorpion, rabbit, monkey, pony, alpaca, cockroach, koi, sea monkey, skunk, fox, quail, millipede",
  },

  // Food
  {
    id: "fruits",
    pack: "food",
    text: "A fruit",
    answers:
      "apple, banana, orange, strawberry, grape, watermelon, mango, pineapple, blueberry, peach, pear, cherry, kiwi, lemon, raspberry, plum, lime, pomegranate, coconut, grapefruit, cantaloupe, blackberry, apricot, papaya, tomato, avocado, fig, nectarine, dragon fruit, passion fruit, honeydew, cranberry, tangerine, clementine, date, guava, lychee, persimmon, star fruit, jackfruit, durian, mulberry, gooseberry, kumquat, quince, elderberry, boysenberry, currant, olive, plantain, rambutan, mangosteen, loquat, pawpaw, salak, feijoa, soursop, cherimoya, jabuticaba, yuzu, bergamot, ugli fruit, medlar, sapodilla",
  },
  {
    id: "vegetables",
    pack: "food",
    text: "A vegetable",
    answers:
      "carrot, broccoli, potato, lettuce, spinach, corn, onion, cucumber, tomato, celery, pepper/bell pepper, green bean, pea, cabbage, cauliflower, zucchini, kale, asparagus, sweet potato, mushroom, garlic, eggplant, brussels sprout, radish, beet, squash, pumpkin, artichoke, leek, turnip, okra, bok choy, arugula, parsnip, yam, chard/swiss chard, bean sprout, collard greens, fennel, shallot, jalapeno, rutabaga, kohlrabi, watercress, endive, jicama, daikon, taro, cassava, celeriac, rhubarb, edamame, chayote, romanesco, radicchio, salsify, fiddlehead, lotus root, burdock",
  },
  {
    id: "pizza-toppings",
    pack: "food",
    text: "A pizza topping",
    answers:
      "pepperoni, cheese, mushroom, sausage, pineapple, olive, onion, bacon, ham, green pepper/pepper, chicken, spinach, tomato, jalapeno, anchovy, basil, mozzarella, ground beef/beef, salami, garlic, bbq chicken, red onion, feta, artichoke, meatball, parmesan, broccoli, arugula, prosciutto, egg, corn, ricotta, goat cheese, sun dried tomato, shrimp, tuna, chorizo, banana pepper, zucchini, eggplant, capers, pesto, buffalo chicken, pickles, potato, fig, honey, truffle, kale, clams, gorgonzola, hot honey, kimchi, pear, duck",
  },
  {
    id: "breakfast",
    pack: "food",
    text: "Something people eat for breakfast",
    answers:
      "eggs, pancakes, cereal, bacon, toast, waffles, oatmeal, french toast, sausage, yogurt, bagel, fruit, muffin, hash browns, omelette, cinnamon roll, croissant, smoothie, granola, donut, breakfast burrito, grits, biscuits, avocado toast, porridge, scrambled eggs, crepes, english muffin, sandwich, pop tart, eggs benedict, banana, coffee cake, quiche, bread, ham, danish, scone, congee, chilaquiles, shakshuka, huevos rancheros, kippers, black pudding, beans, dosa, idli, paratha, dim sum, miso soup, natto, arepa, menemen, kedgeree, poha",
  },
  {
    id: "desserts",
    pack: "food",
    text: "A dessert",
    answers:
      "cake, ice cream, cookie, brownie, pie, cupcake, cheesecake, pudding, donut, apple pie, chocolate, tiramisu, cobbler, sundae, macaron, creme brulee, mousse, jello, churro, cannoli, fudge, milkshake, banana split, eclair, pavlova, flan, gelato, sorbet, key lime pie, lava cake, cinnamon roll, trifle, baklava, strudel, panna cotta, souffle, parfait, crepe, mochi, popsicle, custard, bread pudding, snickerdoodle, blondie, s'mores, profiterole, rice pudding, tres leches, baked alaska, gulab jamun, halo halo, knafeh, galette, clafoutis, zabaglione, sticky toffee pudding, spotted dick, kulfi, affogato, semifreddo, frangipane, mille feuille",
  },
  {
    id: "cheeses",
    pack: "food",
    text: "A kind of cheese",
    answers:
      "cheddar, mozzarella, swiss, parmesan, american, brie, gouda, provolone, feta, pepper jack, blue cheese, cream cheese, colby jack/colby, goat cheese, ricotta, monterey jack, camembert, havarti, muenster, cottage cheese, gruyere, string cheese, manchego, asiago, gorgonzola, burrata, mascarpone, halloumi, romano, stilton, roquefort, emmental, edam, queso fresco, paneer, fontina, limburger, jarlsberg, brick cheese, cotija, oaxaca, pecorino, taleggio, raclette, comte, wensleydale, gjetost/brunost, epoisses, reblochon, casu marzu, stinking bishop, vacherin, mimolette, leerdammer, tilsit, caciocavallo",
  },
  {
    id: "drinks",
    pack: "food",
    text: "A drink (no alcohol)",
    answers:
      "water, coffee, tea, milk, orange juice, soda, lemonade, apple juice, hot chocolate, juice, iced tea, smoothie, milkshake, coke/cola, sprite, root beer, gatorade, sparkling water, energy drink, chocolate milk, boba/bubble tea, coconut water, ginger ale, kombucha, latte, espresso, cappuccino, fruit punch, grape juice, cranberry juice, dr pepper, mountain dew, chai, matcha, horchata, eggnog, tonic water, cream soda, lassi, cider, kefir, mate/yerba mate, agua fresca, arnold palmer, ayran, sweet tea, cold brew, frappuccino, tomato juice, prune juice, sarsaparilla, birch beer, kvass, thai iced tea, amazake, sikhye, barley tea, chicha morada",
  },

  // Places
  {
    id: "countries-europe",
    pack: "places",
    text: "A country in Europe",
    answers:
      "france, germany, italy, spain, england/uk/united kingdom, portugal, greece, ireland, switzerland, netherlands/holland, sweden, norway, poland, belgium, austria, denmark, russia, finland, ukraine, iceland, scotland, croatia, czech republic/czechia, hungary, romania, turkey, wales, serbia, bulgaria, luxembourg, monaco, slovakia, slovenia, albania, lithuania, latvia, estonia, belarus, bosnia, montenegro, malta, moldova, north macedonia/macedonia, cyprus, andorra, liechtenstein, san marino, vatican city/vatican, kosovo, georgia, armenia, azerbaijan",
  },
  {
    id: "countries-africa",
    pack: "places",
    text: "A country in Africa",
    answers:
      "egypt, south africa, nigeria, kenya, morocco, ethiopia, ghana, madagascar, congo, algeria, sudan, somalia, tanzania, uganda, zimbabwe, libya, tunisia, rwanda, senegal, cameroon, angola, mali, namibia, botswana, zambia, ivory coast/cote d'ivoire, mozambique, niger, chad, liberia, sierra leone, south sudan, eritrea, malawi, burkina faso, guinea, benin, togo, gabon, mauritania, lesotho, eswatini/swaziland, djibouti, gambia, burundi, cape verde, mauritius, seychelles, comoros, equatorial guinea, guinea bissau, central african republic, sao tome",
  },
  {
    id: "us-states",
    pack: "places",
    text: "A US state",
    answers:
      "california, texas, florida, new york, hawaii, alaska, washington, ohio, arizona, nevada, colorado, georgia, illinois, michigan, oregon, pennsylvania, virginia, massachusetts, new jersey, north carolina, tennessee, utah, louisiana, kentucky, alabama, south carolina, minnesota, wisconsin, indiana, missouri, oklahoma, maine, maryland, idaho, kansas, iowa, montana, new mexico, mississippi, arkansas, nebraska, connecticut, vermont, west virginia, new hampshire, rhode island, wyoming, delaware, south dakota, north dakota",
  },
  {
    id: "capitals",
    pack: "places",
    text: "A national capital city",
    answers:
      "london, paris, washington dc/washington, tokyo, rome, berlin, madrid, beijing, moscow, ottawa, canberra, cairo, mexico city, athens, dublin, lisbon, seoul, amsterdam, vienna, brussels, stockholm, oslo, copenhagen, bangkok, new delhi/delhi, buenos aires, brasilia, lima, helsinki, prague, warsaw, budapest, nairobi, ankara, tehran, baghdad, jakarta, manila, hanoi, havana, santiago, bogota, caracas, kyiv/kiev, bern, reykjavik, wellington, singapore, kuala lumpur, riyadh, doha, abu dhabi, islamabad, kabul, dhaka, kathmandu, colombo, quito, montevideo, asuncion, la paz, addis ababa, accra, abuja, dakar, rabat, tunis, algiers, tbilisi, yerevan, baku, tashkent, astana, ulaanbaatar, thimphu, vientiane, phnom penh, naypyidaw, suva, port moresby, valletta, vaduz, andorra la vella, ljubljana, bratislava, vilnius, riga, tallinn, chisinau, skopje, tirana, podgorica, sarajevo",
  },
  {
    id: "landmarks",
    pack: "places",
    text: "A famous landmark",
    answers:
      "eiffel tower, statue of liberty, great wall of china/great wall, pyramids/pyramids of giza, taj mahal, colosseum, big ben, mount rushmore, golden gate bridge, grand canyon, leaning tower of pisa, sydney opera house, stonehenge, machu picchu, christ the redeemer, empire state building, niagara falls, mount everest, burj khalifa, times square, white house, acropolis/parthenon, sphinx, petra, angkor wat, buckingham palace, louvre, space needle, hollywood sign, kremlin, sagrada familia, chichen itza, mount fuji, arc de triomphe, tower bridge, notre dame, gateway arch, brandenburg gate, cn tower, alcatraz, easter island/moai, forbidden city, neuschwanstein castle, great barrier reef, victoria falls, uluru, hagia sophia, trevi fountain, lincoln memorial, london eye, st peters basilica, palace of versailles/versailles, mont saint michel, alhambra, blue mosque, golden temple, borobudur, tikal, meteora, pamukkale, hallgrimskirkja, shwedagon pagoda, potala palace",
  },
  {
    id: "rivers",
    pack: "places",
    text: "A river",
    answers:
      "nile, amazon, mississippi, thames, colorado, yangtze, danube, rhine, ganges, hudson, missouri, seine, rio grande, ohio, volga, mekong, tigris, euphrates, jordan, congo, st lawrence, columbia, yellow river/huang he, niger, zambezi, tiber, potomac, delaware, snake, murray, indus, loire, elbe, arkansas, tennessee, charles, chicago river, yukon, mackenzie, orinoco, parana, ob, lena, yenisei, amur, brahmaputra, irrawaddy, po, dnieper, ural, shannon, severn, tagus, douro, ebro, rhone, oder, vistula, limpopo, orange river, salween, darling, fraser, platte, susquehanna, sacramento",
  },

  // Science
  {
    id: "elements",
    pack: "science",
    text: "A chemical element",
    answers:
      "oxygen, hydrogen, carbon, gold, iron, helium, nitrogen, silver, sodium, copper, calcium, lead, aluminum/aluminium, neon, uranium, chlorine, zinc, potassium, mercury, magnesium, platinum, lithium, sulfur, tin, silicon, nickel, titanium, fluorine, phosphorus, argon, iodine, plutonium, cobalt, radon, radium, boron, tungsten, chromium, manganese, beryllium, krypton, xenon, bromine, arsenic, barium, cesium/caesium, francium, strontium, palladium, cadmium, bismuth, selenium, gallium, germanium, polonium, thorium, vanadium, zirconium, osmium, iridium, rhodium, indium, antimony, tellurium, molybdenum, scandium, yttrium, lanthanum, cerium, neodymium, europium, gadolinium, einsteinium, americium, californium, nobelium, lawrencium, rutherfordium, dubnium, seaborgium, bohrium, hassium, meitnerium, darmstadtium, roentgenium, copernicium, nihonium, flerovium, moscovium, livermorium, tennessine, oganesson, praseodymium, promethium, samarium, terbium, dysprosium, holmium, erbium, thulium, ytterbium, lutetium, hafnium, tantalum, rhenium, thallium, astatine, actinium, protactinium, neptunium, curium, berkelium, fermium, mendelevium, technetium, ruthenium, niobium, rubidium",
  },
  {
    id: "body-parts",
    pack: "science",
    text: "A part of the human body",
    answers:
      "heart, hand, arm, leg, head, eye, nose, foot, brain, finger, mouth, ear, knee, lung, stomach, toe, elbow, shoulder, liver, kidney, hair, neck, teeth/tooth, tongue, skin, chest, back, lips, chin, ankle, wrist, hip, thumb, nail, eyebrow, cheek, forehead, bone, skull, rib, spine, intestine, bladder, pancreas, thigh, calf, heel, knuckle, belly button/navel, eyelash, jaw, throat, spleen, appendix, gallbladder, femur, tibia, esophagus, diaphragm, pelvis, collarbone/clavicle, tendon, cartilage, uvula, cornea, retina, pupil, iris, eardrum, cochlea, tonsils, thyroid, larynx, trachea, sternum, patella, scapula, fibula, ulna, radius, humerus, coccyx, hypothalamus, cerebellum, hippocampus, medulla, philtrum, lunula, septum",
  },
  {
    id: "space",
    pack: "science",
    text: "Something you'd find in space",
    answers:
      "star, planet, moon, sun, asteroid, comet, black hole, galaxy, meteor, satellite, mars, earth, jupiter, saturn, nebula, astronaut, space station, alien, rocket, milky way, venus, mercury, neptune, uranus, pluto, meteorite, constellation, supernova, dust, dwarf planet, space junk/debris, quasar, pulsar, neutron star, white dwarf, red giant, wormhole, dark matter, cosmic rays, solar wind, exoplanet, kuiper belt, oort cloud, asteroid belt, andromeda, ceres, europa, titan, io, ganymede, phobos, hubble, voyager, radiation, vacuum, gamma ray burst, magnetar, brown dwarf, protostar, accretion disk, event horizon, eris, makemake, haumea, sedna, enceladus, triton, charon",
  },
  {
    id: "dinosaurs",
    pack: "science",
    text: "A dinosaur or prehistoric creature",
    answers:
      "t rex/tyrannosaurus/tyrannosaurus rex, triceratops, velociraptor/raptor, stegosaurus, brachiosaurus, pterodactyl, spinosaurus, ankylosaurus, diplodocus, brontosaurus, mammoth, allosaurus, parasaurolophus, pachycephalosaurus, dilophosaurus, saber tooth tiger/smilodon, megalodon, apatosaurus, iguanodon, mosasaurus, plesiosaur, carnotaurus, gallimimus, compsognathus, archaeopteryx, giganotosaurus, pteranodon, dimetrodon, therizinosaurus, utahraptor, deinonychus, oviraptor, baryonyx, microraptor, argentinosaurus, quetzalcoatlus, ichthyosaur, trilobite, dodo, mastodon, woolly rhino, dunkleosteus, protoceratops, maiasaura, edmontosaurus, styracosaurus, amargasaurus, kentrosaurus, troodon, coelophysis, herrerasaurus, eoraptor, suchomimus, ceratosaurus, megalosaurus, sauropelta, nodosaurus, anomalocaris, titanoboa, glyptodon, megatherium, andrewsarchus, hallucigenia",
  },
  {
    id: "weather",
    pack: "science",
    text: "A kind of weather",
    answers:
      "rain, snow, sunny, cloudy, windy, thunderstorm/storm, hail, fog, tornado, hurricane, sleet, lightning, thunder, drizzle, blizzard, humid, heat wave, frost, mist, overcast, rainbow, monsoon, typhoon, cyclone, drought, dust storm/sandstorm, freezing rain, ice storm, flurries, breeze, gale, haze, smog, dew, partly cloudy, downpour, flood, whiteout, derecho, squall, microburst, waterspout, graupel, virga, sun shower, chinook, haboob, polar vortex, nor'easter, sirocco, mistral, bora, diamond dust, petrichor",
  },

  // Sports
  {
    id: "sports",
    pack: "sports",
    text: "A sport",
    answers:
      "soccer/football, basketball, baseball, tennis, american football, hockey/ice hockey, golf, volleyball, swimming, boxing, cricket, rugby, track, wrestling, gymnastics, lacrosse, badminton, softball, table tennis/ping pong, skiing, snowboarding, surfing, skateboarding, cycling, bowling, fencing, archery, karate, mma, rowing, water polo, handball, field hockey, figure skating, curling, polo, squash, diving, equestrian, judo, taekwondo, triathlon, pickleball, dodgeball, ultimate frisbee, bobsled, luge, skeleton, biathlon, sailing, kayaking, rock climbing, darts, snooker, billiards/pool, netball, kabaddi, sepak takraw, hurling, jai alai, korfball, bandy, underwater hockey, bossaball, sumo, cornhole, hacky sack",
  },
  {
    id: "board-games",
    pack: "sports",
    text: "A board game",
    answers:
      "monopoly, chess, checkers, scrabble, clue/cluedo, sorry, candy land, risk, the game of life/life, battleship, trouble, connect four, catan/settlers of catan, operation, guess who, backgammon, go, mouse trap, chutes and ladders/snakes and ladders, pictionary, trivial pursuit, stratego, ticket to ride, mancala, othello, parcheesi/ludo, yahtzee, jenga, boggle, pandemic, codenames, carcassonne, chinese checkers, taboo, cranium, apples to apples, hungry hungry hippos, axis and allies, dominion, azul, splendor, wingspan, gloomhaven, mahjong, shogi, xiangqi, agricola, puerto rico, twilight struggle, terraforming mars, root, scythe, diplomacy, hive, blokus, quoridor, onitama, tak, hnefatafl, nine men's morris, pente",
  },
  {
    id: "olympic",
    pack: "sports",
    text: "An event at the Olympics",
    answers:
      "swimming, gymnastics, track, 100m/100 meter dash, diving, basketball, soccer, volleyball, boxing, wrestling, figure skating, hockey, skiing, snowboarding, marathon, long jump, high jump, pole vault, javelin, shot put, discus, hurdles, relay, fencing, archery, cycling, rowing, tennis, beach volleyball, bobsled, luge, curling, speed skating, weightlifting, judo, taekwondo, triathlon, water polo, equestrian, shooting, sailing, canoe, kayak, table tennis, badminton, handball, golf, rugby sevens, surfing, skateboarding, sport climbing, breaking, synchronized swimming/artistic swimming, trampoline, rhythmic gymnastics, decathlon, heptathlon, hammer throw, triple jump, steeplechase, modern pentathlon, biathlon, skeleton, ski jumping, nordic combined, moguls, slalom, halfpipe, race walking, keirin, omnium, madison",
  },

  // Everyday
  {
    id: "kitchen",
    pack: "everyday",
    text: "Something in a kitchen",
    answers:
      "fridge/refrigerator, stove, oven, microwave, sink, knife, spoon, fork, plate, cup, bowl, toaster, pan, pot, dishwasher, blender, spatula, cutting board, kettle, coffee maker, table, chair, cabinet, freezer, mug, glass, napkin, oven mitt, whisk, ladle, colander, grater, can opener, measuring cup, rolling pin, tongs, peeler, apron, paper towel, trash can, sponge, dish soap, timer, mixer, air fryer, slow cooker/crock pot, cookbook, tupperware, foil, cling wrap, baking sheet, wok, mortar and pestle, salad spinner, zester, mandoline, pastry brush, garlic press, sieve, funnel, skillet, dutch oven, trivet, butter dish, bread box, spice rack, lazy susan, ramekin, cheesecloth, baster, bench scraper",
  },
  {
    id: "school",
    pack: "everyday",
    text: "Something you'd find in a school",
    answers:
      "desk, teacher, pencil, book, whiteboard, chair, student, backpack, locker, paper, chalkboard, pen, eraser, computer, notebook, ruler, principal, cafeteria, gym, library, clock, calculator, scissors, glue, marker, crayon, flag, map, globe, bus, projector, homework, textbook, stapler, bell, bathroom, hallway, playground, nurse, janitor, binder, folder, highlighter, lunchbox, trophy, microscope, poster, bulletin board, water fountain, pencil sharpener, lab, auditorium, fire alarm, tape, protractor, compass, bleachers, hall pass, lost and found, detention, tardy slip, periodic table, beaker, bunsen burner, yearbook, scantron, mascot",
  },
  {
    id: "clothing",
    pack: "everyday",
    text: "An item of clothing",
    answers:
      "shirt, pants, socks, shoes, jacket, hat, dress, skirt, sweater, shorts, hoodie, jeans, t shirt, coat, underwear, scarf, gloves, boots, tie, belt, sweatpants, leggings, pajamas, bra, vest, blouse, suit, sandals, sneakers, beanie, cardigan, tank top, swimsuit, mittens, overalls, robe, polo, blazer, flip flops, jumpsuit, romper, tuxedo, poncho, kimono, sari, turtleneck, cap, bow tie, apron, cape, tights, crop top, windbreaker, parka, slippers, loafers, heels, onesie, kilt, sarong, toga, fedora, beret, bandana, suspenders, corset, tunic, caftan, dashiki, hanbok, cummerbund, ascot, balaclava, spats, jodhpurs",
  },
  {
    id: "instruments",
    pack: "everyday",
    text: "A musical instrument",
    answers:
      "guitar, piano, drums, violin, flute, trumpet, saxophone, clarinet, cello, bass, harp, ukulele, trombone, keyboard, harmonica, tuba, xylophone, banjo, accordion, french horn, oboe, tambourine, recorder, viola, bagpipes, triangle, organ, cymbals, bongos, bassoon, mandolin, synthesizer, electric guitar, harpsichord, piccolo, maracas, glockenspiel, kazoo, sitar, marimba, didgeridoo, steel drum, cowbell, castanets, lute, timpani, double bass, kalimba, tabla, erhu, koto, shamisen, balalaika, bouzouki, theremin, hurdy gurdy, zither, dulcimer, ocarina, sousaphone, euphonium, cornet, flugelhorn, djembe, cajon, gong, oud, kora, hang drum/handpan, celesta, bandoneon, nyckelharpa",
  },
  {
    id: "jobs",
    pack: "everyday",
    text: "A job",
    answers:
      "doctor, teacher, nurse, firefighter, police officer/cop, lawyer, chef, engineer, dentist, pilot, farmer, scientist, artist, programmer/software engineer, accountant, mechanic, cashier, waiter/waitress/server, plumber, electrician, veterinarian/vet, construction worker, astronaut, actor, singer, writer/author, architect, pharmacist, janitor, mail carrier/mailman, baker, carpenter, judge, surgeon, soldier, banker, barber, hairdresser, librarian, photographer, journalist, therapist, designer, truck driver, athlete, lifeguard, dj, zookeeper, florist, tailor, butcher, welder, plumber, locksmith, paramedic, psychologist, translator, economist, geologist, archaeologist, sommelier, actuary, cartographer, taxidermist, farrier, cooper, chandler, luthier, ombudsman, stenographer, glazier, falconer, embalmer, horologist",
  },
  {
    id: "colors",
    pack: "everyday",
    text: "A color",
    answers:
      "red, blue, green, yellow, purple, orange, pink, black, white, brown, gray/grey, teal, turquoise, magenta, maroon, navy, gold, silver, violet, indigo, cyan, lavender, beige, tan, lime, coral, peach, cream, burgundy, mint, olive, crimson, scarlet, aqua, lilac, salmon, mauve, rust, emerald, sapphire, ruby, amber, bronze, charcoal, ivory, khaki, fuchsia, periwinkle, chartreuse, taupe, ochre, sienna, vermilion, cerulean, cobalt, mustard, plum, sepia, umber, puce, celadon, viridian, heliotrope, gamboge, smaragdine, wenge, falu red, glaucous, xanadu, zaffre",
  },
  {
    id: "bathroom",
    pack: "everyday",
    text: "Something in a bathroom",
    answers:
      "toilet, sink, shower, bathtub, toothbrush, toothpaste, towel, soap, mirror, toilet paper, shampoo, conditioner, comb, brush, razor, deodorant, floss, mouthwash, plunger, trash can, rug/bath mat, shower curtain, lotion, hair dryer, cabinet, scale, faucet, loofah, body wash, cotton swabs/q tips, cotton balls, tissues, nail clippers, tweezers, makeup, perfume, cologne, sponge, toilet brush, air freshener, candle, bidet, towel rack, drain, hand sanitizer, shaving cream, face wash, sunscreen, bath bomb, rubber duck, pumice stone, squeegee, exhaust fan, grout, caulk, bath salts, loofah, tongue scraper, waterpik",
  },

  // Words
  {
    id: "words-q",
    pack: "words",
    text: "A word that starts with Q",
    answers:
      "queen, quiet, quick, question, quilt, quit, quarter, quite, quiz, quack, quail, quality, quote, queue, quest, quarrel, quench, quirky, quartz, quarantine, quiver, quaint, quake, quantum, quantity, quarry, query, quibble, quiche, quill, quinoa, quota, quotient, quasar, quadrant, quadrilateral, quagmire, qualm, quandary, quark, quash, queasy, quell, quietude, quintessential, quintet, quip, quirk, quixotic, quorum, quokka, quetzal, quahog, quaff, quiescent, quidnunc, quisling, quincunx, quoin, quotidian",
  },
  {
    id: "words-x",
    pack: "words",
    text: "A word that contains the letter X",
    answers:
      "box, fox, six, fix, mix, tax, wax, taxi, next, text, sixty, extra, exit, exam, example, excited, expert, explain, oxygen, xylophone, x ray, relax, index, complex, galaxy, toxic, boxer, mixer, axe, flex, lynx, sphinx, onyx, climax, detox, saxophone, luxury, anxiety, exotic, maximum, taxidermy, xenophobia, paradox, syntax, suffix, prefix, vortex, apex, annex, hoax, jinx, coax, pixel, vixen, axolotl, xenon, xerox, xylem, flux, calyx, borax, larynx, pharynx, oryx, ibex, phlox, exegesis, xeric, xanthic, xiphoid",
  },
  {
    id: "rhymes-cat",
    pack: "words",
    text: "A word that rhymes with CAT",
    answers:
      "hat, bat, rat, mat, sat, fat, pat, that, chat, flat, splat, vat, brat, spat, gnat, slat, drat, scat, at, tat, acrobat, format, combat, habitat, doormat, laundromat, diplomat, aristocrat, democrat, thermostat, wombat, hazmat, cravat, begat, caveat, dingbat, fiat, nougat, sprat, frat, plat, stat, tomcat, bobcat, polecat, copycat, fruit bat, welcome mat, top hat, format, spermaceti, ziggurat, autocrat, bureaucrat, technocrat, plutocrat, apparat, samizdat",
  },
  {
    id: "compound-sun",
    pack: "words",
    text: "A word or phrase that starts with SUN",
    answers:
      "sunflower, sunshine, sunglasses, sunset, sunrise, sunburn, sunday, sunscreen, sunny, sundae, sunlight, sundown, sunbathe, sunroof, sunblock, sunspot, sundial, sunbeam, suntan, sunken, sunk, sunstroke, sundry, sunfish, sunlit, sunroom, sundress, sunhat, sunbird, sunder, sunlamp, sunporch, sunup, sunbelt, sunshade, sunbonnet, sunrise industry, sunstone, sundew, sunward, sunna, sunnah, sunnite",
  },
];
