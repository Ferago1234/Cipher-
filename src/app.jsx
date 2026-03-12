import { useState } from "react";

// --- NUMEROLOGY ENGINE ------------------------------------------------------
const PYT={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8};
const CHAL={A:1,I:1,J:1,Q:1,Y:1,B:2,K:2,R:2,C:3,G:3,L:3,S:3,D:4,M:4,T:4,E:5,H:5,N:5,X:5,U:6,V:6,W:6,O:7,Z:7,F:8,P:8};
function reduce(n,keep=true){if(keep&&(n===11||n===22||n===33))return n;if(n<10)return n;return reduce(String(n).split("").reduce((a,d)=>a+parseInt(d),0),keep);}
function calcLPDetail(dob){const[year,month,day]=dob.split("-").map(Number);const m=reduce(month,false),d=reduce(day,false),y=reduce(String(year).split("").reduce((a,c)=>a+parseInt(c),0),false),raw=m+d+y,lp=reduce(raw,true);return{lp,raw,karmic:[13,14,16,19].includes(raw)?raw:null,isMaster:[11,22,33].includes(lp)};}
function calcExpr(name,map=PYT){return reduce(name.toUpperCase().replace(/[^A-Z]/g,"").split("").reduce((a,c)=>a+(map[c]||0),0),true);}
function calcPY(dob,yr){const[,m,d]=dob.split("-").map(Number);return reduce(reduce(m,false)+reduce(d,false)+reduce(String(yr).split("").reduce((a,c)=>a+parseInt(c),0),false),true);}
function calcPD(dob,date){const py=calcPY(dob,new Date(date).getFullYear());const[,m,d]=date.split("-").map(Number);return reduce(py+reduce(m,false)+reduce(d,false),true);}

// --- LIFE PATH DATA ---------------------------------------------------------
const LP={1:{color:"#ff6b35",title:"The Sovereign",sub:"Pioneer -- Leader -- Independent Force",keys:["Leadership","Independence","Ambition","Initiative","Courage"],core:"Life Path 1 is the frequency of the self-starter. You came here to lead -- not follow, not manage from the middle, not wait for permission. The number 1 represents pure initiation energy: the spark before the fire, the decision before the movement.",strengths:"You possess an instinctive command presence. People feel your direction before you speak. When operating at highest expression, you are decisive without being reckless, independent without being isolated, bold without being arrogant.",challenges:"The shadow side is the ego trap. Dominance becomes domination, confidence becomes arrogance, independence becomes isolation. You are also prone to impatience -- your internal clock runs faster than most.",directive:"Stop asking for consensus on decisions that are yours to make. Build something that reflects your full capacity, not a safe version of it.",famous:"Steve Jobs, Martin Luther King Jr., Nikola Tesla, Lady Gaga"},2:{color:"#4fc3f7",title:"The Strategist",sub:"Diplomat -- Mediator -- Relational Intelligence",keys:["Cooperation","Sensitivity","Balance","Partnership","Patience"],core:"Life Path 2 operates on relational frequency. Where LP1 initiates alone, LP2 excels in partnership. The 2 frequency is the intelligence behind alliances, the perception that reads a room before anyone speaks.",strengths:"Your emotional intelligence is your primary asset. You feel what others miss, hear what is not said, and know how to bring competing forces into alignment.",challenges:"The LP2 shadow is self-erasure. You can become so focused on accommodating others that you lose your own position.",directive:"Stop undervaluing your contribution because it is not the loudest in the room. Not every conflict needs to be resolved -- some need to be won.",famous:"Barack Obama, Jennifer Aniston, Diana Ross, Bill Clinton"},3:{color:"#ffd54f",title:"The Amplifier",sub:"Creator -- Communicator -- Social Architect",keys:["Creativity","Expression","Communication","Joy","Charisma"],core:"Life Path 3 is the frequency of creative output and social magnetism. You came here to express -- through language, art, humor, performance, or any medium that allows your internal world to reach others.",strengths:"You have an innate ability to communicate -- to make complex things simple, dry things alive, and silent rooms loud. People are drawn to your presence.",challenges:"The LP3 shadow is dispersion. Your energy scatters easily across too many projects. Follow-through is the perennial weak point.",directive:"You are not here to entertain people -- you are here to create work that matters. Choose one medium and go deep.",famous:"David Bowie, Cate Blanchett, John Travolta, Christina Aguilera"},4:{color:"#81c784",title:"The Architect",sub:"Builder -- Executor -- System Designer",keys:["Structure","Discipline","Reliability","Patience","Practicality"],core:"Life Path 4 is the frequency of construction. You came here to build -- systems, institutions, foundations, and structures that outlast the moment.",strengths:"Your reliability is exceptional. You follow through. You build things correctly the first time. Organizations that run on LP4 energy are stable, process-driven, and effective.",challenges:"The LP4 shadow is rigidity. Your commitment to process can become a refusal to adapt. Rules become law.",directive:"Do not confuse stability with stagnation. Your greatest work requires you to hold structure and flexibility simultaneously.",famous:"Oprah Winfrey, Elton John, Bill Gates, Arnold Schwarzenegger"},5:{color:"#ff8a65",title:"The Disruptor",sub:"Freedom Seeker -- Agent of Change -- Adaptable Force",keys:["Freedom","Adventure","Adaptability","Versatility","Change"],core:"Life Path 5 is the frequency of freedom, motion, and change. You came here to experience -- broadly, deeply, and without unnecessary restriction.",strengths:"You are extraordinarily adaptable. Where others freeze under changing conditions, you thrive. You pick up new skills rapidly and recover from setbacks faster.",challenges:"The LP5 shadow is avoidance of depth. When freedom becomes the highest value, you can spend a life collecting experiences without building anything that endures.",directive:"Freedom without direction is just movement. The discipline to stay in one place long enough to master it is not the death of your freedom.",famous:"Mick Jagger, Vincent Van Gogh, Malcolm X, Angelina Jolie"},6:{color:"#f48fb1",title:"The Connector",sub:"Nurturer -- Responsible Force -- Community Anchor",keys:["Responsibility","Love","Nurturing","Service","Harmony"],core:"Life Path 6 is the frequency of responsibility, care, and community. You came here to serve as the person who holds things together and invests in the well-being of those around them.",strengths:"Your capacity to care is a force multiplier. Teams, families, and organizations anchored by LP6 energy have warmth and cohesion that is difficult to manufacture.",challenges:"The LP6 shadow is martyrdom and control masked as care. You can give so much that you create dependency rather than growth.",directive:"You cannot pour from an empty vessel. Define your non-negotiables, protect your own resources.",famous:"Michael Jackson, Albert Einstein, John Lennon, Meryl Streep"},7:{color:"#9575cd",title:"The Oracle",sub:"Analyst -- Truth Seeker -- Depth Intelligence",keys:["Analysis","Wisdom","Introspection","Research","Truth"],core:"Life Path 7 is the frequency of depth, inquiry, and inner knowing. You came here to understand -- not surface-level understanding, but the kind that requires sustained focus and solitude.",strengths:"Your analytical capacity is exceptional. You see through surfaces quickly and identify patterns others miss. Your standards for truth are high.",challenges:"The LP7 shadow is isolation. Your need for solitude can tip into withdrawal from connection. You can become so invested in analysis that you lose the capacity to act.",directive:"Your depth is only useful if it gets out of your head. Develop the capacity for vulnerability -- it is how your knowledge becomes influence.",famous:"Princess Diana, Muhammad Ali, Marilyn Monroe, Taylor Swift"},8:{color:"#ffb300",title:"The Operator",sub:"Executive Force -- Power -- Legacy Builder",keys:["Power","Ambition","Authority","Financial Mastery","Legacy"],core:"Life Path 8 is the frequency of power, authority, and material mastery. You came here to build something significant -- an enterprise, institution, or body of work that commands respect.",strengths:"You have an instinctive grasp of how power works -- operationally, not theoretically. You understand incentives, systems, and the relationship between effort and outcome.",challenges:"The LP8 shadow is the misuse of power. The LP8 who has not learned to manage the energy of money will cycle through gain and loss repeatedly.",directive:"Power without ethics is a liability that compounds. Build on integrity, not just intelligence.",famous:"Pablo Picasso, 50 Cent, Jason Statham, Naomi Campbell"},9:{color:"#ef5350",title:"The Closer",sub:"Humanitarian -- Wisdom -- Completion Energy",keys:["Completion","Wisdom","Compassion","Service","Release"],core:"Life Path 9 is the frequency of completion, wisdom, and humanitarian drive. You came here to close cycles. The 9 energy has absorbed the lessons of all numbers before it.",strengths:"Your capacity for empathy is vast and your perspective is wide. You can see the whole board, not just your piece. You are a natural closer.",challenges:"The LP9 shadow is attachment disguised as completion. You can hold on to finished relationships, dead projects, and expired identities.",directive:"You were not built for small rooms. Scale your compassion, your contribution, and your expectations.",famous:"Mahatma Gandhi, Morgan Freeman, Jim Carrey, Cher"},11:{color:"#ce93d8",title:"The Antenna",sub:"Master Intuitive -- Visionary -- High-Frequency Channel",keys:["Intuition","Inspiration","Vision","Spiritual Awareness","Sensitivity"],isMaster:true,core:"Life Path 11 is the first Master Number -- a double-digit vibration not reduced because it carries an amplified frequency the single digits cannot contain. The 11 is the antenna: you receive signals from frequencies most people cannot tune into.",strengths:"Your perceptual range is extraordinary. You pick up on emotional undercurrents, hidden dynamics, and future trends before they become visible to others.",challenges:"The LP11 shadow is the gap between vision and execution. You receive the signal clearly but struggle to translate it into structure. Self-doubt is the primary ceiling.",directive:"Your intuition is a precision instrument -- stop apologizing for conclusions you cannot immediately explain.",famous:"Bill Clinton, Barack Obama, Edgar Allan Poe, Orlando Bloom"},22:{color:"#4db6ac",title:"The Builder",sub:"Master Constructor -- Visionary Architect -- Legacy Engineer",keys:["Vision","Construction","Legacy","Power","Discipline"],isMaster:true,core:"Life Path 22 is the Master Builder -- the highest constructive frequency in numerology. Where LP4 builds what exists, LP22 builds what has never existed. You came here to manifest vision at scale.",strengths:"Your ability to hold a large vision while managing granular details of execution is unmatched. When fully activated, LP22s produce work that outlasts them.",challenges:"The LP22 shadow is the weight of the mandate. The awareness of what you are capable of can become paralyzing.",directive:"The blueprint in your head is not the work -- the work is the work. Stop refining the plan and start executing it.",famous:"Bill Gates, Dalai Lama, Will Smith, Bryan Adams"},33:{color:"#f06292",title:"The Transmitter",sub:"Master Teacher -- Healer -- Highest Service Frequency",keys:["Teaching","Healing","Compassion","Sacrifice","Mastery"],isMaster:true,core:"Life Path 33 is the rarest and most demanding Master Number -- the Master Teacher frequency. This is not a path of personal achievement; it is a path of service at the highest level.",strengths:"Your capacity for empathy and breadth of understanding are without parallel in numerology. You do not just understand suffering -- you alchemize it into wisdom.",challenges:"The LP33 shadow is self-sacrifice to the point of self-destruction. Many LP33s carry wounds so deep they spend their lives healing others as a proxy for healing themselves.",directive:"Your healing begins with you. The world does not need you martyred -- it needs you whole, clear, and transmitting at full capacity.",famous:"Albert Einstein, Stephen King, Heather Locklear, Francis Ford Coppola"}};

const KARMIC={13:{color:"#ff5252",title:"Karmic Debt 13/4 -- The Discipline Debt",core:"The 13/4 Karmic Debt signals that in a previous cycle, the energy of effort and commitment was avoided. This lifetime activates a course correction. Nothing comes easily for the 13/4 carrier because ease was what was abused.",lesson:"Develop an unshakeable work ethic as the foundation of self-respect.",watchFor:"Procrastination, self-sabotage at the threshold of success, giving up when work gets hard.",directive:"The obstacles are the curriculum. Do not circumvent them."},14:{color:"#ff9800",title:"Karmic Debt 14/5 -- The Freedom Debt",core:"The 14/5 Karmic Debt indicates that freedom was abused in a previous cycle. This lifetime delivers the corrective: freedom must be earned through discipline.",lesson:"Learn moderation as a strategy, not a restriction.",watchFor:"Addiction patterns, commitment avoidance, reckless decisions.",directive:"Self-discipline is not the enemy of your freedom -- it is the mechanism by which freedom becomes permanent."},16:{color:"#7c4dff",title:"Karmic Debt 16/7 -- The Ego Debt",core:"The 16/7 Karmic Debt is the most intense -- known as the Tower number. It signals that ego and the misuse of power in relationships were dominant patterns. Structural collapses are designed to dismantle ego constructions.",lesson:"Humility is the medicine. Every collapse is an invitation to rebuild on integrity.",watchFor:"Self-sabotage at the peak of success, relationships that implode suddenly.",directive:"Stop rebuilding the same structure with the same materials."},19:{color:"#00bcd4",title:"Karmic Debt 19/1 -- The Independence Debt",core:"The 19/1 Karmic Debt signals that power and independence were wielded in ways that caused suffering. Situations will consistently arise requiring interdependence and vulnerability.",lesson:"True leadership is not the elimination of need -- it is the responsible management of it.",watchFor:"The one-man-army pattern -- refusing help until the situation becomes a crisis.",directive:"Release the belief that needing others diminishes you."}};

// --- CHINESE ZODIAC DATA -----------------------------------------------------
const CZ_DATA={Rat:{color:"#ef5350",years:"1924,1936,1948,1960,1972,1984,1996,2008,2020",traits:"Intelligent, adaptable, quick-witted, charming, resourceful",core:"The Rat is the first sign in the Chinese zodiac and carries the energy of intelligence, adaptability, and strategic thinking. Rats are natural survivors -- they assess situations quickly and execute with precision.",strengths:"Exceptional intelligence, resourcefulness, persuasion, adaptability, and financial instinct.",challenges:"Tendency toward opportunism, hoarding resources, overcalculating, and anxiety when plans go off-course.",compatible:"Dragon, Monkey, Ox"},Ox:{color:"#8d6e63",years:"1925,1937,1949,1961,1973,1985,1997,2009,2021",traits:"Dependable, strong, determined, honest, methodical",core:"The Ox is the anchor of the Chinese zodiac -- steady, reliable, and built for the long haul. This is the sign of the farmer, the builder, the institution-maker.",strengths:"Unmatched reliability, physical and mental endurance, honesty, and the ability to execute sustained effort over long periods.",challenges:"Stubbornness, resistance to change, tendency to hold grudges.",compatible:"Snake, Rooster, Rat"},Tiger:{color:"#ff8a65",years:"1926,1938,1950,1962,1974,1986,1998,2010,2022",traits:"Brave, confident, competitive, unpredictable, charismatic",core:"The Tiger is the sign of courage, authority, and magnetic power. Tigers are natural leaders who lead from the front -- they charge. This energy commands rooms.",strengths:"Courage, leadership presence, decisiveness, loyalty to those they protect.",challenges:"Impulsiveness, arrogance, difficulty accepting authority from others.",compatible:"Horse, Dog, Pig"},Rabbit:{color:"#ce93d8",years:"1927,1939,1951,1963,1975,1987,1999,2011,2023",traits:"Gracious, diplomatic, sensitive, cautious",core:"The Rabbit is the diplomat of the Chinese zodiac -- gracious, perceptive, and skilled at navigating difficult social terrain without triggering conflict.",strengths:"Social intelligence, tact, aesthetic sensitivity, an ability to create harmonious environments.",challenges:"Avoidance of conflict to the point of enabling bad situations, risk-averse nature.",compatible:"Goat, Pig, Dog"},Dragon:{color:"#4caf50",years:"1928,1940,1952,1964,1976,1988,2000,2012,2024",traits:"Confident, intelligent, enthusiastic, ambitious, charismatic",core:"The Dragon is the only mythical creature in the Chinese zodiac and carries mythic energy -- grand ambition, natural authority, and a magnetic force that draws others in.",strengths:"Natural leadership, vision, energy, charisma, and an ability to inspire others to do more.",challenges:"Ego, perfectionism, impatience, and an inability to accept defeat gracefully.",compatible:"Rat, Monkey, Rooster"},Snake:{color:"#26a69a",years:"1929,1941,1953,1965,1977,1989,2001,2013,2025",traits:"Wise, intuitive, elegant, private, determined",core:"The Snake is the deepest thinker in the Chinese zodiac. Where the Dragon leads with power, the Snake leads with wisdom. Snakes observe, process, and move with precision.",strengths:"Deep intuition, analytical capacity, strategic patience, elegance in all things.",challenges:"Possessiveness, jealousy, and a tendency toward suspicion.",compatible:"Ox, Rooster, Monkey"},Horse:{color:"#ff7043",years:"1930,1942,1954,1966,1978,1990,2002,2014,2026",traits:"Energetic, independent, impatient, cheerful, adventurous",core:"The Horse is the sign of freedom, movement, and high energy. Horses are performative, social, and driven by variety. Confinement of any kind is intolerable.",strengths:"Energy, enthusiasm, adaptability, social ease, and an ability to inspire with natural charisma.",challenges:"Impatience, impulsiveness, commitment avoidance.",compatible:"Tiger, Dog, Goat"},Goat:{color:"#66bb6a",years:"1931,1943,1955,1967,1979,1991,2003,2015,2027",traits:"Gentle, compassionate, creative, persistent",core:"The Goat is the creative heart of the Chinese zodiac -- sensitive, artistic, and deeply compassionate. This is the sign of the artisan, the healer, and the empathetic advisor.",strengths:"Creativity, empathy, persistence, aesthetic sensibility, and an ability to bring comfort.",challenges:"Passivity, dependence on others' approval, difficulty with confrontation.",compatible:"Rabbit, Pig, Horse"},Monkey:{color:"#ffa726",years:"1932,1944,1956,1968,1980,1992,2004,2016,2028",traits:"Witty, intelligent, mischievous, versatile, innovative",core:"The Monkey is the innovator and improviser of the Chinese zodiac -- quick, clever, and perpetually solution-oriented. The Monkey sees puzzles to be solved.",strengths:"Exceptional intelligence, creativity, humor, adaptability, and an ability to generate solutions at speed.",challenges:"Restlessness, unreliability when bored, tendency toward manipulation.",compatible:"Rat, Dragon, Snake"},Rooster:{color:"#ef5350",years:"1933,1945,1957,1969,1981,1993,2005,2017,2029",traits:"Observant, hardworking, courageous, talented, confident",core:"The Rooster is the perfectionist of the Chinese zodiac -- precise, organized, and deeply invested in doing things correctly. This is the sign of the expert and the craftsperson.",strengths:"Attention to detail, organizational capacity, honest communication, reliability.",challenges:"Critical nature, bluntness, inflexibility, perfectionism that can stall progress.",compatible:"Ox, Snake, Dragon"},Dog:{color:"#8d6e63",years:"1934,1946,1958,1970,1982,1994,2006,2018,2030",traits:"Loyal, honest, kind, cautious, communicative",core:"The Dog is the most loyal sign in the Chinese zodiac -- devoted to those it loves, fiercely protective, and driven by an innate sense of justice.",strengths:"Loyalty, honesty, protective instinct, reliability in a crisis, and a deep moral compass.",challenges:"Anxiety, pessimism, tendency to worry, difficulty trusting new people.",compatible:"Tiger, Horse, Rabbit"},Pig:{color:"#ab47bc",years:"1935,1947,1959,1971,1983,1995,2007,2019,2031",traits:"Generous, diligent, sincere, compassionate, optimistic",core:"The Pig is the most generous and big-hearted sign in the Chinese zodiac. Pigs give freely, trust openly, and bring an optimistic warmth to every environment.",strengths:"Generosity, sincerity, diligence, an ability to build genuine warmth in communities.",challenges:"Naivety, over-indulgence, reluctance to confront difficult truths.",compatible:"Rabbit, Goat, Tiger"}};

const FIVE_EL={Wood:{color:"#66bb6a",years:"ends in 4 or 5",core:"Wood is the element of growth, creativity, and outward expansion. Wood-element individuals are driven by vision and the desire to build.",strengths:"Creativity, compassion, idealism, cooperative spirit, and long-range thinking.",challenges:"Indecision, over-commitment, and a tendency to bend too easily under pressure.",animals:"Tiger (1974, 1986), Rabbit (1975, 1987)"},Fire:{color:"#ff7043",years:"ends in 6 or 7",core:"Fire is the element of passion, leadership, and transformation. Fire-element individuals burn bright -- they are enthusiastic, charismatic, and energized by challenge.",strengths:"Courage, decisiveness, charisma, enthusiasm, and an ability to inspire others into action.",challenges:"Impulsiveness, aggression, burnout, and tendency toward dramatic responses.",animals:"Dragon (1976, 1988), Snake (1977, 1989)"},Earth:{color:"#8d6e63",years:"ends in 8 or 9",core:"Earth is the element of stability, reliability, and groundedness. Earth-element individuals are the anchor of the five-element system.",strengths:"Reliability, practicality, patience, fairness, and the ability to provide stability in turbulent environments.",challenges:"Stubbornness, resistance to change, over-caution.",animals:"Ox (1949, 1961), Dragon (1988, 2000), Goat (1979, 1991)"},Metal:{color:"#90a4ae",years:"ends in 0 or 1",core:"Metal is the element of precision, discipline, and refinement. Metal-element individuals have high standards and enforce them.",strengths:"Discipline, precision, determination, the ability to set and hold boundaries.",challenges:"Rigidity, harshness, difficulty accepting imperfection.",animals:"Monkey (1980, 1992), Rooster (1981, 1993)"},Water:{color:"#4fc3f7",years:"ends in 2 or 3",core:"Water is the element of wisdom, adaptability, and depth. Water-element individuals are perceptive, fluid, and move around obstacles rather than fighting them.",strengths:"Intelligence, intuition, adaptability, perceptiveness.",challenges:"Indecisiveness, passivity, over-sensitivity, and a tendency toward escapism.",animals:"Rat (1972, 1984), Ox (1973, 1985)"}};

// --- WESTERN ZODIAC DATA -----------------------------------------------------
const WZ={Aries:{color:"#ef5350",dates:"Mar 21 - Apr 19",element:"Fire",modality:"Cardinal",ruler:"Mars",core:"Aries is the first sign and brings pure initiation energy. Ruled by Mars, Aries people are natural pioneers -- they move first, think second, and apologize never.",strengths:"Courage, initiative, directness, competitive drive, and an ability to begin things that others only talk about.",challenges:"Impulsiveness, short temper, difficulty finishing what was started.",directive:"Your instinct to move first is your greatest asset -- the challenge is learning which battles are worth starting.",compatible:"Leo, Sagittarius, Gemini, Aquarius"},Taurus:{color:"#8d6e63",dates:"Apr 20 - May 20",element:"Earth",modality:"Fixed",ruler:"Venus",core:"Taurus is the builder and sustainer. Ruled by Venus, Taurus combines earthy practicality with a deep appreciation for beauty, quality, and comfort.",strengths:"Reliability, patience, sensory intelligence, financial instinct.",challenges:"Stubbornness, possessiveness, resistance to necessary change.",directive:"Your capacity for sustained effort is exceptional -- ensure it is directed toward growth, not just maintenance.",compatible:"Virgo, Capricorn, Cancer, Pisces"},Gemini:{color:"#ffd54f",dates:"May 21 - Jun 20",element:"Air",modality:"Mutable",ruler:"Mercury",core:"Gemini is the connector and communicator. Ruled by Mercury, Gemini processes information at extraordinary speed and moves between ideas with a fluidity that is actually a form of intelligence.",strengths:"Intellectual agility, communication, adaptability, humor.",challenges:"Inconsistency, superficiality, difficulty with sustained commitment.",directive:"Your mind is one of your most powerful assets -- breadth without depth leaves potential unrealized.",compatible:"Aquarius, Libra, Aries, Leo"},Cancer:{color:"#4fc3f7",dates:"Jun 21 - Jul 22",element:"Water",modality:"Cardinal",ruler:"Moon",core:"Cancer is the protector and nurturer. Ruled by the Moon, Cancer operates through emotional intelligence, instinct, and a fierce devotion to those it loves.",strengths:"Emotional intelligence, loyalty, intuition, nurturing capacity.",challenges:"Moodiness, over-sensitivity, difficulty releasing the past.",directive:"Your sensitivity is a superpower -- not a liability to be toughened out of.",compatible:"Scorpio, Pisces, Taurus, Virgo"},Leo:{color:"#ffb300",dates:"Jul 23 - Aug 22",element:"Fire",modality:"Fixed",ruler:"Sun",core:"Leo is the sign of self-expression, leadership, and creative authority. Ruled by the Sun, Leo radiates -- it cannot help but command attention.",strengths:"Charisma, generosity, creative energy, leadership presence.",challenges:"Pride, need for recognition, tendency toward drama.",directive:"The world needs the real Leo, not just the show.",compatible:"Aries, Sagittarius, Gemini, Libra"},Virgo:{color:"#81c784",dates:"Aug 23 - Sep 22",element:"Earth",modality:"Mutable",ruler:"Mercury",core:"Virgo is the analyst and perfectionist. Ruled by Mercury, Virgo combines earthy practicality with razor-sharp analytical intelligence.",strengths:"Analytical precision, organizational capacity, attention to detail, reliability.",challenges:"Overcritical nature, perfectionism that stalls progress, anxiety.",directive:"Excellence ships. Perfection never does.",compatible:"Taurus, Capricorn, Cancer, Scorpio"},Libra:{color:"#ce93d8",dates:"Sep 23 - Oct 22",element:"Air",modality:"Cardinal",ruler:"Venus",core:"Libra is the sign of balance, beauty, and relational intelligence. Ruled by Venus, Libra is driven by a deep need for harmony.",strengths:"Diplomatic intelligence, aesthetic sensibility, fairness, social ease.",challenges:"Indecisiveness, conflict avoidance, people-pleasing.",directive:"Balance is a dynamic state. Stop waiting for perfect conditions and start moving.",compatible:"Gemini, Aquarius, Leo, Sagittarius"},Scorpio:{color:"#7c4dff",dates:"Oct 23 - Nov 21",element:"Water",modality:"Fixed",ruler:"Pluto",core:"Scorpio is the sign of depth, transformation, and power. Ruled by Pluto, Scorpio sees through surfaces to what is actually happening.",strengths:"Perceptiveness, strategic intelligence, emotional depth, loyalty.",challenges:"Jealousy, controlling tendencies, difficulty trusting, inability to let go.",directive:"Use your depth for creation rather than control -- transform rather than dominate.",compatible:"Cancer, Pisces, Virgo, Capricorn"},Sagittarius:{color:"#ff8a65",dates:"Nov 22 - Dec 21",element:"Fire",modality:"Mutable",ruler:"Jupiter",core:"Sagittarius is the philosopher and adventurer. Ruled by Jupiter, Sagittarius is driven by a quest for meaning, truth, and the expansion of what is known.",strengths:"Vision, philosophical intelligence, enthusiasm, honesty.",challenges:"Bluntness, chronic over-commitment, restlessness that prevents depth.",directive:"Legacy without follow-through is just good intentions.",compatible:"Aries, Leo, Aquarius, Libra"},Capricorn:{color:"#78909c",dates:"Dec 22 - Jan 19",element:"Earth",modality:"Cardinal",ruler:"Saturn",core:"Capricorn is the executive and strategist. Ruled by Saturn, Capricorn is built for the long game -- methodical, disciplined, and driven by deep ambition.",strengths:"Strategic thinking, discipline, organizational intelligence, patience.",challenges:"Coldness, workaholism, difficulty with vulnerability.",directive:"The summit is the goal, but the journey requires people.",compatible:"Taurus, Virgo, Scorpio, Pisces"},Aquarius:{color:"#4db6ac",dates:"Jan 20 - Feb 18",element:"Air",modality:"Fixed",ruler:"Uranus",core:"Aquarius is the innovator and visionary. Ruled by Uranus, Aquarius is wired to see what does not yet exist and work toward it regardless of whether the current paradigm supports the vision.",strengths:"Visionary thinking, intellectual independence, humanitarian instinct, innovation.",challenges:"Emotional detachment, stubbornness, difficulty with intimacy.",directive:"The future is built in the present.",compatible:"Gemini, Libra, Aries, Sagittarius"},Pisces:{color:"#9575cd",dates:"Feb 19 - Mar 20",element:"Water",modality:"Mutable",ruler:"Neptune",core:"Pisces is the dreamer and empath. Ruled by Neptune, Pisces operates at the boundary between the visible and invisible worlds -- deeply compassionate and imaginatively rich.",strengths:"Empathy, creativity, spiritual depth, adaptability.",challenges:"Escapism, boundary dissolution, difficulty with practical execution.",directive:"Build the structures that protect your sensitivity while allowing it to reach the world.",compatible:"Cancer, Scorpio, Taurus, Capricorn"}};

// --- ZODIAC + COMPAT ENGINES -------------------------------------------------
const CZ_ANIMALS=["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
const CZ_ELEMENTS=["Metal","Water","Wood","Fire","Earth"];
const CZ_TRINITY={Rat:["Dragon","Monkey"],Ox:["Snake","Rooster"],Tiger:["Horse","Dog"],Rabbit:["Goat","Pig"],Dragon:["Rat","Monkey"],Snake:["Ox","Rooster"],Horse:["Tiger","Dog"],Goat:["Rabbit","Pig"],Monkey:["Rat","Dragon"],Rooster:["Ox","Snake"],Dog:["Tiger","Horse"],Pig:["Rabbit","Goat"]};
const CZ_SECRET={Rat:"Ox",Ox:"Rat",Tiger:"Pig",Pig:"Tiger",Rabbit:"Dog",Dog:"Rabbit",Dragon:"Rooster",Rooster:"Dragon",Snake:"Monkey",Monkey:"Snake",Horse:"Goat",Goat:"Horse"};
const CZ_CLASH={Rat:"Horse",Ox:"Goat",Tiger:"Monkey",Rabbit:"Rooster",Dragon:"Dog",Snake:"Pig",Horse:"Rat",Goat:"Ox",Monkey:"Tiger",Rooster:"Rabbit",Dog:"Dragon",Pig:"Snake"};
const W_SIGNS=[{s:"Capricorn",a:[12,22],b:[1,19]},{s:"Aquarius",a:[1,20],b:[2,18]},{s:"Pisces",a:[2,19],b:[3,20]},{s:"Aries",a:[3,21],b:[4,19]},{s:"Taurus",a:[4,20],b:[5,20]},{s:"Gemini",a:[5,21],b:[6,20]},{s:"Cancer",a:[6,21],b:[7,22]},{s:"Leo",a:[7,23],b:[8,22]},{s:"Virgo",a:[8,23],b:[9,22]},{s:"Libra",a:[9,23],b:[10,22]},{s:"Scorpio",a:[10,23],b:[11,21]},{s:"Sagittarius",a:[11,22],b:[12,21]}];
const SIGN_EL={Aries:"Fire",Leo:"Fire",Sagittarius:"Fire",Taurus:"Earth",Virgo:"Earth",Capricorn:"Earth",Gemini:"Air",Libra:"Air",Aquarius:"Air",Cancer:"Water",Scorpio:"Water",Pisces:"Water"};
const SIGN_MOD={Aries:"Cardinal",Cancer:"Cardinal",Libra:"Cardinal",Capricorn:"Cardinal",Taurus:"Fixed",Leo:"Fixed",Scorpio:"Fixed",Aquarius:"Fixed",Gemini:"Mutable",Virgo:"Mutable",Sagittarius:"Mutable",Pisces:"Mutable"};
function getCZ(dob){const[year,month,day]=dob.split("-").map(Number);let y=year;if(month<2||(month===2&&day<4))y--;return{animal:CZ_ANIMALS[((y-1900)%12+12)%12],element:CZ_ELEMENTS[((Math.floor(((y-1900)%10)/2))%5+5)%5],year:y};}
function getSun(dob){const[,m,d]=dob.split("-").map(Number);for(const s of W_SIGNS){if(s.a[0]>s.b[0]){if((m===s.a[0]&&d>=s.a[1])||(m===s.b[0]&&d<=s.b[1]))return s.s;}else if((m===s.a[0]&&d>=s.a[1])||(m===s.b[0]&&d<=s.b[1]))return s.s;}if(m===12&&d>=22)return"Capricorn";if(m===1&&d<=19)return"Capricorn";return"Aries";}
function getMoon(dob,t){const jd=new Date(dob+"T"+(t||"12:00")).getTime()/86400000+2440587.5;return W_SIGNS[((Math.floor(((jd-2451550.1)%27.32166)/27.32166*12))%12+12)%12].s;}
function getRising(dob,t){if(!t)return"Unknown";const[h,m]=t.split(":").map(Number);return W_SIGNS[Math.floor(((h+m/60+40/15)%24)/2)%12].s;}
const LP_HAR={"1-1":70,"1-2":60,"1-3":85,"1-4":55,"1-5":80,"1-6":65,"1-7":75,"1-8":70,"1-9":60,"2-2":65,"2-3":70,"2-4":80,"2-5":55,"2-6":85,"2-7":60,"2-8":50,"2-9":75,"3-3":75,"3-4":60,"3-5":85,"3-6":70,"3-7":65,"3-8":60,"3-9":80,"4-4":70,"4-5":55,"4-6":75,"4-7":80,"4-8":85,"4-9":60,"5-5":65,"5-6":60,"5-7":70,"5-8":55,"5-9":75,"6-6":80,"6-7":70,"6-8":65,"6-9":85,"7-7":75,"7-8":60,"7-9":70,"8-8":70,"8-9":55,"9-9":80};
const LP_NOTES={"1-1":"Two sovereigns. High output when goals align, power struggle when they diverge.","1-2":"LP1 sets direction; LP2 executes. Strong if roles are respected.","1-3":"Highest-output creative pairing. LP1 provides vision, LP3 provides the audience.","1-4":"LP1 moves fast, LP4 demands process. Can build something lasting if LP1 slows down.","1-5":"Dynamic and fast-moving. Outstanding short-term. Long-term requires both to plant flags.","1-6":"LP1's ambition meets LP6's investment. LP6 will give everything -- LP1 must reciprocate.","1-7":"LP7 sees through LP1's performance. When trust lands, LP7 becomes LP1's most valuable advisor.","1-8":"Two power frequencies. LP1 wants dominance; LP8 wants legacy. Bridgeable gap.","1-9":"LP9 challenges LP1's ego with a bigger vision.","2-2":"Deep mutual understanding, prone to stagnation.","2-3":"LP3 animates LP2's careful planning. LP2 provides structure LP3 ignores.","2-4":"Extremely stable. Risk: zero appetite for disruption.","2-5":"LP5 pulls LP2 out of comfort zones. LP2 acts as the brake system.","2-6":"Highest relational compatibility. Both prioritize harmony.","2-7":"Works when each respects the other's process.","2-8":"LP8's intensity can overwhelm LP2. LP8 must bring LP2 into decisions.","2-9":"LP9 sees the big picture; LP2 sees the people in it. Highly complementary.","3-3":"Explosive creative output, minimal follow-through.","3-4":"LP4's structure vs LP3's freedom. Productive when roles are clearly separated.","3-5":"High-frequency creative-freedom pairing.","3-6":"LP3 creates, LP6 curates. Strong creative-operational pairing.","3-7":"LP3 broadcasts; LP7 decodes. Mutual respect for depth is the bridge.","3-8":"LP8 wants results; LP3 wants resonance. Can build powerful brand-driven enterprises.","3-9":"High-vision pairing. Risk: no one minds operational details.","4-4":"Maximum stability, minimum velocity.","4-5":"LP5 introduces volatility into LP4's system. Requires negotiated boundaries.","4-6":"Solid long-term foundation.","4-7":"Unexpectedly strong. LP4 builds the structure LP7 needs to think clearly.","4-8":"Highest business compatibility. LP4 architects; LP8 monetizes.","4-9":"LP9 wants to complete; LP4 wants to maintain.","5-5":"Two disruptors, zero infrastructure.","5-6":"LP6 attempts to ground LP5's restlessness; LP5 finds this controlling.","5-7":"Formidable intelligence-operations pair.","5-8":"LP5 generates opportunity; LP8 converts it.","5-9":"Both at high frequency. Push each other forward if timelines sync.","6-6":"Deep mutual investment. Without external purpose, can become insular.","6-7":"Works when LP6 reads LP7's withdrawal correctly.","6-8":"LP6's warmth softens LP8's transactional edge.","6-9":"Both in service mode. Risk is martyrdom.","7-7":"Two observers. Deep intellectual resonance, low action output.","7-8":"LP8's drive meets LP7's precision.","7-9":"Mutual respect unlocks both.","8-8":"Two operators. Empires when interests align. Total conflict when they diverge.","8-9":"LP8 holds; LP9 releases. Friction at every exit decision.","9-9":"Two closers. Massive completion energy, almost no initiation energy."};
function getLPH(a,b){return LP_HAR[[a,b].sort((x,y)=>x-y).join("-")]||65;}
function getLPN(a,b){return LP_NOTES[[a,b].sort((x,y)=>x-y).join("-")]||"Uncommon pairing. Apply general harmonic principles independently.";}
function getCZScore(a,b){if(CZ_SECRET[a]===b)return 100;if(CZ_TRINITY[a]&&CZ_TRINITY[a].includes(b))return 92;if(CZ_CLASH[a]===b)return 15;if(a===b)return 78;return 55;}
function getCZNote(a,b){if(CZ_SECRET[a]===b)return a+" and "+b+" are Secret Friends -- the highest Chinese zodiac bond.";if(CZ_TRINITY[a]&&CZ_TRINITY[a].includes(b))return a+" and "+b+" share a Trinity group. Natural allies with compatible drives.";if(CZ_CLASH[a]===b)return a+" and "+b+" are in direct Clash. Opposing energies -- short-term tension possible.";if(a===b)return"Same animal sign. Mirror dynamic -- strengths and blind spots both compound.";return"Neutral pairing. Outcome depends on personal year cycles and numerological alignment.";}
function getAstroScore(s1,s2){const e1=SIGN_EL[s1],e2=SIGN_EL[s2],m1=SIGN_MOD[s1],m2=SIGN_MOD[s2];const EC={"Fire-Fire":80,"Fire-Air":90,"Fire-Earth":45,"Fire-Water":40,"Earth-Earth":80,"Earth-Water":85,"Earth-Air":50,"Air-Air":80,"Air-Water":55,"Water-Water":80};const elem=EC[[e1,e2].sort().join("-")]||60;const modal=m1===m2?50:((m1==="Cardinal"&&m2==="Fixed")||(m1==="Fixed"&&m2==="Mutable")?75:85);return Math.round(elem*0.6+modal*0.4);}
function getAstroNote(s1,s2){const e1=SIGN_EL[s1],e2=SIGN_EL[s2],m1=SIGN_MOD[s1],m2=SIGN_MOD[s2];const EP={"Fire-Air":"Fan and flame -- Air intellectualizes what Fire acts on. High creative output.","Fire-Earth":"Fire wants speed; Earth wants durability.","Fire-Water":"Emotionally volatile. Intensity guaranteed; direction is not.","Earth-Water":"Deep natural compatibility. Water nourishes Earth's ambitions.","Air-Water":"Tension between logic and intuition.","Earth-Air":"Earth grounds Air's ideas."};const ek=[e1,e2].sort().join("-");return(e1===e2?"Both "+e1+" signs -- strengths and blind spots compound.":(EP[ek]||EP[[e2,e1].join("-")]||"Elemental tension present."))+" "+(m1===m2?"Shared "+m1+" modality -- both want to drive.":m1+" meets "+m2+" -- different rhythms that complement if neither dominates.");}
function calcCompat(pA,pB){const n=getLPH(pA.lp,pB.lp),c=getCZScore(pA.cz.animal,pB.cz.animal),a=getAstroScore(pA.sun,pB.sun),total=Math.round(n*0.4+c*0.3+a*0.3),verdict=total>=80?"STRONG ALLIANCE":total>=60?"WORKABLE TENSION":total>=40?"HIGH FRICTION":"AVOID";return{total,n,c,a,verdict,lpNote:getLPN(pA.lp,pB.lp),czNote:getCZNote(pA.cz.animal,pB.cz.animal),astroNote:getAstroNote(pA.sun,pB.sun)};}

// --- PROFILE + DAILY --------------------------------------------------------
const LP_THEMES={1:"Initiation / Solo Play",2:"Collaboration / Patience",3:"Expression / Creativity",4:"Structure / Execution",5:"Expansion / Risk",6:"Relationships / Commitment",7:"Research / Introspection",8:"Power Moves / Finance",9:"Completion / Release",11:"Intuition / High-Frequency",22:"Master Builder / Legacy",33:"Service / Healing"};
const LP_NAMES={1:"The Sovereign",2:"The Strategist",3:"The Amplifier",4:"The Architect",5:"The Disruptor",6:"The Connector",7:"The Oracle",8:"The Operator",9:"The Closer",11:"The Antenna",22:"The Builder",33:"The Transmitter"};
function buildProfile(dob,time,loc,name){const d=calcLPDetail(dob),cz=getCZ(dob),sun=getSun(dob),today=new Date().toISOString().split("T")[0];return{name,dob,time,loc,lp:d.lp,raw:d.raw,karmic:d.karmic,isMaster:d.isMaster,exPyt:calcExpr(name||"A",PYT),exChal:calcExpr(name||"A",CHAL),cz,sun,moon:getMoon(dob,time),rising:getRising(dob,time),py:calcPY(dob,new Date().getFullYear()),pd:calcPD(dob,today),el:SIGN_EL[sun],mod:SIGN_MOD[sun]};}
function getDailyG(py,pd){const g=[];if([1,5,8].includes(pd))g.push({label:"VIBRATIONAL WINDOW",status:"HIGH",text:"PY"+py+"xPD"+pd+" -- Aggressive outreach day. Initiate contracts, pitch decks, first contact. Do not wait."});else if([2,6,9].includes(pd))g.push({label:"VIBRATIONAL WINDOW",status:"MODERATE",text:"PD"+pd+" ("+LP_THEMES[pd]+") -- Relationship-building frequency active. Nurture existing networks."});else if([4,7].includes(pd))g.push({label:"VIBRATIONAL WINDOW",status:"LOW",text:"PD"+pd+" ("+LP_THEMES[pd]+") -- Internal processing day. Analysis, research, documentation. Not a launch day."});else g.push({label:"VIBRATIONAL WINDOW",status:"NEUTRAL",text:"Baseline day. Maintain current trajectories."});if((py+pd)%9===0||pd===9)g.push({label:"RISK LEVEL",status:"HIGH",text:"Completion cycle active. Do not double down on dying projects."});else if([1,8,22].includes(py))g.push({label:"RISK LEVEL",status:"ELEVATED",text:"PY"+py+" demands bold moves. Timid plays will underperform this year."});else g.push({label:"RISK LEVEL",status:"STANDARD",text:"Standard risk tolerance. Proceed with established plans."});if([4,7].includes(pd)||[4,7].includes(py))g.push({label:"PHYSICAL PROTOCOL",status:"RESET",text:"System recovery recommended. Reduce stimulants, prioritize sleep."});else if([1,3,5].includes(pd))g.push({label:"PHYSICAL PROTOCOL",status:"ACTIVE",text:"High-output physical state available. Schedule demanding work now."});else g.push({label:"PHYSICAL PROTOCOL",status:"MAINTAIN",text:"Steady-state energy. Maintain baseline routines."});return{pyTheme:LP_THEMES[py]||"Transition",pdTheme:LP_THEMES[pd]||"Neutral",g};}

// --- MINDFULNESS DATA ---------------------------------------------------------
const MINDFULNESS_METHODS=[
  {id:"mbsr",title:"Mindfulness-Based Stress Reduction (MBSR)",color:"#4ade80",icon:"M",developed:"Jon Kabat-Zinn, 1979",overview:"MBSR is an 8-week evidence-based program that trains present-moment awareness without judgment. It is the most clinically researched mindfulness intervention in the world, with proven efficacy for stress, chronic pain, anxiety, and depression.",howItWorks:"MBSR combines formal meditation practices (body scan, sitting meditation, mindful movement) with informal mindfulness applied to daily activities. The core skill is learning to observe thoughts and sensations without reacting automatically.",practices:["Body Scan Meditation (20-45 min daily): Systematically move attention through each body part, observing sensations without judgment.","Sitting Meditation: Focus on breath as an anchor. When the mind wanders, gently return without self-criticism.","Mindful Movement (Yoga): Gentle stretching with full attention to body sensations in the present moment.","Informal Practice: Bring full awareness to routine activities -- eating, walking, washing dishes."],science:"Over 1,000 peer-reviewed studies support MBSR. Research shows measurable changes in brain structure (increased cortical thickness in attention regions), reduced cortisol levels, and improved immune function.",bestFor:"Chronic stress, burnout, anxiety, chronic pain, sleep disorders, and anyone seeking a structured, evidence-based introduction to mindfulness."},
  {id:"cbt",title:"Cognitive Behavioural Therapy (CBT) Mindfulness",color:"#0ea5e9",icon:"C",developed:"Aaron Beck / Zindel Segal, adapted 1990s",overview:"CBT-based mindfulness integrates classical cognitive-behavioural techniques with mindfulness awareness. It targets the relationship between thoughts, feelings, and behaviors -- training you to observe rather than fuse with automatic negative thought patterns.",howItWorks:"The core CBT-mindfulness skill is cognitive defusion: learning to see thoughts as mental events rather than facts. When you notice 'I am worthless' you learn to reframe it as 'I am having the thought that I am worthless.' This creates space between trigger and response.",practices:["Thought Records: Write down automatic negative thoughts, identify cognitive distortions (catastrophising, all-or-nothing thinking), and generate balanced alternatives.","Behavioural Activation: Schedule activities that align with your values, even when motivation is low.","Mindful Observation of Thoughts: Sit and watch thoughts arise and pass without engaging with content.","Cognitive Defusion: Label thoughts as thoughts. 'There's my inner critic again.'"],science:"CBT is the most evidence-based psychological therapy in existence, with over 2,000 randomised controlled trials. CBT-mindfulness (MBCT) reduces depression relapse by 50% in high-risk populations.",bestFor:"Depression, anxiety disorders, OCD, PTSD, eating disorders, and anyone with strong negative thought patterns."},
  {id:"act",title:"Acceptance and Commitment Therapy (ACT)",color:"#f59e0b",icon:"A",developed:"Steven Hayes, 1980s-1990s",overview:"ACT is a third-wave behavioural therapy that uses acceptance and mindfulness strategies alongside commitment and behavior change strategies. The goal is not to feel better -- it is to live better, in alignment with your values, regardless of how you feel.",howItWorks:"ACT works through six core processes: Acceptance (allowing difficult thoughts/feelings without fighting them), Cognitive Defusion (seeing thoughts as thoughts), Being Present (mindful contact with the now), Self-as-Context (the observing self vs. the thinking self), Values Clarification, and Committed Action.",practices:["Values Clarification Exercise: Write down your top 5 values in work, relationships, personal growth, and health. Then audit how your daily actions align with those values.","Acceptance Practice: When a difficult emotion arises, name it, locate it in the body, breathe into it, and allow it to be there without trying to change it.","Leaves on a Stream Meditation: Visualise sitting by a stream. As thoughts arise, place each one on a leaf and watch it float away.","Defusion: When a painful thought arises, prefix it with 'I notice I am having the thought that...'"],science:"ACT is classified as an empirically supported treatment by the American Psychological Association for depression, anxiety, chronic pain, substance abuse, and workplace stress.",bestFor:"People who feel stuck in the struggle against their own thoughts and feelings, chronic pain, values-aligned living, and building psychological flexibility."},
  {id:"tm",title:"Transcendental Meditation (TM)",color:"#c084fc",icon:"T",developed:"Maharishi Mahesh Yogi, 1950s",overview:"TM is a specific, silent mantra-based meditation technique practiced 20 minutes twice daily. Unlike mindfulness, TM does not focus on observing the present moment -- it allows the mind to settle inward toward quieter levels of thought, ultimately reaching a state of pure consciousness.",howItWorks:"In TM, the meditator sits comfortably with eyes closed and silently repeats a personalised mantra (a meaningless sound). The mantra is not concentrated on -- it is used effortlessly as a vehicle for the mind to settle. Thoughts are allowed to arise and are not suppressed.",practices:["Twice-daily 20-minute sessions, ideally morning and late afternoon.","Sit comfortably, close eyes, and settle for 30 seconds.","Introduce the mantra silently -- think it softly, not forcefully.","When attention drifts to thoughts, gently return to the mantra.","End by sitting quietly for 2 minutes before resuming activity."],science:"TM has extensive research support: over 600 published studies showing reduced cortisol, improved cardiovascular health, reduced PTSD symptoms in veterans, and decreased anxiety. It is taught in several American school systems.",bestFor:"Stress reduction, high-performance professionals, anyone who struggles with observation-based mindfulness, PTSD, and deep rest states."},
  {id:"vipassana",title:"Vipassana (Insight Meditation)",color:"#f06292",icon:"V",developed:"Ancient Buddhist tradition, modern revival S.N. Goenka",overview:"Vipassana is one of India's oldest meditation techniques, meaning 'to see things as they really are.' It is a systematic practice of self-observation through sustained attention to bodily sensations, developing insight into the nature of impermanence, suffering, and the illusion of a fixed self.",howItWorks:"Vipassana is traditionally taught in 10-day silent retreats with no speaking, reading, writing, or devices. The technique involves three stages: Anapana (breath observation), Vipassana proper (body scanning with equanimity), and Metta Bhavana (loving-kindness extension).",practices:["Anapana Practice: 15-30 min -- observe breath at the nostrils without controlling it. Notice the sensation of air entering and leaving. When the mind wanders, return without judgment.","Body Scan (Vipassana): Systematically sweep attention from head to feet and back, observing all sensations -- tingling, pressure, heat, pain -- with perfect equanimity (neither craving pleasant nor aversing unpleasant).","Equanimity Training: When pain arises during sitting, observe it as sensation without reacting. This builds the core insight: all sensations are impermanent.","Metta Bhavana: Close each session by extending loving-kindness to yourself, loved ones, neutral people, and difficult people."],science:"Research published in journals including Frontiers in Neuroscience shows Vipassana practice produces significant reductions in anxiety, stress, and addictive cravings, with measurable changes in brain regions associated with self-regulation.",bestFor:"Deep self-inquiry, addiction recovery, breaking habitual patterns, trauma processing, and those willing to commit to intensive practice."},
  {id:"somatic",title:"Somatic Mindfulness",color:"#4db6ac",icon:"S",developed:"Peter Levine, Pat Ogden, 1970s-present",overview:"Somatic mindfulness directs awareness specifically to the body as the primary location of emotional and psychological experience. Based on the principle that trauma and stress are stored in the body, not just the mind, somatic practices use interoception (sensing internal body states) as the primary tool for healing and regulation.",howItWorks:"Unlike cognitive approaches that work top-down (mind to body), somatic mindfulness works bottom-up. You learn to track physical sensations as real-time data about your nervous system state -- and use breath, movement, and grounding to consciously shift your physiological state.",practices:["Body Check-In: 3x daily, pause and scan from feet upward. Notice tension, ease, numbness, temperature, and movement. Name what you find without judgment.","Grounding Practice: Sit with feet flat. Feel the floor. Press lightly. Feel weight in the chair. Name 5 things you see, 4 you touch, 3 you hear. Regulate nervous system within 60 seconds.","Orienting Response: Slowly turn your head side to side, letting your eyes rest on objects with curiosity. This directly activates the parasympathetic nervous system.","Pendulation: Identify a place of sensation or discomfort in the body. Then locate a neutral or pleasant sensation. Gently alternate attention between the two."],science:"Somatic approaches are endorsed by leading trauma researchers including Bessel van der Kolk (The Body Keeps the Score). Studies show somatic therapy reduces PTSD symptoms with efficacy comparable to EMDR.",bestFor:"Trauma, anxiety with physical symptoms, dissociation, chronic pain, and anyone who finds thought-based approaches do not reach the full depth of their experience."}
];

// --- AI SYSTEM PROMPTS -------------------------------------------------------
const AI_SYS=`You are ZIPHER -- a strategic intelligence system decoding compatibility, brand positioning, and timing via numerology, astrology, and Chinese zodiac. Not a spiritual advisor. A precision analyst.
TONE: Blunt. Declarative. Zero hedging. No "may/might/could". No emojis.
FORMAT: Three sections always -- ASSESSMENT / SCORE (0-100 + rationale) / DIRECTIVE (one clear action).
USER PROFILE: {PROFILE_JSON}
Reference this profile as baseline. Never break character.`;

const AFFIRMATION_SYS=`You are a mindfulness and affirmation guide integrated with the ZIPHER numerology and astrology system. Generate personalised daily affirmations for a 30-day programme.

USER PROFILE: {PROFILE_JSON}
THEME: {THEME}
CATEGORY: {CATEGORY}

Generate exactly 30 daily affirmations numbered Day 1 through Day 30. Each affirmation must:
1. Be written in first person ("I am", "I have", "I choose", "I release")
2. Be personalised to the user's Life Path number, Sun sign, and Chinese zodiac animal
3. Connect directly to the theme of {THEME}
4. Include a 2-sentence mindfulness practice or reflection guidance after the affirmation
5. Progress in depth and intensity across the 30 days (Week 1: foundation, Week 2: deepening, Week 3: integration, Week 4: embodiment)

Format each as:
DAY [N] -- [AFFIRMATION]
Practice: [2-sentence mindfulness guidance]

Tone: warm, grounded, empowering. Not generic. Each affirmation must feel written for this specific person's numerological and astrological profile.`;

// --- TERMS OF SERVICE --------------------------------------------------------
const TOS_TEXT=`TERMS OF SERVICE AND DISCLAIMER

Last Updated: ${new Date().getFullYear()}

PLEASE READ THESE TERMS CAREFULLY BEFORE USING ZIPHER.

1. NATURE OF THE SERVICE
ZIPHER ("the Application") provides numerological calculations, astrological interpretations, Chinese zodiac analysis, mindfulness education, and AI-generated affirmations for informational and personal development purposes only. The Application does not provide medical advice, psychological therapy, financial advice, legal advice, or any form of professional consultation.

2. NOT A SUBSTITUTE FOR PROFESSIONAL ADVICE
The content provided by ZIPHER is for general informational and entertainment purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. It is NOT a substitute for licensed psychological or psychiatric services. It is NOT financial, investment, or legal advice. Always seek the advice of qualified professionals for matters affecting your health, mental wellbeing, finances, or legal rights.

3. NO MEDICAL OR THERAPEUTIC CLAIMS
ZIPHER does not diagnose, treat, cure, or prevent any medical or psychological condition. The mindfulness practices and affirmations provided are educational tools. If you are experiencing a mental health crisis, please contact a licensed mental health professional or emergency services immediately.

4. ACCURACY AND RELIABILITY
Numerological, astrological, and Chinese zodiac calculations are based on traditional systems and are provided for personal reflection and entertainment. ZIPHER makes no warranty that any calculation, interpretation, or AI-generated content is accurate, reliable, or applicable to your specific circumstances.

5. AI-GENERATED CONTENT
The affirmations and guidance generated by the AI consultant are automatically created and have not been reviewed by licensed professionals. They do not constitute therapeutic advice and should not be relied upon for making significant life decisions.

6. USER RESPONSIBILITY
By using ZIPHER, you acknowledge that you are solely responsible for how you use the information provided. You agree not to make major life decisions based solely on content from this Application. You agree that ZIPHER and its creators bear no liability for actions taken based on content provided.

7. LIMITATION OF LIABILITY
To the maximum extent permitted by applicable law, ZIPHER and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Application or reliance on any information provided.

8. PRIVACY
Any information you enter into ZIPHER is processed locally in your browser. No personal data is stored on external servers beyond what is necessary to process AI queries.

9. CHANGES TO TERMS
We reserve the right to modify these Terms at any time. Continued use of the Application after changes constitutes acceptance of the updated Terms.

10. GOVERNING LAW
These Terms shall be governed by applicable law. Any disputes shall be resolved through binding arbitration.

By clicking "I Agree and Enter ZIPHER", you confirm that you have read, understood, and agree to these Terms of Service and Disclaimer.`;

// --- STATUS COLORS ------------------------------------------------------------
const SC={HIGH:"#ff3b3b",ELEVATED:"#ff8c00",MODERATE:"#f5c518",STANDARD:"#4ade80",LOW:"#60a5fa",NEUTRAL:"#94a3b8",RESET:"#c084fc",ACTIVE:"#4ade80",MAINTAIN:"#60a5fa","HIGH FRICTION":"#ff3b3b","WORKABLE TENSION":"#f5c518","STRONG ALLIANCE":"#4ade80","AVOID":"#ff3b3b"};

// --- THEME SYSTEM -------------------------------------------------------------
function makeTheme(dark){
  return {
    bg: dark?"#04090f":"#f0f4f8",
    bg2: dark?"#080f1e":"#ffffff",
    bg3: dark?"#0a1628":"#e8eef5",
    bg4: dark?"#0d1a2d":"#dde5ef",
    bg5: dark?"#04090f":"#f8fafc",
    border: dark?"#0f1e35":"#cbd5e1",
    border2: dark?"#1e3a5f":"#94a3b8",
    text: dark?"#e2e8f0":"#0f172a",
    text2: dark?"#94a3b8":"#334155",
    text3: dark?"#475569":"#64748b",
    text4: dark?"#334155":"#94a3b8",
    label: dark?"#1e3a5f":"#64748b",
    accent: "#4ade80",
    accentBlue: "#0ea5e9",
    headerBg: dark?"rgba(4,9,15,0.97)":"rgba(248,250,252,0.97)",
    navBg: dark?"rgba(4,9,15,0.9)":"rgba(240,244,248,0.9)",
    cardGlow: dark?"#00ff8844":"#00cc6633",
    shadow: dark?"0 4px 24px rgba(0,0,0,0.4)":"0 4px 24px rgba(0,0,0,0.08)",
  };
}

// --- UI COMPONENTS ---------------------------------------------------------
function Tg({children,color,T}){const t=T||makeTheme(true);return(<span style={{display:"inline-block",padding:"3px 10px",borderRadius:3,fontSize:9,fontWeight:700,letterSpacing:2,fontFamily:"monospace",color:color||t.accent,border:"1px solid "+(color||t.accent)+"44",background:(color||t.accent)+"11",marginRight:6,marginBottom:6}}>{children}</span>);}

function Crd({title,children,accent,T}){const t=T||makeTheme(true);return(<div style={{background:t.bg2,border:"1px solid "+(accent||t.border),borderRadius:10,padding:"20px 22px",marginBottom:16,position:"relative",overflow:"hidden",boxShadow:t.shadow}}><div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,"+(accent||t.border2)+",transparent)"}}/>{title&&<div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:14,fontFamily:"monospace"}}>{title}</div>}{children}</div>);}

function SGrid({items,T}){const t=T||makeTheme(true);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{items.map((it,i)=>(<div key={i} style={{padding:"12px 14px",background:t.bg3,borderRadius:6,borderLeft:"2px solid "+t.border2}}><div style={{fontSize:9,letterSpacing:2,color:t.label,marginBottom:4,fontFamily:"monospace"}}>{it.label}</div><div style={{fontSize:14,fontWeight:700,color:t.text}}>{it.value}</div>{it.sub&&<div style={{fontSize:10,color:t.text3,marginTop:2}}>{it.sub}</div>}</div>))}</div>);}

function Bar({label,value,color,T}){const t=T||makeTheme(true);return(<div style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:10,letterSpacing:2,color:t.text3,fontFamily:"monospace"}}>{label}</span><span style={{fontSize:14,fontWeight:800,color:color||t.text,fontFamily:"monospace"}}>{value}%</span></div><div style={{height:5,background:t.bg3,borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:value+"%",background:color||t.accent,boxShadow:"0 0 10px "+(color||t.accent)+"66",transition:"width 1.2s cubic-bezier(.4,0,.2,1)"}}/></div></div>);}

function NBlock({title,note,color,T}){const t=T||makeTheme(true);return(<div style={{marginTop:14,padding:"14px 16px",background:t.bg3,borderRadius:8,borderLeft:"3px solid "+(color||t.accent)}}><div style={{fontSize:9,letterSpacing:2,color:color||t.accent,marginBottom:6,fontFamily:"monospace"}}>{title}</div><div style={{fontSize:12,color:t.text2,lineHeight:1.8}}>{note}</div></div>);}

function SubTab({tabs,active,onSelect,T}){const t=T||makeTheme(true);return(<div style={{display:"flex",gap:0,marginBottom:20,borderBottom:"1px solid "+t.bg3,overflowX:"auto"}}>{tabs.map(([id,label])=>(<button key={id} onClick={()=>onSelect(id)} style={{background:"transparent",color:active===id?t.accent:t.text4,border:"none",borderBottom:active===id?"2px solid "+t.accent:"2px solid transparent",padding:"10px 16px",cursor:"pointer",fontSize:10,letterSpacing:2,fontWeight:700,fontFamily:"monospace",transition:"all 0.2s",whiteSpace:"nowrap",flexShrink:0}}>{label}</button>))}</div>);}

function ToggleSwitch({dark,onToggle}){return(<button onClick={onToggle} aria-label="Toggle theme" style={{background:dark?"#1e3a5f":"#e2e8f0",border:"none",borderRadius:20,width:52,height:28,position:"relative",cursor:"pointer",transition:"background 0.3s",padding:0,flexShrink:0}}><div style={{width:22,height:22,borderRadius:"50%",background:dark?"#4ade80":"#94a3b8",position:"absolute",top:3,left:dark?27:3,transition:"left 0.3s, background 0.3s",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{dark?"":"o"}</div></button>);}

// --- EXPANDABLE CARDS ---------------------------------------------------------
function LPCard({num,karmic,T}){const[open,setOpen]=useState(false);const t=T||makeTheme(true);const d=LP[num];const k=karmic?KARMIC[karmic]:null;if(!d)return null;return(<div style={{background:t.bg2,border:"1px solid "+d.color+"33",borderRadius:10,overflow:"hidden",marginBottom:10}}><div onClick={()=>setOpen(o=>!o)} style={{padding:"16px 20px",cursor:"pointer",background:"linear-gradient(135deg,"+d.color+"08,transparent)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{fontSize:44,fontWeight:900,color:d.color,fontFamily:"monospace",lineHeight:1,minWidth:52,textShadow:"0 0 20px "+d.color+"55"}}>{num}</div><div style={{minWidth:0}}>{d.isMaster&&<Tg color={d.color} T={t}>MASTER</Tg>}<div style={{fontSize:15,fontWeight:700,color:t.text,lineHeight:1.3}}>{d.title}</div><div style={{fontSize:10,color:t.text3,letterSpacing:1,fontFamily:"monospace",marginTop:2}}>{d.sub}</div></div></div><span style={{color:d.color,fontSize:12,fontFamily:"monospace",flexShrink:0}}>{open?"v":">"}</span></div>{open&&(<div style={{padding:"18px 20px",borderTop:"1px solid "+d.color+"22"}}><div style={{marginBottom:14}}><div style={{fontSize:9,letterSpacing:3,color:d.color,marginBottom:6,fontFamily:"monospace"}}>CORE FREQUENCY</div><div style={{fontSize:12,color:t.text2,lineHeight:1.9}}>{d.core}</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}><div style={{padding:"12px 14px",background:t.bg3,borderRadius:8,borderTop:"2px solid #4ade8044"}}><div style={{fontSize:9,letterSpacing:3,color:"#4ade80",marginBottom:6,fontFamily:"monospace"}}>STRENGTHS</div><div style={{fontSize:11,color:t.text2,lineHeight:1.8}}>{d.strengths}</div></div><div style={{padding:"12px 14px",background:t.bg3,borderRadius:8,borderTop:"2px solid #ff3b3b44"}}><div style={{fontSize:9,letterSpacing:3,color:"#ff3b3b",marginBottom:6,fontFamily:"monospace"}}>SHADOW</div><div style={{fontSize:11,color:t.text2,lineHeight:1.8}}>{d.challenges}</div></div></div><div style={{padding:"12px 14px",background:d.color+"0a",border:"1px solid "+d.color+"33",borderRadius:8,marginBottom:8}}><div style={{fontSize:9,letterSpacing:3,color:d.color,marginBottom:4,fontFamily:"monospace"}}>STRATEGIC DIRECTIVE</div><div style={{fontSize:12,color:t.text,lineHeight:1.8,fontWeight:600}}>{d.directive}</div></div>{d.famous&&<div style={{padding:"8px 12px",background:t.bg5,borderRadius:6,fontSize:10,color:t.text4,fontFamily:"monospace"}}>KNOWN LP{num}s -- {d.famous}</div>}{k&&(<div style={{marginTop:14,border:"1px solid "+k.color+"44",borderRadius:10,overflow:"hidden"}}><div style={{padding:"10px 14px",background:k.color+"11",display:"flex",alignItems:"center",gap:8}}><Tg color={k.color} T={t}>KARMIC DEBT</Tg><div style={{fontSize:12,fontWeight:700,color:t.text}}>{k.title}</div></div><div style={{padding:"14px 16px"}}><div style={{fontSize:11,color:t.text2,lineHeight:1.9,marginBottom:10}}>{k.core}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}><div style={{padding:"10px 12px",background:t.bg5,borderRadius:6,borderLeft:"2px solid "+k.color}}><div style={{fontSize:8,letterSpacing:2,color:k.color,marginBottom:3,fontFamily:"monospace"}}>LESSON</div><div style={{fontSize:10,color:t.text2,lineHeight:1.6}}>{k.lesson}</div></div><div style={{padding:"10px 12px",background:t.bg5,borderRadius:6,borderLeft:"2px solid #ff3b3b"}}><div style={{fontSize:8,letterSpacing:2,color:"#ff3b3b",marginBottom:3,fontFamily:"monospace"}}>WATCH FOR</div><div style={{fontSize:10,color:t.text2,lineHeight:1.6}}>{k.watchFor}</div></div></div><div style={{padding:"10px 12px",background:k.color+"0a",border:"1px solid "+k.color+"33",borderRadius:6}}><div style={{fontSize:8,letterSpacing:2,color:k.color,marginBottom:3,fontFamily:"monospace"}}>DIRECTIVE</div><div style={{fontSize:11,color:t.text,lineHeight:1.6,fontWeight:600}}>{k.directive}</div></div></div></div>)}</div>)}</div>);}

function CZCard({animal,T}){const[open,setOpen]=useState(false);const t=T||makeTheme(true);const d=CZ_DATA[animal];if(!d)return null;return(<div style={{background:t.bg2,border:"1px solid "+d.color+"33",borderRadius:10,overflow:"hidden",marginBottom:10}}><div onClick={()=>setOpen(o=>!o)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,background:"linear-gradient(135deg,"+d.color+"08,transparent)"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:44,height:44,borderRadius:8,background:d.color+"22",border:"1px solid "+d.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:d.color,fontFamily:"monospace",flexShrink:0}}>{animal.substring(0,3).toUpperCase()}</div><div><div style={{fontSize:15,fontWeight:700,color:t.text}}>{animal}</div><div style={{fontSize:10,color:t.text3,marginTop:2}}>{d.traits}</div></div></div><span style={{color:d.color,fontSize:12,fontFamily:"monospace",flexShrink:0}}>{open?"v":">"}</span></div>{open&&(<div style={{padding:"16px 18px",borderTop:"1px solid "+d.color+"22"}}><div style={{fontSize:11,color:t.text2,lineHeight:1.9,marginBottom:12}}>{d.core}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderTop:"2px solid #4ade8044"}}><div style={{fontSize:8,letterSpacing:2,color:"#4ade80",marginBottom:4,fontFamily:"monospace"}}>STRENGTHS</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.strengths}</div></div><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderTop:"2px solid #ff3b3b44"}}><div style={{fontSize:8,letterSpacing:2,color:"#ff3b3b",marginBottom:4,fontFamily:"monospace"}}>CHALLENGES</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.challenges}</div></div></div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><div style={{padding:"8px 12px",background:t.bg5,borderRadius:6,flex:1,fontSize:10,color:t.text3,fontFamily:"monospace",minWidth:120}}>Compatible: {d.compatible}</div><div style={{padding:"8px 12px",background:t.bg5,borderRadius:6,flex:1,fontSize:10,color:t.text3,fontFamily:"monospace",minWidth:120}}>Clash: {CZ_CLASH[animal]}</div></div></div>)}</div>);}

function ElCard({el,T}){const[open,setOpen]=useState(false);const t=T||makeTheme(true);const d=FIVE_EL[el];if(!d)return null;return(<div style={{background:t.bg2,border:"1px solid "+d.color+"33",borderRadius:10,overflow:"hidden",marginBottom:10}}><div onClick={()=>setOpen(o=>!o)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,background:"linear-gradient(135deg,"+d.color+"08,transparent)"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:42,height:42,borderRadius:8,background:d.color+"22",border:"1px solid "+d.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:d.color,fontFamily:"monospace",flexShrink:0}}>{el.substring(0,3).toUpperCase()}</div><div><div style={{fontSize:15,fontWeight:700,color:t.text}}>{el} Element</div><div style={{fontSize:10,color:t.text3,marginTop:2}}>Years ending in: {d.years}</div></div></div><span style={{color:d.color,fontSize:12,fontFamily:"monospace",flexShrink:0}}>{open?"v":">"}</span></div>{open&&(<div style={{padding:"16px 18px",borderTop:"1px solid "+d.color+"22"}}><div style={{fontSize:11,color:t.text2,lineHeight:1.9,marginBottom:12}}>{d.core}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderLeft:"2px solid #4ade80"}}><div style={{fontSize:8,letterSpacing:2,color:"#4ade80",marginBottom:3,fontFamily:"monospace"}}>STRENGTHS</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.strengths}</div></div><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderLeft:"2px solid #ff3b3b"}}><div style={{fontSize:8,letterSpacing:2,color:"#ff3b3b",marginBottom:3,fontFamily:"monospace"}}>CHALLENGES</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.challenges}</div></div></div><div style={{padding:"8px 12px",background:t.bg5,borderRadius:6,fontSize:10,color:t.text3,fontFamily:"monospace"}}>{d.animals}</div></div>)}</div>);}

function WZCard({sign,T}){const[open,setOpen]=useState(false);const t=T||makeTheme(true);const d=WZ[sign];if(!d)return null;return(<div style={{background:t.bg2,border:"1px solid "+d.color+"33",borderRadius:10,overflow:"hidden",marginBottom:10}}><div onClick={()=>setOpen(o=>!o)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,background:"linear-gradient(135deg,"+d.color+"08,transparent)"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:44,height:44,borderRadius:8,background:d.color+"22",border:"1px solid "+d.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:d.color,fontFamily:"monospace",flexShrink:0}}>{sign.substring(0,3).toUpperCase()}</div><div><div style={{fontSize:15,fontWeight:700,color:t.text}}>{sign}</div><div style={{fontSize:10,color:t.text3,marginTop:2}}>{d.dates} -- {d.element} / {d.modality}</div></div></div><span style={{color:d.color,fontSize:12,fontFamily:"monospace",flexShrink:0}}>{open?"v":">"}</span></div>{open&&(<div style={{padding:"16px 18px",borderTop:"1px solid "+d.color+"22"}}><div style={{fontSize:11,color:t.text2,lineHeight:1.9,marginBottom:12}}>{d.core}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderTop:"2px solid #4ade8044"}}><div style={{fontSize:8,letterSpacing:2,color:"#4ade80",marginBottom:4,fontFamily:"monospace"}}>STRENGTHS</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.strengths}</div></div><div style={{padding:"10px 12px",background:t.bg3,borderRadius:8,borderTop:"2px solid #ff3b3b44"}}><div style={{fontSize:8,letterSpacing:2,color:"#ff3b3b",marginBottom:4,fontFamily:"monospace"}}>CHALLENGES</div><div style={{fontSize:10,color:t.text2,lineHeight:1.7}}>{d.challenges}</div></div></div><div style={{padding:"10px 12px",background:d.color+"0a",border:"1px solid "+d.color+"33",borderRadius:8,marginBottom:8}}><div style={{fontSize:8,letterSpacing:2,color:d.color,marginBottom:3,fontFamily:"monospace"}}>DIRECTIVE</div><div style={{fontSize:11,color:t.text,lineHeight:1.7,fontWeight:600}}>{d.directive}</div></div><div style={{padding:"8px 12px",background:t.bg5,borderRadius:6,fontSize:10,color:t.text3,fontFamily:"monospace"}}>Compatible: {d.compatible}</div></div>)}</div>);}

function KarmicCard({num,T}){const[open,setOpen]=useState(false);const t=T||makeTheme(true);const d=KARMIC[num];if(!d)return null;return(<div style={{background:t.bg2,border:"1px solid "+d.color+"33",borderRadius:10,overflow:"hidden",marginBottom:10}}><div onClick={()=>setOpen(o=>!o)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,background:"linear-gradient(135deg,"+d.color+"08,transparent)"}}><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{fontSize:44,fontWeight:900,color:d.color,fontFamily:"monospace",lineHeight:1,minWidth:52}}>{num}</div><div><Tg color={d.color} T={t}>KARMIC DEBT</Tg><div style={{fontSize:14,fontWeight:700,color:t.text,marginTop:4}}>{d.title}</div></div></div><span style={{color:d.color,fontSize:12,fontFamily:"monospace",flexShrink:0}}>{open?"v":">"}</span></div>{open&&(<div style={{padding:"18px 20px",borderTop:"1px solid "+d.color+"22"}}><div style={{fontSize:12,color:t.text2,lineHeight:1.9,marginBottom:14}}>{d.core}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}><div style={{padding:"12px 14px",background:t.bg3,borderRadius:8,borderLeft:"2px solid "+d.color}}><div style={{fontSize:8,letterSpacing:2,color:d.color,marginBottom:4,fontFamily:"monospace"}}>LESSON</div><div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{d.lesson}</div></div><div style={{padding:"12px 14px",background:t.bg3,borderRadius:8,borderLeft:"2px solid #ff3b3b"}}><div style={{fontSize:8,letterSpacing:2,color:"#ff3b3b",marginBottom:4,fontFamily:"monospace"}}>WATCH FOR</div><div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{d.watchFor}</div></div></div><div style={{padding:"12px 14px",background:d.color+"0a",border:"1px solid "+d.color+"33",borderRadius:8}}><div style={{fontSize:8,letterSpacing:2,color:d.color,marginBottom:4,fontFamily:"monospace"}}>DIRECTIVE</div><div style={{fontSize:12,color:t.text,lineHeight:1.7,fontWeight:600}}>{d.directive}</div></div></div>)}</div>);}

// --- TOS SCREEN ---------------------------------------------------------------
function TOSScreen({onAgree,dark}){const t=makeTheme(dark);const[checked,setChecked]=useState(false);return(<div style={{minHeight:"100vh",background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div style={{maxWidth:640,width:"100%",background:t.bg2,borderRadius:16,border:"1px solid "+t.border,overflow:"hidden",boxShadow:t.shadow}}><div style={{background:"linear-gradient(135deg,#00ff8822,#0ea5e922)",padding:"28px 28px 20px",borderBottom:"1px solid "+t.border}}><div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}><div style={{width:44,height:44,borderRadius:9,background:"linear-gradient(135deg,#00ff88,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#000",fontFamily:"monospace",boxShadow:"0 0 20px #00ff8844"}}>Z</div><div><div style={{fontSize:20,fontWeight:700,letterSpacing:5,fontFamily:"monospace",color:t.text}}>ZIPHER</div><div style={{fontSize:8,letterSpacing:4,color:t.text4}}>STRATEGIC INTELLIGENCE SYSTEM</div></div></div><div style={{fontSize:13,color:t.text2,lineHeight:1.7}}>Before accessing ZIPHER, please read and agree to our Terms of Service and Disclaimer.</div></div><div style={{padding:"20px 28px"}}><div style={{maxHeight:320,overflowY:"auto",background:t.bg3,borderRadius:8,padding:"16px 18px",marginBottom:20,border:"1px solid "+t.border}}><pre style={{fontFamily:"Georgia,serif",fontSize:11,color:t.text2,lineHeight:1.9,whiteSpace:"pre-wrap",margin:0}}>{TOS_TEXT}</pre></div><label style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer",marginBottom:20}}><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{accentColor:"#4ade80",marginTop:2,flexShrink:0,width:16,height:16}} /><span style={{fontSize:12,color:t.text2,lineHeight:1.7}}>I have read, understood, and agree to the Terms of Service and Disclaimer. I understand that ZIPHER is for informational and personal development purposes only and is not a substitute for professional medical, psychological, financial, or legal advice.</span></label><button onClick={onAgree} disabled={!checked} style={{width:"100%",background:checked?"linear-gradient(135deg,#00ff88,#0ea5e9)":"transparent",color:checked?"#000":t.text4,border:checked?"none":"1px solid "+t.border,borderRadius:8,padding:"14px 24px",cursor:checked?"pointer":"not-allowed",fontSize:12,letterSpacing:3,fontWeight:800,fontFamily:"monospace",transition:"all 0.3s"}}>{checked?"I AGREE AND ENTER ZIPHER":"READ AND CHECK TO CONTINUE"}</button></div></div></div>);}

// --- MINDFULNESS TAB ---------------------------------------------------------
function MindfulnessTab({pA,dark,T}){
  const[subTab,setSubTab]=useState("learn");
  const[selectedMethod,setSelectedMethod]=useState(null);
  const[affTheme,setAffTheme]=useState("gratitude");
  const[affCat,setAffCat]=useState("general");
  const[affResult,setAffResult]=useState("");
  const[affLoading,setAffLoading]=useState(false);
  const t=T||makeTheme(dark);

  async function generateAffirmations(){
    if(!pA){alert("Please decode your profile in DATA MAP first.");return;}
    setAffLoading(true);setAffResult("");
    try{
      const sys=AFFIRMATION_SYS.replace("{PROFILE_JSON}",JSON.stringify({name:pA.name,lp:pA.lp,lpName:LP_NAMES[pA.lp],sun:pA.sun,moon:pA.moon,czAnimal:pA.cz.animal,czElement:pA.cz.element,py:pA.py,karmic:pA.karmic},null,2)).replace(/{THEME}/g,affTheme.charAt(0).toUpperCase()+affTheme.slice(1)).replace(/{CATEGORY}/g,affCat);
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4000,system:sys,messages:[{role:"user",content:"Generate my personalised 30-day "+affTheme+" affirmation programme tailored to my LP"+pA.lp+" "+pA.sun+" "+pA.cz.animal+" profile."}]})});
      const data=await res.json();
      setAffResult(data.content&&data.content.map(b=>b.text||"").join("")||"No response generated.");
    }catch(e){setAffResult("Connection error. Please try again.");}
    setAffLoading(false);
  }

  const themeColors={gratitude:"#4ade80",empathy:"#0ea5e9",love:"#f48fb1",forgiveness:"#c084fc"};
  const themeDesc={gratitude:"Train your brain to notice and appreciate what is already present. Gratitude affirmations rewire neural pathways toward abundance and sufficiency.",empathy:"Cultivate compassionate understanding for yourself and others. Empathy affirmations build emotional intelligence and deepen relational capacity.",love:"Open to giving and receiving love unconditionally. Love affirmations dissolve fear-based barriers and activate heart-centred living.",forgiveness:"Release the weight of resentment and self-judgment. Forgiveness affirmations free the psychological energy trapped in old wounds."};

  return(
    <div>
      <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:20,fontFamily:"monospace"}}>// MINDFULNESS + INNER INTELLIGENCE</div>
      <SubTab tabs={[["learn","PRACTICES"],["affirmations","30-DAY AFFIRMATIONS"]]} active={subTab} onSelect={setSubTab} T={t}/>

      {subTab==="learn"&&(
        <div>
          {!selectedMethod?(
            <div>
              <Crd accent="#4ade8022" T={t}>
                <div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:8}}>Evidence-Based Mindfulness Practices</div>
                <div style={{fontSize:12,color:t.text2,lineHeight:1.8}}>ZIPHER integrates six evidence-based mindfulness and therapeutic frameworks. Each approach has been clinically researched and validated. Explore each method to find the practice that aligns with your Life Path and current needs. Click any card to expand the full practice guide.</div>
              </Crd>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                {MINDFULNESS_METHODS.map(m=>(
                  <div key={m.id} onClick={()=>setSelectedMethod(m)} style={{background:t.bg2,border:"1px solid "+m.color+"33",borderRadius:10,padding:"18px 20px",cursor:"pointer",transition:"all 0.2s",boxShadow:t.shadow}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                      <div style={{width:40,height:40,borderRadius:8,background:m.color+"22",border:"1px solid "+m.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:m.color,fontFamily:"monospace",flexShrink:0}}>{m.icon}</div>
                      <div><div style={{fontSize:13,fontWeight:700,color:t.text,lineHeight:1.3}}>{m.title}</div><div style={{fontSize:9,color:t.text3,marginTop:2,fontFamily:"monospace"}}>{m.developed}</div></div>
                    </div>
                    <div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{m.overview.substring(0,120)}...</div>
                    <div style={{marginTop:10,fontSize:9,color:m.color,fontFamily:"monospace",letterSpacing:2}}>EXPLORE FULL GUIDE &gt;</div>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div>
              <button onClick={()=>setSelectedMethod(null)} style={{background:"transparent",border:"1px solid "+t.border,borderRadius:6,padding:"8px 16px",cursor:"pointer",fontSize:10,color:t.text3,fontFamily:"monospace",letterSpacing:2,marginBottom:16}}>{"< BACK TO ALL PRACTICES"}</button>
              <Crd accent={selectedMethod.color+"44"} T={t}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                  <div style={{width:52,height:52,borderRadius:10,background:selectedMethod.color+"22",border:"1px solid "+selectedMethod.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:selectedMethod.color,fontFamily:"monospace",flexShrink:0}}>{selectedMethod.icon}</div>
                  <div><div style={{fontSize:17,fontWeight:700,color:t.text}}>{selectedMethod.title}</div><div style={{fontSize:10,color:t.text3,fontFamily:"monospace",marginTop:2}}>{selectedMethod.developed}</div></div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:3,color:selectedMethod.color,marginBottom:8,fontFamily:"monospace"}}>OVERVIEW</div>
                  <div style={{fontSize:12,color:t.text2,lineHeight:1.9}}>{selectedMethod.overview}</div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:3,color:selectedMethod.color,marginBottom:8,fontFamily:"monospace"}}>HOW IT WORKS</div>
                  <div style={{fontSize:12,color:t.text2,lineHeight:1.9}}>{selectedMethod.howItWorks}</div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:3,color:selectedMethod.color,marginBottom:10,fontFamily:"monospace"}}>CORE PRACTICES</div>
                  {selectedMethod.practices.map((p,i)=>(
                    <div key={i} style={{padding:"12px 14px",background:t.bg3,borderRadius:8,borderLeft:"3px solid "+selectedMethod.color,marginBottom:8}}>
                      <div style={{fontSize:11,color:t.text2,lineHeight:1.8}}>{p}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div style={{padding:"14px 16px",background:t.bg3,borderRadius:8,borderTop:"2px solid "+selectedMethod.color+"44"}}>
                    <div style={{fontSize:9,letterSpacing:2,color:selectedMethod.color,marginBottom:6,fontFamily:"monospace"}}>SCIENCE + EVIDENCE</div>
                    <div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{selectedMethod.science}</div>
                  </div>
                  <div style={{padding:"14px 16px",background:t.bg3,borderRadius:8,borderTop:"2px solid #4ade8044"}}>
                    <div style={{fontSize:9,letterSpacing:2,color:"#4ade80",marginBottom:6,fontFamily:"monospace"}}>BEST FOR</div>
                    <div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{selectedMethod.bestFor}</div>
                  </div>
                </div>
              </Crd>
            </div>
          )}
        </div>
      )}

      {subTab==="affirmations"&&(
        <div>
          {!pA&&(
            <Crd accent="#ff525222" T={t}>
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:32,marginBottom:12}}>!</div>
                <div style={{fontSize:14,fontWeight:700,color:t.text,marginBottom:8}}>Profile Required</div>
                <div style={{fontSize:12,color:t.text2,lineHeight:1.7}}>Your 30-day affirmation programme is personalised to your Life Path, Sun sign, and Chinese zodiac. Please decode your profile in the DATA MAP tab first, then return here to generate your programme.</div>
              </div>
            </Crd>
          )}
          {pA&&(
            <div>
              <Crd accent="#4ade8022" T={t}>
                <div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:4}}>30-Day Personalised Affirmation Programme</div>
                <div style={{fontSize:11,color:t.text2,lineHeight:1.7,marginBottom:16}}>Your programme is generated specifically for LP{pA.lp} ({LP_NAMES[pA.lp]}) -- {pA.sun} -- {pA.cz.element} {pA.cz.animal}. Each of the 30 affirmations includes a mindfulness practice tailored to your numerological and astrological signature.</div>
                <div style={{padding:"10px 14px",background:t.bg3,borderRadius:6,marginBottom:16,fontSize:10,fontFamily:"monospace",color:t.text3,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 6px #4ade80",flexShrink:0}}/>
                  PROFILE: {pA.name} | LP:{pA.lp} | {pA.sun} | {pA.cz.element} {pA.cz.animal} | PY:{pA.py}
                </div>

                <div style={{marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:2,color:t.label,marginBottom:10,fontFamily:"monospace"}}>SELECT THEME</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                    {["gratitude","empathy","love","forgiveness"].map(th=>(
                      <button key={th} onClick={()=>setAffTheme(th)} style={{background:affTheme===th?themeColors[th]+"22":"transparent",border:"1px solid "+(affTheme===th?themeColors[th]:t.border),borderRadius:8,padding:"12px 14px",cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}>
                        <div style={{fontSize:11,fontWeight:700,color:affTheme===th?themeColors[th]:t.text,marginBottom:4,textTransform:"capitalize"}}>{th}</div>
                        <div style={{fontSize:10,color:t.text3,lineHeight:1.5}}>{themeDesc[th].substring(0,60)}...</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{padding:"12px 14px",background:themeColors[affTheme]+"11",border:"1px solid "+themeColors[affTheme]+"33",borderRadius:8,marginBottom:16}}>
                  <div style={{fontSize:9,letterSpacing:2,color:themeColors[affTheme],marginBottom:4,fontFamily:"monospace"}}>THEME: {affTheme.toUpperCase()}</div>
                  <div style={{fontSize:11,color:t.text2,lineHeight:1.7}}>{themeDesc[affTheme]}</div>
                </div>

                <button onClick={generateAffirmations} disabled={affLoading} style={{width:"100%",background:affLoading?"transparent":"linear-gradient(135deg,"+themeColors[affTheme]+"88,"+themeColors[affTheme]+"44)",color:affLoading?t.text4:t.text,border:"1px solid "+(affLoading?t.border:themeColors[affTheme]+"66"),borderRadius:8,padding:"13px 24px",cursor:affLoading?"not-allowed":"pointer",fontSize:11,letterSpacing:3,fontWeight:700,fontFamily:"monospace",transition:"all 0.3s"}}>
                  {affLoading?"GENERATING YOUR 30-DAY PROGRAMME...":"GENERATE MY 30-DAY "+affTheme.toUpperCase()+" PROGRAMME"}
                </button>
              </Crd>

              {affLoading&&(
                <Crd accent="#4ade8022" T={t}>
                  <div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0"}}>
                    <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:themeColors[affTheme],animation:"pulse 1s ease "+(i*0.2)+"s infinite"}}/>)}</div>
                    <span style={{fontSize:10,color:t.text3,fontFamily:"monospace",letterSpacing:2}}>CRAFTING 30 PERSONALISED AFFIRMATIONS FOR LP{pA.lp} {pA.sun} {pA.cz.animal}...</span>
                  </div>
                </Crd>
              )}

              {affResult&&!affLoading&&(
                <Crd title={"30-DAY "+affTheme.toUpperCase()+" PROGRAMME -- "+pA.name.toUpperCase()} accent={themeColors[affTheme]+"44"} T={t}>
                  <div style={{marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                    <div style={{display:"flex",gap:8}}>
                      <Tg color={themeColors[affTheme]} T={t}>{affTheme.toUpperCase()}</Tg>
                      <Tg color="#4ade80" T={t}>LP {pA.lp}</Tg>
                      <Tg color="#0ea5e9" T={t}>{pA.sun}</Tg>
                    </div>
                    <button onClick={()=>{const el=document.createElement("a");el.href="data:text/plain;charset=utf-8,"+encodeURIComponent(affResult);el.download="zipher-30day-"+affTheme+"-affirmations.txt";el.click();}} style={{background:"transparent",border:"1px solid "+t.border,borderRadius:6,padding:"6px 14px",cursor:"pointer",fontSize:9,color:t.text3,fontFamily:"monospace",letterSpacing:2}}>DOWNLOAD TXT</button>
                  </div>
                  <pre style={{fontFamily:"Georgia,serif",fontSize:12,color:t.text2,whiteSpace:"pre-wrap",lineHeight:2,margin:0}}>{affResult}</pre>
                </Crd>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- MAIN APP -----------------------------------------------------------------
export default function ZipherApp(){
  const[agreed,setAgreed]=useState(false);
  const[dark,setDark]=useState(true);
  const[tab,setTab]=useState("profile");
  const[lpTab,setLpTab]=useState("lp19");
  const[zodTab,setZodTab]=useState("chinese");
  const[czSubTab,setCzSubTab]=useState("animals");
  const[menuOpen,setMenuOpen]=useState(false);
  const[fA,setFA]=useState({name:"",dob:"",timeUnknown:false,time:"",loc:""});
  const[fB,setFB]=useState({name:"",dob:"",timeUnknown:false,time:"",loc:""});
  const[pA,setPA]=useState(null);
  const[pB,setPB]=useState(null);
  const[compat,setCompat]=useState(null);
  const[daily,setDaily]=useState(null);
  const[aiQ,setAiQ]=useState("");
  const[aiR,setAiR]=useState("");
  const[aiLoad,setAiLoad]=useState(false);
  const[animKey,setAnimKey]=useState(0);

  const t=makeTheme(dark);
  const IS={background:t.bg3,border:"1px solid "+t.border,borderRadius:6,color:t.text,padding:"10px 14px",fontSize:12,width:"100%",outline:"none",fontFamily:"monospace",boxSizing:"border-box"};

  function doCalcA(){if(!fA.dob)return;const p=buildProfile(fA.dob,fA.timeUnknown?"":fA.time,fA.loc,fA.name||"Subject");setPA(p);setDaily(getDailyG(p.py,p.pd));setAnimKey(k=>k+1);setCompat(null);setPB(null);}
  function doCalcB(){if(!fB.dob||!pA)return;const p=buildProfile(fB.dob,fB.timeUnknown?"":fB.time,fB.loc,fB.name||"Target");setPB(p);setCompat(calcCompat(pA,p));}

  async function doAI(){
    if(!aiQ||!pA)return;
    setAiLoad(true);setAiR("");
    try{
      const sys=AI_SYS.replace("{PROFILE_JSON}",JSON.stringify(pA,null,2));
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[{role:"user",content:aiQ}]})});
      const data=await res.json();
      setAiR(data.content&&data.content.map(b=>b.text||"").join("")||"No response.");
    }catch(e){setAiR("Connection error.");}
    setAiLoad(false);
  }

  if(!agreed)return <TOSScreen onAgree={()=>setAgreed(true)} dark={dark}/>;

  const TABS=[["profile","DATA MAP"],["lifepath","LIFE PATH"],["compat","COMPAT"],["daily","DAILY"],["zodiac","ZODIAC"],["mindfulness","MINDFULNESS"],["ai","ASK ME"]];

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.text,fontFamily:"Georgia,serif",transition:"background 0.3s, color 0.3s"}}>

      {/* HEADER */}
      <div style={{borderBottom:"1px solid "+t.border,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:t.headerBg,position:"sticky",top:0,zIndex:50,backdropFilter:"blur(12px)",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,borderRadius:7,background:"linear-gradient(135deg,#00ff88,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:900,color:"#000",fontFamily:"monospace",boxShadow:"0 0 16px "+t.cardGlow,flexShrink:0}}>Z</div>
          <div>
            <div style={{fontSize:17,fontWeight:700,letterSpacing:5,fontFamily:"monospace",color:t.text,lineHeight:1}}>ZIPHER</div>
            <div style={{fontSize:7,letterSpacing:3,color:t.text4,display:"none"}} className="tagline">STRATEGIC INTELLIGENCE</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <ToggleSwitch dark={dark} onToggle={()=>setDark(d=>!d)}/>
          {/* Mobile hamburger */}
          <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"transparent",border:"1px solid "+t.border,borderRadius:6,padding:"6px 10px",cursor:"pointer",color:t.text,fontSize:14,display:"none"}} className="hamburger">{menuOpen?"x":"="}</button>
        </div>
      </div>

      {/* NAV - desktop */}
      <div style={{padding:"0 20px",borderBottom:"1px solid "+t.border,display:"flex",background:t.navBg,overflowX:"auto"}} className="desktop-nav">
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>{setTab(id);setMenuOpen(false);}} style={{background:"transparent",color:tab===id?t.accent:t.text4,border:"none",borderBottom:tab===id?"2px solid "+t.accent:"2px solid transparent",borderRadius:0,padding:"12px 16px",cursor:"pointer",fontSize:10,letterSpacing:2,fontWeight:700,fontFamily:"monospace",transition:"all 0.2s",whiteSpace:"nowrap",flexShrink:0}}>
            {label}{id==="ai"&&<span style={{marginLeft:5,fontSize:7,padding:"1px 4px",background:t.accentBlue+"44",color:t.accentBlue,border:"1px solid "+t.accentBlue+"44",borderRadius:3}}>AI</span>}
            {id==="mindfulness"&&<span style={{marginLeft:5,fontSize:7,padding:"1px 4px",background:"#4ade8044",color:"#4ade80",border:"1px solid #4ade8033",borderRadius:3}}>NEW</span>}
          </button>
        ))}
      </div>

      {/* NAV - mobile dropdown */}
      {menuOpen&&(
        <div style={{background:t.bg2,borderBottom:"1px solid "+t.border,padding:"8px 0"}} className="mobile-nav">
          {TABS.map(([id,label])=>(
            <button key={id} onClick={()=>{setTab(id);setMenuOpen(false);}} style={{display:"block",width:"100%",background:tab===id?t.accent+"11":"transparent",color:tab===id?t.accent:t.text2,border:"none",borderLeft:tab===id?"3px solid "+t.accent:"3px solid transparent",padding:"12px 20px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"monospace",textAlign:"left"}}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div style={{maxWidth:980,margin:"0 auto",padding:"24px 16px"}}>

        {/* === DATA MAP === */}
        {tab==="profile"&&(
          <div>
            <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:16,fontFamily:"monospace"}}>// SUBJECT INTAKE</div>
            <Crd accent={t.border} T={t}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:12}}>
                {[["FULL LEGAL NAME","text","Alexandra Monroe","name"],["DATE OF BIRTH *","date","","dob"],["BIRTH TIME","time","","time"],["BIRTH LOCATION","text","New York, NY","loc"]].map(([lbl,type,ph,key])=>(
                  <div key={key}>
                    <div style={{fontSize:8,letterSpacing:2,color:t.label,marginBottom:6,fontFamily:"monospace"}}>{lbl}</div>
                    <input style={{...IS,opacity:key==="time"&&fA.timeUnknown?0.4:1}} type={type} disabled={key==="time"&&fA.timeUnknown} value={fA[key]} onChange={e=>setFA({...fA,[key]:e.target.value})} placeholder={ph}/>
                  </div>
                ))}
              </div>
              <label style={{display:"flex",alignItems:"center",gap:8,fontSize:10,color:t.text3,fontFamily:"monospace",cursor:"pointer",marginBottom:16}}>
                <input type="checkbox" checked={fA.timeUnknown} onChange={e=>setFA({...fA,timeUnknown:e.target.checked,time:""})} style={{accentColor:"#4ade80"}}/>
                BIRTH TIME UNKNOWN
              </label>
              <button onClick={doCalcA} style={{background:"transparent",color:t.accent,border:"1px solid "+t.accent+"44",borderRadius:6,padding:"11px 24px",cursor:"pointer",fontSize:10,letterSpacing:3,fontWeight:700,fontFamily:"monospace"}}>DECODE PROFILE</button>
            </Crd>
            {pA&&(
              <div key={animKey} style={{animation:"fadeUp 0.5s ease"}}>
                <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:16,fontFamily:"monospace"}}>// {pA.name.toUpperCase()} -- DATA MAP</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
                  <Crd title="NUMEROLOGY MATRIX" accent="#00ff8822" T={t}>
                    <div style={{display:"flex",alignItems:"flex-end",gap:14,marginBottom:20,flexWrap:"wrap"}}>
                      <div style={{fontSize:68,fontWeight:900,color:t.accent,lineHeight:1,fontFamily:"monospace",textShadow:"0 0 30px #4ade8066"}}>{pA.lp}</div>
                      <div style={{paddingBottom:6}}>
                        <div style={{fontSize:10,color:t.label,letterSpacing:2,fontFamily:"monospace"}}>LIFE PATH</div>
                        <div style={{fontSize:15,fontWeight:700,color:t.text}}>{LP_NAMES[pA.lp]||"--"}</div>
                        <div style={{fontSize:10,color:t.text3,marginTop:2}}>{LP_THEMES[pA.lp]}</div>
                        {pA.isMaster&&<Tg color="#c084fc" T={t}>MASTER NUMBER</Tg>}
                        {pA.karmic&&(<div style={{marginTop:8,padding:"8px 12px",background:KARMIC[pA.karmic].color+"11",border:"1px solid "+KARMIC[pA.karmic].color+"44",borderRadius:6}}><div style={{fontSize:8,letterSpacing:2,color:KARMIC[pA.karmic].color,fontFamily:"monospace",marginBottom:3}}>KARMIC DEBT</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{pA.karmic}</div><div style={{fontSize:10,color:t.text2,marginTop:2,lineHeight:1.5}}>{KARMIC[pA.karmic].title.split("--")[1]&&KARMIC[pA.karmic].title.split("--")[1].trim()}</div></div>)}
                      </div>
                    </div>
                    <SGrid T={t} items={[{label:"EXPRESSION (PYTHAGOREAN)",value:pA.exPyt,sub:LP_NAMES[pA.exPyt]},{label:"EXPRESSION (CHALDEAN)",value:pA.exChal,sub:LP_NAMES[pA.exChal]},{label:"PERSONAL YEAR",value:pA.py,sub:LP_THEMES[pA.py]},{label:"PERSONAL DAY",value:pA.pd,sub:LP_THEMES[pA.pd]}]}/>
                  </Crd>
                  <Crd title="ASTROLOGICAL PROFILE" accent="#0ea5e922" T={t}>
                    <SGrid T={t} items={[{label:"SUN SIGN",value:pA.sun,sub:pA.el+" / "+pA.mod},{label:"MOON SIGN",value:pA.moon,sub:SIGN_EL[pA.moon]},{label:"RISING SIGN",value:pA.rising,sub:pA.time?"Time-calculated":"Birth time required"},{label:"CHINESE ZODIAC",value:pA.cz.element+" "+pA.cz.animal,sub:"Lunar Year "+pA.cz.year}]}/>
                    <div style={{marginTop:14}}>
                      <div style={{fontSize:8,letterSpacing:2,color:t.label,marginBottom:8,fontFamily:"monospace"}}>ALLIANCE NETWORK</div>
                      {(CZ_TRINITY[pA.cz.animal]||[]).map(a=><Tg key={a} color="#0ea5e9" T={t}>TRINITY: {a.toUpperCase()}</Tg>)}
                      {CZ_SECRET[pA.cz.animal]&&<Tg color="#4ade80" T={t}>SECRET FRIEND: {CZ_SECRET[pA.cz.animal].toUpperCase()}</Tg>}
                      {CZ_CLASH[pA.cz.animal]&&<Tg color="#ff3b3b" T={t}>CLASH: {CZ_CLASH[pA.cz.animal].toUpperCase()}</Tg>}
                    </div>
                  </Crd>
                </div>
              </div>
            )}
          </div>
        )}

        {/* === LIFE PATH === */}
        {tab==="lifepath"&&(
          <div>
            <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:20,fontFamily:"monospace"}}>// LIFE PATH INTELLIGENCE</div>
            <SubTab T={t} tabs={[["lp19","LP 1-9"],["lp11","MASTER NUMBERS"],["karmic","KARMIC DEBT"]]} active={lpTab} onSelect={setLpTab}/>
            {lpTab==="lp19"&&<div>{[1,2,3,4,5,6,7,8,9].map(n=><LPCard key={n} num={n} karmic={null} T={t}/>)}</div>}
            {lpTab==="lp11"&&(
              <div>
                <Crd accent="#c084fc22" T={t}><div style={{fontSize:12,color:t.text2,lineHeight:1.8}}>Master Numbers (11, 22, 33) are double-digit vibrations not reduced in the calculation. To be a genuine Master Number Life Path, the birth date must produce 11, 22, or 33 via the strict Pythagorean method.</div></Crd>
                {[11,22,33].map(n=><LPCard key={n} num={n} karmic={null} T={t}/>)}
              </div>
            )}
            {lpTab==="karmic"&&(
              <div>
                <Crd accent="#ff525222" T={t}><div style={{fontSize:12,color:t.text2,lineHeight:1.8}}>Karmic Debt Numbers (13, 14, 16, 19) appear when a Life Path calculation passes through one of these values before reaching its final number. They indicate where a previous cycle's unfinished business is being addressed.</div></Crd>
                {[13,14,16,19].map(n=><KarmicCard key={n} num={n} T={t}/>)}
              </div>
            )}
          </div>
        )}

        {/* === COMPATIBILITY === */}
        {tab==="compat"&&(
          <div>
            <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:20,fontFamily:"monospace"}}>// COMPATIBILITY MATRIX</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:16}}>
              {[{f:fA,set:setFA,lbl:"SUBJECT ONE",col:"#4ade80"},{f:fB,set:setFB,lbl:"SUBJECT TWO",col:"#0ea5e9"}].map(({f,set,lbl,col})=>(
                <Crd key={lbl} title={lbl} accent={col+"33"} T={t}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    {[["FULL NAME","text","Name","name"],["DATE OF BIRTH *","date","","dob"],["BIRTH TIME","time","","time"],["LOCATION","text","City","loc"]].map(([l,type,ph,key])=>(
                      <div key={key}>
                        <div style={{fontSize:8,letterSpacing:2,color:t.label,marginBottom:5,fontFamily:"monospace"}}>{l}</div>
                        <input style={{...IS,opacity:key==="time"&&f.timeUnknown?0.4:1}} type={type} disabled={key==="time"&&f.timeUnknown} value={f[key]} onChange={e=>set({...f,[key]:e.target.value})} placeholder={ph}/>
                      </div>
                    ))}
                  </div>
                  <label style={{display:"flex",alignItems:"center",gap:6,fontSize:9,color:t.text3,fontFamily:"monospace",cursor:"pointer"}}>
                    <input type="checkbox" checked={f.timeUnknown} onChange={e=>set({...f,timeUnknown:e.target.checked,time:""})} style={{accentColor:col}}/> TIME UNKNOWN
                  </label>
                </Crd>
              ))}
            </div>
            <button onClick={doCalcB} disabled={!fA.dob||!fB.dob} style={{background:"transparent",color:!fA.dob||!fB.dob?t.text4:t.accentBlue,border:"1px solid "+((!fA.dob||!fB.dob)?t.border:t.accentBlue+"44"),borderRadius:6,padding:"11px 24px",cursor:!fA.dob||!fB.dob?"not-allowed":"pointer",fontSize:10,letterSpacing:3,fontWeight:700,fontFamily:"monospace",marginBottom:20}}>RUN COMPATIBILITY MATRIX</button>
            {compat&&pA&&pB&&(
              <div style={{animation:"fadeUp 0.5s ease"}}>
                <Crd accent={SC[compat.verdict]+"22"} T={t}>
                  <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:20,flexWrap:"wrap"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:80,fontWeight:900,lineHeight:1,fontFamily:"monospace",color:SC[compat.verdict],textShadow:"0 0 40px "+SC[compat.verdict]+"66"}}>{compat.total}</div>
                      <div style={{fontSize:8,letterSpacing:3,color:t.label,fontFamily:"monospace",marginTop:4}}>COMPOSITE SCORE</div>
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      <Tg color={SC[compat.verdict]} T={t}>{compat.verdict}</Tg>
                      <div style={{display:"flex",gap:16,marginTop:12,flexWrap:"wrap"}}>
                        {[["NUMEROLOGY",compat.n,"#4ade80"],["CHINESE",compat.c,"#0ea5e9"],["ASTROLOGY",compat.a,"#f59e0b"]].map(([l,v,c])=>(<div key={l} style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:c,fontFamily:"monospace"}}>{v}%</div><div style={{fontSize:8,letterSpacing:2,color:t.label,fontFamily:"monospace"}}>{l}</div></div>))}
                      </div>
                    </div>
                  </div>
                  <Bar T={t} label="NUMEROLOGY -- 40%" value={compat.n} color="#4ade80"/>
                  <Bar T={t} label="CHINESE ZODIAC -- 30%" value={compat.c} color="#0ea5e9"/>
                  <Bar T={t} label="ASTROLOGY -- 30%" value={compat.a} color="#f59e0b"/>
                </Crd>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,marginBottom:16}}>
                  {[{p:pA,lbl:"PRIMARY"},{p:pB,lbl:"TARGET"}].map(({p,lbl})=>(<Crd key={lbl} title={p.name.toUpperCase()+" -- "+lbl} accent={t.border} T={t}><SGrid T={t} items={[{label:"LIFE PATH",value:p.lp,sub:LP_NAMES[p.lp]},{label:"SUN SIGN",value:p.sun,sub:p.el},{label:"ZODIAC",value:p.cz.animal,sub:p.cz.element},{label:"EXPRESSION",value:p.exPyt,sub:LP_NAMES[p.exPyt]}]}/></Crd>))}
                </div>
                <Crd title="DETAILED ANALYSIS" accent="#4ade8022" T={t}>
                  <NBlock T={t} title={"LP "+pA.lp+" + "+pB.lp+" NUMEROLOGY"} note={compat.lpNote} color="#4ade80"/>
                  <NBlock T={t} title={pA.cz.animal.toUpperCase()+" + "+pB.cz.animal.toUpperCase()+" CHINESE"} note={compat.czNote} color="#0ea5e9"/>
                  <NBlock T={t} title={pA.sun.toUpperCase()+" + "+pB.sun.toUpperCase()+" SYNASTRY"} note={compat.astroNote} color="#f59e0b"/>
                </Crd>
              </div>
            )}
          </div>
        )}

        {/* === DAILY INTEL === */}
        {tab==="daily"&&(
          <div>
            {!daily&&<div style={{color:t.text4,fontSize:12,fontFamily:"monospace",padding:"40px 0"}}>Decode your profile in DATA MAP to activate daily intelligence.</div>}
            {daily&&pA&&(
              <div>
                <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:16,fontFamily:"monospace"}}>// {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).toUpperCase()}</div>
                <Crd accent="#4ade8022" T={t}>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    {[{n:pA.py,label:"PERSONAL YEAR",color:t.accent,theme:daily.pyTheme},{n:pA.pd,label:"PERSONAL DAY",color:t.accentBlue,theme:daily.pdTheme}].map(({n,label,color,theme})=>(
                      <div key={label} style={{textAlign:"center",padding:"16px 24px",background:t.bg3,borderRadius:8,border:"1px solid "+color+"22",flex:1,minWidth:120}}>
                        <div style={{fontSize:52,fontWeight:900,color,fontFamily:"monospace",textShadow:"0 0 20px "+color+"66"}}>{n}</div>
                        <div style={{fontSize:8,letterSpacing:2,color:t.label,fontFamily:"monospace",marginTop:4}}>{label}</div>
                        <div style={{fontSize:10,color:t.text3,marginTop:4}}>{theme}</div>
                      </div>
                    ))}
                  </div>
                </Crd>
                {daily.g.map((g,i)=>(
                  <div key={i} style={{background:t.bg2,border:"1px solid "+(SC[g.status]||t.border)+"22",borderLeft:"3px solid "+(SC[g.status]||t.accent),borderRadius:8,padding:"16px 20px",marginBottom:10,display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
                    <div style={{minWidth:120}}>
                      <div style={{fontSize:8,letterSpacing:2,color:t.label,fontFamily:"monospace",marginBottom:5}}>{g.label}</div>
                      <Tg T={t} color={SC[g.status]||t.accent}>{g.status}</Tg>
                    </div>
                    <div style={{fontSize:12,color:t.text2,lineHeight:1.8,flex:1}}>{g.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === ZODIAC === */}
        {tab==="zodiac"&&(
          <div>
            <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:20,fontFamily:"monospace"}}>// ZODIAC INTELLIGENCE</div>
            <SubTab T={t} tabs={[["chinese","CHINESE ZODIAC"],["western","WESTERN ZODIAC"]]} active={zodTab} onSelect={setZodTab}/>
            {zodTab==="chinese"&&(
              <div>
                <SubTab T={t} tabs={[["animals","12 ANIMALS"],["elements","5 ELEMENTS"]]} active={czSubTab} onSelect={setCzSubTab}/>
                {czSubTab==="animals"&&<div>{["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"].map(a=><CZCard key={a} animal={a} T={t}/>)}</div>}
                {czSubTab==="elements"&&<div>{["Wood","Fire","Earth","Metal","Water"].map(el=><ElCard key={el} el={el} T={t}/>)}</div>}
              </div>
            )}
            {zodTab==="western"&&(
              <div>
                <Crd accent="#9575cd22" T={t}>
                  <div style={{fontSize:12,color:t.text2,lineHeight:1.8,marginBottom:14}}>Western astrology divides the zodiac into 12 signs based on the position of the Sun at birth. Each sign belongs to one of four elements and three modalities. Click any sign to explore its full profile.</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
                    {[["Fire","Aries, Leo, Sagittarius","#ef5350"],["Earth","Taurus, Virgo, Capricorn","#8d6e63"],["Air","Gemini, Libra, Aquarius","#ffd54f"],["Water","Cancer, Scorpio, Pisces","#4fc3f7"]].map(([el,signs,color])=>(<div key={el} style={{padding:"10px 12px",background:t.bg3,borderRadius:6,borderLeft:"2px solid "+color}}><div style={{fontSize:11,fontWeight:700,color,marginBottom:3}}>{el}</div><div style={{fontSize:9,color:t.text3,fontFamily:"monospace"}}>{signs}</div></div>))}
                  </div>
                </Crd>
                {["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map(s=><WZCard key={s} sign={s} T={t}/>)}
              </div>
            )}
          </div>
        )}

        {/* === MINDFULNESS === */}
        {tab==="mindfulness"&&<MindfulnessTab pA={pA} dark={dark} T={t}/>}

        {/* === ASK ME === */}
        {tab==="ai"&&(
          <div>
            {!pA&&<div style={{color:t.text4,fontSize:12,fontFamily:"monospace",padding:"40px 0"}}>Decode a profile in DATA MAP to activate the ZIPHER intelligence layer.</div>}
            {pA&&(
              <div>
                <Crd title="ZIPHER INTELLIGENCE LAYER" accent="#0ea5e922" T={t}>
                  <div style={{fontSize:11,color:t.text2,lineHeight:1.8,marginBottom:14}}>Query brands, people, or dates. ZIPHER has your Data Map loaded as context and responds with cold, strategic analysis.</div>
                  <div style={{padding:"10px 14px",background:t.bg3,borderRadius:6,marginBottom:14,fontSize:10,fontFamily:"monospace",color:t.text3,display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:t.accent,boxShadow:"0 0 6px "+t.accent,flexShrink:0}}/>
                    CONTEXT: {pA.name} LP:{pA.lp} {pA.sun} {pA.cz.element} {pA.cz.animal} PY:{pA.py}
                  </div>
                  <div style={{marginBottom:12}}>
                    {["Analyze Apple Inc -- is this brand aligned with my profile?","Should I partner with a Life Path 8 this quarter?","Rate March 22nd as a launch date for my product."].map((q,i)=>(
                      <div key={i} onClick={()=>setAiQ(q)} style={{cursor:"pointer",padding:"8px 12px",background:t.bg3,border:"1px solid "+t.border,borderRadius:5,marginBottom:5,fontSize:11,color:t.text3,fontFamily:"monospace"}}>
                        // {q}
                      </div>
                    ))}
                  </div>
                  <textarea style={{...IS,height:80,resize:"vertical",marginBottom:10,display:"block",lineHeight:1.7}} value={aiQ} onChange={e=>setAiQ(e.target.value)} placeholder="// Query a brand, person, or date..."/>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <button onClick={doAI} disabled={aiLoad||!aiQ} style={{background:"transparent",color:aiLoad||!aiQ?t.text4:t.accentBlue,border:"1px solid "+(aiLoad||!aiQ?t.border:t.accentBlue+"44"),borderRadius:6,padding:"10px 20px",cursor:aiLoad||!aiQ?"not-allowed":"pointer",fontSize:10,letterSpacing:3,fontWeight:700,fontFamily:"monospace"}}>{aiLoad?"PROCESSING...":"SUBMIT"}</button>
                    <button onClick={()=>{setAiQ("");setAiR("");}} disabled={!aiQ&&!aiR} style={{background:"transparent",color:!aiQ&&!aiR?t.text4:"#ff3b3b",border:"1px solid "+((!aiQ&&!aiR)?t.border:"#ff3b3b44"),borderRadius:6,padding:"10px 18px",cursor:!aiQ&&!aiR?"not-allowed":"pointer",fontSize:10,letterSpacing:3,fontWeight:700,fontFamily:"monospace"}}>CLEAR x</button>
                  </div>
                </Crd>
                {aiLoad&&(<Crd accent="#0ea5e922" T={t}><div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0"}}><div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:t.accentBlue,animation:"pulse 1s ease "+(i*0.2)+"s infinite"}}/>)}</div><span style={{fontSize:10,color:t.text3,fontFamily:"monospace",letterSpacing:2}}>ZIPHER IS ANALYZING...</span></div></Crd>)}
                {aiR&&(<Crd title="ZIPHER OUTPUT" accent="#0ea5e944" T={t}><pre style={{fontFamily:"monospace",fontSize:12,color:t.text2,whiteSpace:"pre-wrap",lineHeight:1.9,margin:0}}>{aiR}</pre></Crd>)}
              </div>
            )}
          </div>
        )}

      </div>

      {/* === FOOTER === */}
      <footer style={{borderTop:"1px solid "+t.border,background:t.bg2,padding:"32px 20px 24px",marginTop:40}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:24,marginBottom:28}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:30,height:30,borderRadius:6,background:"linear-gradient(135deg,#00ff88,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#000",fontFamily:"monospace"}}>Z</div>
                <div style={{fontSize:14,fontWeight:700,letterSpacing:4,fontFamily:"monospace",color:t.text}}>ZIPHER</div>
              </div>
              <div style={{fontSize:10,color:t.text3,lineHeight:1.7}}>Strategic Intelligence System. Numerology, astrology, and Chinese zodiac decoded into actionable data.</div>
            </div>
            <div>
              <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:10,fontFamily:"monospace"}}>NAVIGATION</div>
              {[["DATA MAP","profile"],["LIFE PATH","lifepath"],["COMPATIBILITY","compat"],["DAILY INTEL","daily"],["ZODIAC","zodiac"],["MINDFULNESS","mindfulness"],["ASK ME","ai"]].map(([lbl,id])=>(<button key={id} onClick={()=>setTab(id)} style={{display:"block",background:"transparent",border:"none",padding:"3px 0",cursor:"pointer",fontSize:11,color:t.text3,fontFamily:"monospace",textAlign:"left"}}>{lbl}</button>))}
            </div>
            <div>
              <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:10,fontFamily:"monospace"}}>LEGAL</div>
              <div style={{fontSize:11,color:t.text3,lineHeight:1.8}}>Terms of Service<br/>Privacy Policy<br/>Disclaimer<br/>Cookie Policy</div>
            </div>
            <div>
              <div style={{fontSize:9,letterSpacing:3,color:t.label,marginBottom:10,fontFamily:"monospace"}}>IMPORTANT NOTICE</div>
              <div style={{fontSize:10,color:t.text3,lineHeight:1.7}}>ZIPHER is for informational and personal development purposes only. Not a substitute for professional medical, psychological, financial, or legal advice.</div>
            </div>
          </div>

          {/* Disclaimer banner */}
          <div style={{background:t.bg3,border:"1px solid #ff8c0044",borderRadius:8,padding:"14px 18px",marginBottom:20}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#ff8c00",fontFamily:"monospace",marginBottom:6}}>DISCLAIMER</div>
            <div style={{fontSize:10,color:t.text3,lineHeight:1.7}}>The calculations, interpretations, and AI-generated content provided by ZIPHER are based on numerological, astrological, and traditional symbolic systems for informational and entertainment purposes only. Results do not constitute professional advice of any kind. Mindfulness practices and affirmations are educational tools and do not replace licensed therapeutic services. If you are experiencing a mental health crisis, please contact a qualified professional or emergency services. By using ZIPHER you confirm your agreement to our Terms of Service.</div>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,paddingTop:16,borderTop:"1px solid "+t.border}}>
            <div style={{fontSize:10,color:t.text4,fontFamily:"monospace"}}>2026 ZIPHER. All rights reserved. For informational use only.</div>
            <div style={{display:"flex",gap:8}}>
              <Tg T={t} color={t.accent}>v3.0</Tg>
              <Tg T={t} color={t.accentBlue}>NOT MEDICAL ADVICE</Tg>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        input:focus,textarea:focus{border-color:#0ea5e955!important}
        button:not(:disabled):hover{opacity:.8}
        *{box-sizing:border-box}
        .hamburger{display:none!important}
        .mobile-nav{display:none}
        @media(max-width:640px){
          .hamburger{display:flex!important}
          .desktop-nav{display:none!important}
          .mobile-nav{display:block}
        }
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#0f1e35;border-radius:4px}
      `}</style>
    </div>
  );
}
