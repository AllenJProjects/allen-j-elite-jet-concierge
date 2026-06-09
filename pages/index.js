import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  ivory:     "#FAF8F4",
  cream:     "#F3EFE7",
  beige:     "#E8E0D0",
  champagne: "#D4B896",
  gold:      "#B8960C",
  goldLight: "#D4AA1A",
  goldDark:  "#8A6F00",
  coffee:    "#3D2B1A",
  coffeeMid: "#5C3D24",
  brown:     "#7A5230",
  brownLight:"#A07450",
  sand:      "#C4A882",
  white:     "#FFFFFF",
  offWhite:  "#FDFCFA",
  text:      "#1E1410",
  textMid:   "#4A3728",
  textLight: "#7A6555",
  border:    "#D8D0C0",
  borderDark:"#C0B090",
};

const fonts = {
  display: "'Cormorant Garamond', 'Garamond', Georgia, serif",
  body:    "'Libre Baskerville', 'Baskerville', Georgia, serif",
  sans:    "'Raleway', 'Gill Sans', sans-serif",
  mono:    "'Courier Prime', monospace",
};

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{\`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Raleway:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: \${C.ivory}; color: \${C.text}; font-family: \${fonts.body}; }
    input, select, textarea { font-family: \${fonts.sans}; }
    button { cursor: pointer; font-family: \${fonts.sans}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: \${C.cream}; }
    ::-webkit-scrollbar-thumb { background: \${C.champagne}; border-radius: 3px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
    .fade-up-4 { animation: fadeUp 0.7s 0.45s ease both; }
  \`}</style>
);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const GoldDivider = ({ style = {} }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, ...style }}>
    <div style={{ flex:1, height:"0.5px", background:\`linear-gradient(90deg, transparent, \${C.gold})\` }} />
    <div style={{ width:6, height:6, border:\`1px solid \${C.gold}\`, transform:"rotate(45deg)" }} />
    <div style={{ flex:1, height:"0.5px", background:\`linear-gradient(90deg, \${C.gold}, transparent)\` }} />
  </div>
);

const Logo = ({ navigate, size = "md" }) => {
  const s = size === "lg" ? { title:42, sub:11, gap:3 } : { title:22, sub:9, gap:2 };
  return (
    <div onClick={() => navigate && navigate("home")}
      style={{ cursor:"pointer", textAlign:"center", userSelect:"none" }}>
      <div style={{ fontFamily:fonts.display, fontSize:s.title, fontWeight:300, letterSpacing:8,
        color:C.coffee, lineHeight:1 }}>ALLEN J.</div>
      <div style={{ fontFamily:fonts.sans, fontSize:s.sub, letterSpacing:5, color:C.gold,
        fontWeight:400, marginTop:s.gap }}>ELITE JET CONCIERGE</div>
    </div>
  );
};

const GoldBtn = ({ children, onClick, variant="solid", style={}, small=false }) => {
  const base = {
    fontFamily:fonts.sans, letterSpacing:3, fontSize:small?9:10, fontWeight:500,
    padding:small?"8px 20px":"13px 36px", cursor:"pointer", border:"none",
    transition:"all 0.3s ease", textTransform:"uppercase",
  };
  const styles = variant === "solid"
    ? { ...base, background:C.gold, color:C.white, ...style }
    : variant === "outline"
    ? { ...base, background:"transparent", color:C.gold, border:\`1px solid \${C.gold}\`, ...style }
    : { ...base, background:"transparent", color:C.coffee, border:\`1px solid \${C.coffee}\`, ...style };
  return (
    <button style={styles}
      onMouseEnter={e => {
        if(variant==="solid") e.target.style.background=C.goldDark;
        else e.target.style.opacity="0.75";
      }}
      onMouseLeave={e => {
        if(variant==="solid") e.target.style.background=C.gold;
        else e.target.style.opacity="1";
      }}
      onClick={onClick}>{children}</button>
  );
};

const FormInput = ({ label, type="text", value, onChange, placeholder, required, style={} }) => (
  <div style={{ marginBottom:20, ...style }}>
    <label style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3, color:C.textLight,
      textTransform:"uppercase", display:"block", marginBottom:8 }}>
      {label}{required && <span style={{ color:C.gold }}> *</span>}
    </label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width:"100%", background:C.white, border:\`1px solid \${C.border}\`,
        padding:"12px 16px", fontFamily:fonts.body, fontSize:13, color:C.text,
        outline:"none", transition:"border 0.2s" }}
      onFocus={e => e.target.style.borderColor=C.gold}
      onBlur={e => e.target.style.borderColor=C.border} />
  </div>
);

const FormSelect = ({ label, value, onChange, options, required }) => (
  <div style={{ marginBottom:20 }}>
    <label style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3, color:C.textLight,
      textTransform:"uppercase", display:"block", marginBottom:8 }}>
      {label}{required && <span style={{ color:C.gold }}> *</span>}
    </label>
    <select value={value} onChange={onChange}
      style={{ width:"100%", background:C.white, border:\`1px solid \${C.border}\`,
        padding:"12px 16px", fontFamily:fonts.body, fontSize:13, color:C.text,
        outline:"none", appearance:"none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// Top navigation bar
const Nav = ({ navigate, current, clientName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { id:"home", label:"Home" },
    { id:"aircraft", label:"Fleet" },
    { id:"concierge", label:"Concierge" },
    { id:"dashboard", label:"My Account" },
  ];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:C.offWhite,
      borderBottom:\`1px solid \${C.border}\`, padding:"0 40px" }}>
      <div style={{ maxWidth:1300, margin:"0 auto", display:"flex", alignItems:"center",
        justifyContent:"space-between", height:72 }}>
        <Logo navigate={navigate} />
        <div style={{ display:"flex", gap:36, alignItems:"center" }}>
          {items.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3, fontWeight:500,
                textTransform:"uppercase", background:"none", border:"none",
                color: current===item.id ? C.gold : C.textMid,
                borderBottom: current===item.id ? \`1px solid \${C.gold}\` : "1px solid transparent",
                paddingBottom:2, cursor:"pointer" }}>
              {item.label}
            </button>
          ))}
          {clientName
            ? <GoldBtn small onClick={() => navigate("dashboard")}>{clientName.split(" ")[0]}</GoldBtn>
            : <GoldBtn small onClick={() => navigate("login")}>Login</GoldBtn>
          }
        </div>
      </div>
    </nav>
  );
};

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
const AIRCRAFT = [
  { id:1, name:"Gulfstream G700", category:"Ultra Long Range", range:"7,500 nm", seats:19,
    speed:"Mach 0.925", priceHour:14800, priceDay:98000, image:"✈",
    features:["Master Suite","Shower","4 Living Zones","HUD Flight Deck","Tail Wind™"],
    description:"The pinnacle of long-range aviation. The G700 redefines luxury travel with its four distinct living environments, full stand-up cabin, and advanced Symmetry Flight Deck." },
  { id:2, name:"Bombardier Global 7500", category:"Ultra Long Range", range:"7,700 nm", seats:19,
    speed:"Mach 0.925", priceHour:15200, priceDay:102000, image:"✈",
    features:["Four Living Spaces","Full Galley","Bossanova Bed","Nuage Seat","18 Windows"],
    description:"Purpose-built with four distinct living spaces including a permanent bedroom with Bossanova bed and en suite, offering unrivalled luxury on the longest city pairs." },
  { id:3, name:"Dassault Falcon 10X", category:"Ultra Long Range", range:"7,500 nm", seats:16,
    speed:"Mach 0.925", priceHour:13500, priceDay:89000, image:"✈",
    features:["FalconEye","Smartsky WiFi","PureAir Cabin","19 Panoramic Windows","Full Galley"],
    description:"The Falcon 10X offers the widest cabin in its class with revolutionary panoramic windows, delivering a serene and spacious environment across any distance." },
  { id:4, name:"Gulfstream G600", category:"Long Range", range:"6,500 nm", seats:14,
    speed:"Mach 0.90", priceHour:10800, priceDay:72000, image:"✈",
    features:["Cabin Pressure 6,000 ft","All-Suite Option","3-Zone Cabin","SmartAir™","Stow-flat seats"],
    description:"Striking the ideal balance between range and luxury, the G600 connects city pairs across continents in a cabin renowned for its low noise and pressure environment." },
  { id:5, name:"Bombardier Challenger 650", category:"Super Midsize", range:"4,000 nm", seats:12,
    speed:"Mach 0.82", priceHour:7200, priceDay:48000, image:"✈",
    features:["Stand-Up Cabin","Full Galley","Club Seating","WiFi","Entertainment System"],
    description:"The Challenger 650 provides a wide-body experience in a super-midsize package, with a stand-up cabin and transatlantic capability." },
  { id:6, name:"Cessna Citation Longitude", category:"Super Midsize", range:"3,500 nm", seats:12,
    speed:"Mach 0.84", priceHour:5800, priceDay:38000, image:"✈",
    features:["Flat Floor","Full Standing Cabin","Signature Interior","Smooth-Ride Winglets","Best-in-class WiFi"],
    description:"The Longitude offers the quietest cabin in its class with a flat floor, full standing height, and transatlantic range that rival far larger aircraft." },
];

const CLIENTS = [
  { id:"AJ-0001", name:"Alexander Hartwell", email:"a.hartwell@email.com", tier:"Diamond",
    flights:23, spend:1840000, status:"Active", joined:"2021-03", location:"New York, USA" },
  { id:"AJ-0002", name:"Isabella von Kaufmann", email:"i.vonkaufmann@email.com", tier:"Platinum",
    flights:14, spend:980000, status:"Active", joined:"2022-07", location:"Zurich, Switzerland" },
  { id:"AJ-0003", name:"Khalid Al-Rashidi", email:"k.alrashidi@email.com", tier:"Diamond",
    flights:31, spend:3200000, status:"Active", joined:"2020-11", location:"Dubai, UAE" },
  { id:"AJ-0004", name:"Serena Montague", email:"s.montague@email.com", tier:"Gold",
    flights:8, spend:520000, status:"Active", joined:"2023-02", location:"London, UK" },
];

const BOOKINGS = [
  { id:"AJF-4821", client:"Alexander Hartwell", from:"KTEB","to":"EGLL", aircraft:"Gulfstream G700",
    date:"2025-08-14", pax:4, status:"Confirmed", total:148000, quote:148000, paid:148000 },
  { id:"AJF-4822", client:"Khalid Al-Rashidi", from:"OMDB","to":"LFPB", aircraft:"Bombardier Global 7500",
    date:"2025-08-18", pax:6, status:"Pending", total:92500, quote:92500, paid:0 },
  { id:"AJF-4823", client:"Isabella von Kaufmann", from:"LSZH","to":"UUEE", aircraft:"Dassault Falcon 10X",
    date:"2025-08-22", pax:3, status:"Quoted", total:67000, quote:67000, paid:0 },
  { id:"AJF-4819", client:"Serena Montague", from:"EGLL","to":"LEMD", aircraft:"Challenger 650",
    date:"2025-07-30", pax:5, status:"Completed", total:38000, quote:38000, paid:38000 },
];

const AIRPORTS = [
  {value:"KTEB",label:"KTEB — Teterboro, New Jersey"},
  {value:"KPWK",label:"KPWK — Palwaukee, Chicago"},
  {value:"KVNY",label:"KVNY — Van Nuys, Los Angeles"},
  {value:"KMIA",label:"KMIA — Miami International"},
  {value:"EGLL",label:"EGLL — London Heathrow"},
  {value:"LFPB",label:"LFPB — Paris Le Bourget"},
  {value:"LSZH",label:"LSZH — Zurich"},
  {value:"OMDB",label:"OMDB — Dubai International"},
  {value:"VHHH",label:"VHHH — Hong Kong"},
  {value:"RJTT",label:"RJTT — Tokyo Haneda"},
  {value:"UUEE",label:"UUEE — Moscow Sheremetyevo"},
  {value:"LEMD",label:"LEMD — Madrid Barajas"},
];

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — HOME
// ═══════════════════════════════════════════════════════════════════════════════
const HomePage = ({ navigate }) => {
  const heroStyle = {
    background:\`linear-gradient(170deg, \${C.coffee} 0%, \${C.coffeeMid} 50%, #2A1A0E 100%)\`,
    minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
    position:"relative", overflow:"hidden",
  };
  return (
    <div>
      {/* Hero */}
      <div style={heroStyle}>
        {/* Decorative lines */}
        {[0,1,2].map(i => (
          <div key={i} style={{ position:"absolute", top:0, bottom:0,
            left:\`\${20+i*30}%\`, width:"0.5px",
            background:\`linear-gradient(180deg, transparent, \${C.gold}22, transparent)\` }} />
        ))}
        <div style={{ textAlign:"center", padding:"0 24px", position:"relative", zIndex:1 }}>
          <div className="fade-up" style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:6,
            color:C.gold, textTransform:"uppercase", marginBottom:24 }}>
            Private Aviation · By Invitation Only
          </div>
          <div className="fade-up-2" style={{ fontFamily:fonts.display, fontSize:82, fontWeight:300,
            color:C.white, lineHeight:0.95, marginBottom:8, letterSpacing:2 }}>
            Above All
          </div>
          <div className="fade-up-2" style={{ fontFamily:fonts.display, fontSize:82, fontWeight:300,
            color:C.champagne, lineHeight:0.95, marginBottom:36, fontStyle:"italic", letterSpacing:2 }}>
            Expectations.
          </div>
          <GoldDivider style={{ maxWidth:320, margin:"0 auto 36px", className:"fade-up-3" }} />
          <div className="fade-up-3" style={{ fontFamily:fonts.body, fontSize:15, color:\`\${C.champagne}CC\`,
            maxWidth:500, margin:"0 auto 48px", lineHeight:1.8, letterSpacing:0.5 }}>
            The world's most discreet private aviation concierge, connecting distinguished individuals 
            with exceptional aircraft since 2018.
          </div>
          <div className="fade-up-4" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <GoldBtn onClick={() => navigate("register")}>Request Access</GoldBtn>
            <GoldBtn variant="outline" onClick={() => navigate("aircraft")}
              style={{ color:C.champagne, borderColor:C.champagne }}>View Fleet</GoldBtn>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background:C.beige, padding:"60px 40px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid",
          gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
          {[
            { n:"6", label:"Continents Served" },
            { n:"140+", label:"Aircraft in Fleet" },
            { n:"\$2.1B", label:"Flights Facilitated" },
            { n:"99.6%", label:"On-Time Departure" },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:"center", padding:"40px 20px",
              borderRight: i<3 ? \`1px solid \${C.border}\` : "none" }}>
              <div style={{ fontFamily:fonts.display, fontSize:48, fontWeight:300,
                color:C.coffee, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3,
                color:C.textLight, textTransform:"uppercase", marginTop:8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div style={{ background:C.offWhite, padding:"100px 40px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:4, color:C.gold,
              textTransform:"uppercase", marginBottom:16 }}>Our Services</div>
            <div style={{ fontFamily:fonts.display, fontSize:52, fontWeight:300,
              color:C.coffee, marginBottom:20 }}>Bespoke Aviation</div>
            <GoldDivider style={{ maxWidth:200, margin:"0 auto" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {[
              { icon:"✦", title:"Charter Brokerage", desc:"Access the finest verified aircraft from our curated global network. Every jet, every operator — fully vetted." },
              { icon:"◈", title:"Journey Management", desc:"Seamless door-to-door logistics, ground transport, FBO arrangements, customs clearance, and catering." },
              { icon:"◇", title:"Lifestyle Concierge", desc:"Onboard catering, destination experiences, security personnel, dedicated flight planning specialists." },
            ].map((s,i) => (
              <div key={i} style={{ background:C.cream, padding:"56px 44px",
                borderRight: i<2 ? \`1px solid \${C.border}\` : "none" }}>
                <div style={{ fontFamily:fonts.display, fontSize:32, color:C.gold,
                  marginBottom:24 }}>{s.icon}</div>
                <div style={{ fontFamily:fonts.display, fontSize:24, fontWeight:500,
                  color:C.coffee, marginBottom:16, letterSpacing:1 }}>{s.title}</div>
                <div style={{ fontFamily:fonts.body, fontSize:13, color:C.textMid,
                  lineHeight:1.9 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aircraft CTA */}
      <div style={{ background:\`linear-gradient(135deg, \${C.coffee}, \${C.coffeeMid})\`,
        padding:"120px 40px", textAlign:"center" }}>
        <div style={{ fontFamily:fonts.display, fontSize:54, fontWeight:300,
          color:C.white, marginBottom:16 }}>The Finest Fleet</div>
        <div style={{ fontFamily:fonts.body, fontSize:14, color:\`\${C.champagne}CC\`,
          marginBottom:48, maxWidth:500, margin:"0 auto 48px" }}>
          From ultra-long-range flagships to nimble super-midsize jets — every aircraft curated 
          for excellence.
        </div>
        <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
          <GoldBtn onClick={() => navigate("aircraft")}>Explore Fleet</GoldBtn>
          <GoldBtn variant="outline" onClick={() => navigate("request")}
            style={{ color:C.champagne, borderColor:C.champagne }}>
            Request a Flight
          </GoldBtn>
        </div>
      </div>

      {/* Access */}
      <div style={{ background:C.cream, padding:"100px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:4, color:C.gold,
            textTransform:"uppercase", marginBottom:16 }}>Membership</div>
          <div style={{ fontFamily:fonts.display, fontSize:52, fontWeight:300,
            color:C.coffee, marginBottom:24 }}>Invitation Only</div>
          <GoldDivider style={{ maxWidth:200, margin:"0 auto 32px" }} />
          <div style={{ fontFamily:fonts.body, fontSize:14, color:C.textMid, lineHeight:1.9,
            marginBottom:40 }}>
            Allen J. is not a public service. Access is extended by invitation through our network 
            of relationship managers. If you have received a private access code, you may register 
            below. To enquire about membership, please contact your agent.
          </div>
          <GoldBtn onClick={() => navigate("register")}>Register with Invitation Code</GoldBtn>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:C.coffee, padding:"60px 40px 40px", color:C.champagne }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
            <div>
              <Logo size="sm" />
              <div style={{ fontFamily:fonts.body, fontSize:12, color:\`\${C.champagne}88\`,
                marginTop:20, lineHeight:1.9, maxWidth:240 }}>
                Private aviation brokerage for the world's most discerning travelers. 
                Fully compliant with FAA, EASA, and international aviation regulations.
              </div>
            </div>
            {[
              { title:"Services", items:["Charter Flights","Fleet","Concierge","Flight Planning"] },
              { title:"Company", items:["About","Compliance","Privacy","Terms"] },
              { title:"Contact", items:["+1 212 800 0000","agents@allenjet.com","24/7 Operations"] },
            ].map((col,i) => (
              <div key={i}>
                <div style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3, color:C.gold,
                  textTransform:"uppercase", marginBottom:20 }}>{col.title}</div>
                {col.items.map(item => (
                  <div key={item} style={{ fontFamily:fonts.body, fontSize:12,
                    color:\`\${C.champagne}88\`, marginBottom:10 }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:\`1px solid \${C.coffeeMid}\`, paddingTop:24,
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontFamily:fonts.sans, fontSize:10, color:\`\${C.champagne}55\`,
              letterSpacing:2 }}>© 2025 Allen J. Elite Jet Concierge. All rights reserved.</div>
            <div style={{ fontFamily:fonts.sans, fontSize:10, color:\`\${C.champagne}55\`,
              letterSpacing:2 }}>FAA · EASA · ARGUS Platinum · IS-BAO</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — CLIENT REGISTRATION
// ═══════════════════════════════════════════════════════════════════════════════
const RegisterPage = ({ navigate }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    code:"", firstName:"", lastName:"", email:"", phone:"", dob:"",
    nationality:"", passport:"", address:"", city:"", country:"",
    employment:"", company:"", annualTravel:"", heardFrom:"agent",
    password:"", confirmPassword:"",
  });
  const [codeValid, setCodeValid] = useState(null);

  const VALID_CODES = ["AJC-INVITE-2025","HARTWELL-VIP","DIAMOND-ACCESS"];
  const f = (k,v) => setForm(p => ({...p,[k]:v}));

  const validateCode = () => {
    if(VALID_CODES.includes(form.code.toUpperCase())) {
      setCodeValid(true); setStep(2);
    } else { setCodeValid(false); }
  };

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"80px 24px" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <Logo navigate={navigate} />
          <div style={{ marginTop:32 }}>
            <div style={{ fontFamily:fonts.display, fontSize:38, fontWeight:300,
              color:C.coffee, marginBottom:8 }}>Client Registration</div>
            <div style={{ fontFamily:fonts.body, fontSize:12, color:C.textLight }}>
              An invitation code is required to proceed.
            </div>
          </div>
        </div>

        {/* Steps indicator */}
        <div style={{ display:"flex", justifyContent:"center", gap:0, marginBottom:48 }}>
          {["Invitation","Identity","Contact","Security"].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  background: step>i+1 ? C.gold : step===i+1 ? C.coffee : "transparent",
                  border: \`1px solid \${step>i ? C.gold : C.border}\`,
                  fontFamily:fonts.sans, fontSize:11, fontWeight:500,
                  color: step>i+1 ? C.white : step===i+1 ? C.white : C.textLight }}>
                  {step>i+1 ? "✓" : i+1}
                </div>
                <div style={{ fontFamily:fonts.sans, fontSize:9, letterSpacing:2,
                  color: step===i+1 ? C.gold : C.textLight,
                  textTransform:"uppercase" }}>{s}</div>
              </div>
              {i<3 && <div style={{ width:60, height:"0.5px", background:step>i+1?C.gold:C.border,
                marginBottom:22 }} />}
            </div>
          ))}
        </div>

        <div style={{ background:C.white, padding:"48px 48px", border:\`1px solid \${C.border}\` }}>
          {step===1 && (
            <div className="fade-up">
              <div style={{ fontFamily:fonts.display, fontSize:24, color:C.coffee, marginBottom:8 }}>
                Enter Your Invitation Code
              </div>
              <div style={{ fontFamily:fonts.body, fontSize:12, color:C.textLight, marginBottom:32 }}>
                Your personal invitation code was provided by your relationship manager. 
                Try: <code style={{ color:C.gold, fontFamily:fonts.mono }}>AJC-INVITE-2025</code>
              </div>
              <FormInput label="Invitation Code" value={form.code}
                onChange={e => f("code",e.target.value)} placeholder="e.g. AJC-INVITE-2025" required />
              {codeValid===false && (
                <div style={{ fontFamily:fonts.sans, fontSize:11, color:"#C0392B", marginBottom:16 }}>
                  Invalid invitation code. Please contact your relationship manager.
                </div>
              )}
              <GoldBtn onClick={validateCode} style={{ width:"100%" }}>Validate Code</GoldBtn>
            </div>
          )}

          {step===2 && (
            <div className="fade-up">
              <div style={{ fontFamily:fonts.display, fontSize:24, color:C.coffee, marginBottom:8 }}>
                Identity Verification
              </div>
              <div style={{ fontFamily:fonts.body, fontSize:12, color:C.textLight, marginBottom:32 }}>
                Required for KYC/AML compliance. All information is encrypted and handled confidentially.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
                <FormInput label="Legal First Name" value={form.firstName}
                  onChange={e=>f("firstName",e.target.value)} required style={{ paddingRight:12 }} />
                <FormInput label="Legal Last Name" value={form.lastName}
                  onChange={e=>f("lastName",e.target.value)} required style={{ paddingLeft:12 }} />
              </div>
              <FormInput label="Date of Birth" type="date" value={form.dob}
                onChange={e=>f("dob",e.target.value)} required />
              <FormInput label="Nationality" value={form.nationality}
                onChange={e=>f("nationality",e.target.value)} placeholder="e.g. American" required />
              <FormInput label="Passport Number" value={form.passport}
                onChange={e=>f("passport",e.target.value)} placeholder="e.g. US123456789" required />
              <FormSelect label="Occupation" value={form.employment}
                onChange={e=>f("employment",e.target.value)}
                options={[{value:"",label:"Select..."},{value:"exec",label:"C-Suite Executive"},
                  {value:"hnwi",label:"Private Investor / HNWI"},{value:"entrepreneur",label:"Entrepreneur"},
                  {value:"celebrity",label:"Entertainment / Sport"},{value:"diplomat",label:"Government / Diplomat"},
                  {value:"other",label:"Other"}]} />
              <div style={{ display:"flex", gap:12 }}>
                <GoldBtn variant="dark" onClick={() => setStep(1)} style={{ flex:1 }}>Back</GoldBtn>
                <GoldBtn onClick={() => setStep(3)} style={{ flex:2 }}>Continue</GoldBtn>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="fade-up">
              <div style={{ fontFamily:fonts.display, fontSize:24, color:C.coffee, marginBottom:8 }}>
                Contact Information
              </div>
              <div style={{ fontFamily:fonts.body, fontSize:12, color:C.textLight, marginBottom:32 }}>
                Your preferred contact details for reservation management.
              </div>
              <FormInput label="Email Address" type="email" value={form.email}
                onChange={e=>f("email",e.target.value)} required />
              <FormInput label="Mobile (with country code)" type="tel" value={form.phone}
                onChange={e=>f("phone",e.target.value)} placeholder="+1 212 555 0100" required />
              <FormInput label="Residential Address" value={form.address}
                onChange={e=>f("address",e.target.value)} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
                <FormInput label="City" value={form.city}
                  onChange={e=>f("city",e.target.value)} style={{ paddingRight:12 }} />
                <FormInput label="Country" value={form.country}
                  onChange={e=>f("country",e.target.value)} style={{ paddingLeft:12 }} />
              </div>
              <FormSelect label="How many trips per year?" value={form.annualTravel}
                onChange={e=>f("annualTravel",e.target.value)}
                options={[{value:"",label:"Select..."},{value:"1-5",label:"1–5"},
                  {value:"6-12",label:"6–12"},{value:"13-24",label:"13–24"},{value:"25+",label:"25+"}]} />
              <div style={{ display:"flex", gap:12 }}>
                <GoldBtn variant="dark" onClick={() => setStep(2)} style={{ flex:1 }}>Back</GoldBtn>
                <GoldBtn onClick={() => setStep(4)} style={{ flex:2 }}>Continue</GoldBtn>
              </div>
            </div>
          )}

          {step===4 && (
            <div className="fade-up">
              <div style={{ fontFamily:fonts.display, fontSize:24, color:C.coffee, marginBottom:8 }}>
                Account Security
              </div>
              <div style={{ fontFamily:fonts.body, fontSize:12, color:C.textLight, marginBottom:32 }}>
                Set a strong password for your private portal access.
              </div>
              <FormInput label="Choose Password" type="password" value={form.password}
                onChange={e=>f("password",e.target.value)} required />
              <FormInput label="Confirm Password" type="password" value={form.confirmPassword}
                onChange={e=>f("confirmPassword",e.target.value)} required />
              <div style={{ background:C.cream, padding:16, marginBottom:24,
                border:\`1px solid \${C.border}\` }}>
                <div style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:2,
                  color:C.textLight, textTransform:"uppercase", marginBottom:8 }}>
                  Compliance Acknowledgment
                </div>
                <div style={{ fontFamily:fonts.body, fontSize:11, color:C.textMid, lineHeight:1.8 }}>
                  By registering, I confirm I am the verified individual named above, I consent to 
                  identity verification in accordance with applicable AML/KYC regulations, and I agree 
                  to Allen J.'s Terms of Service and Privacy Policy.
                </div>
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <GoldBtn variant="dark" onClick={() => setStep(3)} style={{ flex:1 }}>Back</GoldBtn>
                <GoldBtn onClick={() => navigate("dashboard")} style={{ flex:2 }}>
                  Complete Registration
                </GoldBtn>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign:"center", marginTop:24 }}>
          <button onClick={() => navigate("login")}
            style={{ fontFamily:fonts.sans, fontSize:11, color:C.textLight,
              background:"none", border:"none", letterSpacing:1 }}>
            Already have an account? Sign in →
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
const LoginPage = ({ navigate, setClientName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    if (isAdmin) { navigate("admin"); return; }
    setClientName("Alexander Hartwell");
    navigate("dashboard");
  };

  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex",
      alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:460, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <Logo navigate={navigate} size="lg" />
          <div style={{ fontFamily:fonts.display, fontSize:15, fontWeight:300,
            color:C.textMid, marginTop:20, letterSpacing:1 }}>Private Portal Access</div>
        </div>

        <div style={{ background:C.white, padding:"48px 48px", border:\`1px solid \${C.border}\` }}>
          <GoldDivider style={{ marginBottom:32 }} />

          <div style={{ display:"flex", gap:0, marginBottom:32, border:\`1px solid \${C.border}\` }}>
            {[{label:"Client Login",v:false},{label:"Admin Access",v:true}].map((t,i) => (
              <button key={i} onClick={() => setIsAdmin(t.v)}
                style={{ flex:1, padding:"10px", fontFamily:fonts.sans, fontSize:10,
                  letterSpacing:2, textTransform:"uppercase", border:"none",
                  background: isAdmin===t.v ? C.coffee : "transparent",
                  color: isAdmin===t.v ? C.white : C.textLight, cursor:"pointer" }}>
                {t.label}
              </button>
            ))}
          </div>

          <FormInput label="Email Address" type="email" value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={isAdmin ? "admin@allenjet.com" : "your@email.com"} required />
          <FormInput label="Password" type="password" value={password}
            onChange={e=>setPassword(e.target.value)} placeholder="••••••••••" required />

          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:24 }}>
            <button style={{ fontFamily:fonts.sans, fontSize:11, color:C.gold,
              background:"none", border:"none", cursor:"pointer" }}>
              Forgot Password?
            </button>
          </div>

          <GoldBtn onClick={handleLogin} style={{ width:"100%" }}>
            {isAdmin ? "Access Admin Panel" : "Sign In"}
          </GoldBtn>

          <div style={{ textAlign:"center", marginTop:24,
            fontFamily:fonts.sans, fontSize:10, color:C.textLight, letterSpacing:1 }}>
            Demo: any email + any password
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:24 }}>
          <button onClick={() => navigate("register")}
            style={{ fontFamily:fonts.sans, fontSize:11, color:C.textLight,
              background:"none", border:"none", letterSpacing:1 }}>
            New client? Register with invitation code →
          </button>
        </div>
      </div>
    </div>
  );
};

// Simplified component exports for remaining pages
const RequestPage = ({ navigate }) => {
  const [form, setForm] = useState({ tripType:"one-way", from:"KTEB", to:"EGLL", date:"", returnDate:"", pax:"2", aircraft:"", luggage:"standard", catering:"standard", notes:"", groundTransport:false, security:false, medical:false });
  const f = (k,v) => setForm(p=>({...p,[k]:v}));
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:40 }}>
      <div style={{ maxWidth:560, textAlign:"center" }}>
        <div style={{ fontFamily:fonts.display, fontSize:64, color:C.gold, marginBottom:24 }}>◈</div>
        <div style={{ fontFamily:fonts.display, fontSize:42, fontWeight:300, color:C.coffee, marginBottom:16 }}>Request Received</div>
        <GoldDivider style={{ maxWidth:200, margin:"0 auto 24px" }} />
        <div style={{ fontFamily:fonts.body, fontSize:13, color:C.textMid, lineHeight:1.9, marginBottom:40 }}>Your flight request has been submitted. Your dedicated concierge will present tailored aircraft options and a comprehensive quote within 2 hours.</div>
        <GoldBtn onClick={() => navigate("dashboard")} style={{ minWidth:200 }}>Dashboard</GoldBtn>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontFamily:fonts.display, fontSize:48, fontWeight:300, color:C.coffee }}>Request a Flight</div>
          <GoldDivider style={{ maxWidth:200, margin:"24px auto 0" }} />
        </div>
        <div style={{ background:C.white, padding:"48px 48px", border:\`1px solid \${C.border}\` }}>
          <FormSelect label="Number of Passengers" value={form.pax} onChange={e=>f("pax",e.target.value)} options={Array.from({length:19},(_,i)=>({value:String(i+1),label:\`\${i+1} passenger\${i?'s':''}\`}))} />
          <GoldBtn onClick={() => setSubmitted(true)} style={{ width:"100%" }}>Submit Flight Request</GoldBtn>
        </div>
      </div>
    </div>
  );
};

const AircraftPage = ({ navigate }) => {
  const [selected, setSelected] = useState(null);
  if (selected) return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
      <button onClick={() => setSelected(null)} style={{ fontFamily:fonts.sans, fontSize:10, letterSpacing:3, color:C.textLight, background:"none", border:"none", textTransform:"uppercase", marginBottom:40, cursor:"pointer" }}>← Back</button>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ fontFamily:fonts.display, fontSize:36, fontWeight:300, color:C.coffee, marginBottom:24 }}>{selected.name}</div>
        <GoldBtn onClick={() => navigate("request")}>Request Flight</GoldBtn>
      </div>
    </div>
  );
  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ fontFamily:fonts.display, fontSize:52, fontWeight:300, color:C.coffee, marginBottom:48, textAlign:"center" }}>Curated Aircraft</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
          {AIRCRAFT.map(a => (
            <div key={a.id} onClick={() => setSelected(a)} style={{ background:C.white, cursor:"pointer", padding:"28px 28px" }}>
              <div style={{ fontFamily:fonts.display, fontSize:22, fontWeight:500, color:C.coffee, marginBottom:8 }}>{a.name}</div>
              <div style={{ fontFamily:fonts.display, fontSize:20, color:C.gold }}>\${a.priceHour.toLocaleString()}/hr</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuotePage = ({ navigate }) => (
  <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
    <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontFamily:fonts.display, fontSize:48, fontWeight:300, color:C.coffee, marginBottom:24 }}>Quote Center</div>
      <GoldBtn onClick={() => navigate("payment")}>View Quote</GoldBtn>
    </div>
  </div>
);

const PaymentPage = ({ navigate }) => {
  const [paid, setPaid] = useState(false);
  if (paid) return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:fonts.display, fontSize:64, color:C.gold, marginBottom:24 }}>✦</div>
        <div style={{ fontFamily:fonts.display, fontSize:42, fontWeight:300, color:C.coffee }}>Payment Confirmed</div>
        <GoldBtn onClick={() => navigate("dashboard")} style={{ marginTop:24 }}>Dashboard</GoldBtn>
      </div>
    </div>
  );
  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontFamily:fonts.display, fontSize:48, fontWeight:300, color:C.coffee, marginBottom:32, textAlign:"center" }}>Payment Center</div>
        <div style={{ background:C.white, padding:"40px 40px", border:\`1px solid \${C.border}\` }}>
          <GoldBtn onClick={() => setPaid(true)} style={{ width:"100%" }}>Process Payment</GoldBtn>
        </div>
      </div>
    </div>
  );
};

const ItineraryPage = ({ navigate }) => (
  <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 24px" }}>
    <div style={{ maxWidth:1000, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontFamily:fonts.display, fontSize:48, fontWeight:300, color:C.coffee }}>Travel Itinerary</div>
      <GoldBtn onClick={() => navigate("dashboard")} style={{ marginTop:24 }}>Dashboard</GoldBtn>
    </div>
  </div>
);

const ConciergePage = ({ navigate }) => (
  <div style={{ background:C.cream, minHeight:"100vh", padding:"100px 40px" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontFamily:fonts.display, fontSize:64, fontWeight:300, color:C.coffee, marginBottom:32 }}>Concierge Services</div>
      <GoldBtn onClick={() => navigate("request")}>Request a Flight</GoldBtn>
    </div>
  </div>
);

const ClientDashboard = ({ navigate }) => (
  <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 40px" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <div style={{ fontFamily:fonts.display, fontSize:42, fontWeight:300, color:C.coffee, marginBottom:32 }}>Welcome</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
        {[{ title:"New Flight", page:"request" }, { title:"Fleet", page:"aircraft" }, { title:"Concierge", page:"concierge" }].map(a => (
          <button key={a.page} onClick={() => navigate(a.page)} style={{ background:C.coffee, padding:"40px 24px", border:"none", cursor:"pointer", color:C.white, fontFamily:fonts.display, fontSize:20 }}>{a.title}</button>
        ))}
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ navigate }) => (
  <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 40px" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontFamily:fonts.display, fontSize:42, color:C.coffee, marginBottom:32 }}>Admin Panel</div>
      <GoldBtn onClick={() => navigate("home")}>Home</GoldBtn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [clientName, setClientName] = useState(null);

  const navigate = (p) => { setPage(p); window.scrollTo(0,0); };
  const noNav = ["login","register","admin"].includes(page);

  const pages = {
    home:      <HomePage navigate={navigate} />,
    register:  <RegisterPage navigate={navigate} />,
    login:     <LoginPage navigate={navigate} setClientName={setClientName} />,
    request:   <RequestPage navigate={navigate} />,
    aircraft:  <AircraftPage navigate={navigate} />,
    quotes:    <QuotePage navigate={navigate} />,
    payment:   <PaymentPage navigate={navigate} />,
    itinerary: <ItineraryPage navigate={navigate} />,
    concierge: <ConciergePage navigate={navigate} />,
    dashboard: <ClientDashboard navigate={navigate} clientName={clientName} />,
    admin:     <AdminDashboard navigate={navigate} />,
  };

  return (
    <div style={{ minHeight:"100vh", background:C.ivory }}>
      <GlobalStyles />
      {!noNav && <Nav navigate={navigate} current={page} clientName={clientName} />}
      {pages[page] || pages["home"]}
    </div>
  );
}
