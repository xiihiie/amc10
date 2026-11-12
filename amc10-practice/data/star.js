// ★ Friday topics: specific key ideas, a Watch out line, 4 practice problems, and step-by-step walkthroughs.
// A step is [what to do and why, the math line it adds, optional visual].
window.UP = window.UP || {};
(function(UP){
const ch=(items,o)=>Object.assign({t:"chips",items},o||{});
const gr=o=>Object.assign({t:"grid"},o);
const fg=(box,items,cap)=>({t:"fig",box,items,cap});
const R=n=>Array.from({length:n},(_,i)=>i);
const ngon=(n,r,c,rot)=>R(n).map(i=>{const a=((rot===undefined?90:rot)+360*i/n)*Math.PI/180;return [(c?c[0]:0)+r*Math.cos(a),(c?c[1]:0)+r*Math.sin(a)]});
const arc=(c,r,a0,a1,n)=>R((n||24)+1).map(i=>{const a=(a0+(a1-a0)*i/(n||24))*Math.PI/180;return [c[0]+r*Math.cos(a),c[1]+r*Math.sin(a)]});
const dice=(hl,cap)=>gr({rows:[1,2,3,4,5,6],cols:[1,2,3,4,5,6],corner:"+",cell:(r,c)=>r+c+2,hl,cap:cap||"Row: first die. Column: second die. Cell: the sum."});
const kn=(n,r)=>{const p=ngon(n,r);const it=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)it.push(["seg",p[i],p[j],"hl"]);p.forEach(q=>it.push(["pt",q]));return it};

// 1. Permutations
UP[1]={
 k:["Slots: draw one blank per position, write how many choices each blank has, and multiply. President, vice president and treasurer from 10 people: 10 × 9 × 8 = 720.",
    "All n things in a row: n! ways. Know 4! = 24, 5! = 120, 6! = 720, 7! = 5040.",
    "Repeated items: n! ÷ (a! · b! · …), one factorial per repeated letter. Swapping two identical letters makes no new word, so those orders were counted too many times. LEVEL: 5!/(2!·2!) = 30.",
    "Must be together: glue them into one block, arrange the blocks, then multiply by the orders inside the block. Must not be together: total minus together.",
    "Round table: fix one person’s seat, then arrange the rest: (n − 1)!."],
 trap:"Forgetting to divide for repeated letters. Ask: if I swapped these two items, would it be a different arrangement?",
 ex:{q:"How many ways can the letters of BANANA be arranged?",steps:[
  ["Count the letters and how often each one repeats.","B ×1, A ×3, N ×2 → 6 letters",ch(["B","A","N","A","N","A"],{c:["","a","b","a","b","a"],cap:"A appears 3 times, N twice"})],
  ["Pretend every letter is different. Then there would be 6! orders.","6! = 720"],
  ["The three A’s can trade places in 3! = 6 ways without changing the word, and the two N’s in 2! = 2 ways. Divide those out.","720 ÷ (3! · 2!) = 720 ÷ 12"],
  ["That’s the number of different words.","= 60"]]},
 p:[
  {id:"1.1",q:"Five people sit in a row. In how many ways can they sit if Ann and Bob must sit next to each other?",a:"48",steps:[
   ["Glue Ann and Bob into one block. Now you’re arranging 4 things: the block and the 3 other people.","[Ann Bob], C, D, E → 4 blocks",ch(["Ann","Bob","C","D","E"],{c:["a","a","","",""],box:[[0,1]],cap:"Ann and Bob move together as one block"})],
   ["Arrange the 4 blocks in a row.","4! = 24"],
   ["Inside the block they can sit Ann–Bob or Bob–Ann.","× 2",ch(["Bob","Ann","C","D","E"],{c:["a","a","","",""],box:[[0,1]],cap:"Same seats, the other order inside the block"})],
   ["Multiply.","24 × 2 = 48"]]},
  {id:"1.2",q:"How many arrangements of the letters in MISSISSIPPI start with M?",a:"3150",steps:[
   ["M is stuck in the first spot, so only the other 10 letters move.","M + arrange ISSISSIPPI",ch(["M","I","S","S","I","S","S","I","P","P","I"],{c:["d","a","b","b","a","b","b","a","","","a"],box:[[1,10]],cap:"Only the boxed letters get arranged"})],
   ["Count the repeats among those 10 letters.","I ×4, S ×4, P ×2"],
   ["Divide 10! by the factorial of each repeat.","10! ÷ (4! · 4! · 2!) = 3,628,800 ÷ 1152"],
   ["Compute.","= 3150"]]},
  {id:"1.3",isNew:true,q:"A club of 10 people chooses a president, a vice president and a treasurer (three different people). In how many ways can this be done?",a:"720",steps:[
   ["The jobs are different, so order matters. Draw one slot per job.","President, VP, Treasurer",ch(["10","9","8"],{sub:["Pres.","VP","Treas."],c:["a","a","a"],cap:"Choices left when each slot is filled"})],
   ["Anyone can be president: 10 choices. Then 9 people are left for VP, then 8 for treasurer.","10, then 9, then 8"],
   ["Multiply the slots.","10 × 9 × 8 = 720"]]},
  {id:"1.4",isNew:true,q:"In how many arrangements of the letters of LEVEL are the two E’s not next to each other?",a:"18",steps:[
   ["“Not next to each other” is easier as total minus “next to each other”.","answer = total − together"],
   ["Total: 5 letters, with L twice and E twice.","5!/(2! · 2!) = 120/4 = 30"],
   ["Together: glue EE into one block. Now arrange L, V, L, [EE]: 4 items with L twice.","4!/2! = 12",ch(["L","V","L","E","E"],{c:["","","","a","a"],box:[[3,4]],cap:"EE glued: 4 items to arrange"})],
   ["Subtract.","30 − 12 = 18"]]}]};

// 2. Combinations and probability
UP[2]={
 k:["C(n, k) counts groups where order doesn’t matter. Fast way: multiply k numbers counting down from n, then divide by k!. C(10, 3) = (10 · 9 · 8)/6 = 120.",
    "Values worth knowing: C(5, 2) = 10, C(6, 2) = 15, C(6, 3) = 20, C(8, 2) = 28, C(10, 2) = 45.",
    "C(n, 2) = n(n − 1)/2 counts pairs: handshakes, games where everyone plays everyone once, segments between n points.",
    "Choosing from separate groups: multiply. 2 girls from 4 and 1 boy from 5 = C(4, 2) × C(5, 1).",
    "Probability = good outcomes ÷ all outcomes, but only if every outcome is equally likely. With two dice, count the 36 ordered pairs, not the 11 possible sums."],
 trap:"Treating the sums 2 to 12 of two dice as equally likely. A sum of 7 happens 6 ways; a sum of 2 happens only 1 way.",
 spot:"“choose”, “committee”, “select”, “probability”, “at random”.",
 ex:{q:"A bag has 4 red and 6 blue marbles. You draw 2 without replacement. What’s the probability both are red?",steps:[
  ["All outcomes: any 2 of the 10 marbles. Order doesn’t matter.","C(10, 2) = (10 · 9)/2 = 45",ch(["R","R","R","R","B","B","B","B","B","B"],{c:["a","a","a","a","","","","","",""],cap:"4 red, 6 blue"})],
  ["Good outcomes: 2 of the 4 red marbles.","C(4, 2) = (4 · 3)/2 = 6"],
  ["Divide and simplify.","6/45 = 2/15"],
  ["Check another way: the first is red with chance 4/10, then the second with 3/9.","(4/10)(3/9) = 12/90 = 2/15 ✓"]]},
 ten:"#12 (socks) and #13 (handshakes are C(n, 2)).",
 p:[
  {id:"2.1",q:"A 3-person committee is chosen from 5 boys and 4 girls. How many committees have exactly 2 girls?",a:"30",steps:[
   ["Pick the girls and the boys separately, then multiply.","2 of 4 girls, 1 of 5 boys",ch(["G","G","G","G","B","B","B","B","B"],{c:["a","a","","","b","","","",""],cap:"One possible committee"})],
   ["Ways to pick 2 of the 4 girls.","C(4, 2) = 6"],
   ["Ways to pick 1 of the 5 boys.","C(5, 1) = 5"],
   ["Multiply.","6 × 5 = 30"]]},
  {id:"2.2",q:"Two fair dice are rolled. What is the probability that the sum is 8?",a:"5/36",steps:[
   ["List outcomes as ordered pairs: 6 × 6 = 36, all equally likely.","36 outcomes",dice(()=>"")],
   ["Mark the pairs that add to 8.","(2,6), (3,5), (4,4), (5,3), (6,2) → 5",dice((r,c)=>r+c+2===8?"a":"")],
   ["Probability = good ÷ total.","5/36"]]},
  {id:"2.3",isNew:true,q:"Two cards are drawn without replacement from a standard 52-card deck. What is the probability that both are hearts?",a:"1/17",steps:[
   ["All outcomes: any 2 of the 52 cards.","C(52, 2) = (52 · 51)/2 = 1326"],
   ["Good outcomes: 2 of the 13 hearts.","C(13, 2) = (13 · 12)/2 = 78"],
   ["Divide and simplify.","78/1326 = 1/17"],
   ["Check step by step: (13/52)(12/51) = (1/4)(4/17).","= 1/17 ✓"]]},
  {id:"2.4",isNew:true,q:"Every pair of guests at a party shook hands exactly once, for 45 handshakes in total. How many guests were there?",a:"10",steps:[
   ["Each handshake is a pair of guests, so n guests make C(n, 2) handshakes.","n(n − 1)/2 = 45",fg([-2.4,-2.2,2.4,2.4],kn(5,2),"5 guests make C(5, 2) = 10 handshakes: one per segment")],
   ["Multiply both sides by 2.","n(n − 1) = 90"],
   ["Find two consecutive whole numbers that multiply to 90.","10 × 9 = 90 → n = 10"]]}]};

// 3. Casework
UP[3]={
 k:["Split on one thing: the most restricted choice (the first digit, the largest number, the special person). Each case should be easy to count.",
    "Make a table with one row per case and its count, then add the counts.",
    "Check that no outcome fits two cases (double counting) and every outcome fits one (nothing missing).",
    "Two digits that add to s (s from 0 to 9) can be written s + 1 ways: s = 3 gives 03, 12, 21, 30.",
    "If the table gets long or messy, try complementary counting (topic 4)."],
 trap:"Missing a case: 0, a one-digit number, or forgetting that a leading digit can’t be 0.",
 ex:{q:"How many 3-digit numbers have digits that add to 5?",steps:[
  ["Split on the hundreds digit h. It can be 1 to 5: not 0, and not more than 5.","h = 1, 2, 3, 4, 5"],
  ["For each h, the other two digits must add to 5 − h, and two digits add to s in s + 1 ways.","ways = (5 − h) + 1",gr({rows:["h = 1","h = 2","h = 3","h = 4","h = 5"],cols:["tens + units =","ways"],corner:"case",cell:(r,c)=>c===0?4-r:5-r,hl:(r,c)=>c===1?"a":""})],
  ["Add the cases.","5 + 4 + 3 + 2 + 1 = 15"]]},
 ten:"#16 (score cases) and #21 (listing all 10 tilings).",
 p:[
  {id:"3.1",q:"How many positive integers less than 100 have digits that add to 9?",a:"10",steps:[
   ["Case 1: one-digit numbers. Only 9 works.","1 number"],
   ["Case 2: two-digit numbers with tens digit t from 1 to 9 and units digit 9 − t. Each t gives one number.","9 numbers",ch(["18","27","36","45","54","63","72","81","90"],{c:Array(9).fill("a")})],
   ["Add the cases.","1 + 9 = 10"]]},
  {id:"3.2",q:"How many ordered pairs of positive integers (a, b) satisfy a·b ≤ 10?",a:"27",steps:[
   ["Split on a. For each a, b can be any whole number from 1 up to 10 ÷ a, rounded down.","b ≤ ⌊10/a⌋",gr({rows:R(10).map(i=>"a = "+(i+1)),cols:["b can be","count"],corner:"case",cell:(r,c)=>{const m=Math.floor(10/(r+1));return c===0?(m===1?"1":"1–"+m):m},hl:(r,c)=>c===1?"a":""})],
   ["Read the counts down the table.","10 + 5 + 3 + 2 + 2 + 1 + 1 + 1 + 1 + 1"],
   ["Add.","= 27"]]},
  {id:"3.3",isNew:true,q:"How many 3-digit numbers have a middle digit equal to the average of the first and last digits (like 357 or 444)?",a:"45",steps:[
   ["Once you pick the first digit a and the last digit c, the middle digit (a + c)/2 is forced. It must be whole, so a and c are both odd or both even.","count pairs (a, c) with a + c even",gr({rows:R(9).map(i=>i+1),cols:R(10),corner:"a \\ c",cell:(r,c)=>((r+1+c)%2===0)?(r+1+c)/2:"",hl:()=>"",cap:"Each filled cell is a valid middle digit"})],
   ["Case 1: both odd. a can be 1, 3, 5, 7, 9 and so can c.","5 × 5 = 25",gr({rows:R(9).map(i=>i+1),cols:R(10),corner:"a \\ c",cell:(r,c)=>((r+1+c)%2===0)?(r+1+c)/2:"",hl:(r,c)=>((r+1)%2===1&&c%2===1)?"a":""})],
   ["Case 2: both even. a can be 2, 4, 6, 8 (not 0) and c can be 0, 2, 4, 6, 8.","4 × 5 = 20",gr({rows:R(9).map(i=>i+1),cols:R(10),corner:"a \\ c",cell:(r,c)=>((r+1+c)%2===0)?(r+1+c)/2:"",hl:(r,c)=>((r+1)%2===1&&c%2===1)?"a":((r+1)%2===0&&c%2===0)?"b":""})],
   ["Add the cases.","25 + 20 = 45"]]},
  {id:"3.4",isNew:true,q:"In how many ways can you make 25 cents using pennies, nickels and dimes?",a:"12",steps:[
   ["Split on dimes, the coin with the fewest options: 0, 1 or 2 dimes.","dimes = 0, 1 or 2"],
   ["In each case, count how many nickels fit. Pennies make up the rest automatically.","",gr({rows:["0 dimes","1 dime","2 dimes"],cols:["cents left","nickels","ways"],corner:"case",cells:[["25","0 to 5","6"],["15","0 to 3","4"],["5","0 or 1","2"]],hl:(r,c)=>c===2?"a":""})],
   ["Add the cases.","6 + 4 + 2 = 12"]]}]};

// 4. Complementary counting
UP[4]={
 k:["Want = total − don’t want. Use it when the “don’t want” side is a single simple case.",
    "“At least one” → subtract “none”. “At least two” → subtract “none” and “exactly one”.",
    "Probability version: P(at least one) = 1 − P(none). Five coin flips: P(no heads) = (1/2)⁵ = 1/32.",
    "“None” counts are often slots: 4-digit numbers with no 7 → 8 × 9 × 9 × 9, since the first digit can’t be 0 or 7."],
 trap:"Getting the total wrong. Four-digit numbers run from 1000 to 9999, which is 9000 numbers, not 9999.",
 ex:{q:"How many 4-digit numbers have at least one digit equal to 7?",steps:[
  ["“At least one 7” needs many cases (one 7, two 7s, …). Its opposite, “no 7 at all”, is one case.","answer = all − (no 7)"],
  ["All four-digit numbers: 1000 through 9999.","9999 − 1000 + 1 = 9000"],
  ["No 7: the first digit is 1–9 except 7 (8 choices). Each other digit is 0–9 except 7 (9 choices).","8 × 9 × 9 × 9 = 5832",ch(["8","9","9","9"],{sub:["thousands","hundreds","tens","units"],c:["a","a","a","a"],cap:"Choices for each digit with no 7"})],
  ["Subtract.","9000 − 5832 = 3168"]]},
 p:[
  {id:"4.1",q:"A fair coin is flipped 5 times. What is the probability of at least one head?",a:"31/32",steps:[
   ["The opposite of “at least one head” is all tails.","P = 1 − P(all tails)"],
   ["All tails is one outcome out of 2⁵ = 32.","P(all tails) = 1/32",ch(["T","T","T","T","T"],{c:["b","b","b","b","b"],cap:"The only outcome with no heads"})],
   ["Subtract from 1.","1 − 1/32 = 31/32"]]},
  {id:"4.2",q:"A 3-person committee is chosen from 5 boys and 4 girls. How many committees have at least one girl?",a:"74",steps:[
   ["The opposite of “at least one girl” is all boys.","answer = all − all-boy"],
   ["All committees: any 3 of 9 people.","C(9, 3) = 84"],
   ["All-boy committees: any 3 of the 5 boys.","C(5, 3) = 10"],
   ["Subtract.","84 − 10 = 74"]]},
  {id:"4.3",isNew:true,q:"Two fair dice are rolled. What is the probability that at least one of them shows a 6?",a:"11/36",steps:[
   ["Opposite: neither die shows a 6. Each die has 5 faces that aren’t 6.","5 × 5 = 25 outcomes",dice((r,c)=>(r<5&&c<5)?"b":"","The shaded 5 × 5 block has no 6")],
   ["So 25 of the 36 outcomes have no 6.","P(no 6) = 25/36"],
   ["Subtract from 1.","1 − 25/36 = 11/36",dice((r,c)=>(r===5||c===5)?"a":"","The 11 outcomes with at least one 6")]]},
  {id:"4.4",isNew:true,q:"How many 3-letter strings made from the 26 letters A–Z have at least two letters the same?",a:"1976",steps:[
   ["The opposite of “at least two the same” is “all three different”.","answer = all − all different"],
   ["All strings: 26 choices for each of the 3 spots.","26³ = 17,576"],
   ["All different: 26, then 25, then 24.","26 × 25 × 24 = 15,600",ch(["26","25","24"],{sub:["1st","2nd","3rd"],c:["a","a","a"]})],
   ["Subtract.","17,576 − 15,600 = 1976"]]}]};

// 13. Algebraic factorizations
UP[13]={
 k:["Difference of squares: a² − b² = (a − b)(a + b). On numbers: 2026² − 2024² = 2 × 4050 = 8100, and 99 × 101 = 100² − 1 = 9999.",
    "Square of a sum: (a + b)² = a² + 2ab + b². Mental math: 31² = 900 + 60 + 1 = 961.",
    "Simon’s Favorite Factoring Trick (SFFT): for xy + ax + by = c, add ab to both sides so the left side factors as (x + b)(y + a).",
    "Once you have (something) × (something) = a number, list that number’s factor pairs. That short list holds every possible answer.",
    "Check each factor pair against the conditions: positive, whole numbers, x ≠ y, and so on."],
 trap:"Missing factor pairs, or keeping pairs that make x or y zero or negative when the problem wants positive integers.",
 spot:"big numbers squared and subtracted; an equation with an xy term and whole-number answers.",
 ex:{q:"How many pairs of positive integers (x, y) satisfy xy + 2x + 3y = 30?",steps:[
  ["The xy, 2x and 3y terms suggest SFFT. Look for a product that expands to them: (x + 3)(y + 2).","(x + 3)(y + 2) = xy + 2x + 3y + 6"],
  ["Add 6 to both sides of the equation.","(x + 3)(y + 2) = 36"],
  ["x and y are positive, so x + 3 ≥ 4 and y + 2 ≥ 3. Check every factor pair of 36.","",gr({rows:["1 · 36","2 · 18","3 · 12","4 · 9","6 · 6","9 · 4","12 · 3","18 · 2","36 · 1"],cols:["x","y","ok?"],corner:"(x+3)(y+2)",cells:[["−2","34","✗"],["−1","16","✗"],["0","10","✗"],["1","7","✓"],["3","4","✓"],["6","2","✓"],["9","1","✓"],["15","0","✗"],["33","−1","✗"]],hl:(r,c)=>(r>=3&&r<=6)?"g":"x"})],
  ["Count the pairs that work.","4 pairs"]]},
 p:[
  {id:"13.1",q:"Compute 2026² − 2024².",a:"8100",steps:[
   ["This is a difference of squares with a = 2026 and b = 2024.","(2026 − 2024)(2026 + 2024)"],
   ["Compute each factor.","= 2 × 4050"],
   ["Multiply.","= 8100"]]},
  {id:"13.2",q:"How many ordered pairs of positive integers (x, y) satisfy xy − 3x − 3y = 0?",a:"3",steps:[
   ["SFFT: (x − 3)(y − 3) = xy − 3x − 3y + 9, so add 9 to both sides.","(x − 3)(y − 3) = 9"],
   ["List every factor pair of 9, negative ones included, and turn each into (x, y).","",gr({rows:["1 · 9","3 · 3","9 · 1","−1 · −9","−3 · −3","−9 · −1"],cols:["(x, y)","ok?"],corner:"(x−3)(y−3)",cells:[["(4, 12)","✓"],["(6, 6)","✓"],["(12, 4)","✓"],["(2, −6)","✗"],["(0, 0)","✗"],["(−6, 2)","✗"]],hl:(r)=>r<3?"g":"x"})],
   ["Only the positive factor pairs give positive x and y.","3 pairs"]]},
  {id:"13.3",isNew:true,q:"Compute 1001 × 999 without a calculator.",a:"999999",steps:[
   ["Both numbers are 1 away from 1000.","1001 × 999 = (1000 + 1)(1000 − 1)"],
   ["That’s a difference of squares.","= 1000² − 1²"],
   ["Compute.","= 1,000,000 − 1 = 999,999"]]},
  {id:"13.4",isNew:true,q:"How many ordered pairs of positive integers (x, y) satisfy xy + x + y = 23?",a:"6",steps:[
   ["SFFT: (x + 1)(y + 1) = xy + x + y + 1, so add 1 to both sides.","(x + 1)(y + 1) = 24"],
   ["x and y are at least 1, so both factors are at least 2. List the factor pairs of 24 that fit.","2·12, 3·8, 4·6, 6·4, 8·3, 12·2"],
   ["Subtract 1 from each part to get (x, y).","(1,11), (2,7), (3,5), (5,3), (7,2), (11,1)"],
   ["Count.","6 pairs"]]}]};

// 18. Arithmetic sequences
UP[18]={
 k:["nth term = a₁ + (n − 1)d: start at the first term and take n − 1 steps of size d. The 5th term of 3, 7, 11, … is 3 + 4 × 4 = 19.",
    "Number of terms from a to b in steps of d: (b − a)/d + 1. From 3 to 99 by 4s: 96/4 + 1 = 25.",
    "Sum = (number of terms) × (first + last)/2. Pair the first term with the last, the second with the second-to-last: every pair has the same sum.",
    "Given two terms, divide the change in value by the change in position to get d. Terms 5 and 12 are 7 steps apart.",
    "Three numbers a, b, c are in arithmetic order exactly when 2b = a + c (the middle one is the average)."],
 trap:"Off by one: the numbers 3 through 7 are 5 numbers (7 − 3 + 1), not 4.",
 spot:"“increases by the same amount each time”, evenly spaced numbers, sums like 3 + 7 + 11 + …",
 ex:{q:"Find 3 + 7 + 11 + … + 99.",steps:[
  ["Find the step and the number of terms.","d = 4, terms = (99 − 3)/4 + 1 = 25"],
  ["Pair the first term with the last, the second with the second-to-last, and so on. Every pair adds to 102.","3 + 99 = 7 + 95 = 11 + 91 = 102",ch(["3","7","11","…","91","95","99"],{c:["a","b","","","","b","a"],cap:"Same color = same pair, each adding to 102"})],
  ["25 terms make 25 halves of a pair, so the sum is 25 × 102/2.","sum = 25 × (3 + 99)/2"],
  ["Compute.","= 1275"]]},
 ten:"#25 starts with 1 + 2 + … + 20 = 210 nuts.",
 p:[
  {id:"18.1",q:"The 5th term of an arithmetic sequence is 17 and the 12th term is 45. Find the 20th term.",a:"77",steps:[
   ["From term 5 to term 12 is 7 steps, and the value rises 45 − 17 = 28.","7d = 28 → d = 4",ch(["17","…","45","…","?"],{sub:["term 5","","term 12","","term 20"],c:["a","","a","","b"]})],
   ["From term 12 to term 20 is 8 more steps.","a₂₀ = a₁₂ + 8d"],
   ["Compute.","45 + 8 × 4 = 77"]]},
  {id:"18.2",q:"How many multiples of 7 are between 100 and 500?",a:"57",steps:[
   ["Find the first and last multiples of 7 in that range.","first 105 = 7 × 15, last 497 = 7 × 71"],
   ["Count the multipliers 15 through 71.","71 − 15 + 1"],
   ["Don’t forget the +1.","= 57"]]},
  {id:"18.3",isNew:true,q:"Find the sum of all the odd numbers from 1 to 99.",a:"2500",steps:[
   ["The odd numbers 1, 3, …, 99 form an arithmetic sequence with d = 2.","terms = (99 − 1)/2 + 1 = 50"],
   ["Sum = number of terms × (first + last)/2.","50 × (1 + 99)/2 = 50 × 50"],
   ["Compute. The first n odd numbers always add to n².","= 2500",ch(["1","3","5","7","9"],{c:["a","b","a","b","a"],cap:"1 + 3 + 5 + 7 + 9 = 25 = 5²"})]]},
  {id:"18.4",isNew:true,q:"The first three terms of an arithmetic sequence are x, 2x + 3 and 5x − 1. Find the 10th term.",a:"62",steps:[
   ["The middle term of three is the average of the other two, so 2 × middle = first + third.","2(2x + 3) = x + (5x − 1)"],
   ["Solve.","4x + 6 = 6x − 1 → x = 3.5"],
   ["The terms are 3.5, 10, 16.5, so d = 6.5.","a₁ = 3.5, d = 6.5"],
   ["10th term = a₁ + 9d.","3.5 + 9 × 6.5 = 62"]]}]};

// 21. Mean, median, mode
UP[21]={
 k:["Turn every mean into a total: mean × count = total. Five numbers with mean 12 add to 60.",
    "Adding or removing a number: compare the totals before and after. The difference is that number.",
    "Median: sort first. Odd count → the middle value. Even count → the average of the two middle values.",
    "To make one value as large as possible, make every other value as small as the rules allow.",
    "Mode: the most frequent value. “Unique mode” means no other value appears as often."],
 trap:"Taking the median of an unsorted list, or averaging two group means when the groups have different sizes.",
 spot:"“average”, “mean”, “median”, “mode”.",
 ex:{q:"5 numbers have mean 12. A sixth number raises the mean to 13. What is the sixth number?",steps:[
  ["Turn the old mean into a total.","5 × 12 = 60"],
  ["Turn the new mean into a total.","6 × 13 = 78"],
  ["The new number is the difference between the totals.","78 − 60 = 18"]]},
 ten:"#5 (adding the mean to a list doesn’t change the mean) and #10.",
 p:[
  {id:"21.1",q:"Your first 4 test scores average 85. What do you need on the 5th test to bring the average to 87?",a:"95",steps:[
   ["Total needed for an 87 average over 5 tests.","5 × 87 = 435"],
   ["Total so far.","4 × 85 = 340"],
   ["The 5th test makes up the difference.","435 − 340 = 95"]]},
  {id:"21.2",q:"Five positive integers have mean 10, median 9 and a unique mode of 8. What is the largest possible number in the list?",a:"15",steps:[
   ["Mean 10 means the total is 50. Median 9 means the sorted list is a ≤ b ≤ 9 ≤ d ≤ e.","a + b + 9 + d + e = 50"],
   ["The mode 8 must appear at least twice, and only a and b are small enough.","a = b = 8",ch(["8","8","9","d","e"],{c:["a","a","","",""]})],
   ["Now d + e = 25. Make d as small as possible: d = 9 would tie the mode, so d = 10.","d = 10 → e = 15",ch(["8","8","9","10","15"],{c:["a","a","","","b"]})],
   ["Check: total 50, median 9, and 8 is the only repeated value.","largest = 15"]]},
  {id:"21.3",isNew:true,q:"The mean of 7 numbers is 20. One number is removed, and the mean of the remaining 6 is 19. What number was removed?",a:"26",steps:[
   ["Old total.","7 × 20 = 140"],
   ["New total.","6 × 19 = 114"],
   ["The removed number is the difference.","140 − 114 = 26"]]},
  {id:"21.4",isNew:true,q:"Find the median of the list 7, 3, 9, 3, 12, 5.",a:"6",steps:[
   ["Sort first.","3, 3, 5, 7, 9, 12",ch(["3","3","5","7","9","12"],{c:["","","a","a","",""]})],
   ["Six numbers, so the median is the average of the 3rd and 4th.","(5 + 7)/2"],
   ["Compute.","= 6"]]}]};

// 23. Speed, distance, time
UP[23]={
 k:["distance = rate × time. Make a small table with columns d, r, t and one row per trip.",
    "Convert minutes to hours before multiplying: 20 minutes = 1/3 hour, so 45 mph for 20 minutes is 15 miles.",
    "Average speed = total distance ÷ total time. Only average the speeds themselves when the times are equal.",
    "Moving toward each other, the gap closes at the sum of the speeds. Chasing, it closes at the difference.",
    "“Late” and “early” are about times: write time₁ − time₂ = the difference, in hours."],
 trap:"Averaging 30 and 60 to get 45 mph. The slow part of the trip takes longer, so the true average is 40.",
 spot:"mph, “arrives late”, “meets”, “catches up”.",
 ex:{q:"You drive 60 miles at 30 mph and come back the same 60 miles at 60 mph. What’s your average speed?",steps:[
  ["Make a d-r-t table. Time = distance ÷ rate.","",gr({rows:["going","coming back","whole trip"],cols:["distance","rate","time"],corner:"",cells:[["60","30","2 h"],["60","60","1 h"],["120","?","3 h"]],hl:(r)=>r===2?"a":""})],
  ["Add up the distances and the times.","120 miles in 3 hours"],
  ["Average speed = total distance ÷ total time.","120/3 = 40 mph (not 45)"]]},
 ten:"#8 (use the shortest possible distance and the longest possible time).",
 p:[
  {id:"23.1",q:"Two trains 300 miles apart travel toward each other at 70 mph and 80 mph. How many minutes until they meet?",a:"120",steps:[
   ["They move toward each other, so the gap shrinks at 70 + 80 mph.","closing speed = 150 mph",fg([-0.5,-1.3,10.5,1.3],[["seg",[0,0],[10,0],"m"],["pt",[0,0],"hl"],["pt",[10,0],"al"],["text",[1.3,0.7],"70 mph →","a"],["text",[8.7,0.7],"← 80 mph","al"],["text",[5,-0.8],"300 miles","m"]],"The gap closes 150 miles every hour")],
   ["Time to close 300 miles.","300/150 = 2 hours"],
   ["Convert to minutes.","2 × 60 = 120 minutes"]]},
  {id:"23.2",q:"Maya walks to school at 3 mph and arrives 10 minutes late. At 4 mph she arrives 5 minutes early. How many miles away is school?",a:"3",steps:[
   ["Let d be the distance. The two walking times are d/3 and d/4 hours.","t₁ = d/3, t₂ = d/4"],
   ["The slow walk takes 10 + 5 = 15 minutes longer, which is 1/4 hour.","d/3 − d/4 = 1/4"],
   ["d/3 − d/4 = d/12.","d/12 = 1/4 → d = 3 miles"]]},
  {id:"23.3",isNew:true,q:"A cyclist rides 12 miles at 8 mph and then 12 more miles at 12 mph. What is her average speed for the whole trip, in mph?",a:"9.6",steps:[
   ["Time for each part = distance ÷ rate.","",gr({rows:["part 1","part 2","whole trip"],cols:["distance","rate","time"],corner:"",cells:[["12","8","1.5 h"],["12","12","1 h"],["24","?","2.5 h"]],hl:(r)=>r===2?"a":""})],
   ["Total distance and total time.","24 miles in 2.5 hours"],
   ["Average speed. Notice it’s below 10, the average of 8 and 12.","24/2.5 = 9.6 mph"]]},
  {id:"23.4",isNew:true,q:"Car A leaves a town at noon driving 40 mph. Car B leaves the same town at 1 pm on the same road, driving 60 mph. How many hours after noon does B catch A?",a:"3",steps:[
   ["At 1 pm, A has driven for 1 hour.","head start = 40 miles"],
   ["B gains on A at the difference of the speeds.","60 − 40 = 20 mph"],
   ["Time for B to close the 40-mile gap.","40/20 = 2 hours after 1 pm"],
   ["Count from noon.","1 + 2 = 3 hours (3 pm)"]]}]};

// 24. Factor tricks
UP[24]={
 k:["Prime factorize first: 360 = 2³ · 3² · 5.",
    "Number of divisors: add 1 to each exponent and multiply. 360 → 4 × 3 × 2 = 24. A divisor chooses how many 2s (0 to 3), how many 3s (0 to 2) and how many 5s (0 or 1).",
    "Odd divisors: use no 2s, so drop the 2’s exponent. 360 has 3 × 2 = 6 odd divisors.",
    "Perfect-square divisors: every exponent must be even. For 2⁴ that’s 0, 2 or 4, which is 3 choices.",
    "Only perfect squares have an odd number of divisors, because their square root pairs with itself."],
 trap:"Multiplying the exponents (3 × 2 × 1) instead of the exponents plus one (4 × 3 × 2).",
 spot:"“how many divisors”, “how many factors”, a huge product of small numbers.",
 ex:{q:"How many positive divisors does 72 have?",steps:[
  ["Prime factorize.","72 = 2³ · 3²"],
  ["A divisor picks 0 to 3 twos and 0 to 2 threes. Every combination is a different divisor.","",gr({rows:["2⁰","2¹","2²","2³"],cols:["3⁰","3¹","3²"],corner:"×",cell:(r,c)=>Math.pow(2,r)*Math.pow(3,c),hl:()=>"a",cap:"All 12 divisors of 72"})],
  ["4 choices for the 2s times 3 choices for the 3s.","(3 + 1)(2 + 1) = 12"]]},
 ten:"#20 (510510 = 2·3·5·7·11·13·17).",
 p:[
  {id:"24.1",q:"How many positive divisors does 360 have?",a:"24",steps:[
   ["Factor 360.","360 = 2³ · 3² · 5¹"],
   ["Add 1 to each exponent.","4, 3, 2"],
   ["Multiply.","4 × 3 × 2 = 24"]]},
  {id:"24.2",q:"How many positive divisors of 3600 are perfect squares?",a:"12",steps:[
   ["Factor 3600.","3600 = 2⁴ · 3² · 5²"],
   ["A square divisor uses only even exponents.","2: 0, 2, 4 · 3: 0, 2 · 5: 0, 2"],
   ["Multiply the choices.","3 × 2 × 2 = 12"]]},
  {id:"24.3",isNew:true,q:"How many odd positive divisors does 360 have?",a:"6",steps:[
   ["360 = 2³ · 3² · 5. An odd divisor uses no 2s at all.","only 3² · 5 = 45 is left"],
   ["Count the divisors of 3² · 5.","(2 + 1)(1 + 1) = 6"],
   ["They are 1, 3, 5, 9, 15 and 45.","6"]]},
  {id:"24.4",isNew:true,q:"What is the smallest positive integer with exactly 6 positive divisors?",a:"12",steps:[
   ["6 can be written as 6 or 3 × 2, so the factorization is p⁵ or p² · q.","p⁵ or p² · q"],
   ["Make each as small as possible: use the smallest primes, with the bigger exponent on 2.","2⁵ = 32, 2² · 3 = 12"],
   ["Take the smaller one and check its divisors.","12: 1, 2, 3, 4, 6, 12"]]}]};

// 26. GCD and LCM
UP[26]={
 k:["Factor both numbers. gcd: each shared prime with its smaller exponent. lcm: every prime with its larger exponent.",
    "For two numbers, gcd × lcm = a × b. Given three of these four numbers, you can find the fourth.",
    "Euclidean algorithm: gcd(a, b) = gcd(b, remainder of a ÷ b). gcd(120, 84) → gcd(84, 36) → gcd(36, 12) = 12.",
    "Things that repeat every a and every b line up every lcm(a, b). Splitting into the largest equal groups uses the gcd.",
    "gcd(n, n + 1) is always 1, and gcd(n, n + k) always divides k."],
 trap:"Using gcd when you need lcm. Ask: do I want a number that divides both (gcd), or a number that both divide into (lcm)?",
 spot:"“repeat”, “line up again”, “largest number that divides”, “smallest number divisible by”.",
 ex:{q:"Find gcd(84, 120) and lcm(84, 120).",steps:[
  ["Factor both numbers.","84 = 2² · 3 · 7, 120 = 2³ · 3 · 5"],
  ["Line up the exponent of each prime.","",gr({rows:["84","120","gcd (smaller)","lcm (larger)"],cols:["2","3","5","7"],corner:"exponent of",cells:[[2,1,0,1],[3,1,1,0],[2,1,0,0],[3,1,1,1]],hl:(r)=>r===2?"a":r===3?"b":""})],
  ["gcd takes the smaller exponent of each prime.","gcd = 2² · 3 = 12"],
  ["lcm takes the larger exponent of each prime.","lcm = 2³ · 3 · 5 · 7 = 840"],
  ["Check: gcd × lcm should equal 84 × 120.","12 × 840 = 10,080 = 84 × 120 ✓"]]},
 ten:"#11 (lcm) and #15 (running the Euclidean algorithm backwards).",
 p:[
  {id:"26.1",q:"Two numbers have gcd 6 and lcm 180. One of them is 36. What is the other?",a:"30",steps:[
   ["For two numbers, gcd × lcm = their product.","6 × 180 = 36 × n"],
   ["Solve.","n = 1080/36 = 30"],
   ["Check: gcd(36, 30) = 6 and lcm(36, 30) = 180.","30 ✓"]]},
  {id:"26.2",q:"Three lights blink every 12, 18 and 30 seconds. They blink together at noon. How many seconds until they next blink together?",a:"180",steps:[
   ["They line up at common multiples of 12, 18 and 30. The first one is the lcm.","lcm(12, 18, 30)"],
   ["Factor each.","12 = 2² · 3, 18 = 2 · 3², 30 = 2 · 3 · 5"],
   ["Take the largest power of each prime.","2² · 3² · 5 = 180 seconds"]]},
  {id:"26.3",isNew:true,q:"Use the Euclidean algorithm to find gcd(391, 299).",a:"23",steps:[
   ["Divide the larger by the smaller and keep the remainder.","391 = 1 × 299 + 92 → gcd(299, 92)"],
   ["Repeat with the smaller number and the remainder.","299 = 3 × 92 + 23 → gcd(92, 23)"],
   ["Repeat until the remainder is 0.","92 = 4 × 23 + 0 → gcd = 23"],
   ["Check: 391 = 17 × 23 and 299 = 13 × 23.","23"]]},
  {id:"26.4",isNew:true,q:"A teacher has 48 pencils and 36 erasers and wants to make identical kits that use all of them. What is the largest number of kits she can make?",a:"12",steps:[
   ["Identical kits means the number of kits divides both 48 and 36.","kits divides 48 and 36"],
   ["The largest such number is the gcd.","48 = 2⁴ · 3, 36 = 2² · 3²"],
   ["Take the smaller exponents.","2² · 3 = 12 kits (4 pencils and 3 erasers each)"]]}]};

// 27. Modular arithmetic
UP[27]={
 k:["Work with remainders only. The remainder of 47 × 53 ÷ 5: 47 leaves 2 and 53 leaves 3, so 2 × 3 = 6, which leaves 1.",
    "Units digit = remainder mod 10. Units digits of powers repeat: 2 → 2, 4, 8, 6; 3 → 3, 9, 7, 1; 7 → 7, 9, 3, 1; 4 → 4, 6; 9 → 9, 1.",
    "For a cycle of length 4, divide the exponent by 4. Remainder 1, 2 or 3 → the 1st, 2nd or 3rd term; remainder 0 → the 4th term.",
    "Look for a power that equals 1: 2³ = 8 ≡ 1 (mod 7), so 2³⁰⁰ ≡ 1 and 2³⁰¹ ≡ 2.",
    "A number leaves the same remainder mod 9 as its digit sum (the same works for mod 3)."],
 trap:"With remainder 0, taking the “0th” term of a cycle. Remainder 0 means the last term of the cycle.",
 spot:"“remainder”, “units digit”, “last digit”, huge powers.",
 ex:{q:"What is the units digit of 7²⁰²⁶?",steps:[
  ["Write the units digits of powers of 7 until they repeat.","7, 49, 343, 2401 → 7, 9, 3, 1",ch(["7","9","3","1"],{sub:["7¹","7²","7³","7⁴"],cap:"The cycle has length 4"})],
  ["Find where 2026 lands in the cycle.","2026 = 4 × 506 + 2 → remainder 2"],
  ["Remainder 2 means the second term of the cycle.","units digit 9",ch(["7","9","3","1"],{sub:["7¹","7²","7³","7⁴"],c:["","a","",""],cap:"7²⁰²⁶ ends like 7²"})]]},
 ten:"#25 (the number of days must end in 5).",
 p:[
  {id:"27.1",q:"What is the remainder when 2¹⁰⁰ is divided by 7?",a:"2",steps:[
   ["Look for a power of 2 that leaves remainder 1 mod 7.","2³ = 8 ≡ 1 (mod 7)",ch(["2","4","1","2","4","1"],{sub:["2¹","2²","2³","2⁴","2⁵","2⁶"],c:["","","a","","","a"],cap:"Remainders of powers of 2 mod 7 repeat every 3"})],
   ["Split the exponent into groups of 3.","2¹⁰⁰ = (2³)³³ × 2¹"],
   ["Replace each 2³ with 1.","≡ 1³³ × 2 = 2"]]},
  {id:"27.2",q:"What is the remainder when 1 + 2 + 3 + … + 100 is divided by 9?",a:"1",steps:[
   ["Add 1 to 100 first.","100 × 101/2 = 5050"],
   ["A number leaves the same remainder mod 9 as its digit sum.","5 + 0 + 5 + 0 = 10 → 1 + 0 = 1"],
   ["So the remainder is 1.","1"]]},
  {id:"27.3",isNew:true,q:"What is the units digit of 3¹⁰⁰ + 7¹⁰⁰?",a:"2",steps:[
   ["Both cycles have length 4.","",gr({rows:["3ⁿ","7ⁿ"],cols:["rem 1","rem 2","rem 3","rem 0"],corner:"n ÷ 4 leaves",cells:[["3","9","7","1"],["7","9","3","1"]],hl:()=>""})],
   ["100 = 4 × 25, remainder 0, so take the 4th term of each cycle.","3¹⁰⁰ ends in 1, 7¹⁰⁰ ends in 1",gr({rows:["3ⁿ","7ⁿ"],cols:["rem 1","rem 2","rem 3","rem 0"],corner:"n ÷ 4 leaves",cells:[["3","9","7","1"],["7","9","3","1"]],hl:(r,c)=>c===3?"a":""})],
   ["Add the units digits.","1 + 1 = 2"]]},
  {id:"27.4",isNew:true,q:"What is the remainder when 47 × 53 × 61 is divided by 9?",a:"4",steps:[
   ["Replace each number by its remainder mod 9 (use digit sums).","47 → 2, 53 → 8, 61 → 7"],
   ["Multiply the remainders.","2 × 8 × 7 = 112"],
   ["Reduce mod 9.","112 = 12 × 9 + 4 → 4"]]}]};

// 34. Angle chasing
const triA=[["poly",[[0,0],[4,0],[2,3.5]],"s"],["seg",[0,0],[2,3.5],"hl"],["seg",[4,0],[2,3.5],"hl"],["text",[2,3.85],"A"],["text",[-0.35,-0.3],"B"],["text",[4.35,-0.3],"C"],["text",[2,2.6],"40°","a"]];
UP[34]={
 k:["Triangle angles add to 180°. Angles on a straight line add to 180°. Angles around a point add to 360°.",
    "Exterior angle of a triangle = the sum of the two interior angles that don’t touch it.",
    "Isosceles: if AB = AC, the angles at B and C are equal. Equilateral: every angle is 60°.",
    "Parallel lines cut by a transversal: “Z” angles (alternate interior) are equal, and “C” angles (same-side interior) add to 180°.",
    "Circles: an inscribed angle is half the central angle on the same arc. An angle that opens onto a diameter is 90°."],
 trap:"Assuming two lines are parallel or two angles are equal because the picture looks that way. Use only what the problem states.",
 spot:"any problem asking for an angle. Label every angle you know on the figure and keep going.",
 ex:{q:"Triangle ABC has AB = AC and ∠A = 40°. Find ∠B.",steps:[
  ["AB = AC, so the angles across from those sides are equal.","∠B = ∠C",fg([-0.8,-0.7,4.8,4.2],triA,"Equal sides (blue) face equal angles at B and C")],
  ["The three angles add to 180°.","40° + 2∠B = 180°"],
  ["Solve.","∠B = 70°",fg([-0.8,-0.7,4.8,4.2],triA.concat([["text",[0.75,0.35],"70°","al"],["text",[3.25,0.35],"70°","al"]]))]]},
 p:[
  {id:"34.1",q:"In triangle ABC, ∠A = 50° and ∠B = 60°. What is the exterior angle at C, in degrees?",a:"110°",v:"110",steps:[
   ["The exterior angle at C equals the sum of the two interior angles that don’t touch C.","exterior at C = ∠A + ∠B",fg([-0.6,-0.6,5.4,3.6],[["poly",[[0,0],[3,0],[1,3]],"s"],["seg",[3,0],[5,0],"d"],["text",[1,3.3],"A"],["text",[-0.3,-0.3],"B"],["text",[3,-0.35],"C"],["text",[1,2.3],"50°","a"],["text",[0.55,0.3],"60°","a"],["text",[3.75,0.35],"?","al"]])],
   ["Add.","50° + 60° = 110°"],
   ["Check: ∠C = 180° − 110° = 70°, and 70° + 110° = 180° along the straight line.","110°"]]},
  {id:"34.2",q:"A, B and C lie on a circle with center O, and ∠AOB = 100°. C is on the longer arc AB. Find ∠ACB in degrees.",a:"50°",v:"50",steps:[
   ["∠ACB is an inscribed angle that cuts off the same arc AB as the central angle ∠AOB.","∠ACB = ½ ∠AOB",fg([-2.6,-2.6,2.6,2.6],[["circ",[0,0],2,"s"],["seg",[0,0],[-1.532,-1.286],"hl"],["seg",[0,0],[1.532,-1.286],"hl"],["seg",[0,2],[-1.532,-1.286],"al"],["seg",[0,2],[1.532,-1.286],"al"],["pt",[0,0]],["text",[0.3,0.25],"O"],["text",[-1.85,-1.5],"A"],["text",[1.85,-1.5],"B"],["text",[0,2.35],"C"],["text",[0,-0.55],"100°","a"],["text",[0,1.35],"?","al"]],"Blue: central angle. Orange: inscribed angle on the same arc AB.")],
   ["Half of 100°.","50°"]]},
  {id:"34.3",isNew:true,q:"In triangle ABC, AB = AC. Side BC is extended past C, and the exterior angle at C is 110°. Find ∠A in degrees.",a:"40°",v:"40",steps:[
   ["The exterior angle and ∠ACB sit on a straight line.","∠ACB = 180° − 110° = 70°"],
   ["AB = AC, so ∠B = ∠ACB.","∠B = 70°"],
   ["The angles of the triangle add to 180°.","∠A = 180° − 70° − 70° = 40°"]]},
  {id:"34.4",isNew:true,q:"Two parallel lines are cut by a transversal. Two same-side interior angles (between the parallel lines, on the same side of the transversal) measure (3x + 10)° and (5x − 10)°. Find x.",a:"22.5",steps:[
   ["Same-side interior angles form a “C” shape and add to 180°.","(3x + 10) + (5x − 10) = 180",fg([-0.3,-0.9,6.3,2.9],[["seg",[0,0],[6,0],"s"],["seg",[0,2],[6,2],"s"],["seg",[1,-0.6],[5,2.6],"hl"],["text",[2.75,0.35],"3x + 10","al","start"],["text",[4.45,1.62],"5x − 10","al","start"]],"Both angles sit between the lines, on the right of the transversal")],
   ["Simplify.","8x = 180"],
   ["Solve.","x = 22.5"]]}]};

// 36. Special triangles
const eq6=[["poly",[[0,0],[6,0],[3,5.196]],"s"],["text",[3,5.55],"A"],["text",[-0.3,-0.3],"B"],["text",[6.3,-0.3],"C"],["text",[1.1,2.9],"6","m"]];
UP[36]={
 k:["45-45-90: legs x and x, hypotenuse x√2. A square’s diagonal is its side × √2.",
    "30-60-90: short leg x (across from 30°), long leg x√3 (across from 60°), hypotenuse 2x. It’s half of an equilateral triangle.",
    "Equilateral triangle with side s: height s√3/2, area s²√3/4. Side 6 → height 3√3, area 9√3.",
    "Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25, 20-21-29. Multiples work too: 6-8-10, 16-30-34.",
    "If a² + b² = c², the angle across from c is 90°. Use it to spot right angles hiding in side lengths."],
 trap:"Putting √3 on the wrong leg of a 30-60-90. The side across from 30° is the shortest one.",
 spot:"30°, 45°, 60° or 120° angles; equilateral triangles; side lengths that are multiples of a triple.",
 ex:{q:"Find the area of an equilateral triangle with side 6.",steps:[
  ["Draw the height from A. It cuts the base in half and makes two 30-60-90 triangles with hypotenuse 6.","short leg 3",fg([-0.8,-0.8,6.8,5.9],eq6.concat([["seg",[3,5.196],[3,0],"hl"],["text",[1.5,-0.4],"3","a"],["text",[3.55,2.4],"h","a"]]))],
  ["The height is the long leg: short leg × √3.","h = 3√3"],
  ["Area = ½ × base × height.","½ × 6 × 3√3 = 9√3"],
  ["Same as the formula s²√3/4.","36√3/4 = 9√3 ✓"]]},
 ten:"#6 (16-30-34 is twice 8-15-17).",
 p:[
  {id:"36.1",q:"A right triangle has legs 20 and 21. Find the hypotenuse.",a:"29",steps:[
   ["Pythagorean theorem.","20² + 21² = c²"],
   ["Compute.","400 + 441 = 841"],
   ["Take the square root. This is the 20-21-29 triple.","c = 29"]]},
  {id:"36.2",q:"A 30-60-90 triangle has hypotenuse 10. Find its area.",a:"25√3/2",steps:[
   ["Hypotenuse = 2 × short leg, so the short leg is 5.","short leg = 5",fg([-1.2,-1,9.8,5.9],[["poly",[[0,0],[8.66,0],[0,5]],"s"],["seg",[0,0],[0,5],"hl"],["poly",[[0,0],[0.45,0],[0.45,0.45],[0,0.45]],"m"],["text",[7.3,0.4],"30°","m"],["text",[0.55,4.1],"60°","m"],["text",[-0.5,2.5],"5","a"],["text",[4.7,3],"10"]])],
   ["Long leg = short leg × √3.","long leg = 5√3"],
   ["Area = ½ × leg × leg.","½ × 5 × 5√3 = 25√3/2"]]},
  {id:"36.3",isNew:true,q:"A square has a diagonal of length 10. Find its area.",a:"50",steps:[
   ["A square’s diagonal is side × √2.","s√2 = 10 → s = 10/√2"],
   ["Area = s².","(10/√2)² = 100/2"],
   ["Shortcut for next time: area = diagonal²/2.","50"]]},
  {id:"36.4",isNew:true,q:"In triangle ABC, ∠B = 90°, ∠A = 30° and BC = 7. Find AC.",a:"14",steps:[
   ["BC is across from the 30° angle at A, so BC is the short leg.","short leg = 7",fg([-1,-1,13.2,8],[["poly",[[0,0],[12.12,0],[0,7]],"s"],["seg",[0,0],[0,7],"hl"],["poly",[[0,0],[0.6,0],[0.6,0.6],[0,0.6]],"m"],["text",[-0.5,-0.5],"B"],["text",[12.5,-0.4],"A"],["text",[-0.5,7.3],"C"],["text",[10.6,0.5],"30°","m"],["text",[-0.6,3.5],"7","a"],["text",[6.4,4.2],"?","al"]])],
   ["The hypotenuse AC is twice the short leg.","AC = 2 × 7 = 14"]]}]};

// 37. Similar triangles
UP[37]={
 k:["Similar triangles have the same three angles. If the sides scale by k, the area scales by k².",
    "Parallel line inside a triangle: DE ∥ BC makes triangle ADE similar to ABC. The ratio is AD/AB (the whole side), not AD/DB.",
    "Bowtie: two segments crossing between parallel lines make two similar triangles, one flipped.",
    "Right triangle with the altitude to the hypotenuse: all three triangles are similar, and the altitude = (leg × leg)/hypotenuse.",
    "Write matching vertices in the same order (ADE ↔ ABC) so AD/AB = AE/AC = DE/BC."],
 trap:"Using AD/DB instead of AD/AB, or forgetting to square the ratio when comparing areas.",
 spot:"parallel lines, crossing diagonals, shadows, “the ratio of the areas”.",
 ex:{q:"In triangle ABC, DE is parallel to BC with D on AB and E on AC. AD = 3, DB = 6 and BC = 18. Find DE.",steps:[
  ["DE ∥ BC, so the small triangle ADE has the same angles as ABC: they’re similar.","ADE ~ ABC",fg([-0.6,-0.6,6.6,4.6],[["poly",[[0,0],[6,0],[1.5,4]],"s"],["poly",[[1.5,4],[1,2.667],[3,2.667]],"ff"],["seg",[1,2.667],[3,2.667],"hl"],["text",[1.5,4.3],"A"],["text",[0.6,2.75],"D"],["text",[3.4,2.75],"E"],["text",[-0.3,-0.3],"B"],["text",[6.3,-0.3],"C"],["text",[0.85,3.45],"3","m"],["text",[0.1,1.3],"6","m"],["text",[3,-0.4],"18","m"]])],
  ["Ratio of matching sides is AD/AB, where AB = 3 + 6 = 9.","k = 3/9 = 1/3"],
  ["DE matches BC.","DE = 18 × 1/3 = 6"]]},
 ten:"#3 (bowtie in the square) and #9.",
 p:[
  {id:"37.1",q:"A 6-foot person casts a 4-foot shadow. At the same moment a tree casts a 30-foot shadow. How tall is the tree, in feet?",a:"45",steps:[
   ["The sun’s rays hit both at the same angle, so person + shadow and tree + shadow make similar right triangles.","height/shadow is the same for both",fg([-2,-5,35,47],[["poly",[[0,0],[30,0],[30,45]],"s"],["seg",[0,0],[30,45],"d"],["seg",[4,0],[4,6],"hl"],["seg",[30,0],[30,45],"al"],["text",[5.6,3],"6","a"],["text",[2,-2.5],"4","a"],["text",[18,-2.5],"30","al"],["text",[32.5,22],"h","al"]],"The small triangle and the big one share the same angles")],
   ["Set up the ratio height : shadow.","6/4 = h/30"],
   ["Solve.","h = 30 × 6/4 = 45 feet"]]},
  {id:"37.2",q:"Trapezoid ABCD has AB parallel to CD, AB = 6 and CD = 12. The diagonals meet at E, and triangle ABE has area 8. Find the area of triangle CDE.",a:"32",steps:[
   ["AB ∥ CD, so the diagonals make a bowtie: triangles ABE and CDE are similar.","ABE ~ CDE",fg([-0.6,-0.7,12.6,3.6],[["poly",[[0,0],[12,0],[9,3],[3,3]],"s"],["poly",[[3,3],[9,3],[6,2]],"ff"],["poly",[[0,0],[12,0],[6,2]],"fa"],["text",[3,3.3],"A"],["text",[9,3.3],"B"],["text",[12.3,-0.3],"C"],["text",[-0.3,-0.3],"D"],["text",[6,1.55],"E"],["text",[6,3.35],"6","a"],["text",[6,-0.4],"12","al"]])],
   ["Side ratio CD/AB.","12/6 = 2"],
   ["Areas scale by the square of the ratio.","8 × 2² = 32"]]},
  {id:"37.3",isNew:true,q:"Triangle ABC has area 54. Points D and E are on AB and AC with DE ∥ BC and AD = AB/3. Find the area of triangle ADE.",a:"6",steps:[
   ["DE ∥ BC, so triangle ADE is similar to ABC with ratio AD/AB.","k = 1/3"],
   ["Areas scale by k².","(1/3)² = 1/9"],
   ["Compute.","54 × 1/9 = 6"]]},
  {id:"37.4",isNew:true,q:"Right triangle ABC has its right angle at C, with AC = 6 and BC = 8. The altitude from C meets AB at D. Find CD.",a:"24/5",steps:[
   ["Find the hypotenuse first: 6-8-10.","AB = 10",fg([-1,-1,9.2,7],[["poly",[[0,0],[8,0],[0,6]],"s"],["seg",[0,0],[2.88,3.84],"hl"],["text",[-0.4,-0.4],"C"],["text",[8.4,-0.3],"B"],["text",[-0.4,6.3],"A"],["text",[3.15,4.2],"D"],["text",[-0.5,3],"6","m"],["text",[4,-0.4],"8","m"]])],
   ["Write the area two ways: ½ × leg × leg, and ½ × hypotenuse × altitude.","½ × 6 × 8 = ½ × 10 × CD"],
   ["Solve.","CD = 48/10 = 24/5"]]}]};

// 40. Area of circular regions
const lens=arc([0,0],1,-60,60).concat(arc([1,0],1,120,240));
UP[40]={
 k:["Circle area πr², circumference 2πr. If you’re given a diameter, halve it first.",
    "Sector with central angle θ: (θ/360) × πr². 120° is one third of the circle, 90° is a quarter.",
    "Segment (between a chord and its arc) = sector − triangle. In a 60° sector the triangle is equilateral, with area r²√3/4.",
    "Shaded regions: write the region as whole shapes added and subtracted before computing anything.",
    "A circle inscribed in a square of side s has radius s/2. A square inscribed in a circle has its diagonal equal to the diameter."],
 trap:"Using the diameter as the radius, or the whole circle when only a sector is shaded.",
 spot:"shaded regions, “inscribed”, π in the answer choices.",
 ex:{q:"A square has side 4. A quarter circle of radius 4 is centered at one corner. Find the area of the square that is outside the quarter circle.",steps:[
  ["Shaded region = square − quarter circle.","16 − ¼ × π × 4²",fg([-0.6,-0.6,4.6,4.6],[["poly",[[0,0],[4,0],[4,4],[0,4]],"fa"],["sector",[0,0],4,0,90,"w"],["text",[2,-0.35],"4","m"],["text",[1.4,1.4],"quarter circle","m"]],"Orange: the region we want")],
  ["A quarter of a circle with radius 4.","¼ × 16π = 4π"],
  ["Subtract.","16 − 4π"]]},
 ten:"#6 (circle minus triangle minus semicircle).",
 p:[
  {id:"40.1",q:"A sector of a circle with radius 6 has a central angle of 120°. Find its area.",a:"12π",steps:[
   ["120° out of 360° is one third of the circle.","fraction = 1/3",fg([-6.6,-6.6,6.6,6.6],[["circ",[0,0],6,"d"],["sector",[0,0],6,0,120,"ff"],["text",[1.3,1.2],"120°","a"],["text",[3,-0.5],"6","m"]])],
   ["Area of the whole circle.","π × 6² = 36π"],
   ["Take one third.","12π"]]},
  {id:"40.2",q:"Two circles of radius 1 have centers 1 apart. Find the area of the region inside both.",a:"2π/3 − √3/2",steps:[
   ["Each center lies on the other circle. Joined to the two crossing points, the centers make two equilateral triangles with side 1.","angle at each center = 120°",fg([-1.3,-1.3,2.3,1.3],[["circ",[0,0],1,"s"],["circ",[1,0],1,"s"],["poly",lens,"ff"],["seg",[0,0],[0.5,0.866],"d"],["seg",[0,0],[0.5,-0.866],"d"],["seg",[0,0],[1,0],"d"],["pt",[0,0]],["pt",[1,0]]],"The overlap is two circular segments back to back")],
   ["The overlap is two segments. Each one = 120° sector − triangle with two radii.","sector = π/3, triangle = ½ · 1 · 1 · sin 120° = √3/4"],
   ["One segment.","π/3 − √3/4"],
   ["Two segments.","2π/3 − √3/2"]]},
  {id:"40.3",isNew:true,q:"A circle is inscribed in a square of side 10. Find the area inside the square but outside the circle.",a:"100 − 25π",steps:[
   ["The circle touches all four sides, so its diameter is 10 and its radius is 5.","r = 5",fg([-0.6,-0.6,10.6,10.6],[["poly",[[0,0],[10,0],[10,10],[0,10]],"fa"],["circ",[5,5],5,"w"],["seg",[5,5],[10,5],"hl"],["text",[7.5,5.5],"5","a"]])],
   ["Square minus circle.","10² − π × 5²"],
   ["Compute.","100 − 25π"]]},
  {id:"40.4",isNew:true,q:"A right triangle has legs 6 and 8. A semicircle is drawn outward on its hypotenuse. What is the area of the semicircle?",a:"25π/2",steps:[
   ["The hypotenuse of a 6-8-10 triangle is 10.","hypotenuse = 10",fg([-0.8,-0.8,9.6,8.6],[["poly",[[0,0],[8,0],[0,6]],"s"],["sector",[4,3],5,-36.87,143.13,"ff"],["text",[4,-0.4],"8","m"],["text",[-0.4,3],"6","m"],["text",[5.6,5.3],"semicircle","a"]])],
   ["The semicircle has diameter 10, so radius 5.","r = 5"],
   ["Half a circle.","½ × π × 5² = 25π/2"]]}]};

// 44. Polygons, part 1
const dodec=ngon(12,2.5,[0,0],0);
UP[44]={
 k:["Interior angle sum = (n − 2) × 180°. Triangle 180°, quadrilateral 360°, pentagon 540°, hexagon 720°.",
    "Exterior angles of any convex polygon add to 360°. In a regular n-gon each exterior angle is 360°/n.",
    "At each vertex, interior + exterior = 180°. So each interior angle of a regular n-gon is 180° − 360°/n.",
    "From an interior angle to the number of sides: find the exterior angle, then divide 360 by it.",
    "Diagonals = n(n − 3)/2: each vertex connects to n − 3 others, and each diagonal is counted from both ends."],
 trap:"Using n × 180° for the angle sum. Cut the polygon into triangles from one vertex: you get n − 2 of them.",
 spot:"“interior angle”, “regular polygon”, “how many sides”.",
 ex:{q:"Each interior angle of a regular polygon is 150°. How many sides does it have?",steps:[
  ["Interior and exterior angles at a vertex add to 180°.","exterior = 180° − 150° = 30°",fg([-3.2,-3.2,3.6,3.2],[["poly",dodec,"f"],["seg",dodec[11],dodec[0],"s"],["seg",dodec[0],[dodec[0][0]+(dodec[0][0]-dodec[11][0])*1.6,dodec[0][1]+(dodec[0][1]-dodec[11][1])*1.6],"d"],["seg",dodec[0],dodec[1],"hl"],["text",[3.2,0.75],"30°","al"]],"Turning by the exterior angle at each corner, you turn 360° in total")],
  ["The exterior angles add to 360°.","n × 30° = 360°"],
  ["Solve.","n = 12"]]},
 ten:"#4 (exterior angles of 30° and −10°).",
 p:[
  {id:"44.1",q:"How many diagonals does a 12-gon have?",a:"54",steps:[
   ["Each of the 12 vertices connects by a diagonal to 12 − 3 = 9 others (not itself and not its 2 neighbors).","12 × 9 = 108"],
   ["Each diagonal got counted from both of its ends.","108 ÷ 2 = 54"]]},
  {id:"44.2",q:"A hexagon’s interior angles are x, x + 10, x + 20, x + 30, x + 40 and x + 50 degrees. Find the largest angle, in degrees.",a:"145°",v:"145",steps:[
   ["A hexagon’s angles add to (6 − 2) × 180°.","720°"],
   ["Add the six angles.","6x + 150"],
   ["Solve 6x + 150 = 720.","x = 95"],
   ["The largest angle.","95 + 50 = 145°"]]},
  {id:"44.3",isNew:true,q:"Each interior angle of a regular polygon is 140°. How many sides does it have?",a:"9",steps:[
   ["Find the exterior angle.","180° − 140° = 40°"],
   ["Exterior angles add to 360°.","360 ÷ 40 = 9 sides"]]},
  {id:"44.4",isNew:true,q:"A polygon has 35 diagonals. How many sides does it have?",a:"10",steps:[
   ["Use the diagonal formula.","n(n − 3)/2 = 35 → n(n − 3) = 70"],
   ["Look for a number that times (itself minus 3) gives 70.","10 × 7 = 70"],
   ["So n = 10.","10 sides"]]}]};

// 50. Coordinate geometry
UP[50]={
 k:["Slope = (y₂ − y₁)/(x₂ − x₁), change in y on top. Parallel lines have equal slopes; perpendicular slopes multiply to −1 (2 and −1/2).",
    "Point-slope form: y − y₁ = m(x − x₁). Rearrange to y = mx + b to read the y-intercept b.",
    "Distance between two points = √(Δx² + Δy²). It’s the Pythagorean theorem on a right triangle with legs Δx and Δy.",
    "Intercepts: set y = 0 for the x-intercept and x = 0 for the y-intercept. A line with intercepts a and b cuts off a triangle of area ab/2 with the axes.",
    "Circle: (x − h)² + (y − k)² = r². If it’s multiplied out, complete the square in x and in y to find the center and radius."],
 trap:"Flipping the slope (change in x over change in y), or forgetting the ½ in a triangle’s area.",
 spot:"points given as (x, y), equations of lines or circles, or any figure you could place on axes.",
 ex:{q:"Find the equation of the line through (1, 2) and (3, 8).",steps:[
  ["Slope = change in y ÷ change in x.","(8 − 2)/(3 − 1) = 6/2 = 3",fg([-1,-2,5,10],[["grid",-1,-2,5,10],["axes",-1,-2,5,10],["seg",[0,-1],[3.6,9.8],"s"],["seg",[1,2],[3,2],"al"],["seg",[3,2],[3,8],"al"],["pt",[1,2],"hl"],["pt",[3,8],"hl"],["text",[2,1.4],"run 2","al"],["text",[3.4,5],"rise 6","al","start"],["text",[0.2,2.5],"(1, 2)","a","start"],["text",[2.2,8.6],"(3, 8)","a"]])],
  ["Put one point into y = 3x + b.","2 = 3(1) + b → b = −1"],
  ["The line.","y = 3x − 1"]]},
 p:[
  {id:"50.1",q:"Find the area of the triangle formed by the line 3x + 4y = 24 and the two axes.",a:"24",steps:[
   ["x-intercept: set y = 0.","3x = 24 → x = 8"],
   ["y-intercept: set x = 0.","4y = 24 → y = 6",fg([-1.5,-1.5,9.5,7.5],[["grid",-1,-1,9,7],["axes",-1,-1,9,7],["poly",[[0,0],[8,0],[0,6]],"ff"],["text",[4,-0.6],"8","a"],["text",[-0.6,3],"6","a"]])],
   ["The triangle has legs 8 and 6.","½ × 8 × 6 = 24"]]},
  {id:"50.2",q:"Find the radius of the circle x² + y² − 6x + 8y = 0.",a:"5",steps:[
   ["Group the x terms and the y terms.","(x² − 6x) + (y² + 8y) = 0"],
   ["Complete each square by adding 9 and 16 to both sides.","(x − 3)² + (y + 4)² = 25"],
   ["Read off the radius.","r = √25 = 5 (center (3, −4))"]]},
  {id:"50.3",isNew:true,q:"Find the distance between (−1, 2) and (5, 10).",a:"10",steps:[
   ["Find the horizontal and vertical changes.","Δx = 5 − (−1) = 6, Δy = 10 − 2 = 8",fg([-2,0.5,6.5,11],[["grid",-2,1,6,11],["seg",[-1,2],[5,10],"hl"],["seg",[-1,2],[5,2],"al"],["seg",[5,2],[5,10],"al"],["pt",[-1,2]],["pt",[5,10]],["text",[2,1.4],"6","al"],["text",[5.5,6],"8","al"],["text",[1.4,6.6],"?","a"]])],
   ["The distance is the hypotenuse of a right triangle with legs 6 and 8.","√(6² + 8²) = √100"],
   ["Distance.","10"]]},
  {id:"50.4",isNew:true,q:"A line passes through (2, 3) and is perpendicular to y = 2x + 1. Find its y-intercept.",a:"4",steps:[
   ["The given slope is 2, so the perpendicular slope is −1/2.","m = −1/2"],
   ["Point-slope form through (2, 3).","y − 3 = −½(x − 2)"],
   ["Simplify.","y = −½x + 1 + 3 = −½x + 4"],
   ["Read off the y-intercept.","4"]]}]};
})(window.UP);
