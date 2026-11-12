// ○ Later topics: specific key ideas, a Watch out line, 4 practice problems, and step-by-step walkthroughs.
window.UP = window.UP || {};
(function(UP){
const ch=(items,o)=>Object.assign({t:"chips",items},o||{});
const gr=o=>Object.assign({t:"grid"},o);
const fg=(box,items,cap)=>({t:"fig",box,items,cap});

// 7. Combinatorial identities
UP[7]={
 k:["Symmetry: C(n, k) = C(n, n − k). Choosing who’s in is the same as choosing who’s out.",
    "Pascal: C(n, k) = C(n − 1, k − 1) + C(n − 1, k). Split on whether one particular item is chosen or not.",
    "Row sum: C(n, 0) + C(n, 1) + … + C(n, n) = 2ⁿ, the number of subsets of n items.",
    "Hockey stick: C(k, k) + C(k + 1, k) + … + C(n, k) = C(n + 1, k + 1). The bottom number stays fixed.",
    "Choosing k from two groups: add up C(m, i) × C(n, k − i) over every way to split k."],
 trap:"In the hockey stick, changing the bottom number. Only the top number goes up.",
 ex:{q:"Why is 1 + 2 + … + n = n(n + 1)/2?",steps:[
  ["Each whole number j equals C(j, 1).","1 + 2 + … + n = C(1,1) + C(2,1) + … + C(n,1)"],
  ["Hockey stick with bottom number 1.","= C(n + 1, 2)"],
  ["Expand.","= n(n + 1)/2"]]},
 p:[
  {id:"7.1",q:"Compute C(10,0) + C(10,1) + … + C(10,10).",a:"1024",steps:[
   ["The whole row of Pascal’s triangle counts all subsets of 10 items.","each item is in or out"],
   ["Two choices per item.","2¹⁰ = 1024"]]},
  {id:"7.2",q:"Compute C(3,3) + C(4,3) + C(5,3) + … + C(8,3).",a:"126",steps:[
   ["Bottom number fixed at 3, top runs from 3 to 8: hockey stick.","= C(9, 4)"],
   ["Compute.","(9 · 8 · 7 · 6)/24 = 126"]]},
  {id:"7.3",isNew:true,q:"How many subsets does a 6-element set have, including the empty set?",a:"64",steps:[
   ["Each element is either in or out.","2 choices × 6 elements"],
   ["Compute.","2⁶ = 64"]]},
  {id:"7.4",isNew:true,q:"Compute C(7, 2) + C(7, 3).",a:"56",steps:[
   ["Pascal’s rule combines neighbors in a row.","C(7, 2) + C(7, 3) = C(8, 3)"],
   ["Compute.","(8 · 7 · 6)/6 = 56 (check: 21 + 35)"]]}]};

// 11. Recursion
UP[11]={
 k:["Count small cases by hand, then write the count for n in terms of smaller cases by looking at the last move.",
    "Covering a 1 × n strip with 1 × 1 and 1 × 2 tiles: a(n) = a(n − 1) + a(n − 2), because the last tile is either 1 or 2 long.",
    "Strings with no two A’s in a row end in B (any good string, then B) or in BA: f(n) = f(n − 1) + f(n − 2).",
    "Steps of 1, 2 or 3: t(n) = t(n − 1) + t(n − 2) + t(n − 3)."],
 trap:"Wrong starting values. List a(1) and a(2) by hand before using the rule.",
 ex:{q:"How many ways can you climb 5 stairs taking 1 or 2 steps at a time?",steps:[
  ["Your last move was 1 step (from stair n − 1) or 2 steps (from stair n − 2).","a(n) = a(n − 1) + a(n − 2)"],
  ["Start values: a(1) = 1, a(2) = 2. Build up.","",gr({rows:["ways"],cols:["n = 1","2","3","4","5"],corner:"",cells:[["1","2","3","5","8"]],hl:(r,c)=>c===4?"a":""})],
  ["Answer.","8"]]},
 p:[
  {id:"11.1",q:"How many 6-letter strings of A’s and B’s have no two A’s in a row?",a:"21",steps:[
   ["A good string ends in B (a good string of length n − 1 plus B) or in BA (a good string of length n − 2 plus BA).","f(n) = f(n − 1) + f(n − 2)"],
   ["Start: f(1) = 2 (A, B) and f(2) = 3 (AB, BA, BB).","",gr({rows:["f(n)"],cols:["1","2","3","4","5","6"],corner:"n",cells:[["2","3","5","8","13","21"]],hl:(r,c)=>c===5?"a":""})],
   ["Answer.","21"]]},
  {id:"11.2",q:"How many ways can you climb 7 stairs taking 1, 2 or 3 steps at a time?",a:"44",steps:[
   ["The last move is 1, 2 or 3 steps.","t(n) = t(n − 1) + t(n − 2) + t(n − 3)"],
   ["Start with t(0) = 1, t(1) = 1, t(2) = 2 and build.","",gr({rows:["t(n)"],cols:["0","1","2","3","4","5","6","7"],corner:"n",cells:[["1","1","2","4","7","13","24","44"]],hl:(r,c)=>c===7?"a":""})],
   ["Answer.","44"]]},
  {id:"11.3",isNew:true,q:"In how many ways can a 2 × 6 rectangle be tiled with 1 × 2 dominoes?",a:"13",steps:[
   ["Look at the left end: one vertical domino (leaving 2 × 5) or two stacked horizontal ones (leaving 2 × 4).","d(n) = d(n − 1) + d(n − 2)",fg([-0.3,-0.3,6.3,2.3],[["poly",[[0,0],[1,0],[1,2],[0,2]],"ff"],["poly",[[1,0],[3,0],[3,1],[1,1]],"fx"],["poly",[[1,1],[3,1],[3,2],[1,2]],"fx"],["poly",[[3,0],[6,0],[6,2],[3,2]],"d"]])],
   ["d(1) = 1, d(2) = 2. Build up.","1, 2, 3, 5, 8, 13"],
   ["Answer.","13"]]},
  {id:"11.4",isNew:true,q:"How many subsets of {1, 2, 3, 4, 5, 6, 7} contain no two consecutive numbers? (The empty set counts.)",a:"34",steps:[
   ["Either 7 is left out (any good subset of {1, …, 6}) or 7 is in and 6 is out (any good subset of {1, …, 5}).","s(n) = s(n − 1) + s(n − 2)"],
   ["s(1) = 2 ({}, {1}) and s(2) = 3. Build up.","2, 3, 5, 8, 13, 21, 34"],
   ["Answer.","34"]]}]};

// 12. Probability states
UP[12]={
 k:["Name each situation the game can be in (a state) and give it a variable for the probability of winning from there.",
    "Write one equation per state: P(here) = sum of (chance of each move) × P(the state it leads to).",
    "A state that leads back to itself appears on both sides of its own equation. Solve for it like any equation.",
    "For expected waiting times use the same idea: E(here) = 1 + sum of (chance) × E(next state)."],
 trap:"Forgetting that after a miss it’s the other player’s turn, which changes the state.",
 ex:{q:"A and B take turns flipping a coin, A first. The first head wins. What’s the probability that A wins?",steps:[
  ["Let p = P(A wins) at the start. A wins at once with probability 1/2.","p = 1/2 + …"],
  ["If A and then B both flip tails (probability 1/4), it’s A’s turn again: back to the start.","p = 1/2 + (1/4)p"],
  ["Solve.","(3/4)p = 1/2 → p = 2/3"]]},
 p:[
  {id:"12.1",q:"A and B take turns rolling a die, A first. The first to roll a 6 wins. What’s the probability that A wins?",a:"6/11",steps:[
   ["A wins at once with probability 1/6. Otherwise both miss with probability (5/6)² = 25/36 and it starts over.","p = 1/6 + (25/36)p"],
   ["Solve.","(11/36)p = 1/6 → p = 6/11"]]},
  {id:"12.2",q:"You flip a fair coin until you get two heads in a row. What’s the expected number of flips?",a:"6",steps:[
   ["States: a = expected flips from scratch, b = expected flips when the last flip was H.","two unknowns"],
   ["From scratch: one flip, then you’re at b (heads) or back to a (tails).","a = 1 + b/2 + a/2"],
   ["After one H: one flip, then done (heads) or back to a (tails).","b = 1 + a/2"],
   ["Substitute and solve.","a/2 = 1 + (1 + a/2)/2 → a = 6"]]},
  {id:"12.3",isNew:true,q:"You roll a fair die until you get a 6. What is the expected number of rolls?",a:"6",steps:[
   ["Let E be the expected number of rolls. One roll, then you either stop or start over.","E = 1 + (5/6)E"],
   ["Solve.","(1/6)E = 1 → E = 6"]]},
  {id:"12.4",isNew:true,q:"Amy and Bea take turns flipping a coin, Amy first. Whoever flips heads first wins. What is the probability that Bea wins?",a:"1/3",steps:[
   ["Amy wins with probability 2/3 (the example above).","P(Amy) = 2/3"],
   ["Someone wins eventually, so Bea’s chance is the rest.","1 − 2/3 = 1/3"]]}]};

// 16. Polynomial root manipulations
UP[16]={
 k:["If r is a root of p(x), then p(r) = 0 and (x − r) divides p(x).",
    "Remainder theorem: dividing p(x) by (x − a) leaves remainder p(a). For (x + a), plug in −a.",
    "Sum of coefficients = p(1). Alternating sum = p(−1). Constant term = p(0).",
    "If a polynomial with integer coefficients has 3 + √5 as a root, then 3 − √5 is a root too.",
    "To use a pair like 3 ± √5, substitute x = 3 + t so the expression becomes symmetric in t."],
 trap:"Plugging in a when dividing by (x + a). For x + a, plug in −a.",
 ex:{q:"Find the remainder when x¹⁰⁰ − x + 1 is divided by x − 1.",steps:[
  ["Remainder theorem: plug in x = 1.","1¹⁰⁰ − 1 + 1"],
  ["Compute.","1"]]},
 ten:"#24 (substitute x = 3 + t).",
 p:[
  {id:"16.1",q:"p(x) = x³ − 4x² + ax + 6 has 2 as a root. Find a.",a:"1",steps:[
   ["A root makes the polynomial 0.","p(2) = 8 − 16 + 2a + 6 = 0"],
   ["Solve.","2a = 2 → a = 1"]]},
  {id:"16.2",q:"Find the sum of the coefficients of (2x − 1)⁵.",a:"1",steps:[
   ["The sum of coefficients is p(1).","(2 − 1)⁵"],
   ["Compute.","1"]]},
  {id:"16.3",isNew:true,q:"What is the remainder when x³ − 2x + 9 is divided by x + 2?",a:"5",steps:[
   ["Dividing by x + 2 means plugging in x = −2.","(−2)³ − 2(−2) + 9"],
   ["Compute.","−8 + 4 + 9 = 5"]]},
  {id:"16.4",isNew:true,q:"A quadratic x² + bx + c with integer coefficients has 3 + √2 as a root. Find c.",a:"7",steps:[
   ["The other root is the conjugate 3 − √2.","roots 3 ± √2"],
   ["c is the product of the roots.","(3 + √2)(3 − √2) = 9 − 2"],
   ["Compute.","7"]]}]};

// 17. Symmetric polynomials
UP[17]={
 k:["Expressions that stay the same when you swap r and s can be written using e₁ = r + s and e₂ = rs.",
    "r² + s² = e₁² − 2e₂. r³ + s³ = e₁³ − 3e₁e₂. (r − s)² = e₁² − 4e₂.",
    "Power sums pₙ = rⁿ + sⁿ follow pₙ = e₁·pₙ₋₁ − e₂·pₙ₋₂, starting from p₀ = 2 and p₁ = e₁.",
    "For the roots of a quadratic, get e₁ and e₂ from Vieta, then use these identities."],
 trap:"Leaving out the −3e₁e₂ term in r³ + s³.",
 ex:{q:"r + s = 4 and rs = 1. Find r³ + s³.",steps:[
  ["Use the identity.","r³ + s³ = (r + s)³ − 3rs(r + s)"],
  ["Substitute.","64 − 3 · 1 · 4 = 52"]]},
 p:[
  {id:"17.1",q:"a + b = 5 and ab = 3. Find a³ + b³.",a:"80",steps:[
   ["Use the identity.","(a + b)³ − 3ab(a + b)"],
   ["Substitute.","125 − 45 = 80"]]},
  {id:"17.2",q:"r and s are the roots of x² − x − 1 = 0. Find r⁴ + s⁴.",a:"7",steps:[
   ["Vieta.","e₁ = 1, e₂ = −1"],
   ["Power sums: pₙ = pₙ₋₁ + pₙ₋₂ here.","",gr({rows:["pₙ"],cols:["p₀","p₁","p₂","p₃","p₄"],corner:"",cells:[["2","1","3","4","7"]],hl:(r,c)=>c===4?"a":""})],
   ["Answer.","7"]]},
  {id:"17.3",isNew:true,q:"a + b = 4 and ab = 2. Find a⁴ + b⁴.",a:"136",steps:[
   ["First a² + b².","16 − 4 = 12"],
   ["Square that and subtract 2(ab)².","a⁴ + b⁴ = (a² + b²)² − 2a²b²"],
   ["Substitute.","144 − 8 = 136"]]},
  {id:"17.4",isNew:true,q:"r and s are the roots of x² − 5x + 2 = 0. Find (r − s)².",a:"17",steps:[
   ["Vieta.","r + s = 5, rs = 2"],
   ["(r − s)² = (r + s)² − 4rs.","25 − 8 = 17"]]}]};

// 20. Special sequences
UP[20]={
 k:["Telescoping: split each term into a difference so that neighbors cancel. 1/(n(n + 1)) = 1/n − 1/(n + 1), and 1/(n(n + 2)) = ½(1/n − 1/(n + 2)).",
    "Sums: 1 + … + n = n(n + 1)/2; 1² + … + n² = n(n + 1)(2n + 1)/6; 1³ + … + n³ = (n(n + 1)/2)².",
    "Sequences defined by a rule: write out terms until they repeat, then use the remainder of the index.",
    "Sequences that settle down approach a fixed point L that satisfies the rule itself, like L = L/2 + 2 → L = 4."],
 trap:"In a telescoping sum, losing track of which first and last pieces survive.",
 ex:{q:"Find 1/(1·2) + 1/(2·3) + … + 1/(9·10).",steps:[
  ["Split each term.","(1 − 1/2) + (1/2 − 1/3) + … + (1/9 − 1/10)"],
  ["Every middle piece cancels with its neighbor.","1 − 1/10"],
  ["Answer.","9/10"]]},
 ten:"#10 (sum of squares) and #18 (the sequence settles at 4).",
 p:[
  {id:"20.1",q:"Find 1/(1·3) + 1/(3·5) + … + 1/(19·21).",a:"10/21",steps:[
   ["Split: 1/((2k − 1)(2k + 1)) = ½(1/(2k − 1) − 1/(2k + 1)).","½[(1 − 1/3) + (1/3 − 1/5) + … + (1/19 − 1/21)]"],
   ["Cancel the middle.","½(1 − 1/21)"],
   ["Compute.","10/21"]]},
  {id:"20.2",q:"a₁ = 2, a₂ = 5 and aₙ = aₙ₋₁ − aₙ₋₂. Find a₁₀₀.",a:"−2",v:"-2",steps:[
   ["Write out terms until they repeat.","2, 5, 3, −2, −5, −3, 2, 5, …",ch(["2","5","3","−2","−5","−3"],{sub:["a₁","a₂","a₃","a₄","a₅","a₆"],c:["","","","a","",""],cap:"Repeats every 6 terms"})],
   ["100 = 6 × 16 + 4, so a₁₀₀ = a₄.","a₁₀₀ = −2"]]},
  {id:"20.3",isNew:true,q:"Find 1² + 2² + … + 10².",a:"385",steps:[
   ["Use n(n + 1)(2n + 1)/6 with n = 10.","10 · 11 · 21/6"],
   ["Compute.","385"]]},
  {id:"20.4",isNew:true,q:"a₁ = 3 and aₙ = 1/(1 − aₙ₋₁). Find a₁₀₀.",a:"3",steps:[
   ["Compute terms until they repeat.","3, −1/2, 2/3, 3, …"],
   ["The cycle has length 3. 100 = 3 × 33 + 1, so a₁₀₀ = a₁.","a₁₀₀ = 3"]]}]};

// 28. Euler's and binomial theorems
UP[28]={
 k:["Fermat: for a prime p that doesn’t divide a, aᵖ⁻¹ ≡ 1 (mod p). For example 3⁶ ≡ 1 (mod 7) and 2¹⁰ ≡ 1 (mod 11).",
    "Euler: if gcd(a, m) = 1, then a to the power φ(m) leaves remainder 1 when divided by m. φ(n) counts the numbers up to n that share no factor with n; φ(100) = 100 × ½ × ⅘ = 40.",
    "Binomial theorem: (a + b)ⁿ = sum of C(n, k)·aⁿ⁻ᵏ·bᵏ. The coefficient of xᵏ in (x + c)ⁿ is C(n, k)·cⁿ⁻ᵏ.",
    "Watch the signs: in (2x − 1)ⁿ, each term carries (−1) to the power of the constant’s exponent."],
 trap:"Dropping the coefficient’s power: the x² term of (2x − 1)⁵ includes 2², not just 2.",
 ex:{q:"What’s the remainder when 3¹⁰⁰ is divided by 7?",steps:[
  ["Fermat with p = 7.","3⁶ ≡ 1 (mod 7)"],
  ["Split the exponent into 6s.","3¹⁰⁰ = (3⁶)¹⁶ × 3⁴"],
  ["Replace 3⁶ by 1.","≡ 3⁴ = 81 = 77 + 4 → 4"]]},
 p:[
  {id:"28.1",q:"What is the coefficient of x² in (x + 2)⁵?",a:"80",steps:[
   ["The x² term chooses x twice and 2 three times.","C(5, 2) · x² · 2³"],
   ["Compute.","10 × 8 = 80"]]},
  {id:"28.2",q:"What are the last two digits of 3⁴⁰?",a:"01",v:"1",steps:[
   ["Last two digits = remainder mod 100. gcd(3, 100) = 1 and φ(100) = 40.","3⁴⁰ ≡ 1 (mod 100)"],
   ["So the last two digits are 01.","01"]]},
  {id:"28.3",isNew:true,q:"What is the remainder when 2¹⁰⁰ is divided by 11?",a:"1",steps:[
   ["Fermat with p = 11.","2¹⁰ ≡ 1 (mod 11)"],
   ["100 is a multiple of 10.","2¹⁰⁰ = (2¹⁰)¹⁰ ≡ 1"]]},
  {id:"28.4",isNew:true,q:"Find the coefficient of x² in (2x − 1)⁵.",a:"−40",v:"-40",steps:[
   ["The x² term chooses 2x twice and −1 three times.","C(5, 2) · (2x)² · (−1)³"],
   ["Compute.","10 × 4 × (−1) = −40"]]}]};

// 29. Linear congruences and CRT
UP[29]={
 k:["ax ≡ b (mod m): if gcd(a, m) = 1, multiply both sides by the inverse of a (the number a′ with a·a′ ≡ 1).",
    "Find an inverse by trial: 7 × 8 = 56 = 55 + 1, so 8 is the inverse of 7 mod 11.",
    "Conditions with moduli that share no factors combine into one condition mod their product. Solve by listing the numbers that meet one condition and testing the others.",
    "“Remainder 1 when divided by 2, 3, 4, 5 and 6” means x − 1 is a common multiple, so x = lcm + 1."],
 trap:"Looking for an inverse when gcd(a, m) > 1. Then the congruence may have no solutions or several.",
 ex:{q:"x ≡ 2 (mod 3) and x ≡ 3 (mod 5). Find x mod 15.",steps:[
  ["List numbers that leave 3 when divided by 5.","3, 8, 13, 18, …"],
  ["Test each against the first condition.","",gr({rows:["x mod 3"],cols:["3","8","13"],corner:"x",cells:[["0","2","1"]],hl:(r,c)=>c===1?"a":""})],
  ["8 works.","x ≡ 8 (mod 15)"]]},
 p:[
  {id:"29.1",q:"Find the smallest positive x with x ≡ 1 (mod 4), x ≡ 2 (mod 5) and x ≡ 3 (mod 7).",a:"17",steps:[
   ["Combine the first two by listing x ≡ 2 (mod 5) and checking mod 4.","2, 7, 12, 17 → 17 leaves 1 mod 4"],
   ["So x ≡ 17 (mod 20). Check 17 mod 7.","17 = 14 + 3 ✓"],
   ["Answer.","17"]]},
  {id:"29.2",q:"Solve 7x ≡ 3 (mod 11) for x between 0 and 10.",a:"2",steps:[
   ["Inverse of 7 mod 11: 7 × 8 = 56 ≡ 1.","inverse = 8"],
   ["Multiply both sides by 8.","x ≡ 24 ≡ 2"],
   ["Check: 7 × 2 = 14 ≡ 3.","2"]]},
  {id:"29.3",isNew:true,q:"What is the smallest integer greater than 1 that leaves remainder 1 when divided by each of 2, 3, 4, 5 and 6?",a:"61",steps:[
   ["x − 1 must be divisible by 2, 3, 4, 5 and 6.","x − 1 = common multiple"],
   ["The smallest positive one is the lcm.","lcm(2, 3, 4, 5, 6) = 60"],
   ["Add 1.","61"]]},
  {id:"29.4",isNew:true,q:"Solve 5x ≡ 4 (mod 9) for x between 0 and 8.",a:"8",steps:[
   ["Inverse of 5 mod 9: 5 × 2 = 10 ≡ 1.","inverse = 2"],
   ["Multiply both sides by 2.","x ≡ 8"],
   ["Check: 5 × 8 = 40 = 36 + 4.","8"]]}]};

// 33. Miscellaneous number theory
UP[33]={
 k:["A 2-digit number is 10a + b and its reversal is 10b + a. Their sum is 11(a + b) and their difference is 9(a − b).",
    "Squares end in 0, 1, 4, 5, 6 or 9. A square ending in 6 comes from a number ending in 4 or 6.",
    "Odd/even: odd + odd is even, and anything times an even number is even. It rules out cases fast.",
    "Numbers like 10ⁿ − 20 = 99…980: write a small case (10⁴ − 20 = 9980) to see the digit pattern.",
    "From 5! on, every factorial ends in 0, so only the first few matter for units digits."],
 trap:"Letting a reversed number start with 0, or forgetting that the first digit of a 2-digit number can’t be 0.",
 ex:{q:"How many 2-digit numbers plus their reversal equal 121?",steps:[
  ["Write the number as 10a + b.","(10a + b) + (10b + a) = 11(a + b)"],
  ["Set it equal to 121.","a + b = 11"],
  ["Both digits from 1 to 9: a = 2 to 9.","29, 38, 47, 56, 65, 74, 83, 92 → 8"]]},
 p:[
  {id:"33.1",q:"How many perfect squares from 1 to 1000 end in the digit 6?",a:"6",steps:[
   ["A square ends in 6 only if its root ends in 4 or 6. Roots go up to 31 (31² = 961).","roots ending in 4 or 6, up to 31"],
   ["List them.","4, 6, 14, 16, 24, 26"],
   ["Count.","6"]]},
  {id:"33.2",q:"What is the sum of the digits of 10²⁰ − 20?",a:"170",steps:[
   ["Try a small case: 10⁴ − 20 = 9980, two 9s, then 8, then 0.","pattern: (n − 2) nines, then 8, 0"],
   ["For 10²⁰ there are 18 nines, then 8, then 0.","9 × 18 + 8"],
   ["Compute.","162 + 8 = 170"]]},
  {id:"33.3",isNew:true,q:"A two-digit number equals 4 times the sum of its digits. How many such numbers are there?",a:"4",steps:[
   ["Set up the equation.","10a + b = 4(a + b) → 6a = 3b → b = 2a"],
   ["b is a digit, so a is 1 to 4.","12, 24, 36, 48"],
   ["Count.","4"]]},
  {id:"33.4",isNew:true,q:"What is the units digit of 1! + 2! + 3! + … + 100!?",a:"3",steps:[
   ["From 5! onward, every term ends in 0.","only 1! to 4! matter"],
   ["Add those.","1 + 2 + 6 + 24 = 33"],
   ["Units digit.","3"]]}]};

// 42. Power of a point
UP[42]={
 k:["Two chords crossing inside a circle at P: PA · PB = PC · PD. The two pieces of each chord multiply to the same number.",
    "Two lines from an outside point P, each crossing the circle twice: (near distance) × (far distance) is the same for both.",
    "A tangent from P: PT² = near × far for any line through P that crosses the circle.",
    "A chord at distance d from the center of a circle with radius r has half-length √(r² − d²)."],
 trap:"Using the inside piece AB instead of the full far distance PB from the outside point.",
 ex:{q:"Chords AB and CD cross at P with AP = 4, PB = 6 and CP = 3. Find PD.",steps:[
  ["Crossing chords: the pieces multiply to the same number.","AP · PB = CP · PD",fg([-3.6,-3.6,3.6,3.6],[["circ",[0,0],3,"s"],["seg",[-2.6,1.5],[2.6,-1.5],"hl"],["seg",[-1.2,-2.75],[1.7,2.47],"al"],["text",[-3,1.8],"A"],["text",[3,-1.8],"B"],["text",[-1.4,-3.15],"C"],["text",[1.9,2.85],"D"]])],
  ["Substitute.","4 · 6 = 3 · PD"],
  ["Solve.","PD = 8"]]},
 p:[
  {id:"42.1",q:"From P outside a circle, a tangent segment has length 6. A line from P meets the circle at A and then B, with PA = 4. Find AB.",a:"5",steps:[
   ["Tangent squared = near × far.","6² = PA · PB = 4 · PB"],
   ["Solve.","PB = 9"],
   ["AB is the part inside the circle.","AB = 9 − 4 = 5"]]},
  {id:"42.2",q:"Chords AB and CD cross at P. AP = 2, PB = 9 and CP = PD. Find CD.",a:"6√2",steps:[
   ["Crossing chords.","CP · PD = 2 · 9 = 18"],
   ["CP = PD, so CP² = 18.","CP = 3√2"],
   ["CD is twice that.","6√2"]]},
  {id:"42.3",isNew:true,q:"A chord of length 16 is 6 units from the center of a circle. Find the radius.",a:"10",steps:[
   ["The perpendicular from the center cuts the chord in half: 8 each side.","half-chord 8, distance 6"],
   ["Right triangle with legs 6 and 8.","r = √(36 + 64) = 10"]]},
  {id:"42.4",isNew:true,q:"From point P outside a circle, a line meets the circle at A and then B, with PA = 3 and AB = 9. Find the length of a tangent segment from P.",a:"6",steps:[
   ["Far distance PB = PA + AB.","PB = 12"],
   ["Tangent squared = near × far.","PT² = 3 × 12 = 36"],
   ["Square root.","PT = 6"]]}]};

// 43. Cyclic quadrilaterals
UP[43]={
 k:["A quadrilateral with all four corners on a circle has opposite angles adding to 180°.",
    "Angles that open onto the same arc are equal: in cyclic ABCD, ∠ABD = ∠ACD.",
    "Ptolemy: AC · BD = AB · CD + AD · BC. The diagonals multiply to the sum of the products of opposite sides.",
    "Every rectangle is cyclic, and its diagonals are diameters of the circle."],
 trap:"Using Ptolemy or the 180° rule on a quadrilateral that isn’t on a circle.",
 ex:{q:"Cyclic quadrilateral ABCD has ∠A = 75°. Find ∠C.",steps:[
  ["A and C are opposite corners.","∠A + ∠C = 180°"],
  ["Solve.","∠C = 105°"]]},
 p:[
  {id:"43.1",q:"Cyclic quadrilateral ABCD has ∠A = 3∠C. Find ∠A in degrees.",a:"135°",v:"135",steps:[
   ["Opposite angles add to 180°.","3∠C + ∠C = 180°"],
   ["Solve.","∠C = 45°, so ∠A = 135°"]]},
  {id:"43.2",q:"Cyclic quadrilateral ABCD has AB = 3, BC = 4, CD = 5 and DA = 6. Find AC · BD.",a:"39",steps:[
   ["Ptolemy: diagonals multiply to the sum of opposite-side products.","AC · BD = AB · CD + BC · DA"],
   ["Substitute.","3 · 5 + 4 · 6 = 39"]]},
  {id:"43.3",isNew:true,q:"Cyclic quadrilateral ABCD has ∠B = (2x + 10)° and ∠D = (3x − 5)°. Find x.",a:"35",steps:[
   ["B and D are opposite.","(2x + 10) + (3x − 5) = 180"],
   ["Solve.","5x = 175 → x = 35"]]},
  {id:"43.4",isNew:true,q:"A 6 × 8 rectangle is inscribed in a circle. Find the circle’s radius.",a:"5",steps:[
   ["The rectangle’s diagonal is a diameter.","diagonal = √(36 + 64) = 10"],
   ["Halve it.","r = 5"]]}]};

// 47. 3D geometry, part 2
UP[47]={
 k:["Shortest path along a surface: unfold the faces flat and draw a straight line.",
    "Sphere inside a cube with side s: radius s/2. Cube inside a sphere: the cube’s space diagonal s√3 is the diameter.",
    "A cylinder unrolls into a rectangle of width 2πr (the circumference) and height h. A path once around becomes its diagonal.",
    "Slice the solid with a plane and work in the 2D cross-section."],
 trap:"Cutting straight through the inside when the path has to stay on the surface.",
 ex:{q:"A sphere fits exactly inside a cube with side 6. Find the sphere’s volume.",steps:[
  ["The sphere touches opposite faces, so its diameter is 6.","r = 3"],
  ["Volume.","(4/3)π · 27 = 36π"]]},
 p:[
  {id:"47.1",q:"A cube’s corners all lie on a sphere of radius 3√3. Find the cube’s volume.",a:"216",steps:[
   ["The cube’s space diagonal is the sphere’s diameter.","s√3 = 6√3 → s = 6"],
   ["Volume.","6³ = 216"]]},
  {id:"47.2",q:"An ant walks on the surface of a unit cube from one corner to the opposite corner. How long is the shortest path?",a:"√5",steps:[
   ["Unfold the two faces the ant crosses into one flat 1 × 2 rectangle.","1 × 2 rectangle",fg([-0.3,-0.3,2.3,1.3],[["poly",[[0,0],[1,0],[1,1],[0,1]],"f"],["poly",[[1,0],[2,0],[2,1],[1,1]],"f"],["seg",[0,0],[2,1],"hl"],["pt",[0,0]],["pt",[2,1]]],"Two faces laid flat; the path becomes a straight line")],
   ["The path is the rectangle’s diagonal.","√(1² + 2²) = √5"]]},
  {id:"47.3",isNew:true,q:"A sphere is inscribed in a cube of volume 64. Find the sphere’s radius.",a:"2",steps:[
   ["Cube side.","s³ = 64 → s = 4"],
   ["The sphere’s diameter is the side.","r = 2"]]},
  {id:"47.4",isNew:true,q:"A cylinder has circumference 8 and height 6. An ant crawls once around it from a point on the bottom edge to the point directly above it on the top edge. How long is the shortest path?",a:"10",steps:[
   ["Unroll the side into an 8 × 6 rectangle.","width 8, height 6",fg([-0.5,-0.5,8.5,6.5],[["poly",[[0,0],[8,0],[8,6],[0,6]],"f"],["seg",[0,0],[8,6],"hl"],["text",[4,-0.35],"8","m"],["text",[8.35,3],"6","m"]])],
   ["The path is the diagonal.","√(64 + 36) = 10"]]}]};

// 49. Lengths in complex shapes
UP[49]={
 k:["Drop perpendiculars to make right triangles, then use Pythagoras.",
    "Distance from a vertex to the opposite side = 2 × area ÷ that side.",
    "Distance from point (x₀, y₀) to the line ax + by + c = 0: |ax₀ + by₀ + c| ÷ √(a² + b²).",
    "Shortest path that must touch a line: reflect one endpoint across the line and draw a straight segment.",
    "Common tangent of circles with radii r and R, centers d apart: external √(d² − (R − r)²), internal √(d² − (R + r)²)."],
 trap:"Using R + r for an external tangent. External uses the difference, internal uses the sum.",
 ex:{q:"Find the length of the shortest path from (0, 2) to the x-axis and then to (6, 4).",steps:[
  ["Reflect (6, 4) across the x-axis to (6, −4). Any path to the axis and on to (6, 4) is as long as one to (6, −4).","reflect to (6, −4)",fg([-0.8,-4.8,6.8,4.8],[["axes",-0.5,-4.5,6.5,4.5],["seg",[0,2],[6,-4],"hl"],["seg",[2,0],[6,4],"al"],["seg",[6,4],[6,-4],"d"],["pt",[0,2]],["pt",[6,4]],["pt",[6,-4],"hl"],["text",[0.9,2.3],"(0, 2)","m"],["text",[5.1,4.3],"(6, 4)","m"],["text",[5,-4.3],"(6, −4)","a"]])],
  ["The shortest path is the straight segment.","√(6² + 6²)"],
  ["Compute.","6√2"]]},
 p:[
  {id:"49.1",q:"Rectangle ABCD has AB = 8 and BC = 6. Find the distance from B to the diagonal AC.",a:"24/5",steps:[
   ["Triangle ABC has area ½ · 8 · 6 = 24 and AC = 10.","area 24, base AC = 10"],
   ["Height to AC = 2 × area ÷ AC.","48/10 = 24/5"]]},
  {id:"49.2",q:"Two circles with radii 3 and 8 have centers 13 apart. Find the length of a common external tangent segment.",a:"12",steps:[
   ["External tangent: use the difference of the radii.","√(13² − (8 − 3)²)"],
   ["Compute.","√(169 − 25) = √144 = 12"]]},
  {id:"49.3",isNew:true,q:"Two circles with radii 2 and 4 have centers 10 apart. Find the length of a common internal tangent segment (one that crosses between the circles).",a:"8",steps:[
   ["Internal tangent: use the sum of the radii.","√(10² − (2 + 4)²)"],
   ["Compute.","√(100 − 36) = 8"]]},
  {id:"49.4",isNew:true,q:"Find the distance from the point (3, 4) to the line 3x + 4y = 0.",a:"5",steps:[
   ["Point-to-line distance formula.","|3·3 + 4·4| ÷ √(3² + 4²)"],
   ["Compute.","25/5 = 5"]]}]};

// 51. Floor and ceiling
UP[51]={
 k:["⌊x⌋ is the greatest integer at most x: ⌊3.7⌋ = 3 and ⌊−1.2⌋ = −2. Write x = n + f with n = ⌊x⌋ and 0 ≤ f < 1.",
    "⌊N/k⌋ counts the multiples of k from 1 to N.",
    "To solve an equation, first narrow down n = ⌊x⌋ using n ≤ x < n + 1, then solve and check.",
    "⌊√k⌋ = m for every k from m² to (m + 1)² − 1, which is 2m + 1 values. Group them when adding."],
 trap:"⌊−1.2⌋ is −2, not −1. The floor always rounds down.",
 ex:{q:"Solve x + ⌊x⌋ = 7.5.",steps:[
  ["Write x = n + f with n whole and 0 ≤ f < 1.","2n + f = 7.5"],
  ["2n is even and f is less than 1, so n = 3 and f = 0.5.","n = 3, f = 0.5"],
  ["Answer.","x = 3.5"]]},
 ten:"#23 (multiples of 2 and 3 in a run of consecutive integers).",
 p:[
  {id:"51.1",q:"Find ⌊√1⌋ + ⌊√2⌋ + … + ⌊√20⌋.",a:"54",steps:[
   ["Group k by the value of ⌊√k⌋.","",gr({rows:["⌊√k⌋ = 1","⌊√k⌋ = 2","⌊√k⌋ = 3","⌊√k⌋ = 4"],cols:["k from","count","total"],corner:"",cells:[["1–3","3","3"],["4–8","5","10"],["9–15","7","21"],["16–20","5","20"]],hl:(r,c)=>c===2?"a":""})],
   ["Add the totals.","3 + 10 + 21 + 20 = 54"]]},
  {id:"51.2",q:"Find the positive x with x·⌊x⌋ = 27.",a:"27/5",steps:[
   ["If ⌊x⌋ = n, then x·n is between n² and n(n + 1).","n² ≤ 27 < n(n + 1)"],
   ["n = 5 works: 25 ≤ 27 < 30.","⌊x⌋ = 5"],
   ["Solve.","x = 27/5 = 5.4"]]},
  {id:"51.3",isNew:true,q:"How many integers from 1 to 1000 are multiples of 7?",a:"142",steps:[
   ["Count with the floor.","⌊1000/7⌋"],
   ["7 × 142 = 994 and 7 × 143 = 1001.","142"]]},
  {id:"51.4",isNew:true,q:"Find ⌊−2.3⌋ + ⌊2.3⌋.",a:"−1",v:"-1",steps:[
   ["Round each down.","⌊−2.3⌋ = −3, ⌊2.3⌋ = 2"],
   ["Add.","−1"]]}]};

// 52. Inequalities
UP[52]={
 k:["AM-GM: (a + b)/2 ≥ √(ab) for positive a and b, equal when a = b. A fixed sum gives the largest product when the numbers are equal; a fixed product gives the smallest sum when they’re equal.",
    "x + k/x ≥ 2√k for x > 0, with equality at x = √k.",
    "Complete the square for minimums: x² − 6x + 14 = (x − 3)² + 5, so the minimum is 5 at x = 3.",
    "Triangle inequality: each side is less than the sum of the other two and more than their difference."],
 trap:"Using AM-GM on negative numbers, where it doesn’t hold.",
 ex:{q:"Find the minimum of x + 9/x for x > 0.",steps:[
  ["AM-GM on x and 9/x.","(x + 9/x)/2 ≥ √(x · 9/x) = 3"],
  ["So x + 9/x ≥ 6, with equality when x = 9/x.","equality at x = 3"],
  ["Minimum.","6"]]},
 ten:"#14 (three triangle inequalities).",
 p:[
  {id:"52.1",q:"A rectangle has perimeter 40. What is its largest possible area?",a:"100",steps:[
   ["Length + width = 20. A fixed sum gives the biggest product when the parts are equal.","l = w = 10"],
   ["Area.","10 × 10 = 100"]]},
  {id:"52.2",q:"Find the minimum value of x² − 6x + 14.",a:"5",steps:[
   ["Complete the square.","x² − 6x + 9 + 5 = (x − 3)² + 5"],
   ["A square is at least 0, so the smallest value is when x = 3.","minimum 5"]]},
  {id:"52.3",isNew:true,q:"Two positive numbers have product 36. What is the smallest possible value of their sum?",a:"12",steps:[
   ["A fixed product gives the smallest sum when the numbers are equal.","6 and 6"],
   ["Sum.","12"]]},
  {id:"52.4",isNew:true,q:"A triangle has sides 5 and 9. How many whole-number lengths are possible for the third side?",a:"9",steps:[
   ["The third side is more than the difference and less than the sum.","9 − 5 < x < 9 + 5 → 4 < x < 14"],
   ["Whole numbers 5 through 13.","13 − 5 + 1 = 9"]]}]};
})(window.UP);
