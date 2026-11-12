// Question generators: each makes a fresh version of one problem type, with its answer and walkthrough computed.
// GEN["1.1"]() → {q, a, v?, steps}
window.GEN = window.GEN || {};
(function(G){
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t}return a};
const lcm=(a,b)=>a/gcd(a,b)*b;
const fact=n=>n<=1?1:n*fact(n-1);
const C=(n,k)=>{if(k<0||k>n)return 0;let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)};
const M=s=>String(s).replace(/-/g,"−");
const fr=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;n/=g;d/=g;return M(d===1?String(n):n+"/"+d)};
const fmt=n=>M(Number(n).toLocaleString("en-US"));
const SUP="⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup=n=>String(n).split("").map(c=>c==="-"?"⁻":SUP[+c]).join("");
const factorize=n=>{const f=[];let m=n;for(let p=2;p*p<=m;p++){let e=0;while(m%p===0){m/=p;e++}if(e)f.push([p,e])}if(m>1)f.push([m,1]);return f};
const fstr=f=>f.map(([p,e])=>p+(e>1?sup(e):"")).join(" · ");
const ndiv=n=>factorize(n).reduce((s,[,e])=>s*(e+1),1);
const ch=(items,o)=>Object.assign({t:"chips",items},o||{});
const gr=o=>Object.assign({t:"grid"},o);
const NAMES=["Ann","Ben","Cara","Dev","Eli","Fay","Gus","Hana","Ivan","Jo","Kai","Lia","Max","Nia","Omar","Pia"];
const two=()=>{const a=pick(NAMES);let b=pick(NAMES);while(b===a)b=pick(NAMES);return [a,b]};
const dec=(n,d)=>{const v=n/d;return Number.isInteger(v)?String(v):(Math.abs(v*1e4-Math.round(v*1e4))<1e-9?String(+v.toFixed(4)):fr(n,d))};
const ord=n=>n+(n%100>=11&&n%100<=13?"th":({1:"st",2:"nd",3:"rd"}[n%10]||"th"));
const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];

// ---------- Counting ----------
G["1.1"]=()=>{const n=ri(4,7),[a,b]=two(),ans=fact(n-1)*2;return{q:`${n} people sit in a row. In how many ways can they sit if ${a} and ${b} must sit next to each other?`,a:String(ans),steps:[
 [`Glue ${a} and ${b} into one block. Now there are ${n-1} things to arrange.`,`${n} people → ${n-1} blocks`],
 [`Arrange the ${n-1} blocks.`,`${n-1}! = ${fmt(fact(n-1))}`],
 [`Inside the block they can sit in 2 orders.`,`${fmt(fact(n-1))} × 2 = ${fmt(ans)}`]]}};
G["1.2"]=()=>{const w=pick(["BANANA","LETTER","BALLOON","COFFEE","PEPPER","ASSESS","CANADA","SEESAW","TOOTH","APPLE","LEVEL","ROTOR","DIVIDED","REFERRED","GOOGLE","PUZZLE","STATS"]);
 const cnt={};for(const c of w)cnt[c]=(cnt[c]||0)+1;const reps=Object.entries(cnt).filter(([,k])=>k>1);
 const den=reps.reduce((s,[,k])=>s*fact(k),1),ans=fact(w.length)/den;
 const cls=w.split("").map(c=>{const i=reps.findIndex(r=>r[0]===c);return i<0?"":(i%2?"b":"a")});
 return{q:`How many different arrangements of the letters in ${w} are there?`,a:String(ans),steps:[
 [`Count the letters and the repeats.`,`${w.length} letters; `+reps.map(([c,k])=>`${c} ×${k}`).join(", "),ch(w.split(""),{c:cls})],
 [`If every letter were different there would be ${w.length}! orders. Divide by the orders of each repeated letter.`,`${w.length}! ÷ (`+reps.map(([,k])=>k+"!").join(" · ")+`) = ${fmt(fact(w.length))} ÷ ${den}`],
 [`Compute.`,`= ${fmt(ans)}`]]}};
G["1.3"]=()=>{const n=ri(6,15),k=pick([2,3,4]),roles=["president","vice president","treasurer","secretary"].slice(0,k);let ans=1;const f=[];for(let i=0;i<k;i++){ans*=n-i;f.push(n-i)}
 return{q:`A club of ${n} people chooses a ${roles.slice(0,-1).join(", a ")}${k>2?",":""} and a ${roles[k-1]} (all different people). In how many ways can this be done?`,a:String(ans),steps:[
 [`The jobs are different, so order matters: one slot per job.`,roles.join(", "),ch(f.map(String),{sub:roles.map(r=>r.split(" ").map(x=>x[0].toUpperCase()).join("")),c:f.map(()=>"a")})],
 [`Multiply the choices left at each slot.`,`${f.join(" × ")} = ${fmt(ans)}`]]}};
G["1.4"]=()=>{const n=ri(4,7),[a,b]=two(),tot=fact(n),tog=2*fact(n-1),ans=tot-tog;return{q:`${n} people sit in a row. In how many ways can they sit if ${a} and ${b} must not sit next to each other?`,a:String(ans),steps:[
 [`Total minus “next to each other”.`,`answer = all − together`],
 [`All orders.`,`${n}! = ${fmt(tot)}`],
 [`Together: glue them (${n-1} blocks), times 2 orders inside.`,`${n-1}! × 2 = ${fmt(tog)}`],
 [`Subtract.`,`${fmt(tot)} − ${fmt(tog)} = ${fmt(ans)}`]]}};
G["2.1"]=()=>{let g,b,k,j;do{g=ri(3,7);b=ri(3,7);k=ri(3,4);j=ri(1,k-1)}while(j>g||k-j>b);const x=C(g,j),y=C(b,k-j);
 return{q:`A ${k}-person committee is chosen from ${b} boys and ${g} girls. How many committees have exactly ${j} girl${j>1?"s":""}?`,a:String(x*y),steps:[
 [`Pick the girls and the boys separately, then multiply.`,`${j} of ${g} girls, ${k-j} of ${b} boys`],
 [`Girls.`,`C(${g}, ${j}) = ${x}`],[`Boys.`,`C(${b}, ${k-j}) = ${y}`],[`Multiply.`,`${x} × ${y} = ${x*y}`]]}};
G["2.2"]=()=>{const s=pick([3,4,5,6,7,8,9,10,11]),c=6-Math.abs(s-7),pairs=[];for(let i=1;i<=6;i++){const j=s-i;if(j>=1&&j<=6)pairs.push(`(${i},${j})`)}
 return{q:`Two fair dice are rolled. What is the probability that the sum is ${s}?`,a:fr(c,36),steps:[
 [`There are 36 equally likely ordered pairs. Mark the ones that add to ${s}.`,pairs.join(", ")+` → ${c}`,gr({rows:[1,2,3,4,5,6],cols:[1,2,3,4,5,6],corner:"+",cell:(r,cc)=>r+cc+2,hl:(r,cc)=>r+cc+2===s?"a":""})],
 [`Probability = good ÷ total.`,`${c}/36 = ${fr(c,36)}`]]}};
G["2.3"]=()=>{const [name,m]=pick([["hearts",13],["aces",4],["face cards (jacks, queens or kings)",12],["red cards",26],["kings",4],["spades",13]]);const g=C(m,2),t=C(52,2);
 return{q:`Two cards are drawn without replacement from a standard 52-card deck. What is the probability that both are ${name}?`,a:fr(g,t),steps:[
 [`All outcomes: any 2 of 52 cards.`,`C(52, 2) = ${t}`],[`Good outcomes: 2 of the ${m}.`,`C(${m}, 2) = ${g}`],[`Divide and simplify.`,`${g}/${t} = ${fr(g,t)}`]]}};
G["2.4"]=()=>{const n=ri(6,25),h=C(n,2);return{q:`Every pair of guests at a party shook hands exactly once, for ${h} handshakes in total. How many guests were there?`,a:String(n),steps:[
 [`n guests make C(n, 2) = n(n − 1)/2 handshakes.`,`n(n − 1)/2 = ${h}`],[`Multiply by 2.`,`n(n − 1) = ${2*h}`],[`Find two consecutive numbers with that product.`,`${n} × ${n-1} = ${2*h} → n = ${n}`]]}};
G["3.1"]=()=>{const s=ri(3,9);const rows=[];let tot=0;for(let h=1;h<=Math.min(9,s);h++){const r=s-h,w=r<=9?r+1:19-r;rows.push([h,r,w]);tot+=w}
 return{q:`How many 3-digit numbers have digits that add to ${s}?`,a:String(tot),steps:[
 [`Split on the hundreds digit h (1 to ${Math.min(9,s)}). The other two digits must add to ${s} − h.`,`two digits add to r in r + 1 ways (r ≤ 9)`,gr({rows:rows.map(r=>"h = "+r[0]),cols:["t + u =","ways"],corner:"case",cells:rows.map(r=>[r[1],r[2]]),hl:(r,c)=>c===1?"a":""})],
 [`Add the cases.`,rows.map(r=>r[2]).join(" + ")+` = ${tot}`]]}};
G["3.2"]=()=>{const N=ri(6,16);const rows=[];let tot=0;for(let a=1;a<=N;a++){const m=Math.floor(N/a);rows.push(m);tot+=m}
 return{q:`How many ordered pairs of positive integers (a, b) satisfy a·b ≤ ${N}?`,a:String(tot),steps:[
 [`Split on a. For each a, b can be 1 up to ⌊${N}/a⌋.`,`b ≤ ⌊${N}/a⌋`,gr({rows:rows.map((_,i)=>"a = "+(i+1)),cols:["count"],corner:"case",cells:rows.map(m=>[m]),hl:()=>"a"})],
 [`Add.`,rows.join(" + ")+` = ${tot}`]]}};
G["3.4"]=()=>{const A=pick([15,20,30,35,40,45]);const rows=[];let tot=0;for(let d=0;10*d<=A;d++){const left=A-10*d,w=Math.floor(left/5)+1;rows.push([d,left,w]);tot+=w}
 return{q:`In how many ways can you make ${A} cents using pennies, nickels and dimes?`,a:String(tot),steps:[
 [`Split on the number of dimes. In each case count the nickels that fit; pennies fill the rest.`,`dimes = 0 to ${rows.length-1}`,gr({rows:rows.map(r=>r[0]+" dime"+(r[0]===1?"":"s")),cols:["cents left","ways"],corner:"case",cells:rows.map(r=>[r[1],r[2]]),hl:(r,c)=>c===1?"a":""})],
 [`Add the cases.`,rows.map(r=>r[2]).join(" + ")+` = ${tot}`]]}};
G["4.1"]=()=>{const n=ri(3,8),t=2**n;return{q:`A fair coin is flipped ${n} times. What is the probability of getting at least one head?`,a:fr(t-1,t),steps:[
 [`Opposite: all tails, which is 1 outcome out of 2${sup(n)}.`,`P(all tails) = 1/${t}`],[`Subtract from 1.`,`1 − 1/${t} = ${fr(t-1,t)}`]]}};
G["4.2"]=()=>{let g,b,k;do{g=ri(2,6);b=ri(3,7);k=ri(2,4)}while(k>b);const all=C(g+b,k),none=C(b,k);
 return{q:`A ${k}-person committee is chosen from ${b} boys and ${g} girls. How many committees include at least one girl?`,a:String(all-none),steps:[
 [`Opposite: all boys.`,`answer = all − all-boy`],[`All committees.`,`C(${g+b}, ${k}) = ${all}`],[`All-boy committees.`,`C(${b}, ${k}) = ${none}`],[`Subtract.`,`${all} − ${none} = ${all-none}`]]}};
G["4.3"]=()=>{const n=pick([2,3]),t=6**n,no=5**n;return{q:`${n===2?"Two":"Three"} fair dice are rolled. What is the probability that at least one shows a 6?`,a:fr(t-no,t),steps:[
 [`Opposite: no die shows a 6. Each die has 5 other faces.`,`5${sup(n)} = ${no} of ${t} outcomes`],[`Subtract from 1.`,`1 − ${no}/${t} = ${fr(t-no,t)}`]]}};
G["4.4"]=()=>{const [name,A]=pick([["the digits 0–9",10],["the letters A–F",6],["the 26 letters A–Z",26],["the vowels A, E, I, O, U",5]]);const L=ri(2,4);const all=A**L;let p=1;const f=[];for(let i=0;i<L;i++){p*=A-i;f.push(A-i)}
 return{q:`How many ${L}-character strings made from ${name} have at least two characters the same? (Characters may repeat.)`,a:String(all-p),steps:[
 [`Opposite: all characters different.`,`answer = all − all different`],[`All strings.`,`${A}${sup(L)} = ${fmt(all)}`],[`All different.`,`${f.join(" × ")} = ${fmt(p)}`],[`Subtract.`,`${fmt(all)} − ${fmt(p)} = ${fmt(all-p)}`]]}};

// ---------- Algebra ----------
G["13.1"]=()=>{const a=ri(25,3000),k=ri(1,6),b=a-k,ans=a*a-b*b;return{q:`Compute ${a}² − ${b}².`,a:String(ans),steps:[
 [`Difference of squares.`,`(${a} − ${b})(${a} + ${b})`],[`Compute each factor.`,`${k} × ${a+b}`],[`Multiply.`,`${fmt(ans)}`]]}};
G["13.3"]=()=>{const m=pick([50,100,200,1000,40,30]),k=ri(1,9),ans=m*m-k*k;return{q:`Compute ${m+k} × ${m-k} without a calculator.`,a:String(ans),steps:[
 [`Both are ${k} away from ${m}.`,`(${m} + ${k})(${m} − ${k})`],[`Difference of squares.`,`${m}² − ${k}² = ${fmt(m*m)} − ${k*k}`],[`Compute.`,fmt(ans)]]}};
G["13.2"]=()=>{const p=ri(2,12),N=p*p,cnt=ndiv(N);return{q:`How many ordered pairs of positive integers (x, y) satisfy xy − ${p}x − ${p}y = 0?`,a:String(cnt),steps:[
 [`Add ${N} to both sides so the left side factors.`,`(x − ${p})(y − ${p}) = ${N}`],
 [`Negative factor pairs make x or y ≤ 0, so only positive pairs count: one per divisor of ${N}.`,`${N} = ${fstr(factorize(N))}`],
 [`Number of divisors.`,`${cnt}`]]}};
G["13.4"]=()=>{let p,q,N,c,pairs;do{p=ri(1,4);q=ri(1,4);N=pick([24,30,36,40,48,60,72]);c=N-p*q;pairs=[];for(let u=1;u<=N;u++)if(N%u===0){const v=N/u;if(u>=q+1&&v>=p+1)pairs.push([u,v])}}while(c<=0||!pairs.length);
 const t=(k,s)=>k===1?s:k+s;return{q:`How many ordered pairs of positive integers (x, y) satisfy xy + ${t(p,"x")} + ${t(q,"y")} = ${c}?`,a:String(pairs.length),steps:[
 [`SFFT: (x + ${q})(y + ${p}) expands to xy + ${t(p,"x")} + ${t(q,"y")} + ${p*q}. Add ${p*q} to both sides.`,`(x + ${q})(y + ${p}) = ${N}`],
 [`x + ${q} ≥ ${q+1} and y + ${p} ≥ ${p+1}. Keep the factor pairs that fit.`,pairs.map(([u,v])=>`${u}·${v}`).join(", "),gr({rows:pairs.map(([u,v])=>u+" · "+v),cols:["(x, y)"],corner:`(x+${q})(y+${p})`,cells:pairs.map(([u,v])=>[`(${u-q}, ${v-p})`]),hl:()=>"g"})],
 [`Count.`,`${pairs.length}`]]}};
G["18.1"]=()=>{const a1=ri(-5,20),d=ri(2,9),i=ri(2,6),j=i+ri(3,8),k=j+ri(3,10),ai=a1+(i-1)*d,aj=a1+(j-1)*d,ak=a1+(k-1)*d;
 return{q:`The ${ord(i)} term of an arithmetic sequence is ${M(ai)} and the ${ord(j)} term is ${M(aj)}. Find the ${ord(k)} term.`,a:M(ak),v:String(ak),steps:[
 [`From term ${i} to term ${j} is ${j-i} steps.`,`${j-i}d = ${M(aj)} − ${M(ai)} = ${M(aj-ai)} → d = ${d}`],[`From term ${j} to term ${k} is ${k-j} more steps.`,`${M(aj)} + ${k-j} × ${d} = ${M(ak)}`]]}};
G["18.2"]=()=>{const k=ri(3,13),A=ri(10,200),B=A+ri(100,800);const first=Math.ceil(A/k)*k,last=Math.floor(B/k)*k,n=(last-first)/k+1;
 return{q:`How many multiples of ${k} are there from ${A} to ${B}?`,a:String(n),steps:[
 [`First and last multiples of ${k} in range.`,`${first} = ${k} × ${first/k}, ${last} = ${k} × ${last/k}`],[`Count the multipliers ${first/k} through ${last/k}.`,`${last/k} − ${first/k} + 1 = ${n}`]]}};
G["18.3"]=()=>{const a=ri(1,9),d=ri(2,6),n=ri(10,40),l=a+(n-1)*d,s=n*(a+l)/2;return{q:`Find ${a} + ${a+d} + ${a+2*d} + … + ${l}.`,a:String(s),steps:[
 [`d = ${d}. Count the terms.`,`(${l} − ${a})/${d} + 1 = ${n}`],[`Sum = terms × (first + last)/2.`,`${n} × ${a+l}/2 = ${fmt(s)}`]]}};
G["21.1"]=()=>{let n,m,t,need;do{n=ri(3,6);m=ri(70,90);t=m+ri(1,3);need=(n+1)*t-n*m}while(need>100);
 return{q:`Your first ${n} test scores average ${m}. What do you need on the next test to bring your average to ${t}?`,a:String(need),steps:[
 [`Total needed for an average of ${t} over ${n+1} tests.`,`${n+1} × ${t} = ${(n+1)*t}`],[`Total so far.`,`${n} × ${m} = ${n*m}`],[`Difference.`,`${(n+1)*t} − ${n*m} = ${need}`]]}};
G["21.3"]=()=>{let n,m,m2,x;do{n=ri(5,10);m=ri(10,40);m2=m+pick([-3,-2,-1,1,2,3]);x=n*m-(n-1)*m2}while(x<=0);
 return{q:`The mean of ${n} numbers is ${m}. One number is removed, and the mean of the remaining ${n-1} is ${m2}. What number was removed?`,a:String(x),steps:[
 [`Old total.`,`${n} × ${m} = ${n*m}`],[`New total.`,`${n-1} × ${m2} = ${(n-1)*m2}`],[`Difference.`,`${n*m} − ${(n-1)*m2} = ${x}`]]}};
G["21.4"]=()=>{const L=pick([5,6,7,8]),xs=Array.from({length:L},()=>ri(1,25)),s=[...xs].sort((a,b)=>a-b);const med=L%2?s[(L-1)/2]:(s[L/2-1]+s[L/2])/2;
 const hl=s.map((_,i)=>L%2?(i===(L-1)/2?"a":""):(i===L/2-1||i===L/2?"a":""));
 return{q:`Find the median of the list ${xs.join(", ")}.`,a:String(med),steps:[
 [`Sort first.`,s.join(", "),ch(s.map(String),{c:hl})],[L%2?`${L} numbers: the middle one is #${(L+1)/2}.`:`${L} numbers: average the #${L/2} and #${L/2+1}.`,L%2?String(med):`(${s[L/2-1]} + ${s[L/2]})/2 = ${med}`]]}};
G["23.1"]=()=>{const v1=ri(30,80),v2=ri(30,80),t=pick([1,1.5,2,2.5,3]),d=(v1+v2)*t;return{q:`Two trains ${d} miles apart travel toward each other at ${v1} mph and ${v2} mph. How many minutes until they meet?`,a:String(60*t),steps:[
 [`Toward each other, the gap closes at the sum of the speeds.`,`${v1} + ${v2} = ${v1+v2} mph`],[`Time.`,`${d}/${v1+v2} = ${t} hours`],[`Minutes.`,`${t} × 60 = ${60*t}`]]}};
G["23.3"]=()=>{const [v1,v2]=pick([[30,60],[20,30],[40,60],[10,15],[12,6],[45,90],[8,12],[60,40],[30,70],[50,75]]),d=pick([12,24,60,120]),T=d/v1+d/v2;
 return{q:`A driver goes ${d} miles at ${v1} mph and then ${d} more miles at ${v2} mph. What is the average speed for the whole trip, in mph?`,a:dec(2*v1*v2,v1+v2),steps:[
 [`Time for each part.`,`${d}/${v1} + ${d}/${v2} = ${+T.toFixed(4)} hours`],[`Average speed = total distance ÷ total time.`,`${2*d}/${+T.toFixed(4)} = ${dec(2*v1*v2,v1+v2)}`]]}};
G["23.4"]=()=>{let v1,v2,h,gap,t;do{v1=ri(20,50);v2=v1+ri(10,30);h=ri(1,3);gap=v1*h;t=gap/(v2-v1)}while(!Number.isInteger(t)||t>8);
 return{q:`Car A leaves a town at noon driving ${v1} mph. Car B leaves the same town ${h} hour${h>1?"s":""} later on the same road, driving ${v2} mph. How many hours after noon does B catch A?`,a:String(h+t),steps:[
 [`A’s head start when B leaves.`,`${v1} × ${h} = ${gap} miles`],[`B gains at the difference of speeds.`,`${v2} − ${v1} = ${v2-v1} mph`],[`Catch-up time, then count from noon.`,`${gap}/${v2-v1} = ${t} → ${h} + ${t} = ${h+t} hours`]]}};

// ---------- Number theory ----------
const mkN=()=>{let N;do{N=2**ri(0,4)*3**ri(0,3)*5**ri(0,2)*7**ri(0,1)}while(N<20||N>5000);return N};
G["24.1"]=()=>{const N=mkN(),f=factorize(N),d=ndiv(N);return{q:`How many positive divisors does ${fmt(N)} have?`,a:String(d),steps:[
 [`Prime factorize.`,`${fmt(N)} = ${fstr(f)}`],[`Add 1 to each exponent and multiply.`,f.map(([,e])=>e+1).join(" × ")+` = ${d}`]]}};
G["24.3"]=()=>{let N;do{N=mkN()}while(N%2);const f=factorize(N).filter(([p])=>p!==2),d=f.reduce((s,[,e])=>s*(e+1),1);
 return{q:`How many odd positive divisors does ${fmt(N)} have?`,a:String(d),steps:[
 [`Factor and drop the 2s: an odd divisor uses none.`,`${fmt(N)} = ${fstr(factorize(N))} → use ${fstr(f)||"1"}`],[`Count divisors of what’s left.`,(f.map(([,e])=>e+1).join(" × ")||"1")+` = ${d}`]]}};
G["24.2"]=()=>{let n0=mkN();while(n0*n0>40000)n0=mkN();const N=n0*n0,f=factorize(N),d=f.reduce((s,[,e])=>s*(Math.floor(e/2)+1),1);
 return{q:`How many positive divisors of ${fmt(N)} are perfect squares?`,a:String(d),steps:[
 [`Factor.`,`${fmt(N)} = ${fstr(f)}`],[`A square divisor needs even exponents: count the even choices for each prime.`,f.map(([p,e])=>`${p}: ${Math.floor(e/2)+1}`).join(", ")],[`Multiply.`,f.map(([,e])=>Math.floor(e/2)+1).join(" × ")+` = ${d}`]]}};
const cop=()=>{let m,n;do{m=ri(2,12);n=ri(2,12)}while(m===n||gcd(m,n)!==1);return [m,n]};
G["26.1"]=()=>{const g=ri(2,12),[m,n]=cop(),a=g*m,b=g*n,l=g*m*n;return{q:`Two numbers have gcd ${g} and lcm ${l}. One of them is ${a}. What is the other?`,a:String(b),steps:[
 [`For two numbers, gcd × lcm = product.`,`${g} × ${l} = ${a} × n`],[`Solve.`,`n = ${g*l}/${a} = ${b}`]]}};
G["26.2"]=()=>{let a,b,c,L;do{const pool=[4,6,8,9,10,12,14,15,16,18,20,24,30];a=pick(pool);b=pick(pool);c=pick(pool);L=lcm(lcm(a,b),c)}while(a===b||b===c||a===c||L>720);
 return{q:`Three lights blink every ${a}, ${b} and ${c} seconds. They blink together now. How many seconds until they next blink together?`,a:String(L),steps:[
 [`They line up at the least common multiple.`,`lcm(${a}, ${b}, ${c})`],[`Factor each and take the largest power of each prime.`,`${a} = ${fstr(factorize(a))}, ${b} = ${fstr(factorize(b))}, ${c} = ${fstr(factorize(c))}`],[`Multiply.`,`${fstr(factorize(L))} = ${L}`]]}};
G["26.3"]=()=>{let g,m,n;do{g=ri(7,30);m=ri(5,30);n=ri(5,30)}while(m<=n||gcd(m,n)!==1);let A=g*m,B=g*n;const lines=[];while(B){const q=Math.floor(A/B),r=A%B;lines.push(`${A} = ${q} × ${B} + ${r}`);A=B;B=r}
 return{q:`Use the Euclidean algorithm to find gcd(${g*m}, ${g*n}).`,a:String(g),steps:lines.map((l,i)=>[i===0?`Divide and keep the remainder.`:`Repeat with the last divisor and remainder.`,l]).concat([[`The last nonzero remainder is the gcd.`,`${g}`]])}};
G["27.1"]=()=>{let b,m;do{b=pick([2,3,5,6]);m=pick([5,7,11,13])}while(gcd(b,m)!==1);const cyc=[];let x=1;do{x=x*b%m;cyc.push(x)}while(x!==1);const L=cyc.length,e=ri(20,200),r=e%L,ans=r===0?1:cyc[r-1];
 return{q:`What is the remainder when ${b}${sup(e)} is divided by ${m}?`,a:String(ans),steps:[
 [`List powers of ${b} mod ${m} until you hit 1.`,cyc.join(", ")+` (cycle length ${L})`,ch(cyc.map(String),{sub:cyc.map((_,i)=>b+sup(i+1)),c:cyc.map((_,i)=>(i+1)%L===r%L?"a":"")})],
 [`Divide the exponent by ${L}.`,`${e} = ${L} × ${Math.floor(e/L)} + ${r}`],[r===0?`Remainder 0 means the last term of the cycle.`:`Take term #${r} of the cycle.`,`${ans}`]]}};
G["27.3"]=()=>{const b=ri(2,9),e=ri(10,999);const cyc=[];let x=b%10;do{cyc.push(x);x=x*b%10}while(x!==cyc[0]);const L=cyc.length,r=e%L,ans=cyc[(r+L-1)%L];
 return{q:`What is the units digit of ${b}${sup(e)}?`,a:String(ans),steps:[
 [`Units digits of powers of ${b} repeat.`,cyc.join(", ")+` (cycle length ${L})`,ch(cyc.map(String),{sub:cyc.map((_,i)=>b+sup(i+1)),c:cyc.map((_,i)=>i===(r+L-1)%L?"a":"")})],
 [`Divide the exponent by ${L}.`,`${e} leaves remainder ${r}`],[r===0?`Remainder 0 → the last term of the cycle.`:`Term #${r} of the cycle.`,`${ans}`]]}};
G["27.4"]=()=>{const xs=[ri(11,99),ri(11,99),ri(11,99)],m=pick([9,5,10,7]),rs=xs.map(x=>x%m),p=rs.reduce((a,b)=>a*b,1),ans=p%m;
 return{q:`What is the remainder when ${xs.join(" × ")} is divided by ${m}?`,a:String(ans),steps:[
 [`Replace each number by its remainder mod ${m}.`,xs.map((x,i)=>`${x} → ${rs[i]}`).join(", ")],[`Multiply the remainders and reduce.`,`${rs.join(" × ")} = ${p} → ${ans}`]]}};

// ---------- Geometry ----------
G["34.1"]=()=>{let A,B;do{A=ri(25,85);B=ri(25,85)}while(A+B>165);return{q:`In triangle ABC, ∠A = ${A}° and ∠B = ${B}°. What is the exterior angle at C, in degrees?`,a:(A+B)+"°",v:String(A+B),steps:[
 [`The exterior angle at C equals the sum of the two far interior angles.`,`∠A + ∠B`],[`Add.`,`${A}° + ${B}° = ${A+B}°`]]}};
G["34.2"]=()=>{const t=2*ri(20,80);return{q:`A, B and C lie on a circle with center O, and ∠AOB = ${t}°. C is on the longer arc AB. Find ∠ACB in degrees.`,a:(t/2)+"°",v:String(t/2),steps:[
 [`An inscribed angle is half the central angle on the same arc.`,`½ × ${t}°`],[`Compute.`,`${t/2}°`]]}};
G["34.3"]=()=>{const E=ri(95,165),c=180-E,A=180-2*c;return{q:`In triangle ABC, AB = AC. Side BC is extended past C, and the exterior angle at C is ${E}°. Find ∠A in degrees.`,a:A+"°",v:String(A),steps:[
 [`Straight line at C.`,`∠ACB = 180° − ${E}° = ${c}°`],[`AB = AC, so ∠B = ∠ACB.`,`∠B = ${c}°`],[`Angles add to 180°.`,`∠A = 180° − 2 × ${c}° = ${A}°`]]}};
G["36.1"]=()=>{const t=pick(triples),k=ri(1,6);return{q:`A right triangle has legs ${t[0]*k} and ${t[1]*k}. Find the hypotenuse.`,a:String(t[2]*k),steps:[
 [`It’s the ${t.join("-")} triple${k>1?` scaled by ${k}`:""}. Check with Pythagoras.`,`${(t[0]*k)**2} + ${(t[1]*k)**2} = ${(t[2]*k)**2}`],[`Square root.`,`${t[2]*k}`]]}};
G["36.2"]=()=>{const x=ri(2,12),c=x*x;const a=c%2?`${c}√3/2`:`${c/2}√3`;return{q:`A 30-60-90 triangle has hypotenuse ${2*x}. Find its area.`,a,v:`${c}*sqrt(3)/2`,steps:[
 [`Short leg = half the hypotenuse.`,`${x}`],[`Long leg = short leg × √3.`,`${x}√3`],[`Area = ½ × legs.`,`½ × ${x} × ${x}√3 = ${a}`]]}};
G["36.3"]=()=>{const d=ri(4,20);return{q:`A square has a diagonal of length ${d}. Find its area.`,a:fr(d*d,2),steps:[
 [`Area of a square = diagonal²/2 (the diagonal is side × √2).`,`${d}²/2`],[`Compute.`,fr(d*d,2)]]}};
G["37.1"]=()=>{let h,s1,s2,H;do{h=pick([4,5,6]);s1=ri(2,8);s2=ri(10,60);H=h*s2/s1}while(!Number.isInteger(H));return{q:`A ${h}-foot pole casts a ${s1}-foot shadow. At the same moment a tree casts a ${s2}-foot shadow. How tall is the tree, in feet?`,a:String(H),steps:[
 [`Same sun angle, so height/shadow is the same.`,`${h}/${s1} = H/${s2}`],[`Solve.`,`H = ${s2} × ${h}/${s1} = ${H}`]]}};
G["37.2"]=()=>{const a=ri(3,10),k=pick([2,3]),A=ri(2,12);return{q:`Trapezoid ABCD has AB parallel to CD, AB = ${a} and CD = ${k*a}. The diagonals meet at E, and triangle ABE has area ${A}. Find the area of triangle CDE.`,a:String(A*k*k),steps:[
 [`Bowtie: ABE and CDE are similar with ratio CD/AB.`,`k = ${k*a}/${a} = ${k}`],[`Areas scale by k².`,`${A} × ${k*k} = ${A*k*k}`]]}};
G["37.3"]=()=>{const k=ri(2,5),T=k*k*ri(2,9);return{q:`Triangle ABC has area ${T}. Points D and E are on AB and AC with DE ∥ BC and AD = AB/${k}. Find the area of triangle ADE.`,a:String(T/(k*k)),steps:[
 [`ADE ~ ABC with ratio 1/${k}.`,`area ratio = 1/${k*k}`],[`Compute.`,`${T}/${k*k} = ${T/(k*k)}`]]}};
G["40.1"]=()=>{const r=ri(2,12),t=pick([30,45,60,72,90,120,135,150,240,270]);const n=t*r*r,d=360,g=gcd(n,d),nn=n/g,dd=d/g,a=(nn===1?"":nn)+"π"+(dd===1?"":"/"+dd);
 return{q:`A sector of a circle with radius ${r} has a central angle of ${t}°. Find its area.`,a,v:`${n}*pi/${d}`,steps:[
 [`Fraction of the circle.`,`${t}/360 = ${fr(t,360)}`],[`Whole circle.`,`π × ${r}² = ${r*r}π`],[`Take the fraction.`,`${fr(t,360)} × ${r*r}π = ${a}`]]}};
G["40.3"]=()=>{const s=2*ri(2,10),r=s/2;return{q:`A circle is inscribed in a square of side ${s}. Find the area inside the square but outside the circle.`,a:`${s*s} − ${r*r}π`,v:`${s*s}-${r*r}*pi`,steps:[
 [`The circle’s diameter equals the side.`,`r = ${r}`],[`Square minus circle.`,`${s*s} − ${r*r}π`]]}};
G["44.1"]=()=>{const n=ri(5,20);return{q:`How many diagonals does a polygon with ${n} sides have?`,a:String(n*(n-3)/2),steps:[
 [`Each vertex connects to n − 3 others; each diagonal is counted from both ends.`,`${n} × ${n-3}/2`],[`Compute.`,`${n*(n-3)/2}`]]}};
G["44.2"]=()=>{let n,d,x,S;do{n=pick([5,6]);d=ri(2,12);S=(n-2)*180;x=(S-d*n*(n-1)/2)/n}while(!Number.isInteger(x)||x<=0||x+(n-1)*d>=180);
 const nm=n===5?"pentagon":"hexagon",terms=Array.from({length:n},(_,i)=>i?`x + ${i*d}`:"x");
 return{q:`A ${nm}’s interior angles are ${terms.join(", ")} degrees. Find the largest angle, in degrees.`,a:(x+(n-1)*d)+"°",v:String(x+(n-1)*d),steps:[
 [`Angle sum.`,`(${n} − 2) × 180° = ${S}°`],[`Add the angles and solve.`,`${n}x + ${d*n*(n-1)/2} = ${S} → x = ${x}`],[`Largest angle.`,`${x} + ${(n-1)*d} = ${x+(n-1)*d}°`]]}};
G["44.3"]=()=>{const n=pick([5,6,8,9,10,12,15,18,20,24,30,36]),ext=360/n;return{q:`Each interior angle of a regular polygon is ${180-ext}°. How many sides does it have?`,a:String(n),steps:[
 [`Exterior angle.`,`180° − ${180-ext}° = ${ext}°`],[`Exterior angles add to 360°.`,`360/${ext} = ${n}`]]}};
G["50.1"]=()=>{const a=ri(1,6),b=ri(1,6),c=lcm(a,b)*ri(1,4),X=c/a,Y=c/b;return{q:`Find the area of the triangle formed by the line ${a===1?"":a}x + ${b===1?"":b}y = ${c} and the two axes.`,a:fr(X*Y,2),steps:[
 [`Intercepts: set y = 0, then x = 0.`,`x = ${X}, y = ${Y}`],[`Right triangle with those legs.`,`½ × ${X} × ${Y} = ${fr(X*Y,2)}`]]}};
G["50.3"]=()=>{const t=pick(triples),k=ri(1,3),x1=ri(-6,6),y1=ri(-6,6),sx=pick([1,-1]),sy=pick([1,-1]),sw=Math.random()<.5;const dx=(sw?t[1]:t[0])*k,dy=(sw?t[0]:t[1])*k;const x2=x1+sx*dx,y2=y1+sy*dy;
 return{q:`Find the distance between (${M(x1)}, ${M(y1)}) and (${M(x2)}, ${M(y2)}).`,a:String(t[2]*k),steps:[
 [`Horizontal and vertical changes.`,`Δx = ${dx}, Δy = ${dy}`],[`Pythagoras.`,`√(${dx*dx} + ${dy*dy}) = ${t[2]*k}`]]}};
G["50.4"]=()=>{const m=pick([2,3,4,-2,-3]),x0=m*ri(-3,3),y0=ri(-5,8),bnum=y0*m+x0;return{q:`A line passes through (${M(x0)}, ${M(y0)}) and is perpendicular to y = ${M(m)}x + 1. Find its y-intercept.`,a:fr(bnum,m),steps:[
 [`Perpendicular slope is the negative reciprocal.`,`m = ${fr(-1,m)}`],[`Plug the point into y = mx + b.`,`${M(y0)} = ${fr(-1,m)} × ${M(x0)} + b`],[`Solve.`,`b = ${fr(bnum,m)}`]]}};

// ---------- ◆ topics ----------
G["5.1"]=()=>{let a,b;do{a=pick([2,3,4,5,6,7]);b=pick([2,3,4,5,6,7])}while(a>=b);const N=pick([100,120,150,200,300]),L=lcm(a,b),A=Math.floor(N/a),B=Math.floor(N/b),AB=Math.floor(N/L),nb=Math.random()<.5;
 const ans=nb?A+B-2*AB:A+B-AB;return{q:`How many integers from 1 to ${N} are divisible by ${a} or ${b}${nb?", but not both":""}?`,a:String(ans),steps:[
 [`Count each.`,`${a}: ${A}, ${b}: ${B}`],[`Both means multiples of lcm(${a}, ${b}) = ${L}.`,`${L}: ${AB}`],[nb?`Not both: drop the overlap from each.`:`Subtract the overlap once.`,nb?`(${A} − ${AB}) + (${B} − ${AB}) = ${ans}`:`${A} + ${B} − ${AB} = ${ans}`]]}};
G["5.3"]=()=>{let T,A,B,N,both;do{T=ri(25,40);A=ri(10,T-5);B=ri(8,T-5);N=ri(1,6);both=A+B-(T-N)}while(both<1||both>Math.min(A,B)-1);
 return{q:`In a class of ${T} students, ${A} play soccer, ${B} play chess and ${N} do neither. How many do both?`,a:String(both),steps:[
 [`At least one activity.`,`${T} − ${N} = ${T-N}`],[`PIE.`,`${T-N} = ${A} + ${B} − both`],[`Solve.`,`both = ${both}`]]}};
G["6.1"]=()=>{const k=pick([3,4]),n=ri(k+2,15);return{q:`How many ordered ${k===3?"triples":"quadruples"} of positive integers satisfy ${k===3?"a + b + c":"a + b + c + d"} = ${n}?`,a:String(C(n-1,k-1)),steps:[
 [`Give each variable 1 first.`,`${n} − ${k} = ${n-k} left to share`],[`Stars and bars: ${n-k} stars, ${k-1} bars.`,`C(${n-1}, ${k-1}) = ${C(n-1,k-1)}`]]}};
G["6.3"]=()=>{const k=pick([3,4]),n=ri(3,10);return{q:`How many solutions in nonnegative integers does ${k===3?"a + b + c":"a + b + c + d"} = ${n} have?`,a:String(C(n+k-1,k-1)),steps:[
 [`${n} stars and ${k-1} bars.`,`${n+k-1} spots`],[`Choose the bar spots.`,`C(${n+k-1}, ${k-1}) = ${C(n+k-1,k-1)}`]]}};
G["8.1"]=()=>{const m=ri(2,6),n=ri(2,6);return{q:`How many rectangles are in a ${m} × ${n} grid of unit squares?`,a:String(C(m+1,2)*C(n+1,2)),steps:[
 [`Count lines, not squares.`,`${m+1} lines one way, ${n+1} the other`],[`Choose 2 of each.`,`C(${m+1}, 2) × C(${n+1}, 2) = ${C(m+1,2)} × ${C(n+1,2)} = ${C(m+1,2)*C(n+1,2)}`]]}};
G["8.3"]=()=>{const a=ri(2,6),b=ri(2,5);return{q:`How many right/up paths go from (0, 0) to (${a}, ${b})?`,a:String(C(a+b,a)),steps:[
 [`Each path is ${a} R’s and ${b} U’s in some order.`,`${a+b} moves`],[`Choose which are R.`,`C(${a+b}, ${a}) = ${C(a+b,a)}`]]}};
G["9.3"]=()=>{const L=pick([10,12,20,30]),d=ri(1,L/2-1);return{q:`A point is chosen at random on a segment of length ${L}. What is the probability that it is within ${d} of an endpoint?`,a:fr(2*d,L),steps:[
 [`Good parts: ${d} at each end.`,`${2*d}`],[`Divide by the length.`,`${2*d}/${L} = ${fr(2*d,L)}`]]}};
G["10.3"]=()=>{const [p1,q1]=pick([[1,10],[1,5],[1,4]]),[p2,q2]=pick([[1,2],[1,4],[1,5]]),v1=ri(5,20),v2=ri(1,4);const num=v1*p1*q2+v2*p2*q1,den=q1*q2;
 return{q:`A game pays $${v1} with probability ${p1}/${q1}, $${v2} with probability ${p2}/${q2}, and nothing otherwise. What is the expected payout in dollars?`,a:dec(num,den),steps:[
 [`Value × probability for each prize.`,`${v1} × ${p1}/${q1} = ${fr(v1*p1,q1)}, ${v2} × ${p2}/${q2} = ${fr(v2*p2,q2)}`],[`Add.`,dec(num,den)]]}};
G["14.1"]=()=>{const s=ri(3,12),p=ri(1,20);return{q:`If a + b = ${s} and ab = ${p}, find a² + b².`,a:M(s*s-2*p),v:String(s*s-2*p),steps:[
 [`a² + b² = (a + b)² − 2ab.`,`${s*s} − ${2*p}`],[`Compute.`,M(s*s-2*p)]]}};
G["14.3"]=()=>{const s=ri(3,12),p=ri(1,Math.floor(s*s/4));return{q:`If a + b = ${s} and ab = ${p}, find (a − b)².`,a:String(s*s-4*p),steps:[
 [`(a − b)² = (a + b)² − 4ab.`,`${s*s} − ${4*p}`],[`Compute.`,String(s*s-4*p)]]}};
G["15.1"]=()=>{const a=pick([1,2,3]),b=ri(-9,9)||5,c=ri(-9,9)||2;const num=b*b-2*a*c,den=a*a;const eq=`${a===1?"":a}x² ${b<0?"−":"+"} ${Math.abs(b)===1?"":Math.abs(b)}x ${c<0?"−":"+"} ${Math.abs(c)}`;
 return{q:`r and s are the roots of ${eq} = 0. Find r² + s².`,a:fr(num,den),steps:[
 [`Vieta.`,`r + s = ${fr(-b,a)}, rs = ${fr(c,a)}`],[`r² + s² = (r + s)² − 2rs.`,`${fr(b*b,a*a)} − ${fr(2*c,a)} = ${fr(num,den)}`]]}};
G["15.2"]=()=>{const N=pick([12,18,20,24,30,36,40,48,60]);const pr=[];for(let u=1;u*u<=N;u++)if(N%u===0)pr.push([u,N/u]);
 return{q:`Both roots of x² + bx + ${N} = 0 are positive integers. How many values of b are possible?`,a:String(pr.length),steps:[
 [`The roots multiply to ${N}: list the pairs.`,pr.map(([u,v])=>`(${u}, ${v})`).join(", ")],[`Each pair gives one b = −(sum).`,`${pr.length}`]]}};
G["19.1"]=()=>{const a1=ri(1,5),r=ri(2,4),i=2,j=i+pick([2,3]),ai=a1*r**(i-1),aj=a1*r**(j-1);return{q:`The ${ord(i)} term of a geometric sequence is ${ai} and the ${ord(j)} term is ${fmt(aj)}. Find the 1st term.`,a:String(a1),steps:[
 [`Terms ${i} and ${j} are ${j-i} steps apart.`,`r${sup(j-i)} = ${fmt(aj)}/${ai} = ${r**(j-i)} → r = ${r}`],[`Go back one step.`,`${ai}/${r} = ${a1}`]]}};
G["19.3"]=()=>{const a=ri(2,20),[rn,rd]=pick([[1,2],[1,3],[1,4],[2,3],[3,4],[-1,2],[-1,3]]);return{q:`Find the sum of the infinite geometric series whose first term is ${a} and whose ratio is ${M(rn)}/${rd}.`,a:fr(a*rd,rd-rn),steps:[
 [`Infinite sum = a/(1 − r).`,`${a}/(1 − (${M(rn)}/${rd}))`],[`Compute.`,`${a}/(${fr(rd-rn,rd)}) = ${fr(a*rd,rd-rn)}`]]}};
G["22.2"]=()=>{let p,q;do{p=ri(2,7);q=ri(2,7)}while(p===q);const x=ri(-5,9),y=ri(-5,9),s1=p*x+q*y,s2=q*x+p*y;return{q:`${p}x + ${q}y = ${M(s1)} and ${q}x + ${p}y = ${M(s2)}. Find x + y.`,a:M(x+y),v:String(x+y),steps:[
 [`Add the equations.`,`${p+q}x + ${p+q}y = ${M(s1+s2)}`],[`Divide by ${p+q}.`,`x + y = ${M(x+y)}`]]}};
const legendre=(n,p)=>{let e=0,q=p;const t=[];while(q<=n){t.push(Math.floor(n/q));e+=Math.floor(n/q);q*=p}return [e,t]};
G["25.1"]=()=>{const n=ri(30,3000),[e,t]=legendre(n,5);return{q:`How many zeros does ${n}! end in?`,a:String(e),steps:[
 [`Count the 5s with Legendre’s formula.`,t.map((_,i)=>`⌊${n}/${5**(i+1)}⌋`).join(" + ")],[`Add.`,t.join(" + ")+` = ${e}`]]}};
G["25.4"]=()=>{const p=pick([2,3,5,7]),n=ri(10,100),[e,t]=legendre(n,p);return{q:`What is the exponent of the largest power of ${p} that divides ${n}!?`,a:String(e),steps:[
 [`Legendre’s formula.`,t.map((_,i)=>`⌊${n}/${p**(i+1)}⌋`).join(" + ")],[`Add.`,t.join(" + ")+` = ${e}`]]}};
G["30.1"]=()=>{const N=pick([15,21,45,63,75,105,135,165,48,80,96,120]);const pr=[];for(let d=1;d*d<N;d++)if(N%d===0){const e=N/d;if((d+e)%2===0)pr.push([d,e])}
 return{q:`How many pairs of positive integers (x, y) satisfy x² − y² = ${N}?`,a:String(pr.length),steps:[
 [`Factor: (x − y)(x + y) = ${N}, with both factors the same parity and x − y < x + y.`,pr.map(([d,e])=>`${d}·${e}`).join(", ")||"none"],[`Each pair gives one (x, y).`,pr.map(([d,e])=>`(${(d+e)/2}, ${(e-d)/2})`).join(", ")+` → ${pr.length}`]]}};
G["31.1"]=()=>{let a,b;do{a=pick([3,4,5,7]);b=pick([3,4,5,7])}while(a>=b||gcd(a,b)!==1);const N=ri(30,80);const sol=[];for(let x=0;a*x<=N;x++)if((N-a*x)%b===0)sol.push([x,(N-a*x)/b]);
 return{q:`Stamps cost ${a} cents and ${b} cents. In how many ways can you make exactly ${N} cents?`,a:String(sol.length),steps:[
 [`Equation in whole numbers.`,`${a}x + ${b}y = ${N}`],[`Try each x and keep the ones that leave a multiple of ${b}.`,sol.map(([x,y])=>`(${x}, ${y})`).join(", ")||"none"],[`Count.`,`${sol.length}`]]}};
G["32.1"]=()=>{const n=ri(20,300),b=ri(2,7);let m=n;const rows=[];while(m){rows.push([`${m} ÷ ${b}`,Math.floor(m/b),m%b]);m=Math.floor(m/b)}const s=rows.map(r=>r[2]).reverse().join("");
 return{q:`Write ${n} in base ${b}.`,a:s,steps:[
 [`Divide by ${b} repeatedly.`,"",gr({rows:rows.map(r=>r[0]),cols:["quotient","remainder"],corner:"",cells:rows.map(r=>[r[1],r[2]]),hl:(r,c)=>c===1?"a":""})],[`Read the remainders bottom to top.`,s]]}};
G["32.3"]=()=>{const b=pick([2,3,5,8]),len=ri(3,b===2?8:4);let s=String(ri(1,b-1));for(let i=1;i<len;i++)s+=ri(0,b-1);const val=parseInt(s,b);const pv=s.split("").map((_,i)=>b**(s.length-1-i));
 return{q:`Convert ${s} (base ${b}) to base 10.`,a:String(val),steps:[
 [`Place values from the right: powers of ${b}.`,"",ch(s.split(""),{sub:pv.map(String),c:s.split("").map(d=>d!=="0"?"a":"")})],[`Multiply and add.`,s.split("").map((d,i)=>`${d}·${pv[i]}`).join(" + ")+` = ${val}`]]}};
G["35.1"]=()=>{const [s,base,h]=pick([[5,6,4],[5,8,3],[13,10,12],[13,24,5],[10,12,8],[10,16,6],[17,16,15],[17,30,8],[25,14,24],[25,48,7]]),k=pick([1,1,2]);return{q:`Find the area of a triangle with sides ${s*k}, ${s*k} and ${base*k}.`,a:String(base*k*h*k/2),steps:[
 [`Isosceles: the height to the base hits its midpoint.`,`half-base = ${base*k/2}`],[`Pythagoras.`,`h = √(${(s*k)**2} − ${(base*k/2)**2}) = ${h*k}`],[`Area.`,`½ × ${base*k} × ${h*k} = ${base*k*h*k/2}`]]}};
G["35.3"]=()=>{const p=ri(3,14),q=ri(3,14);return{q:`Two sides of a triangle are ${p} and ${q}, and the angle between them is 30°. Find the area.`,a:fr(p*q,4),steps:[
 [`½ab·sin C with sin 30° = ½.`,`½ × ${p} × ${q} × ½`],[`Compute.`,fr(p*q,4)]]}};
G["38.1"]=()=>{let a,b,c,x,ask;do{a=ri(6,20);b=ri(4,15);c=ri(4,15);ask=Math.random()<.5;x=ask?a*c/(b+c):a*b/(b+c)}while(!Number.isInteger(x)||b===c||a>=b+c||b>=a+c||c>=a+b);
 return{q:`Triangle ABC has AB = ${c}, AC = ${b} and BC = ${a}. The bisector of ∠A meets BC at D. Find ${ask?"BD":"DC"}.`,a:String(x),steps:[
 [`${ask?"BD goes with AB":"DC goes with AC"}.`,`${ask?"BD":"DC"} = BC × ${ask?"AB":"AC"}/(AB + AC)`],[`Substitute.`,`${a} × ${ask?c:b}/${b+c} = ${x}`]]}};
G["39.1"]=()=>{const k=ri(1,3),s=ri(4,14),o=3*k,h=4*k,L=s+2*o;return{q:`An isosceles trapezoid has bases ${s} and ${L} and legs ${5*k}. Find its area.`,a:String((s+L)/2*h),steps:[
 [`Each overhang is (${L} − ${s})/2.`,`${o}`],[`Leg ${5*k}, overhang ${o} → height (3-4-5).`,`h = ${h}`],[`Area.`,`(${s} + ${L})/2 × ${h} = ${(s+L)/2*h}`]]}};
G["41.1"]=()=>{const r=ri(5,20),t=ri(10,60);return{q:`A wheel of radius ${r} inches rolls ${2*r*t}π inches. How many full turns does it make?`,a:String(t),steps:[
 [`One turn = one circumference.`,`2π × ${r} = ${2*r}π`],[`Divide.`,`${2*r*t}π/${2*r}π = ${t}`]]}};
G["41.2"]=()=>{const t=pick(triples),k=ri(1,3),sw=Math.random()<.5,r=(sw?t[1]:t[0])*k,T=(sw?t[0]:t[1])*k;return{q:`A circle has center O and radius ${r}. A tangent segment from point P touches the circle at A, and PA = ${T}. Find OP.`,a:String(t[2]*k),steps:[
 [`OA ⟂ PA, so OAP is a right triangle.`,`OP² = ${r*r} + ${T*T}`],[`Square root.`,`OP = ${t[2]*k}`]]}};
G["45.3"]=()=>{const s=2*ri(1,6),c=3*s*s/2;return{q:`A regular hexagon has area ${c}√3. Find its side length.`,a:String(s),steps:[
 [`Hexagon area = (3√3/2)s².`,`(3√3/2)s² = ${c}√3`],[`Solve.`,`s² = ${s*s} → s = ${s}`]]}};
G["46.1"]=()=>{const s=ri(2,12);return{q:`A cube has surface area ${6*s*s}. Find its volume.`,a:String(s**3),steps:[
 [`Six faces.`,`6s² = ${6*s*s} → s = ${s}`],[`Volume.`,`${s}³ = ${s**3}`]]}};

G["48.3"]=()=>{const I=ri(0,20),B=ri(3,24);return{q:`A polygon drawn on dot paper has ${B} dots on its boundary and ${I} dots inside. Find its area.`,a:fr(2*I+B-2,2),steps:[
 [`Pick’s theorem.`,`area = I + B/2 − 1`],[`Substitute.`,`${I} + ${fr(B,2)} − 1 = ${fr(2*I+B-2,2)}`]]}};
G["48.4"]=()=>{const l=ri(4,20),w=ri(3,15);return{q:`Rectangle ABCD has AB = ${l} and BC = ${w}. P is any point on side CD. Find the area of triangle ABP.`,a:fr(l*w,2),steps:[
 [`Wherever P is on CD, its height above AB is ${w}.`,`base ${l}, height ${w}`],[`Area.`,`½ × ${l} × ${w} = ${fr(l*w,2)}`]]}};

// ---------- ○ topics ----------
G["7.3"]=()=>{const n=ri(3,10);return{q:`How many subsets does a ${n}-element set have, including the empty set?`,a:String(2**n),steps:[[`Each element is in or out.`,`2${sup(n)} = ${2**n}`]]}};
G["11.1"]=()=>{const n=ri(3,10);const f=[2,3];while(f.length<n)f.push(f[f.length-1]+f[f.length-2]);return{q:`How many ${n}-letter strings of A’s and B’s have no two A’s in a row?`,a:String(f[n-1]),steps:[
 [`f(n) = f(n − 1) + f(n − 2), with f(1) = 2 and f(2) = 3.`,f.slice(0,n).join(", ")],[`Answer.`,String(f[n-1])]]}};
G["12.3"]=()=>{const [ev,k]=pick([["a 6 on one die",6],["a sum of 7 with two dice",6],["heads on a coin",2],["a 1 or a 2 on one die",3],["double sixes with two dice",36],["a heart from a well-shuffled deck (replacing the card each time)",4]]);
 return{q:`You repeat a trial until you get ${ev}. What is the expected number of trials?`,a:String(k),steps:[[`Each trial succeeds with probability 1/${k}.`,`E = 1 + ((${k} − 1)/${k})E`],[`Solve.`,`E = ${k}`]]}};
G["16.3"]=()=>{const a=ri(-3,3),b=ri(-5,5),c=ri(-9,9),r=pick([-3,-2,-1,1,2,3]),val=r**3+a*r*r+b*r+c;const t=(k,s)=>k===0?"":` ${k<0?"−":"+"} ${Math.abs(k)===1&&s?"":Math.abs(k)}${s}`;
 return{q:`What is the remainder when x³${t(a,"x²")}${t(b,"x")}${t(c,"")} is divided by x ${r<0?"+":"−"} ${Math.abs(r)}?`,a:M(val),v:String(val),steps:[
 [`Remainder theorem: plug in x = ${M(r)}.`,`p(${M(r)})`],[`Compute.`,M(val)]]}};
G["17.1"]=()=>{const s=ri(2,8),p=ri(1,10);return{q:`a + b = ${s} and ab = ${p}. Find a³ + b³.`,a:M(s**3-3*p*s),v:String(s**3-3*p*s),steps:[
 [`a³ + b³ = (a + b)³ − 3ab(a + b).`,`${s**3} − ${3*p*s}`],[`Compute.`,M(s**3-3*p*s)]]}};
G["20.3"]=()=>{const n=ri(5,20),s=n*(n+1)*(2*n+1)/6;return{q:`Find 1² + 2² + … + ${n}².`,a:String(s),steps:[[`n(n + 1)(2n + 1)/6 with n = ${n}.`,`${n} · ${n+1} · ${2*n+1}/6 = ${s}`]]}};
G["28.3"]=()=>{const p=pick([5,7,11,13]),b=pick([2,3,5,6].filter(x=>x%p)),r=ri(1,p-2),e=(p-1)*ri(3,15)+r;let v=1;for(let i=0;i<r;i++)v=v*b%p;
 return{q:`What is the remainder when ${b}${sup(e)} is divided by ${p}?`,a:String(v),steps:[
 [`Fermat: ${b}${sup(p-1)} ≡ 1 (mod ${p}).`,`${e} = ${p-1} × ${(e-r)/(p-1)} + ${r}`],[`Only ${b}${sup(r)} is left.`,`${b**r} → ${v}`]]}};
G["29.3"]=()=>{const S=pick([[2,3,4],[3,4,5],[2,3,4,5],[4,5,6],[2,3,5,7],[3,5,7]]),L=S.reduce(lcm);return{q:`What is the smallest integer greater than 1 that leaves remainder 1 when divided by each of ${S.join(", ")}?`,a:String(L+1),steps:[
 [`x − 1 is a common multiple.`,`lcm(${S.join(", ")}) = ${L}`],[`Add 1.`,String(L+1)]]}};
G["33.3"]=()=>{const k=pick([2,3,4,5,6,7,8,9,10]);const s=[];for(let n=10;n<100;n++){const a=Math.floor(n/10),b=n%10;if(n===k*(a+b))s.push(n)}
 return{q:`A two-digit number equals ${k} times the sum of its digits. How many such numbers are there?`,a:String(s.length),steps:[
 [`10a + b = ${k}(a + b).`,`${10-k}a = ${k-1}b`],[`Try digits a = 1 to 9.`,s.join(", ")],[`Count.`,String(s.length)]]}};
G["42.1"]=()=>{let t,a,b;do{t=ri(4,12);a=ri(2,t-1);b=t*t/a}while(!Number.isInteger(b)||b<=a);return{q:`From P outside a circle, a tangent segment has length ${t}. A line from P meets the circle at A and then B, with PA = ${a}. Find AB.`,a:String(b-a),steps:[
 [`Tangent² = near × far.`,`${t*t} = ${a} × PB → PB = ${b}`],[`AB = PB − PA.`,`${b} − ${a} = ${b-a}`]]}};
G["43.1"]=()=>{const k=pick([2,3,4,5,8,9,11]),Cc=180/(k+1);return{q:`Cyclic quadrilateral ABCD has ∠A = ${k}∠C. Find ∠A in degrees.`,a:(k*Cc)+"°",v:String(k*Cc),steps:[
 [`Opposite angles add to 180°.`,`${k}∠C + ∠C = 180° → ∠C = ${Cc}°`],[`∠A.`,`${k*Cc}°`]]}};
G["47.1"]=()=>{const r=ri(1,6);return{q:`A cube’s corners all lie on a sphere of radius ${r}√3. Find the cube’s volume.`,a:String(8*r**3),steps:[
 [`Space diagonal = diameter.`,`s√3 = ${2*r}√3 → s = ${2*r}`],[`Volume.`,`${2*r}³ = ${8*r**3}`]]}};
G["49.2"]=()=>{const t=pick(triples),k=ri(1,2),r=ri(1,4),dR=t[0]*k,R=r+dR,d=t[2]*k;return{q:`Two circles with radii ${r} and ${R} have centers ${d} apart. Find the length of a common external tangent segment.`,a:String(t[1]*k),steps:[
 [`External: use the difference of the radii.`,`√(${d}² − ${dR}²)`],[`Compute.`,`${t[1]*k}`]]}};
G["51.3"]=()=>{const k=ri(3,19),N=ri(100,2000);return{q:`How many integers from 1 to ${N} are multiples of ${k}?`,a:String(Math.floor(N/k)),steps:[[`⌊${N}/${k}⌋.`,`${k} × ${Math.floor(N/k)} = ${k*Math.floor(N/k)} ≤ ${N}`],[`Answer.`,String(Math.floor(N/k))]]}};
G["52.3"]=()=>{const n=ri(3,15);return{q:`Two positive numbers have product ${n*n}. What is the smallest possible value of their sum?`,a:String(2*n),steps:[[`Fixed product → smallest sum when equal.`,`${n} and ${n}`],[`Sum.`,String(2*n)]]}};
})(window.GEN);
