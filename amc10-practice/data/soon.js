// ◆ Soon topics: specific key ideas, a Watch out line, 4 practice problems, and step-by-step walkthroughs.
window.UP = window.UP || {};
(function(UP){
const ch=(items,o)=>Object.assign({t:"chips",items},o||{});
const gr=o=>Object.assign({t:"grid"},o);
const fg=(box,items,cap)=>({t:"fig",box,items,cap});
const R=n=>Array.from({length:n},(_,i)=>i);
const ngon=(n,r,c,rot)=>R(n).map(i=>{const a=((rot===undefined?90:rot)+360*i/n)*Math.PI/180;return [(c?c[0]:0)+r*Math.cos(a),(c?c[1]:0)+r*Math.sin(a)]});
const venn=(a,b,both,la,lb,cap)=>fg([-2,-2,4,2.4],[["circ",[0,0],1.6,"ff"],["circ",[2,0],1.6,"fx"],["text",[-0.7,0],String(a)],["text",[1,0],String(both),"a"],["text",[2.7,0],String(b)],["text",[-0.4,2.0],la,"a"],["text",[2.4,2.0],lb,"al"]],cap);
const lat=(w,h,extra,cap)=>fg([-0.5,-0.5,w+0.5,h+0.5],[["grid",0,0,w,h]].concat(extra),cap);
const stars=(groups,cap)=>{const it=[],c=[];groups.forEach((g,i)=>{for(let j=0;j<g;j++){it.push("★");c.push("")}if(i<groups.length-1){it.push("|");c.push("b")}});return ch(it,{c,cap})};

// 5. Inclusion–exclusion
UP[5]={
 k:["Two sets: |A or B| = |A| + |B| − |A and B|. The overlap got counted once in A and again in B, so subtract it once.",
    "Three sets: add the three singles, subtract the three pairwise overlaps, then add back the triple overlap.",
    "From 1 to N, ⌊N/k⌋ numbers are multiples of k. Multiples of both a and b are the multiples of lcm(a, b).",
    "“Neither” = total − |A or B|. “Exactly one” = |A or B| − |A and B|.",
    "Fill a Venn diagram from the inside out: the overlap first, then what’s left of each circle."],
 trap:"Using the product instead of the lcm for the overlap. Multiples of both 4 and 6 are multiples of 12, not 24.",
 spot:"“or”, “neither”, “divisible by at least one of”, “but not both”.",
 ex:{q:"How many integers from 1 to 100 are divisible by 2 or 5?",steps:[
  ["Count each set.","multiples of 2: 50, multiples of 5: 20"],
  ["Numbers in both sets are multiples of lcm(2, 5) = 10.","both: 10",venn(40,10,10,"mult. of 2","mult. of 5","40 only in the left circle, 10 in both, 10 only in the right")],
  ["Add the sets, then subtract the overlap you counted twice.","50 + 20 − 10 = 60"]]},
 p:[
  {id:"5.1",q:"How many integers from 1 to 120 are divisible by 3 or 5, but not both?",a:"48",steps:[
   ["Count multiples of 3 and of 5 up to 120.","3: 40, 5: 24"],
   ["Both means multiples of 15.","15: 8",venn(32,16,8,"mult. of 3","mult. of 5")],
   ["“Not both” means only the outer parts of the two circles.","(40 − 8) + (24 − 8) = 32 + 16"],
   ["Add.","= 48"]]},
  {id:"5.2",q:"How many integers from 1 to 300 are divisible by none of 2, 3 and 5?",a:"80",steps:[
   ["Count the opposite: numbers divisible by at least one of 2, 3, 5.","three-set PIE"],
   ["Singles.","150 + 100 + 60 = 310"],
   ["Pairs use lcms 6, 10, 15; the triple uses 30.","pairs: 50 + 30 + 20 = 100, triple: 10"],
   ["At least one = 310 − 100 + 10 = 220. None = 300 − 220.","= 80"]]},
  {id:"5.3",isNew:true,q:"In a class of 30 students, 18 play soccer, 15 play basketball and 5 play neither. How many play both?",a:"8",steps:[
   ["Students who play at least one sport.","30 − 5 = 25"],
   ["PIE: 25 = 18 + 15 − both.","both = 33 − 25"],
   ["Solve.","both = 8",venn(10,7,8,"soccer","basketball","10 soccer only, 8 both, 7 basketball only, 5 outside")]]},
  {id:"5.4",isNew:true,q:"How many integers from 1 to 100 are divisible by 4 or 6?",a:"33",steps:[
   ["Count each set.","4: 25, 6: 16"],
   ["Both means multiples of lcm(4, 6) = 12, not 24.","12: 8"],
   ["Subtract the overlap once.","25 + 16 − 8 = 33"]]}]};

// 6. Stars and bars
UP[6]={
 k:["n identical items into k different boxes, empty boxes allowed: C(n + k − 1, k − 1). Line up n stars and k − 1 bars; choosing the bar spots decides everything.",
    "Every box gets at least 1: give one to each box first, then share the remaining n − k freely. That gives C(n − 1, k − 1).",
    "“At least 2 in each box”: give 2 to each first, then share what’s left.",
    "Same thing as counting whole-number solutions of a + b + c = n. 10 candies to 3 kids: C(12, 2) = 66.",
    "Only for identical items. If the items are different (people, numbered balls), each item picks a box: kⁿ ways."],
 trap:"Choosing k bars instead of k − 1. Three boxes need only two dividers.",
 spot:"identical candies, coins or donuts handed out; “how many solutions to a + b + c = n”.",
 ex:{q:"How many ways can 10 identical candies go to 3 kids, if a kid may get none?",steps:[
  ["Line up 10 stars (candies) and 2 bars (dividers). The bars split the stars into 3 groups.","10 stars + 2 bars = 12 spots",stars([3,4,3],"3 | 4 | 3 means the kids get 3, 4 and 3")],
  ["Every arrangement is one way to share, and it’s decided by where the 2 bars go.","C(12, 2)",stars([0,6,4],"| 6 | 4 means the first kid gets none")],
  ["Compute.","(12 · 11)/2 = 66"]]},
 p:[
  {id:"6.1",q:"How many ordered triples of positive integers (a, b, c) satisfy a + b + c = 12?",a:"55",steps:[
   ["Each variable must be at least 1, so give 1 to each first.","12 − 3 = 9 left to share freely"],
   ["Share 9 identical units among 3 variables: 9 stars and 2 bars.","C(11, 2)"],
   ["Compute.","(11 · 10)/2 = 55"]]},
  {id:"6.2",q:"A shop sells 4 flavors of donut. How many different boxes of 6 donuts can you buy (repeats allowed, order doesn’t matter)?",a:"84",steps:[
   ["A box is decided by how many of each flavor: a + b + c + d = 6 in whole numbers.","6 stars, 3 bars",stars([1,3,0,2],"1 of flavor A, 3 of B, 0 of C, 2 of D")],
   ["Choose where the 3 bars go among 9 spots.","C(9, 3)"],
   ["Compute.","(9 · 8 · 7)/6 = 84"]]},
  {id:"6.3",isNew:true,q:"How many solutions in nonnegative integers does a + b + c + d = 5 have?",a:"56",steps:[
   ["5 stars and 3 bars (4 variables need 3 dividers).","8 spots"],
   ["Choose the bar positions.","C(8, 3)"],
   ["Compute.","(8 · 7 · 6)/6 = 56"]]},
  {id:"6.4",isNew:true,q:"Seven identical cookies are shared among Ann, Ben and Cal so that each gets at least 2. In how many ways can this be done?",a:"3",steps:[
   ["Give each person 2 cookies first.","7 − 6 = 1 cookie left"],
   ["Share 1 cookie among 3 people with no restrictions: 1 star, 2 bars.","C(3, 2)"],
   ["Compute. (The extra cookie goes to Ann, Ben or Cal.)","3"]]}]};

// 8. Geometric counting
UP[8]={
 k:["Rectangles in an m × n grid of squares: every rectangle is set by 2 vertical lines and 2 horizontal lines. With m + 1 and n + 1 lines: C(m + 1, 2) × C(n + 1, 2).",
    "Squares of every size in an n × n grid: 1² + 2² + … + n². A 4 × 4 grid has 16 + 9 + 4 + 1 = 30.",
    "Right/up paths from (0, 0) to (a, b): a path is a string of a R’s and b U’s, so C(a + b, a).",
    "Paths through a point = (paths to it) × (paths from it). Paths avoiding a point = total − paths through it.",
    "Triangles from n points: C(n, 3) minus the triples that lie on one line."],
 trap:"Counting squares instead of lines. A 3 × 4 grid of squares has 4 horizontal lines and 5 vertical lines.",
 ex:{q:"How many squares of any size are in a 4 × 4 grid of unit squares?",steps:[
  ["Count by size. A k × k square fits in 5 − k positions across and 5 − k down.","1 × 1: 4 × 4 = 16",lat(4,4,[["poly",[[0,0],[1,0],[1,1],[0,1]],"ff"]])],
  ["2 × 2 squares.","3 × 3 = 9",lat(4,4,[["poly",[[1,1],[3,1],[3,3],[1,3]],"ff"]])],
  ["3 × 3 and 4 × 4 squares.","2 × 2 = 4, 1 × 1 = 1"],
  ["Add.","16 + 9 + 4 + 1 = 30"]]},
 p:[
  {id:"8.1",q:"How many rectangles are in a 3 × 4 grid of unit squares?",a:"60",steps:[
   ["A grid 3 squares tall and 4 wide has 4 horizontal lines and 5 vertical lines.","4 and 5 lines",lat(4,3,[["poly",[[1,0],[3,0],[3,2],[1,2]],"ff"],["seg",[1,-0.5],[1,3.5],"hl"],["seg",[3,-0.5],[3,3.5],"hl"],["seg",[-0.5,0],[4.5,0],"al"],["seg",[-0.5,2],[4.5,2],"al"]],"Any 2 vertical lines and any 2 horizontal lines make one rectangle")],
   ["Choose 2 vertical lines and 2 horizontal lines.","C(5, 2) × C(4, 2)"],
   ["Compute.","10 × 6 = 60"]]},
  {id:"8.2",q:"How many right/up paths go from (0, 0) to (4, 3) and pass through (2, 1)?",a:"18",steps:[
   ["Split the trip at (2, 1): paths there times paths onward.","(to (2,1)) × (from (2,1))",lat(4,3,[["line",[[0,0],[1,0],[2,0],[2,1],[3,1],[3,2],[4,2],[4,3]],"hl"],["pt",[2,1],"al"],["pt",[0,0]],["pt",[4,3]]],"One path through (2, 1)")],
   ["To (2, 1): arrange 2 R’s and 1 U.","C(3, 1) = 3"],
   ["From (2, 1) to (4, 3): arrange 2 R’s and 2 U’s.","C(4, 2) = 6"],
   ["Multiply.","3 × 6 = 18"]]},
  {id:"8.3",isNew:true,q:"How many right/up paths go from (0, 0) to (3, 3)?",a:"20",steps:[
   ["Every path is 3 R’s and 3 U’s in some order, like RRUURU.","6 moves, 3 of them R"],
   ["Choose which 3 of the 6 moves are R.","C(6, 3)"],
   ["Compute.","20"]]},
  {id:"8.4",isNew:true,q:"How many triangles have all three vertices among the 9 dots of a 3 × 3 grid?",a:"76",steps:[
   ["Any 3 dots, then remove the triples that lie on a line.","C(9, 3) = 84"],
   ["Collinear triples: 3 rows, 3 columns and 2 diagonals.","8",lat(2,2,[["seg",[0,0],[2,2],"hl"],["seg",[0,2],[2,0],"hl"],["seg",[0,1],[2,1],"al"],["seg",[1,0],[1,2],"al"]].concat([0,1,2].flatMap(x=>[0,1,2].map(y=>["pt",[x,y]]))),"Some of the 8 lines of three dots")],
   ["Subtract.","84 − 8 = 76"]]}]};

// 9. Geometric probability
UP[9]={
 k:["Random point in a region: probability = good area ÷ total area. On a segment, use lengths.",
    "Two random numbers x and y from intervals are one random point in a rectangle. Shade the points where the condition holds.",
    "Conditions like x + y < c or |x − y| < c are bounded by straight lines, so the shaded part is made of triangles and rectangles.",
    "“Within distance d of a point” gives a circle (or part of one), so π shows up in the answer."],
 trap:"Trying to count outcomes. With continuous choices there are infinitely many, so measure areas or lengths instead.",
 ex:{q:"x and y are chosen at random from [0, 1]. What’s the probability that x + y < 1/2?",steps:[
  ["Each pair (x, y) is a point in the unit square, which has area 1.","total area = 1"],
  ["x + y < 1/2 is the corner below the line x + y = 1/2: a triangle with legs 1/2.","good area = ½ · ½ · ½ = 1/8",fg([-0.15,-0.15,1.15,1.15],[["poly",[[0,0],[1,0],[1,1],[0,1]],"s"],["poly",[[0,0],[0.5,0],[0,0.5]],"ff"],["text",[0.5,-0.1],"x","m"],["text",[-0.1,0.5],"y","m"]])],
  ["Divide.","1/8"]]},
 p:[
  {id:"9.1",q:"A point is chosen at random inside a square of side 2. What’s the probability it lies within distance 1 of the center?",a:"π/4",steps:[
   ["Good region: a circle of radius 1 around the center. It fits exactly inside the square.","good area = π",fg([-1.2,-1.2,1.2,1.2],[["poly",[[-1,-1],[1,-1],[1,1],[-1,1]],"s"],["circ",[0,0],1,"ff"],["pt",[0,0]]])],
   ["Total area.","2 × 2 = 4"],
   ["Divide.","π/4"]]},
  {id:"9.2",q:"x and y are chosen at random from [0, 2]. What’s the probability that |x − y| < 1?",a:"3/4",steps:[
   ["The square has area 4. Shade the band between the lines y = x − 1 and y = x + 1.","total = 4",fg([-0.2,-0.2,2.2,2.2],[["poly",[[0,0],[2,0],[2,2],[0,2]],"s"],["poly",[[0,0],[1,0],[2,1],[2,2],[1,2],[0,1]],"ff"]])],
   ["The two unshaded corners are triangles with legs 1.","bad area = 2 × ½ = 1"],
   ["Good area = 4 − 1.","3/4"]]},
  {id:"9.3",isNew:true,q:"A point is chosen at random on a segment of length 10. What is the probability that it is within 2 of one of the endpoints?",a:"2/5",steps:[
   ["Good parts: the first 2 units and the last 2 units.","good length = 2 + 2 = 4",fg([-0.5,-0.8,10.5,0.8],[["seg",[0,0],[10,0],"m"],["seg",[0,0],[2,0],"hl"],["seg",[8,0],[10,0],"hl"],["text",[1,0.45],"2","a"],["text",[9,0.45],"2","a"],["text",[5,0.45],"10","m"]])],
   ["Divide by the whole length.","4/10 = 2/5"]]},
  {id:"9.4",isNew:true,q:"x is chosen at random from [0, 3] and y from [0, 2]. What is the probability that y < x?",a:"2/3",steps:[
   ["The pairs fill a 3 × 2 rectangle of area 6.","total = 6",fg([-0.2,-0.2,3.2,2.2],[["poly",[[0,0],[3,0],[3,2],[0,2]],"s"],["poly",[[0,0],[3,0],[3,2],[2,2]],"ff"],["seg",[0,0],[2,2],"d"]],"Shaded: below the line y = x")],
   ["The unshaded part (y ≥ x) is a triangle with legs 2.","½ · 2 · 2 = 2"],
   ["Good area = 6 − 2 = 4.","4/6 = 2/3"]]}]};

// 10. Expected value
UP[10]={
 k:["Expected value = sum of (value × its probability). A fair die: (1 + 2 + … + 6)/6 = 3.5.",
    "Linearity: E[X + Y] = E[X] + E[Y], even when X and Y depend on each other.",
    "To find the expected number of times something happens, add up the probability of each place it could happen. 10 coin flips: 10 × 1/2 = 5 heads.",
    "An expected value doesn’t need to be a possible outcome: you can’t roll 3.5."],
 trap:"Trying to list every outcome of a big experiment. Break the count into small pieces and add their probabilities.",
 ex:{q:"What’s the expected number of heads in 10 coin flips?",steps:[
  ["Each flip adds 1 head with probability 1/2.","each flip contributes 1/2"],
  ["By linearity, add the 10 contributions.","10 × 1/2 = 5"]]},
 p:[
  {id:"10.1",q:"You roll a fair die and win the square of the number shown, in dollars. What are your expected winnings?",a:"91/6",steps:[
   ["List the possible winnings. Each has probability 1/6.","1, 4, 9, 16, 25, 36",ch(["1","4","9","16","25","36"],{sub:["1","2","3","4","5","6"],cap:"Roll shown under each prize"})],
   ["Add them and divide by 6.","91/6 ≈ $15.17"]]},
  {id:"10.2",q:"Five people throw their hats in a pile and each takes one at random. What’s the expected number of people who get their own hat back?",a:"1",steps:[
   ["Each person gets their own hat with probability 1/5.","each person contributes 1/5"],
   ["Linearity works even though the people affect each other.","5 × 1/5 = 1"]]},
  {id:"10.3",isNew:true,q:"A game pays $10 with probability 1/5, $2 with probability 1/2, and nothing otherwise. What is the expected payout in dollars?",a:"3",steps:[
   ["Multiply each payout by its probability.","10 × 1/5 = 2, 2 × 1/2 = 1, 0 × the rest = 0"],
   ["Add.","2 + 1 = 3"]]},
  {id:"10.4",isNew:true,q:"A fair coin is flipped 6 times. What is the expected number of places where a head is immediately followed by a tail?",a:"5/4",steps:[
   ["An HT can start at flip 1, 2, 3, 4 or 5.","5 possible places",ch(["H","T","?","?","?","?"],{c:["a","b","","","",""],cap:"An HT at places 1–2"})],
   ["Each place is HT with probability ½ × ½.","1/4 each"],
   ["Add the 5 contributions.","5 × 1/4 = 5/4"]]}]};

// 14. Algebraic manipulations
UP[14]={
 k:["If the question asks for an expression, build it from what you’re given instead of solving for x.",
    "x² + 1/x² = (x + 1/x)² − 2, and also (x − 1/x)² + 2.",
    "a² + b² = (a + b)² − 2ab, and (a − b)² = (a + b)² − 4ab.",
    "Cubes: x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x).",
    "A repeated chunk like x² + 3x: call it u, solve the simpler equation, then go back."],
 trap:"Solving a quadratic with ugly roots when the answer only needs a sum, a product or a square.",
 ex:{q:"If x + 1/x = 5, find x² + 1/x².",steps:[
  ["Square what you know. The middle term is 2 · x · (1/x) = 2.","(x + 1/x)² = x² + 2 + 1/x²"],
  ["Replace the left side with 5².","25 = x² + 2 + 1/x²"],
  ["Subtract 2.","x² + 1/x² = 23"]]},
 ten:"#13 never needs the two club sizes until the end: a + b = 22 and ab = 112 are enough.",
 p:[
  {id:"14.1",q:"If a + b = 7 and ab = 10, find a² + b².",a:"29",steps:[
   ["Square the sum.","(a + b)² = a² + 2ab + b²"],
   ["Substitute.","49 = a² + b² + 20"],
   ["Solve.","a² + b² = 29"]]},
  {id:"14.2",q:"If x − 1/x = 3, find x² + 1/x².",a:"11",steps:[
   ["Square: the middle term is now −2.","(x − 1/x)² = x² − 2 + 1/x²"],
   ["Substitute.","9 = x² + 1/x² − 2"],
   ["Solve.","x² + 1/x² = 11"]]},
  {id:"14.3",isNew:true,q:"If a + b = 6 and ab = 5, find (a − b)².",a:"16",steps:[
   ["(a − b)² and (a + b)² differ by 4ab.","(a − b)² = (a + b)² − 4ab"],
   ["Substitute.","36 − 20 = 16"]]},
  {id:"14.4",isNew:true,q:"If x + 1/x = 3, find x³ + 1/x³.",a:"18",steps:[
   ["Cube the sum. The middle terms group into 3(x + 1/x).","(x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x)"],
   ["Substitute.","27 = x³ + 1/x³ + 9"],
   ["Solve.","x³ + 1/x³ = 18"]]}]};

// 15. Vieta
UP[15]={
 k:["For ax² + bx + c = 0 with roots r and s: r + s = −b/a and rs = c/a.",
    "Cubic ax³ + bx² + cx + d: r + s + t = −b/a, rs + st + tr = c/a, rst = −d/a.",
    "Expressions of the roots: 1/r + 1/s = (r + s)/(rs), r² + s² = (r + s)² − 2rs.",
    "Whole-number roots of x² + bx + c: their product is c, so list the factor pairs of c."],
 trap:"Dropping the minus sign: for x² − 5x + 3, the sum of the roots is +5.",
 ex:{q:"r and s are the roots of x² − 5x + 3 = 0. Find 1/r + 1/s.",steps:[
  ["Vieta.","r + s = 5, rs = 3"],
  ["Combine the fractions.","1/r + 1/s = (r + s)/(rs)"],
  ["Substitute.","5/3"]]},
 p:[
  {id:"15.1",q:"r and s are the roots of 2x² − 6x + 1 = 0. Find r² + s².",a:"8",steps:[
   ["Vieta, dividing by the leading coefficient 2.","r + s = 3, rs = 1/2"],
   ["Rewrite r² + s².","(r + s)² − 2rs"],
   ["Substitute.","9 − 1 = 8"]]},
  {id:"15.2",q:"Both roots of x² + bx + 24 = 0 are positive integers. How many values of b are possible?",a:"4",steps:[
   ["The roots multiply to 24. List the pairs of positive integers.","(1, 24), (2, 12), (3, 8), (4, 6)"],
   ["b = −(sum of roots) for each pair.","b = −25, −14, −11, −10"],
   ["Count.","4"]]},
  {id:"15.3",isNew:true,q:"The two roots of x² − 7x + k = 0 differ by 3. Find k.",a:"10",steps:[
   ["Vieta gives the sum.","r + s = 7"],
   ["Use r − s = 3 with r + s = 7.","r = 5, s = 2"],
   ["k is the product.","k = 10"]]},
  {id:"15.4",isNew:true,q:"r, s and t are the roots of x³ − 6x² + 11x − 6 = 0. Find r² + s² + t².",a:"14",steps:[
   ["Vieta for the cubic.","r + s + t = 6, rs + st + tr = 11"],
   ["Square the sum and subtract twice the pair sum.","(r + s + t)² − 2(rs + st + tr)"],
   ["Substitute.","36 − 22 = 14"]]}]};

// 19. Geometric sequences
UP[19]={
 k:["Each term is the previous one times the ratio r. The nth term is a₁·rⁿ⁻¹.",
    "Two terms k steps apart differ by a factor of rᵏ. Terms 2 and 5 are 3 steps apart, so r³ = a₅/a₂.",
    "Sum of n terms: a₁(rⁿ − 1)/(r − 1). For example 1 + 2 + 4 + … + 2⁹ = 2¹⁰ − 1.",
    "Infinite sum when −1 < r < 1: a₁/(1 − r).",
    "a, b, c are geometric exactly when b² = ac."],
 trap:"Using rⁿ instead of rⁿ⁻¹. The first term has r⁰.",
 ex:{q:"Find 1 + 1/3 + 1/9 + 1/27 + …",steps:[
  ["First term 1, each term is the previous one times 1/3.","a₁ = 1, r = 1/3"],
  ["Infinite sum formula.","1/(1 − 1/3)"],
  ["Compute.","3/2"]]},
 ten:"#9 (the sides 27/4, 9, 12, 16 form a geometric sequence).",
 p:[
  {id:"19.1",q:"The 2nd term of a geometric sequence is 6 and the 5th term is 162. Find the 1st term.",a:"2",steps:[
   ["Terms 2 and 5 are 3 steps apart.","r³ = 162/6 = 27 → r = 3",ch(["?","6","18","54","162"],{sub:["a₁","a₂","a₃","a₄","a₅"],c:["b","a","","","a"]})],
   ["Go back one step from the 2nd term.","a₁ = 6/3 = 2"]]},
  {id:"19.2",q:"Find 1 + 2 + 4 + … + 512.",a:"1023",steps:[
   ["512 = 2⁹, so there are 10 terms with r = 2.","a₁ = 1, n = 10"],
   ["Sum formula.","(2¹⁰ − 1)/(2 − 1)"],
   ["Compute.","1023"]]},
  {id:"19.3",isNew:true,q:"Find the sum of the infinite series 6 + 3 + 3/2 + 3/4 + …",a:"12",steps:[
   ["First term 6, ratio 1/2.","a₁ = 6, r = 1/2"],
   ["Infinite sum.","6/(1 − 1/2) = 12"]]},
  {id:"19.4",isNew:true,q:"The numbers 4, x, 25 form a geometric sequence and x > 0. Find x.",a:"10",steps:[
   ["The middle term squared equals the product of its neighbors.","x² = 4 × 25 = 100"],
   ["Take the positive root.","x = 10 (ratio 5/2)"]]}]};

// 22. Systems of equations
UP[22]={
 k:["Before solving, add or subtract the equations. Symmetric systems often collapse.",
    "Cyclic sums: adding a + b, b + c and c + a gives 2(a + b + c). Then subtract each equation to get each variable.",
    "Products: multiplying xy, yz and zx gives (xyz)². Divide by each equation to get each variable.",
    "If the question asks for a combination like x + y or x − y, look for one addition or subtraction that gives it directly."],
 trap:"Solving for every variable one at a time when one line of adding gives the answer.",
 ex:{q:"a + b = 10, b + c = 14 and c + a = 12. Find a, b and c.",steps:[
  ["Add all three equations. Each variable appears twice.","2(a + b + c) = 36 → a + b + c = 18"],
  ["Subtract each original equation from 18.","c = 18 − 10 = 8, a = 18 − 14 = 4, b = 18 − 12 = 6"]]},
 ten:"#7 (subtract the equations).",
 p:[
  {id:"22.1",q:"x, y and z are positive, with xy = 8, yz = 24 and zx = 12. Find x + y + z.",a:"12",steps:[
   ["Multiply all three equations.","(xyz)² = 8 · 24 · 12 = 2304 → xyz = 48"],
   ["Divide by each equation.","z = 48/8 = 6, x = 48/24 = 2, y = 48/12 = 4"],
   ["Add.","2 + 4 + 6 = 12"]]},
  {id:"22.2",q:"3x + 5y = 46 and 5x + 3y = 34. Find x + y.",a:"10",steps:[
   ["Add the equations.","8x + 8y = 80"],
   ["Divide by 8.","x + y = 10"]]},
  {id:"22.3",isNew:true,q:"x + 2y = 7 and 2x + y = 8. Find x − y.",a:"1",steps:[
   ["Subtract the first equation from the second.","(2x + y) − (x + 2y) = 8 − 7"],
   ["Simplify.","x − y = 1"]]},
  {id:"22.4",isNew:true,q:"a + b + c = 12, a − b = 2 and b − c = 2. Find a.",a:"6",steps:[
   ["Write everything in terms of c.","b = c + 2, a = c + 4"],
   ["Substitute into the sum.","3c + 6 = 12 → c = 2"],
   ["Find a.","a = 6"]]}]};

// 25. Divisibility rules and Legendre
UP[25]={
 k:["Divisible by 3 or 9: check the digit sum. By 4: the last two digits. By 8: the last three. By 11: the alternating digit sum (add and subtract digits from the right).",
    "For a number like 36 = 4 × 9 or 72 = 8 × 9, check each coprime part separately.",
    "Legendre: the power of a prime p in n! is ⌊n/p⌋ + ⌊n/p²⌋ + ⌊n/p³⌋ + … Each term catches the extra p in multiples of p², p³, …",
    "Zeros at the end of n! = the power of 5 in n!, since there are always more 2s than 5s."],
 trap:"Stopping at ⌊n/5⌋. Multiples of 25 give an extra 5, and multiples of 125 another.",
 ex:{q:"How many zeros does 100! end in?",steps:[
  ["Each trailing zero needs a 10 = 2 × 5, and 5s are the scarce factor.","count the 5s in 100!"],
  ["Multiples of 5 each give one 5.","⌊100/5⌋ = 20"],
  ["Multiples of 25 give a second 5.","⌊100/25⌋ = 4",ch(["25","50","75","100"],{c:["b","b","b","b"],cap:"Each of these holds 5 × 5"})],
  ["Add.","20 + 4 = 24"]]},
 p:[
  {id:"25.1",q:"How many zeros does 2026! end in?",a:"505",steps:[
   ["Count 5s with Legendre’s formula.","⌊2026/5⌋ + ⌊2026/25⌋ + ⌊2026/125⌋ + ⌊2026/625⌋"],
   ["Compute each.","405 + 81 + 16 + 3"],
   ["Add.","505"]]},
  {id:"25.2",q:"The 4-digit number 3A6B is divisible by 36, where A and B are digits. What is the largest it can be?",a:"3960",steps:[
   ["36 = 4 × 9. Divisible by 4: the last two digits 6B must be divisible by 4.","B = 0, 4 or 8"],
   ["Divisible by 9: 3 + A + 6 + B must be a multiple of 9.","A + B = 0, 9 or 18"],
   ["List the options.","",gr({rows:["B = 0","B = 4","B = 8"],cols:["A","number"],corner:"",cells:[["0 or 9","3060, 3960"],["5","3564"],["1","3168"]],hl:(r,c)=>r===0&&c===1?"a":""})],
   ["Take the largest.","3960"]]},
  {id:"25.3",isNew:true,q:"What is the remainder when 918,082 is divided by 11?",a:"0",steps:[
   ["Alternate signs on the digits, starting from the units digit.","2 − 8 + 0 − 8 + 1 − 9",ch(["9","1","8","0","8","2"],{sub:["−","+","−","+","−","+"]})],
   ["Compute.","= −22, a multiple of 11"],
   ["So 918,082 is divisible by 11.","remainder 0"]]},
  {id:"25.4",isNew:true,q:"What is the largest power of 3 that divides 30!? Give the exponent.",a:"14",steps:[
   ["Legendre with p = 3.","⌊30/3⌋ + ⌊30/9⌋ + ⌊30/27⌋"],
   ["Compute.","10 + 3 + 1 = 14"]]}]};

// 30. Algebraic number theory
UP[30]={
 k:["Rearrange into (something) × (something) = a number, then list factor pairs. The answers can only come from that list.",
    "x² − y² = (x − y)(x + y), and the two factors are both odd or both even (they differ by 2y).",
    "For (polynomial)/(n + a) to be an integer, divide first: n + a must divide the remainder.",
    "Include negative factors when the variable can be any integer."],
 trap:"Forgetting negative divisors when n is allowed to be negative.",
 ex:{q:"For how many positive integers n is (n + 12)/n an integer?",steps:[
  ["Split the fraction.","(n + 12)/n = 1 + 12/n"],
  ["That’s an integer exactly when n divides 12.","n = 1, 2, 3, 4, 6, 12"],
  ["Count.","6"]]},
 ten:"#13 (list the factor pairs of 112).",
 p:[
  {id:"30.1",q:"How many pairs of positive integers (x, y) satisfy x² − y² = 45?",a:"3",steps:[
   ["Factor.","(x − y)(x + y) = 45"],
   ["List pairs with x − y < x + y. Both are odd, so all work.","",gr({rows:["1 · 45","3 · 15","5 · 9"],cols:["x","y"],corner:"(x−y)(x+y)",cells:[["23","22"],["9","6"],["7","2"]],hl:()=>"a"})],
   ["Count.","3 pairs"]]},
  {id:"30.2",q:"For how many integers n is (n² + 5)/(n + 1) an integer?",a:"8",steps:[
   ["Divide: n² + 5 = (n + 1)(n − 1) + 6.","(n² + 5)/(n + 1) = n − 1 + 6/(n + 1)"],
   ["n + 1 must divide 6, including negative divisors.","n + 1 = ±1, ±2, ±3, ±6"],
   ["Count.","8 values of n"]]},
  {id:"30.3",isNew:true,q:"For how many positive integers n is (n + 20)/(n + 2) an integer?",a:"4",steps:[
   ["Split the fraction.","(n + 20)/(n + 2) = 1 + 18/(n + 2)"],
   ["n + 2 must divide 18 and be at least 3.","n + 2 = 3, 6, 9, 18"],
   ["Count.","4 (n = 1, 4, 7, 16)"]]},
  {id:"30.4",isNew:true,q:"How many pairs of positive integers (x, y) satisfy x² − y² = 60?",a:"2",steps:[
   ["Factor. Both factors must have the same parity, so both are even.","(x − y)(x + y) = 60"],
   ["Even pairs with the smaller first.","2 · 30, 6 · 10"],
   ["Solve each.","(16, 14) and (8, 2) → 2 pairs"]]}]};

// 31. Diophantine equations
UP[31]={
 k:["ax + by = c has integer solutions only when gcd(a, b) divides c. 6x + 9y = 20 has none, since 3 doesn’t divide 20.",
    "Find one solution by trying values for the variable with the bigger coefficient.",
    "Then step: if (x, y) works, so does (x + b/g, y − a/g), where g = gcd(a, b). Solutions are evenly spaced.",
    "For positive (or nonnegative) solutions, count how many steps fit before a variable leaves the allowed range.",
    "A remainder narrows things down: in 4a + 7b = 60, look mod 4 to see that b must be a multiple of 4."],
 trap:"Counting solutions with a 0 when the problem says positive integers, or leaving them out when it says nonnegative.",
 ex:{q:"How many positive integer solutions does 3x + 5y = 47 have?",steps:[
  ["47 − 5y must be a positive multiple of 3. Try y = 1, 2, 3, …","y = 1 works: 42 = 3 × 14"],
  ["Step: y goes up by 3 while x goes down by 5.","",gr({rows:["y = 1","y = 4","y = 7","y = 10"],cols:["x","ok?"],corner:"",cells:[["14","✓"],["9","✓"],["4","✓"],["−1","✗"]],hl:(r)=>r<3?"g":"x"})],
  ["Count.","3 solutions"]]},
 p:[
  {id:"31.1",q:"Stamps cost 4 cents and 7 cents. In how many ways can you make exactly 60 cents?",a:"3",steps:[
   ["Write the equation: a stamps of 4 cents and b of 7 cents.","4a + 7b = 60"],
   ["60 and 4a are multiples of 4, so 7b must be too: b is a multiple of 4.","b = 0, 4, 8"],
   ["Find a for each.","a = 15, 8, 1 → 3 ways"]]},
  {id:"31.2",q:"How many ordered pairs of positive integers satisfy 5x + 8y = 200?",a:"4",steps:[
   ["200 and 5x are multiples of 5, so y must be a multiple of 5.","y = 5, 10, 15, 20, …"],
   ["Find x for each and stop when x would hit 0.","x = 32, 24, 16, 8 (y = 25 gives x = 0)"],
   ["Count.","4"]]},
  {id:"31.3",isNew:true,q:"How many pairs of nonnegative integers (x, y) satisfy 6x + 9y = 20?",a:"0",steps:[
   ["The left side is always a multiple of gcd(6, 9) = 3.","6x + 9y = 3(2x + 3y)"],
   ["20 is not a multiple of 3.","no solutions"],
   ["Answer.","0"]]},
  {id:"31.4",isNew:true,q:"Adult tickets cost $7 and child tickets cost $4. A group spent exactly $100 and bought at least one of each. How many different combinations of tickets are possible?",a:"3",steps:[
   ["Equation.","7a + 4c = 100, a ≥ 1, c ≥ 1"],
   ["100 and 4c are multiples of 4, so 7a must be: a is a multiple of 4.","a = 4, 8, 12 (a = 16 is too much)"],
   ["Find c for each.","c = 18, 11, 4 → 3 combinations"]]}]};

// 32. Bases
UP[32]={
 k:["In base b, the digits are worth 1, b, b², b³, … from the right. 213 in base 5 = 2·25 + 1·5 + 3 = 58.",
    "Every digit must be less than the base, so a number containing the digit 7 is in base 8 or higher.",
    "To convert n into base b, divide by b over and over; the remainders, read from last to first, are the digits.",
    "Unknown base: rewrite everything in base 10 and solve for b."],
 trap:"Reading the remainders from first to last. The first remainder is the units digit.",
 ex:{q:"Convert 213 (base 5) to base 10.",steps:[
  ["Write each digit’s place value.","5², 5¹, 5⁰",ch(["2","1","3"],{sub:["× 25","× 5","× 1"],c:["a","a","a"]})],
  ["Multiply and add.","2·25 + 1·5 + 3·1"],
  ["Compute.","58"]]},
 p:[
  {id:"32.1",q:"Write 100 in base 3.",a:"10201",steps:[
   ["Divide by 3 repeatedly and keep the remainders.","",gr({rows:["100 ÷ 3","33 ÷ 3","11 ÷ 3","3 ÷ 3","1 ÷ 3"],cols:["quotient","remainder"],corner:"",cells:[["33","1"],["11","0"],["3","2"],["1","0"],["0","1"]],hl:(r,c)=>c===1?"a":""})],
   ["Read the remainders from bottom to top.","1, 0, 2, 0, 1"],
   ["Check: 81 + 2·9 + 1 = 100.","10201"]]},
  {id:"32.2",q:"In base b, the number 77 is three times the number 25. Find b.",a:"8",steps:[
   ["Rewrite both in base 10.","77 → 7b + 7, 25 → 2b + 5"],
   ["Set up the equation.","7b + 7 = 3(2b + 5) = 6b + 15"],
   ["Solve, and check that every digit is less than b.","b = 8 (digit 7 < 8 ✓)"]]},
  {id:"32.3",isNew:true,q:"Convert 1011011 (base 2) to base 10.",a:"91",steps:[
   ["Place values from the right: 1, 2, 4, 8, 16, 32, 64.","",ch(["1","0","1","1","0","1","1"],{sub:["64","32","16","8","4","2","1"],c:["a","","a","a","","a","a"]})],
   ["Add the place values under the 1s.","64 + 16 + 8 + 2 + 1"],
   ["Compute.","91"]]},
  {id:"32.4",isNew:true,q:"In base b, the number 121 equals 49 in base 10. Find b.",a:"6",steps:[
   ["Rewrite 121 in base b.","b² + 2b + 1 = 49"],
   ["The left side is a perfect square.","(b + 1)² = 49 → b + 1 = 7"],
   ["Solve.","b = 6"]]}]};

// 35. Triangle area six ways
UP[35]={
 k:["½ × base × height. The height must be perpendicular to the base you chose.",
    "Heron: s = (a + b + c)/2 and area = √(s(s − a)(s − b)(s − c)). Best when you know all three sides.",
    "½·a·b·sin C: two sides and the angle between them. sin 30° = 1/2, sin 45° = √2/2, sin 60° = sin 120° = √3/2.",
    "Area = r·s (inradius × half-perimeter), so r = area/s.",
    "Area = abc/(4R), so the circumradius R = abc/(4 · area).",
    "Coordinates: shoelace. With one vertex at (0, 0) and the others at (x₁, y₁) and (x₂, y₂): area = ½|x₁y₂ − x₂y₁|."],
 trap:"Using a slanted side as the height. The height meets the base at a right angle.",
 ex:{q:"Find the area and the inradius of the triangle with sides 13, 14 and 15.",steps:[
  ["Half the perimeter.","s = (13 + 14 + 15)/2 = 21"],
  ["Heron’s formula.","√(21 · 8 · 7 · 6) = √7056 = 84"],
  ["Inradius = area ÷ s.","r = 84/21 = 4"]]},
 p:[
  {id:"35.1",q:"Find the area of a triangle with sides 5, 5 and 6.",a:"12",steps:[
   ["The triangle is isosceles. The height to the base of 6 lands at its midpoint.","halves of 3",fg([-0.6,-0.7,6.6,4.6],[["poly",[[0,0],[6,0],[3,4]],"s"],["seg",[3,4],[3,0],"hl"],["text",[1.2,2.4],"5","m"],["text",[4.8,2.4],"5","m"],["text",[1.5,-0.4],"3","m"],["text",[3.4,2],"h","a"]])],
   ["Pythagoras on half the triangle.","h = √(25 − 9) = 4"],
   ["Area.","½ × 6 × 4 = 12"]]},
  {id:"35.2",q:"Find the area of the triangle with vertices (0, 0), (6, 2) and (2, 5).",a:"13",steps:[
   ["With one vertex at the origin, use area = ½|x₁y₂ − x₂y₁|.","x₁ = 6, y₁ = 2, x₂ = 2, y₂ = 5",fg([-0.8,-0.8,6.8,5.8],[["grid",0,0,6,5],["poly",[[0,0],[6,2],[2,5]],"ff"],["text",[6.2,2.4],"(6, 2)","m"],["text",[2,5.4],"(2, 5)","m"]])],
   ["Compute.","½|6 × 5 − 2 × 2| = ½ × 26"],
   ["Area.","13"]]},
  {id:"35.3",isNew:true,q:"Two sides of a triangle are 8 and 10, and the angle between them is 30°. Find the area.",a:"20",steps:[
   ["Use ½·a·b·sin C.","½ × 8 × 10 × sin 30°"],
   ["sin 30° = 1/2.","½ × 8 × 10 × ½ = 20"]]},
  {id:"35.4",isNew:true,q:"Find the circumradius of the triangle with sides 13, 14 and 15.",a:"65/8",steps:[
   ["The area is 84 (from the example).","area = 84"],
   ["Use R = abc/(4 · area).","R = (13 · 14 · 15)/(4 · 84) = 2730/336"],
   ["Simplify.","65/8"]]}]};

// 38. Angle bisector theorem
const bis=[["poly",[[0,0],[10,0],[2.4,5]],"s"],["seg",[2.4,5],[4,0],"hl"],["text",[2.4,5.4],"A"],["text",[-0.3,-0.35],"B"],["text",[10.3,-0.35],"C"],["text",[4,-0.45],"D"]];
UP[38]={
 k:["The bisector from A splits BC in the same ratio as the two sides next to A: BD/DC = AB/AC.",
    "So BD = BC × AB/(AB + AC) and DC = BC × AC/(AB + AC).",
    "If AB = AC, the bisector from A hits the midpoint of BC and is also the height.",
    "It works backwards too: if BD/DC = AB/AC, then AD bisects angle A."],
 trap:"Pairing the wrong sides. BD goes with AB (both touch B), and DC goes with AC.",
 ex:{q:"Triangle ABC has AB = 6, AC = 9 and BC = 10. The bisector of ∠A meets BC at D. Find BD.",steps:[
  ["BD and DC are in the ratio AB : AC.","BD : DC = 6 : 9 = 2 : 3",fg([-0.6,-0.8,10.6,5.8],bis.concat([["text",[0.9,2.8],"6","m"],["text",[6.6,2.9],"9","m"],["text",[2,-0.45],"BD","a"],["text",[7,-0.45],"DC","a"]]))],
  ["Split 10 in the ratio 2 : 3.","BD = 10 × 2/5"],
  ["Compute.","BD = 4"]]},
 p:[
  {id:"38.1",q:"Triangle ABC has AB = 8, AC = 12 and BC = 15. The bisector of ∠A meets BC at D. Find DC.",a:"9",steps:[
   ["DC goes with AC.","DC = BC × AC/(AB + AC)"],
   ["Substitute.","15 × 12/20 = 9"]]},
  {id:"38.2",q:"Triangle ABC has AB = 5 and AC = 7. The bisector of ∠A meets BC at D with BD = 3. Find BC.",a:"36/5",steps:[
   ["Set up the ratio.","3/DC = 5/7"],
   ["Solve.","DC = 21/5"],
   ["Add the two pieces.","BC = 3 + 21/5 = 36/5"]]},
  {id:"38.3",isNew:true,q:"In triangle ABC, AB = 10, AC = 15 and BC = 20. The bisector of ∠A meets BC at D. Find BD.",a:"8",steps:[
   ["BD goes with AB.","BD = BC × AB/(AB + AC)"],
   ["Substitute.","20 × 10/25 = 8"]]},
  {id:"38.4",isNew:true,q:"In triangle ABC, the bisector of ∠A meets BC at D. BD = 4, DC = 6 and AB = 8. Find AC.",a:"12",steps:[
   ["Set up the ratio.","BD/DC = AB/AC → 4/6 = 8/AC"],
   ["Solve.","AC = 8 × 6/4 = 12"]]}]};

// 39. Quadrilaterals
UP[39]={
 k:["Parallelogram: opposite sides are equal and parallel, and the diagonals cut each other in half. Area = base × perpendicular height.",
    "Trapezoid area = average of the two bases × height. In an isosceles trapezoid, drop two heights: each overhang is (long base − short base)/2.",
    "Rhombus and kite: the diagonals are perpendicular and area = d₁ × d₂/2. In a rhombus, half of each diagonal and a side form a right triangle.",
    "Rectangle: diagonal² = length² + width²."],
 trap:"Using the slanted side of a trapezoid or parallelogram as the height.",
 ex:{q:"A rhombus has diagonals 10 and 24. Find its area and its side length.",steps:[
  ["Area of a rhombus = half the product of the diagonals.","10 × 24/2 = 120",fg([-12.8,-5.8,12.8,5.8],[["poly",[[-12,0],[0,5],[12,0],[0,-5]],"f"],["seg",[-12,0],[12,0],"d"],["seg",[0,5],[0,-5],"d"],["seg",[0,0],[12,0],"hl"],["seg",[0,0],[0,5],"hl"],["seg",[0,5],[12,0],"al"],["text",[6,-0.6],"12","a"],["text",[-0.6,2.5],"5","a"],["text",[6.8,3.1],"side","al"]])],
  ["The diagonals cross at right angles and cut each other in half: 5 and 12.","side² = 5² + 12²"],
  ["A 5-12-13 triangle.","side = 13"]]},
 p:[
  {id:"39.1",q:"An isosceles trapezoid has bases 10 and 22 and legs 10. Find its area.",a:"128",steps:[
   ["Drop heights from the ends of the short base. Each overhang is (22 − 10)/2.","overhang = 6",fg([-0.8,-0.8,22.8,8.8],[["poly",[[0,0],[22,0],[16,8],[6,8]],"f"],["seg",[6,8],[6,0],"hl"],["seg",[16,8],[16,0],"hl"],["text",[3,-0.6],"6","a"],["text",[19,-0.6],"6","a"],["text",[11,8.6],"10","m"],["text",[2.4,4.6],"10","m"]])],
   ["Each leg, overhang and height make a 6-8-10 triangle.","height = 8"],
   ["Area = average base × height.","(10 + 22)/2 × 8 = 128"]]},
  {id:"39.2",q:"A rhombus has side 10 and one diagonal of length 12. Find its area.",a:"96",steps:[
   ["Half of the known diagonal is 6. With side 10, the other half-diagonal is 8.","√(100 − 36) = 8"],
   ["The diagonals are 12 and 16.","d₁ = 12, d₂ = 16"],
   ["Area.","12 × 16/2 = 96"]]},
  {id:"39.3",isNew:true,q:"A rectangle has perimeter 34 and a diagonal of length 13. Find its area.",a:"60",steps:[
   ["Let the sides be l and w.","l + w = 17 and l² + w² = 169"],
   ["Square the sum: (l + w)² = l² + w² + 2lw.","289 = 169 + 2lw"],
   ["Solve for lw.","lw = 60 (a 5 × 12 rectangle)"]]},
  {id:"39.4",isNew:true,q:"A parallelogram has sides 6 and 10 with a 30° angle between them. Find its area.",a:"30",steps:[
   ["Use the side of 10 as the base. The height comes from the side of 6 at 30°.","height = 6 × sin 30° = 3"],
   ["Area = base × height.","10 × 3 = 30"]]}]};

// 41. Circle lengths
UP[41]={
 k:["Circumference = 2πr = πd. An arc with central angle θ has length (θ/360) × 2πr.",
    "A tangent line is perpendicular to the radius at the point where it touches, which makes a right triangle: OP² = r² + (tangent length)².",
    "Two tangent segments from the same outside point have equal lengths.",
    "A wheel rolling without slipping moves forward one circumference per full turn.",
    "Arc length and sector area use the same fraction θ/360."],
 trap:"Mixing up radius and diameter in 2πr versus πd.",
 ex:{q:"Find the length of a 45° arc in a circle of radius 8.",steps:[
  ["45° is 45/360 = 1/8 of the circle.","fraction = 1/8"],
  ["Whole circumference.","2π × 8 = 16π"],
  ["One eighth.","2π"]]},
 p:[
  {id:"41.1",q:"A wheel of radius 10 inches rolls 600π inches. How many full turns does it make?",a:"30",steps:[
   ["One turn covers one circumference.","2π × 10 = 20π inches"],
   ["Divide the distance by one turn.","600π/20π = 30"]]},
  {id:"41.2",q:"From point P, two tangents touch a circle with center O and radius 5 at A and B. PA = 12. Find OP.",a:"13",steps:[
   ["OA is perpendicular to the tangent PA, so OAP is a right triangle.","OP² = OA² + PA²",fg([-5.6,-5.8,13.6,5.8],[["circ",[0,0],5,"s"],["seg",[0,0],[1.923,4.615],"hl"],["seg",[1.923,4.615],[13,0],"al"],["seg",[0,0],[13,0],"d"],["seg",[1.923,-4.615],[13,0],"m"],["pt",[0,0]],["text",[-0.5,-0.5],"O"],["text",[1.9,5.2],"A"],["text",[13.4,0],"P"],["text",[0.5,2.6],"5","a"],["text",[7.9,2.8],"12","al"]])],
   ["Substitute.","25 + 144 = 169"],
   ["Square root.","OP = 13"]]},
  {id:"41.3",isNew:true,q:"A circle has circumference 18π. Find the length of an arc with a central angle of 80°.",a:"4π",steps:[
   ["Use the fraction of the circle.","80/360 = 2/9"],
   ["Take that fraction of the circumference.","2/9 × 18π = 4π"]]},
  {id:"41.4",isNew:true,q:"A tangent segment from point P to a circle has length 8, and P is 10 units from the center. Find the radius.",a:"6",steps:[
   ["Radius, tangent and the segment to the center form a right triangle, with the 10 as the hypotenuse.","r² + 8² = 10²"],
   ["Solve.","r = 6"]]}]};

// 45. Polygons, part 2
const hex=ngon(6,2,[0,0],0);
UP[45]={
 k:["A regular hexagon with side s is 6 equilateral triangles: area 6 × s²√3/4 = (3√3/2)s².",
    "Hexagon diagonals: the long one (through the center) is 2s; the short one (skipping one vertex) is s√3.",
    "A regular octagon is a square with four corner 45-45-90 triangles cut off. The octagon’s side is the hypotenuse of each corner triangle.",
    "For any regular n-gon, join the center to every vertex to get n congruent isosceles triangles with top angle 360°/n."],
 trap:"Treating the octagon’s side as a leg of the corner triangle. It’s the hypotenuse, so each leg is side/√2.",
 ex:{q:"Find the area of a regular hexagon with side 2.",steps:[
  ["Join the center to all 6 vertices: 6 equilateral triangles with side 2.","6 triangles",fg([-2.4,-2.2,2.4,2.2],[["poly",hex,"f"]].concat(hex.map(p=>["seg",[0,0],p,"m"])).concat([["poly",[[0,0],hex[0],hex[1]],"ff"]]))],
  ["Each triangle has area s²√3/4.","4√3/4 = √3"],
  ["Six of them.","6√3"]]},
 ten:"#17 (the small hexagon).",
 p:[
  {id:"45.1",q:"A regular hexagon has side 4. How long is a short diagonal (one that skips a single vertex)?",a:"4√3",steps:[
   ["The short diagonal and two sides make a triangle with a 120° angle. Its height splits it into two 30-60-90 triangles with hypotenuse 4.","each half = 2√3",fg([-2.4,-2.2,2.4,2.2],[["poly",hex,"s"],["seg",hex[0],hex[2],"hl"],["poly",[hex[0],hex[1],hex[2]],"ff"]])],
   ["The diagonal is two halves.","4√3"]]},
  {id:"45.2",q:"A regular octagon has side 2. Find its area.",a:"8 + 8√2",steps:[
   ["Each corner triangle has hypotenuse 2, so its legs are 2/√2 = √2.","legs = √2",fg([-0.3,-0.3,5.13,5.13],[["poly",[[0,0],[4.828,0],[4.828,4.828],[0,4.828]],"d"],["poly",[[1.414,0],[3.414,0],[4.828,1.414],[4.828,3.414],[3.414,4.828],[1.414,4.828],[0,3.414],[0,1.414]],"f"],["poly",[[0,0],[1.414,0],[0,1.414]],"fx"],["text",[2.414,-0.3],"2","m"],["text",[0.5,-0.3],"√2","al"]],"Cut the corners off a square")],
   ["The square’s side is √2 + 2 + √2.","2 + 2√2"],
   ["Square minus 4 corners of area ½ · √2 · √2 = 1.","(2 + 2√2)² − 4 = 12 + 8√2 − 4"],
   ["Simplify.","8 + 8√2"]]},
  {id:"45.3",isNew:true,q:"A regular hexagon has area 54√3. Find its side length.",a:"6",steps:[
   ["Set the hexagon area formula equal to 54√3.","(3√3/2)s² = 54√3"],
   ["Solve.","s² = 36 → s = 6"]]},
  {id:"45.4",isNew:true,q:"A regular hexagon has side 5. How long is its longest diagonal?",a:"10",steps:[
   ["The longest diagonal passes through the center and is made of two radii.","each radius = side = 5"],
   ["Add.","10"]]}]};

// 46. 3D geometry, part 1
UP[46]={
 k:["Box diagonal: √(a² + b² + c²). Cube with side s: s√3.",
    "Volumes: box abc, cylinder πr²h, cone ⅓πr²h, sphere (4/3)πr³, pyramid ⅓ × base area × height.",
    "Surface areas: cube 6s², box 2(ab + bc + ca), sphere 4πr², cylinder 2πr² + 2πrh.",
    "Cone: slant height² = radius² + height².",
    "Scale every length by k: areas scale by k², volumes by k³. Doubling a cube’s side gives 8 times the volume."],
 trap:"Forgetting the ⅓ in cone and pyramid volumes.",
 ex:{q:"Find the length of the diagonal of a 3 × 4 × 12 box.",steps:[
  ["Use the 3D Pythagorean theorem.","√(3² + 4² + 12²)"],
  ["Compute.","√(9 + 16 + 144) = √169 = 13"]]},
 ten:"#19 (the cubes under the hemisphere).",
 p:[
  {id:"46.1",q:"A cube has surface area 150. Find its volume.",a:"125",steps:[
   ["Six square faces.","6s² = 150 → s² = 25 → s = 5"],
   ["Volume.","5³ = 125"]]},
  {id:"46.2",q:"A cone has base radius 3 and slant height 5. Find its volume.",a:"12π",steps:[
   ["Radius, height and slant height form a right triangle: 3-4-5.","height = 4",fg([-3.6,-0.8,3.6,4.6],[["poly",[[-3,0],[3,0],[0,4]],"f"],["seg",[0,0],[0,4],"hl"],["seg",[0,0],[3,0],"al"],["text",[1.5,-0.45],"3","al"],["text",[-0.4,2],"4","a"],["text",[2,2.4],"5","m"]])],
   ["Volume.","⅓π × 3² × 4 = 12π"]]},
  {id:"46.3",isNew:true,q:"A sphere has volume 36π. Find its surface area.",a:"36π",steps:[
   ["Volume formula.","(4/3)πr³ = 36π → r³ = 27 → r = 3"],
   ["Surface area.","4π × 9 = 36π"]]},
  {id:"46.4",isNew:true,q:"Every edge of a cube is tripled. By what factor does its volume increase?",a:"27",steps:[
   ["Volume depends on length cubed.","factor = 3³"],
   ["Compute.","27"]]}]};

// 48. Area of complex shapes
UP[48]={
 k:["Take the big shape and subtract the pieces you don’t want. That’s often easier than finding the region directly.",
    "Coordinates + shoelace work for any polygon. List the vertices in order around the shape.",
    "Same base and same height means same area: a triangle with its base on one side of a rectangle and its tip on the opposite side has half the rectangle’s area.",
    "Pick’s theorem for polygons on dot paper: area = I + B/2 − 1, where I counts dots inside and B counts dots on the boundary."],
 trap:"Listing shoelace vertices out of order, which makes the outline cross itself.",
 ex:{q:"Square ABCD has side 6, and E is the midpoint of CD. Find the area of triangle ABE.",steps:[
  ["Base AB = 6. E lies on the opposite side, so the height is the full side, 6.","height = 6",fg([-0.6,-0.6,6.6,6.6],[["poly",[[0,0],[6,0],[6,6],[0,6]],"s"],["poly",[[0,0],[6,0],[3,6]],"ff"],["text",[-0.3,-0.3],"A"],["text",[6.3,-0.3],"B"],["text",[6.3,6.3],"C"],["text",[-0.3,6.3],"D"],["text",[3,6.35],"E"]])],
  ["Area.","½ × 6 × 6 = 18 (half the square)"]]},
 p:[
  {id:"48.1",q:"Find the area of the quadrilateral with vertices (0, 0), (5, 0), (6, 4) and (1, 3).",a:"17",steps:[
   ["List the vertices in order and repeat the first at the end.","(0,0), (5,0), (6,4), (1,3), (0,0)",fg([-0.8,-0.8,6.8,4.8],[["grid",0,0,6,4],["poly",[[0,0],[5,0],[6,4],[1,3]],"ff"]])],
   ["Shoelace: add x₁y₂ − x₂y₁ for each consecutive pair.","0 + (20 − 0) + (18 − 4) + 0 = 34"],
   ["Half of that.","17"]]},
  {id:"48.2",q:"Square ABCD has side 12. E is on BC with BE = 4, and F is on CD with CF = 6. Find the area of triangle AEF.",a:"60",steps:[
   ["Square minus the three corner right triangles.","144 − ABE − ECF − FDA",fg([-0.8,-0.8,12.8,12.8],[["poly",[[0,0],[12,0],[12,12],[0,12]],"s"],["poly",[[0,0],[12,4],[6,12]],"ff"],["poly",[[0,0],[12,0],[12,4]],"fx"],["poly",[[12,4],[12,12],[6,12]],"fx"],["poly",[[6,12],[0,12],[0,0]],"fx"],["text",[-0.4,-0.4],"A"],["text",[12.4,-0.4],"B"],["text",[12.4,12.4],"C"],["text",[-0.4,12.4],"D"],["text",[12.5,4],"E"],["text",[6,12.5],"F"]])],
   ["Corner triangles.","½·12·4 = 24, ½·8·6 = 24, ½·6·12 = 36"],
   ["Subtract.","144 − 84 = 60"]]},
  {id:"48.3",isNew:true,q:"A polygon drawn on dot paper has 10 dots on its boundary and 6 dots inside. Find its area.",a:"10",steps:[
   ["Pick’s theorem.","area = I + B/2 − 1"],
   ["Substitute.","6 + 5 − 1 = 10"]]},
  {id:"48.4",isNew:true,q:"Rectangle ABCD has AB = 10 and BC = 6. P is any point on side CD. Find the area of triangle ABP.",a:"30",steps:[
   ["Wherever P is on CD, the height from P to AB is 6.","base 10, height 6"],
   ["Area.","½ × 10 × 6 = 30"]]}]};
})(window.UP);
