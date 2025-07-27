
window.onload = function () {
  // ---- Element references ----
  const logodiv = document.getElementById('logodiv');
  const colldiv = document.getElementById('colldiv');
  const typediv = document.getElementById('typediv');
  const photodiv = document.getElementById('photodiv');
  const imagediv = document.getElementById('imagediv');
  const descriptiondiv = document.getElementById('descriptiondiv');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementsByClassName('close')[0];
  const modalPrevArrow = document.getElementById('modalPrevArrow');
  const modalNextArrow = document.getElementById('modalNextArrow');

  // ---- Cart drawer setup ----
  const cart = [];
  const cartDrawer = document.createElement('div');
  cartDrawer.id = 'cartDrawer';
  cartDrawer.style.position = 'fixed';
  cartDrawer.style.top = '0';
  cartDrawer.style.right = '-400px';
  cartDrawer.style.width = '300px';
  cartDrawer.style.height = '100%';
  cartDrawer.style.backgroundColor = 'white';
  cartDrawer.style.overflowY = 'auto';
  cartDrawer.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  cartDrawer.style.transition = 'right 0.3s';
  cartDrawer.style.boxSizing    = 'border-box';
cartDrawer.style.paddingBottom = '80px';    // or whatever extra space you need
  cartDrawer.style.padding = '20px';
  cartDrawer.style.zIndex = '999';
  document.body.appendChild(cartDrawer);

  
  // ---- Hover‑sound synth setup ----
  const synths = [
    new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.4 } }),
    new Tone.Synth({ oscillator: { type: "sine", modulationType: "triangle", modulation: 0.7 }, envelope: { attack: 1.2, decay: 1.3, sustain: 0.2, release: 0.5 } }),
    new Tone.AMSynth({ harmonicity: 1.2, carrier: { type: "triangle" }, modulator: { type: "sawtooth" } }),
    new Tone.Synth({ oscillator: { type: "sine", modulationType: "square", modulation: 1.2 }, envelope: { attack: 2.0, decay: 2.1, sustain: 0.2, release: 0.8 } })
  ].map(s => s.toDestination());

  function playRandomHoverSynth() {
    const s = synths[Math.floor(Math.random() * synths.length)];
    s.triggerAttackRelease("C5", 0.2);
  }

  document.addEventListener('mouseover', e => {
    const el = e.target;
    // if its computed cursor would be "pointer", override it
    if (window.getComputedStyle(el).cursor === 'pointer') {
      el.style.cursor = 'url("CURSORTCPYELLO.png"), auto';
    }
  });
  
  document.addEventListener('mouseout', e => {
    const el = e.target;
    // when leaving, reset back to black logo if we changed it
    if (el.style.cursor.includes('CURSORTCPYELLO.png')) {
      el.style.cursor = 'url("CURSORTCPB.png"), auto';
    }
  });

  const extraHoverIDs = ['logodiv','imagediv'];
  document.addEventListener('mouseover', e => {
    const el = e.target;
    const isDynamic = el.tagName === 'P' && (el.closest('#colldiv') || el.closest('#typediv') || el.closest('#photodiv'));
    const isExtra = extraHoverIDs.includes(el.id);
    const visible = window.getComputedStyle(el).visibility !== 'hidden' && window.getComputedStyle(el).display !== 'none';
    if ((isDynamic || isExtra) && visible) playRandomHoverSynth();
  });

  // — Play synth whenever the cursor switches to your logo —
document.addEventListener('mouseover', e => {
  const cur = window.getComputedStyle(e.target).cursor;
  // look for your custom-cursor URLs
  if (cur.includes('CURSORTCPB.png') || cur.includes('CURSORTCPYELLO.png')) {
    playRandomHoverSynth();
  }
});

  // ---- Data & gallery logic ----
  let currentCollection = "";
  let currentImages = [];
  let modalImageIndex = 0;
  let currentType = "";

  const data = {
    SS26: { types: ["Lookbook"], Lookbook: ["GG Kim"] },
    SS25: { types: ["Lookbook","Editorial"], Lookbook: ["Louis F. Cota"], Editorial: ["Chema Torres","Louis F. Cota*","Octavio Cruz"] },
    FW24: { types: ["Lookbook","Editorial"], Lookbook: ["Louis F. Cota**"], Editorial: ["Alberto Valle-Gutierrez","Hernan Esquinca","Ocean Adamovich Ortiz","Louis F. Cota***"] },
    SNET: { types: ["Exhibition","Film","Images"] },
    Press: { types: ["Office","dna","Paper"], Office: ["From LDN to NYC: Intimate Portraits of City Youth"], dna: ["Spectral Bonds"], Paper: ["Oklou Comes Back to Earth"] },
    Stockist: { types: ["WiG","Retail Pharmacy","APOC Store"] },
    Info: { types: ["About","Contact"] }
  };

  const descriptions = {
    "GG Kim": "From inside the cage, everyone appears behind bars. To be livestock is to live in the tension between breath and ownership: to move, to feel, to bleed, while being counted, priced, and contained. In the factories of flesh, animals are born not into life but into labor. Not as beings, but as yield. They are kept alive only to serve death, suspended in a state of extraction.<br><br> This is not far from how empire handles bodies it cannot recognize as sovereign. The Indigenous, the disabled, the colonized; named wild, named burden, named less-than. Like land mapped for conquest, or animals tagged for slaughter, we too are sorted, measured, and made legible to the market. The logics are parallel. The cages are the same.<br><br> Imperialism arrives not as chaos, but as grid. It wraps itself in order, in progress, in care, but its care is cold. Its language is smooth, efficient, deadly. It paves over kinship with profit, rewrites survival into stock. <br><br> LIVE-STOCK moves inside this contradiction. Through dress, through skin, through fabric that scratches and remembers, it asks what becomes of the wild when it is worn. It fuses military cut with feral texture, bodies clad in both resistance and wound. Here, clothing does not conceal; it reveals. The seams speak of containment. The folds remember escape.<br><br> To be called animal is not insult, but inheritance. The animal is not beneath—it is beside. Kin in captivity. Reflection in refusal. We claim it not to regress, but to remember. That there were once other ways. That care was once something softer.<br><br> We wear what they tried to erase. We wear it snarling. We wear it weeping. We wear it still.<br><br> The question remains:<br> Who gets caged?<br> Who gets consumed?<br> And who decides what violence is allowed?<br> We know it persists.<br><br>Photo– GG Kim",
    "Louis F. Cota": "Language, as many know it, is built around the sentence: linear, lettered, and grounded in a logic of beginnings and ends. It shapes not just communication, but how time is felt, how memory is held, and how relation is formed. Within alphabetic language, the self often appears as singular and fixed; knowledge is archived, ordered, and distanced.<br><br>Yet not all languages move this way. Beyond the sentence lie systems that speak through rhythm, repetition, and embodied relation. Languages like Khipu, pictography, and other ancestral forms do not store memory rather animate it. Non-lettered languages, grounded in material practice and collective time, where remembering is not linear but cyclical, alive, and co-created offer other ways of being with time. Ways of relating across generations, of knowing through the body rather than the page, of carrying knowledge in motion rather than stillness.<br><br>In a world increasingly shaped by Western linguistic structures and their logics of progress and permanence, these languages pose a quiet resistance. They hold space for what cannot be easily translated; for the sensory, the ancestral, the nonlinear. They challenge inherited tools that often encourage forgetting, especially when memory does not fit the frameworks of grammar and archive.<br><br>Sin Embargo moves within this tension. It explores dress not as surface or adornment, but as a living semiotic system, encoded through relation. Dress becomes a vessel for reremembering: not retrieval of what was, but a reorientation of what continues. Drawing from Signs of the Americas, Story of Your Life, and the short story Sin Embargo, the work asks: how might we expand language beyond the sentence? How might memory move when time is worn, not written?<br><br>Here, meaning lingers in fibers and gestures, in intergenerational acts of making and wearing. Language stretches, time loosens, and memory moves: fluid, embodied, and alive.<br><br> Creative Direction– Jordan Perdomo<br> Photo– Louis F. Cota<br> Post Production– Louis F. Cota, Jordan Perdomo<br> MUA– Qeto Chantadze<br> Styling– Errin Shin<br> Talent– Wife Erath, Izzy Ravana, Joaquín Echeverry Braver, Julian Wolfe, Chandni Amira Dhanoa<br> Production Assist– Brandon Salinas, Robin Singh Johal",
    "Chema Torres": "Direction– Jordan Perdomo, Joaquín E. Braver<br> Production– Joaquín E. Braver<br> Photo– Chema Torres<br> Post Production– Jordan Perdomo<br> Style– Javier Barrera<br> Assist– Emiliano Valdez<br> Talent– Paula Cintora Jaramillo, Mar Solares ",
    "Louis F. Cota*": "Creative Direction– Jordan Perdomo<br>  Photo– Louis F. Cota<br>  Post Production– Louis F. Cota, Jordan Perdomo <br> MUA– Qeto Chantadze<br>  Styling– Errin Shin<br>  Talent– Wife Erath, Izzy Ravana, Joaquín Echeverry Braver, Julian Wolfe, Chandni Amira Dhanoa<br>  Production Assist– Brandon Salinas, Robin Singh Johal ",
    "Octavio Cruz": "Direction– Jordan Perdomo, Octavio Cruz<br> Photo– Octavio Cruz<br> Post Production– Jordan Perdomo<br> Makeup– Octavio Cruz<br> Talent– Molly ",
    "Louis F. Cota**": "Land was once experienced as immediate and intimate, a scale defined by local surroundings, the rhythms of community, and deep, embodied relationships to place. Movement was limited, and identity was rooted in these physical connections. For many, land shaped not only geography but memory, belonging, and selfhood in ways inseparable from daily life.<br><br> Today, that groundedness is transformed. Rapid travel compresses physical distance, while the internet collapses space altogether; making distant people, stories, and knowledge instantly accessible. The vastness of land gives way to a new landscape of constant connection, where place is both fragmented by borders and simultaneously blurred by networks. This tension shapes how identity is lived and imagined, especially as ancestry transcends borders. The connection to ancestral lands is often less about physical presence and more about navigating layered, shifting spaces of memory, language, and culture; spaces reshaped by modern transit, digital access, and geopolitical boundaries.<br><br> In this negotiation between rootedness and mobility, between thought knowledge and experienced knowledge, emerges an ambivalence: a search for refuge in a world where land, borders, and language both constrain and enable belonging.<br><br> ¿@ DÓNDE FUIMOS? meditates on this complex terrain. The “@” symbol quietly gestures toward a disruption of fixed categories, challenging gendered language while evoking the continuous, networked flow of contemporary existence. The work invites reflection on how memory, identity, and belonging are constantly rerouted, reassembled, and carried forward beyond fixed places and definitions, searching for refuge in spaces that are fluid, layered, and alive.<br><br>Photo– Louis F. Cota<br> Creative Direction– Jordan Perdomo, Louis F. Cota<br> Styling– David Goldberg, Jordan Perdomo, G.G. Kim<br> Production– G.G. Kim<br> Talent– Mauricio Perdomo-Doncel, Joaquín Echeverry Braver, Joi Li, Danka Latorre, Jarrie Damir, Kevon Joseph, Balla Dia, Isaiah Gonzales<br> Assist– Brandon Salinas ",
    "Alberto Valle-Gutierrez": "Photo– Alberto Valle-Gutierrez<br> Direction– Jordan Perdomo, Alberto Valle-Gutierrez<br> Style– Jack pekarsky<br> Assist– Brandon Salinas<br> Talent– Wife Erath, Immanuel Sealy",
    "Hernan Esquinca": "Photo– Hernan Esquinca<br> Assist– G.G. Kim<br> Talent– Joaquín Echeverry Braver, Cesar Guilhoux, Santiago Dominguez ",
    "Ocean Adamovich Ortiz": "Photo– Ocean Adamovich Ortiz<br> Style– Ocean Adamovich Ortiz<br> Model– Alyse ",
    "Louis F. Cota***": "Photo– Louis F. Cota<br> Creative Direction– Jordan Perdomo, Louis F. Cota<br> Styling– David Goldberg, Jordan Perdomo, G.G. Kim<br> Production G.G. Kim<br> Talent– Mauricio Perdomo-Doncel, Joaquín Echeverry Braver, Joi Li, Danka Latorre, Jarrie Damir, Kevon Joseph, Balla Dia, Isaiah Gonzales Assist– Brandon Salinas ",
    "Film": "Director– Louis F. Cota<br> Creative Directors– Jordan Perdomo, Louis F Cota<br> Brand Designer– Jordan Perdomo<br> Executive Producer– Jordan Perdomo<br> Producer– Chandni Amira Dhanoa<br> Production Assistant– Brandon Salinas<br> Set Design– Chandni Amira Dhanoa<br> Styling– Miracle<br> Casting Director– Dax Reedy <br>Talent– Ava Anita, Peezy<br> On-set photographer– Louis F. Cota ",
    "Images": "Director– Louis F. Cota<br> Creative Directors– Jordan Perdomo, Louis F Cota<br> Brand Designer– Jordan Perdomo<br> Executive Producer– Jordan Perdomo<br> Producer– Chandni Amira Dhanoa<br> Production Assistant– Brandon Salinas<br> Set Design– Chandni Amira Dhanoa<br> Styling– Miracle<br> Casting Director– Dax Reedy <br>Talent– Ava Anita, Peezy<br> On-set photographer– Louis F. Cota ",
    "Exhibition": "​​snet [2025] a TCP short film directed by Louis F Cota in collaboration with Jordan Perdomo - Displayed at xpan.ep.t [paris.25] - Opened to the public from 01/15 to 01/30 2025 at [20 pass. saint-sébastien 75011, Paris, France 48.861666, 2.36939]",
    "From LDN to NYC: Intimate Portraits of City Youth": '<a href="https://officemagazine.net/ldn-nyc-intimate-portraits-city-youth" target="_blank">https://officemagazine.net/ldn-nyc-intimate-portraits-city-youth</a>',
    "Spectral Bonds": '<a href="https://dnamag.mx/spectral-bonds/" target="_blank">https://dnamag.mx/spectral-bonds/</a>',
    "Oklou Comes Back to Earth":'<a href="https://www.papermag.com/oklou-choke-enough-album#rebelltitem2" target="_blank">https://www.papermag.com/oklou-choke-enough-album#rebelltitem2</a>',
    "About": "Prospection according to space.<br><br> A project by Jordan Perdomo.",
    "Contact": "thecornerpassed@gmail.com<br><br>@_tcp_tcp_", 
    "WiG": "Barcelona 8, Juarez, CDMX, Mexico.<br><br>https://www.instagram.com/____wig____/<br>www.wig.mx",
    "Retail Pharmacy": "39 A Henry St., New York, New York 10002<br><br>https://www.instagram.com/retail_pharmacy/<br>www.retail-pharmacy.com",
    "APOC Store":"Unit 41, Regent Studios, 8 Andrews Road, London Fields, London E8<br><br>https://www.instagram.com/apocstore/<br>https://apoc-store.com/",
  };
  const imageSets = {
    "GG Kim": ["https://res.cloudinary.com/djdu9iqeu/image/upload/IMG_0363_2_Large_utp3sy.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276784/IMG_0365_Large_sxcpmu.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276783/IMG_0371_Large_hgje6i.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276783/IMG_0378_Large_o85wdb.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276820/IMG_0386_Large_m2l4ix.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276822/IMG_0444_Large_gwbobh.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0453_Large_io0bwo.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0461_Large_ajd5m9.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0476_Large_iigmhe.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276825/IMG_0480_Large_bdvefv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0506_Large_idgsvf.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0513_Large_ccjkff.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0519_Large_trb5d6.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0553_Large_gw03l0.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0567_Large_oerdk8.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0606_Large_egbvpz.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0595_Large_l9oybx.png"],
    "Louis F. Cota": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277114/SS25.1_tabphj.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277119/SS25.2_q0ujay.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277116/SS25.3_y68awj.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277117/SS25.4_lopfp3.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277115/SS25.5_uch4jp.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277118/SS25.6_penxdh.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.7_stvwns.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.8_opayqi.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.9_jkzb4f.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277123/SS25.10_xsrbjr.jpg"],
    "Chema Torres": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278398/F_C_1_u8pyiv.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278397/F_C_2.1_xkmhdc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278397/F_C_2_kmrurc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278400/F_C_3.1_cjuiqk.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278395/F_C_4_yedeei.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278398/F_C_5.1_heeuxe.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278402/F_C_5.2_tu8yij.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278403/F_C_5_vmn85x.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278401/F_C_6.1_o4gmee.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278404/F_C_6_xbfsid.jpg"],
    "Octavio Cruz": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277267/Tavio.2_onvt9a.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277268/Tavio.3_ntn7ik.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277269/Tavio.11_jcbmga.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277269/Tavio.12_zurcs3.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277270/Tavio.13_ifo6yg.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277271/Tavio.21_ql9nwo.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277274/Tavio.24_dfvxqj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277273/Tavio.31_akhu3y.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277273/Tavio.32_jxsawo.jpg"],
    "Alberto Valle-Gutierrez": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280499/003_yjevjf.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280505/004_1_bks2tl.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280503/013_f1lsgn.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280505/016_ajytgb.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280507/018_hflb81.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280508/DSC_0218_02_kancap.jpg"],
    "Louis F. Cota*": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278551/__b_L1_1_LB1_EDITORIAL_001_Large_ovtvna.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278569/__b_L1_1_LB1_EDITORIAL_002_rngdng.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278550/__b_L1_1_LB1_EDITORIAL_004_Large_zgngtj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278555/__b_L1_1_LB1_EDITORIAL_alt003_qfaf1d.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L2_1_LB1_EDITORIAL_007_gnfkkc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_008_wxq796.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_008_wxq796.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_009_xmfe7d.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277857/__b_L4_1_LB1_EDITORIAL_0012_Large_o7pebx.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277865/__b_L4_1_LB1_EDITORIAL_0013_ua5zz4.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277858/__b_L4_1_LB1_EDITORIAL_0015_Large_ykqkos.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278310/__d_L1_1_LB2_EDITORIAL_0016_Large_kxhddn.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278312/__d_L1_1_LB2_EDITORIAL_0018_Large_cw6rid.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278334/__d_L1_1_LB2_EDITORIAL_alt002_zzzzga.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278327/__d_L1_1_LB2_EDITORIAL_alt004_cahccg.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278332/__d_L2_1_LB2_EDITORIAL_0020_mime6q.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278318/__d_L2_1_LB2_EDITORIAL_0021_Large_ch4bpj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278318/__d_L2_1_LB2_EDITORIAL_0022_Large_igi6pv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L2_1_LB2_EDITORIAL_alt003_ewomuj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L3_1_LB2_EDITORIAL_alt002_fm3mzx.jpg","Shttps://res.cloudinary.com/djdu9iqeu/image/upload/v1748278333/__d_L3_1_LB2_EDITORIAL_alt006_gzozsi.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278344/__d_L3_1_LB2_EDITORIAL_alt0012_ynrctj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L3_1_LB2_EDITORIAL_alt002_fm3mzx.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278346/__f_L1_1_LB3_EDITORIAL_alt005_bfnabr.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278351/__f_L1_1_LB3_EDITORIAL_alt0020_aeztjt.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278357/__f_L2_1_LB3_EDITORIAL_0030_msfrwf.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278361/__f_L2_1_LB3_EDITORIAL_alt003_amgrkq.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278358/__f_L2_1_LB3_EDITORIAL_alt002_qlcbif.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278361/__f_L2_1_LB3_EDITORIAL_alt003_amgrkq.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278360/__f_L2_1_LB3_EDITORIAL_alt007_jk6nb6.png"],
    "Louis F. Cota**": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280715/FW26.1_vcnc0z.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280715/FW26.2_Large_odqsnj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280716/FW26.3_Large_ptidks.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280717/FW26.4_Large_c3re2e.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280719/FW26.5_Large_qbksbg.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280823/FW26.6_Large_bwrzjm.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280825/FW26.7_Large_xvnuhc.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280827/FW26.8_Large_teybpg.png"],
    "Hernan Esquinca": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279950/CESAR_TCP_1.2-2_Large_pxougp.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279949/CESAR_TCP_1_Large_cprdao.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279952/JOAQUIN_TCP_1.3_Large_yshzmo.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280474/JOAQUIN_TCP_1.4_Large_zquhju.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280476/SANTIAGO_TCP_1.3_Large_ntnebv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280478/SANTIAGO_TCP_3.2_Large_jextyn.png"],
    "Ocean Adamovich Ortiz": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279149/IMG_1028_zfch9c.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279152/IMG_1103_qdrhph.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279152/IMG_1122_dvttjk.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279153/IMG_1190_skv48n.jpg"],
    "Louis F. Cota***": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279317/_MG_8469_rpirwq.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279562/4_copy_Large_xrwiu4.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279569/Screen_Shot_2023-12-28_at_4.19.49_PM_copy_dvkb8h.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279571/Screen_Shot_2023-12-28_at_4.22.04_PM_copy_ss1ixz.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279573/Screen_Shot_2023-12-28_at_4.22.56_PM_copy2_nprakb.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279574/Screen_Shot_2023-12-28_at_4.23.55_PM_copy_f1agez.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279574/TCPLFC001_3copy_Large_rjjk2v.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279575/TCPLFC002_Large_r2ydqr.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279576/TCPLFC005_Large_ct2zf1.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279868/TCPLFC008_Large_dtten0.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279880/TCPLFC025_Large_fkjs5x.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748279883/TCPLFC00144_copy_tafdsv.jpg"],
    "Film": ["https://res.cloudinary.com/djdu9iqeu/video/upload/v1748283799/SNETFILM_1_mq2t7g.mp4"],
    "Images": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281346/_MG_5780_Large_rg5dct.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281348/_MG_5836_Large_n3d4jm.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281350/_MG_5863_2_Large_buh9fr.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281354/_MG_5883_jvxtbz.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281355/_MG_6182_Large_agsz1z.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281359/Screenshot_2025-01-24_at_2.07.36_PM_izwsv1.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281363/Screenshot_2025-01-24_at_2.08.57_PM_pv5t46.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281362/snet.tcp001_Large_qlfulm.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281402/snet.tcp0022_zkh6zm.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281399/snet.tcp0023_naahsu.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281397/snet.tcp0021_v5aeng.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281392/snet.tcp0018_Large_dsncvs.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281390/snet.tcp0017_Large_cnxnmv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281389/snet.tcp0013_inleak.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281388/snet.tcp0015_Large_tnhpxv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281383/snet.tcp0012_xopsgo.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281381/snet.tcp0011_wztmi1.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281380/snet.tcp009_zvpxra.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281379/snet.tcp0010_t5tter.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281377/snet.tcp008_nleht9.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281372/snet.tcp007_Large_v347xg.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281370/snet.tcp005_Large_brd30b.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281368/snet.tcp004_Large_ljk1fu.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281365/snet.tcp003_Large_tn11bs.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281363/snet.tcp002_Large_moiuet.png",""],
    "Exhibition": ["https://res.cloudinary.com/djdu9iqeu/video/upload/v1748282177/IMG_0576_aenixq.mov","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281857/_DSF1144_bnndef.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281859/002_mq3pyp.jpg"],
    "From LDN to NYC: Intimate Portraits of City Youth": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739613/alex_josie_4_tcufkt.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739613/iris_parker_3_c2tx9c.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739613/alex_josie_2_qblvqf.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739612/iris_parker_2_tgo084.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739610/alex_josie_3_uvm78d.jpg"],
    "Spectral Bonds": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1751741566/Copy_of_Untitled_Capture15752_q4msrm.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751741565/Copy_of_Untitled_Capture15677_wypvha.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751741565/Copy_of_Untitled_Capture15816_ewdtyn.jpg"],
    "Oklou Comes Back to Earth": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739715/img.jpg_dmtz6l.webp","https://res.cloudinary.com/djdu9iqeu/image/upload/v1751739715/img.jpg-2_h4ezw4.webp"],
  };
    const longDescKeys = ['GG Kim','Louis F. Cota','Louis F. Cota**'];

    function updateDescription(key) {
      const descP = document.getElementById('descp');
      if (descP) descP.innerHTML = descriptions[key] || "";
      const isLong = longDescKeys.includes(key);
      descriptiondiv.style.alignItems = 'flex-end';
      descriptiondiv.style.justifyContent = isLong ? 'flex-start' : 'flex-end';
      if (descP) descP.style.marginTop = isLong ? 'auto' : '0';
      descriptiondiv.style.visibility = 'visible';
    }
    function showModalImage(index) {
      if (!currentImages.length) return;
      modalImageIndex = (index + currentImages.length) % currentImages.length;
      modal.style.display = 'block';
      modalImg.src = currentImages[modalImageIndex];
      // show or hide arrows
      modalPrevArrow.style.display = currentImages.length > 1 ? 'block' : 'none';
      modalNextArrow.style.display = currentImages.length > 1 ? 'block' : 'none';
    }

// — Hover swap for the arrows —
modalPrevArrow.addEventListener('mouseenter', () => {
  modalPrevArrow.src = 'ARROWLEFT.png';
});
modalPrevArrow.addEventListener('mouseleave', () => {
  modalPrevArrow.src = 'ARROWLEFTBLACK.png';
});
modalNextArrow.addEventListener('mouseenter', () => {
  modalNextArrow.src = 'ARROWRIGHT.png';
});
modalNextArrow.addEventListener('mouseleave', () => {
  modalNextArrow.src = 'ARROWRIGHTBLACK.png';
});

// — Click + synth for the arrows —
modalPrevArrow.addEventListener('click', e => {
  playRandomHoverSynth();
  showModalImage(modalImageIndex - 1);
});
modalNextArrow.addEventListener('click', e => {
  playRandomHoverSynth();
  showModalImage(modalImageIndex + 1);
});
  document.addEventListener('keydown', e => {
    if (modal.style.display==='block') {
      if (e.key==='Escape') closeModal();
      if (e.key==='ArrowLeft') showModalImage(modalImageIndex-1);
      if (e.key==='ArrowRight') showModalImage(modalImageIndex+1);
    }
  });

  function flashArrow(el,y,n,d=100){ el.src=y; setTimeout(()=>el.src=n,d); }
  document.addEventListener('keydown', e => {
    if (e.key==='ArrowLeft')  flashArrow(modalPrevArrow,"ARROWLEFT.png","ARROWLEFTBLACK.png");
    if (e.key==='ArrowRight') flashArrow(modalNextArrow,"ARROWRIGHT.png","ARROWRIGHTBLACK.png");
  });

  function openModal(src){ showModalImage(currentImages.indexOf(src)); }
  function closeModal() {
    modal.style.display='none';
    modalPrevArrow.style.display=modalNextArrow.style.display='none';
  }
  closeBtn.onclick = closeModal;
  modal.onclick = e => { if(e.target===modal) closeModal(); };

  function hideDescription() {
    descriptiondiv.style.visibility='hidden';
    descriptiondiv.style.alignItems='flex-end';
    descriptiondiv.style.justifyContent='flex-end';
    document.getElementById('descp').style.marginTop='0';
  }

  function cleanPhotographerName(name) {
    if (name.startsWith("Louis F. Cota")) {
      return "Louis F. Cota";
    }
    return name;
  }

  if (!logoClicked) {
    logoClicked = true;
    logodiv.style.visibility = 'hidden';
    await Tone.start();
    const volume = new Tone.Volume(-60).toDestination();
    const synth = new Tone.Synth({ 
      oscillator: { type: "sine" }, 
      envelope: { attack: 0.5, decay: 0.1, sustain: 0.8, release: 0.1 } 
    }).connect(volume);
    volume.volume.linearRampToValueAtTime(1, Tone.now() + 2);
    synth.triggerAttackRelease("E4", 2);
    Tone.Transport.scheduleOnce(() => synth.triggerAttackRelease("C5", 0.1), "+2");
    Tone.Transport.start();
    setTimeout(() => {
      logodiv.classList.remove('centered');
      logodiv.style.visibility = 'visible';
      colldiv.style.visibility = 'visible';
    }, 2000);
  } 
  
  // Subsequent clicks (navigation reset)
  else {
    // Play a quick sound for feedback
    playRandomHoverSynth();
    
    // Reset navigation to initial state (only colldiv visible)
    resetToInitialNavigation();
  }
});

// Add this new function to reset navigation
function resetToInitialNavigation() {
  // Hide all secondary navigation elements
  typediv.style.visibility = 'hidden';
  photodiv.style.visibility = 'hidden';
  imagediv.style.visibility = 'hidden';
  descriptiondiv.style.visibility = 'hidden';
  
  // Clear content from secondary divs
  typediv.innerHTML = '';
  photodiv.innerHTML = '';
  imagediv.innerHTML = '';
  
  // Reset description structure
  if (!document.getElementById('descp')) {
    descriptiondiv.innerHTML = '<p id="descp"></p>';
  } else {
    document.getElementById('descp').innerHTML = '';
  }
  
  // Reset description div styling
  descriptiondiv.style.alignItems = 'flex-end';
  descriptiondiv.style.justifyContent = 'flex-end';
  document.getElementById('descp').style.marginTop = '0';
  
  // Reset current state variables
  currentCollection = "";
  currentImages = [];
  modalImageIndex = 0;
  currentType = "";
  
  // Ensure colldiv stays visible
  colldiv.style.visibility = 'visible';
  
  // Close any open modals or cart
  if (modal.style.display === 'block') {
    closeModal();
  }
  
  // Close cart drawer if open
  if (cartDrawer.style.right === '0px' || cartDrawer.style.right === '0') {
    closeCartDrawer();
  }
}


  function resetLayout() {
    typediv.style.visibility = '';
    photodiv.style.visibility = '';
    imagediv.style.visibility = '';
    descriptiondiv.style.visibility = '';
    // Restore description structure!
    if (!document.getElementById('descp')) {
      descriptiondiv.innerHTML = '<p id="descp"></p>';
    }
    // Optionally clear images/content
    imagediv.innerHTML = '';
    photodiv.innerHTML = '';
    typediv.innerHTML = '';
  }
  

// ---- Delegated collection click handler (fixed with .closest('p')) ----
colldiv.addEventListener('click', (e) => {

  
  // find the nearest <p> parent of whatever was clicked
  const p = e.target.closest('p');
  // bail if it's not in colldiv, or it's the Cart button, or a separator
  if (!p || !colldiv.contains(p) || p.id === 'cartBtn' || p.innerText.trim() === '—') return;
  resetLayout();

  const name = p.innerText.trim();
  currentCollection = name;

  // clear previous view
  typediv.innerHTML        = '';
  photodiv.innerHTML       = '';
  imagediv.innerHTML       = '';
  typediv.style.visibility = 'hidden';
  photodiv.style.visibility= 'hidden';
  imagediv.style.visibility= 'hidden';

  const descDiv = document.getElementById('descriptiondiv');
if (descDiv) {
  descDiv.style.visibility = 'hidden';
  descDiv.style.alignItems = 'flex-end';
  descDiv.style.justifyContent = 'flex-end';
  const descP = document.getElementById('descp');
  if (descP) descP.style.marginTop = '0';
}

  currentImages = [];
  currentType   = '';

  if (name === 'Shop') {
    
    // —— Shopify GraphQL fetch & product rendering ——
    const domain = "wu11xs-wt.myshopify.com";
    const storefrontAccessToken = "5f9f5f73304b893cf0cf26d2de0f294a";
const query = `
{
  collectionByHandle(handle: "all-products") {
    products(first: 10, sortKey: MANUAL) {
      edges {
        node {
          id
          title
          descriptionHtml
          variants(first: 10) {
            edges { node { id title selectedOptions {
       name
       value
     }availableForSale priceV2 { amount currencyCode } } }
          }
          images(first: 15) {
            edges { node { url
            altText } }
          }
        }
      }
    }
  }
}`


    fetch(`https://${domain}/api/2023-07/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then(data => {
      const products = data.data.collectionByHandle.products.edges;
      typediv.innerHTML = '';

      products.forEach(edge => {
        const prod = edge.node;
        const pEl = document.createElement('p');
        pEl.innerText = prod.title;
        pEl.style.whiteSpace = 'nowrap';
        typediv.appendChild(pEl);

        pEl.addEventListener('click', () => {

          descriptiondiv.style.alignItems = 'flex-start';
          descriptiondiv.style.justifyContent = 'flex-start';
          
          // clear detail view
          imagediv.innerHTML = '';
          descriptiondiv.innerHTML = '';



          // description + price
          const firstVar = prod.variants.edges[0].node;
          const priceFmt = `$${parseInt(firstVar.priceV2.amount)} ${firstVar.priceV2.currencyCode}`;
          descriptiondiv.innerHTML =
            `${prod.descriptionHtml}
            <p>Price:</strong> ${priceFmt}</p>`;

// ─── reset state ───

let selectedColor   = null;
let colorChosen  = false;   // only true once user clicks
let selectedSize    = null;
let selectedVariant = null;

// ─── Color picker ───
const colorLabel = document.createElement('p');
colorLabel.innerText = 'Color:';
descriptiondiv.appendChild(colorLabel);

const colorBtnDiv = document.createElement('div');
colorBtnDiv.style.cssText = 'display:flex; gap:10px; margin-top:10px;';
descriptiondiv.appendChild(colorBtnDiv);

const allColors = [
  ...new Set(
    prod.variants.edges.map(e =>
      e.node.selectedOptions.find(o => o.name === 'Color').value
    )
  )
];

// pick the first color by default:
selectedColor = allColors[0];

// now show just that color’s images:
renderImagesForColor();



function renderImagesForColor() {
  imagediv.innerHTML = '';
  
  // 1) try to get only the images tagged with the chosen color
  let imagesForColor = prod.images.edges
    .filter(ei => ei.node.altText === selectedColor)
    .map(ei => ei.node.url);
  
  // 2) if none have altText (or none match), fall back to all images
  if (imagesForColor.length === 0) {
    currentImages = prod.images.edges.map(ei => ei.node.url);
  } else {
    currentImages = imagesForColor;
  }
  
  // 3) render whichever set we're using
  currentImages.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
// 1) remove cursor:pointer
img.style.cssText = 'max-width:100%;margin-bottom:20px;';
// 2) set your black‑logo cursor by default
img.style.cursor = 'url("CURSORTCPB.png"), auto';
// 3) swap to yellow‑logo on hover
img.addEventListener('mouseenter', () => {
  img.style.cursor = 'url("CURSORTCPYELLO.png"), auto';
});
img.addEventListener('mouseleave', () => {
  img.style.cursor = 'url("CURSORTCPB.png"), auto';
});
    img.addEventListener('click', () => showModalImage(i));
    imagediv.appendChild(img);
  });
  
  imagediv.style.visibility = 'visible';
}



// ─── 3) initial render ───
renderImagesForColor();


allColors.forEach(color => {
  const btn = document.createElement('button');
  btn.textContent = color;
  btn.style.cssText =
    'padding:1px;border:1px solid black;cursor:pointer;background:white;color:black;'
  + 'transition:background-color 0.2s, color 0.2s;'
  + 'width:75px; aspect-ratio:16/9; display:inline-flex; align-items:center; justify-content:center;';

  // hover preview
  btn.addEventListener('mouseenter', () => {
    // always preview highlight
    btn.style.background = 'black';
    btn.style.color      = 'white';
  });
// ↑ NEW MOUSELEAVE (that checks a .clicked class) ↑
btn.addEventListener('mouseleave', () => {
  if (btn.classList.contains('clicked')) {
    btn.style.background = 'black';
    btn.style.color      = 'white';
  } else {
    btn.style.background = 'white';
    btn.style.color      = 'black';
  }
});
  

btn.addEventListener('click', () => {
  // clear any previous “clicked” styling
  colorBtnDiv.querySelectorAll('button').forEach(b => {
    b.classList.remove('clicked');
    b.style.background = 'white';
    b.style.color      = 'black';
  });

  // mark this one as clicked
  btn.classList.add('clicked');
  btn.style.background = 'black';
  btn.style.color      = 'white';

  // update state
  selectedColor = color;
  colorChosen   = true;

  // re–render sizes
  renderSizeOptions();

  // if a size was already selected, re–highlight it and re–derive the variant
  if (selectedSize) {
    Array.from(sizeBtnDiv.children).forEach(b => {
      if (b.textContent === selectedSize) {
        b.style.background = 'black';
        b.style.color      = 'white';
      }
    });
    const matchEdge = prod.variants.edges.find(e => {
      const opts = e.node.selectedOptions;
      return opts.find(o => o.name === 'Color').value === selectedColor &&
             opts.find(o => o.name === 'Size').value  === selectedSize;
    });
    if (matchEdge) selectedVariant = matchEdge.node;
  }

  // now update the Add‑to‑Cart button
  setupAddButton();

  // swap the images
  renderImagesForColor();
});


  

  colorBtnDiv.appendChild(btn);
});






// ─── Size picker (dynamically rendered) ───
let sizeBtnDiv;
function renderSizeOptions() {
  // remove the old size picker if it exists…
  if (sizeBtnDiv) {
    sizeBtnDiv.previousSibling.remove();  // remove “Size:” label
    sizeBtnDiv.remove();
  }

  // 1) Size label
  const sizeLabel = document.createElement('p');
  sizeLabel.innerText = 'Size:';
  

  // 2) Size buttons container
  sizeBtnDiv = document.createElement('div');
  sizeBtnDiv.style.cssText = 'display:flex; gap:10px; margin-top:10px;';
 
  descriptiondiv.insertBefore(sizeLabel, addButton);
  descriptiondiv.insertBefore(sizeBtnDiv, addButton);

  // 3) Decide which sizes to show:
  const sizes = [
    ...new Set(
      prod.variants.edges
        .filter(e => {
          if (!selectedColor) return true;                                  // no color? show everything
          return e.node.selectedOptions.find(o=>o.name==='Color').value === selectedColor;
        })
        .map(e => e.node.selectedOptions.find(o=>o.name==='Size').value)
    )
  ];

  sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.style.cssText = (
      'padding:10px;border:1px solid black;cursor:pointer;background:white;color:black;'
    + 'transition:background-color 0.2s, color 0.2s;'
    + 'width:40px; aspect-ratio:5/4; display:inline-flex; align-items:center; justify-content:center;'
    );

    btn.addEventListener('mouseenter', () => {
      if (selectedSize !== size) {
        btn.style.background = 'black';
        btn.style.color      = 'white';
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (selectedSize !== size) {
        btn.style.background = 'white';
        btn.style.color      = 'black';
      }
    });

    btn.addEventListener('click', () => {
      selectedSize = size;
      // reset all size buttons
      Array.from(sizeBtnDiv.children).forEach(b => {
        b.style.background = 'white';
        b.style.color      = 'black';
      });
      // highlight current
      btn.style.background = 'black';
      btn.style.color      = 'white';

      // now lock in the exact variant
      const matchEdge = prod.variants.edges.find(e => {
        const opts = e.node.selectedOptions;
        return (
          opts.find(o=>o.name==='Color').value === selectedColor &&
          opts.find(o=>o.name==='Size').value  === selectedSize
        );
      });
      if (matchEdge) selectedVariant = matchEdge.node;
      setupAddButton();
    });

    sizeBtnDiv.appendChild(btn);
  });
  // if we already have a selectedSize, re‑style that button
if (selectedSize) {
  Array.from(sizeBtnDiv.children).forEach(b => {
    if (b.textContent === selectedSize) {
      b.style.background = 'black';
      b.style.color      = 'white';
    }
  });
}

}


          

          // add‑to‑cart button
          const addButton = document.createElement('button');
          function setupAddButton(){
            // require both a real color‑click AND a size‑click
            if (!colorChosen || !selectedSize) {
              addButton.textContent = 'Select Options';
              addButton.disabled = true;
              addButton.style.cssText =
                'margin-top:15px;width:100%;padding:10px;'
                + 'background:#eee;color:#666;'
                + 'border:1px solid black;cursor:not-allowed;';
              return;
            }
          
            // once both are chosen, do your normal in‑stock check:
            addButton.textContent = selectedVariant.availableForSale ? 'Add to Cart' : 'SOLD OUT';
            addButton.disabled    = !selectedVariant.availableForSale;
            addButton.style.cssText = 'margin-top:15px;width:100%;padding:10px';
          
            if (selectedVariant.availableForSale) {
              addButton.style.cssText +=
                ';background:white;color:black;'
                + 'border:1px solid black;cursor:pointer';
              addButton.onmouseenter = () => {
                addButton.style.background = 'black';
                addButton.style.color      = 'white';
              };
              addButton.onmouseleave = () => {
                addButton.style.background = 'white';
                addButton.style.color      = 'black';
              };
            } else {
              addButton.style.cssText +=
                ';background:#eee;color:#666;'
                + 'border:1px solid black;cursor:not-allowed';
            }
          }
          
          descriptiondiv.appendChild(addButton);
          renderSizeOptions();
          
          setupAddButton();

          // ─── NOW insert your hover‑reset snippet ───
if (allColors.length) {
  // Temporarily pick first color so sizes & images render
  selectedColor = allColors[0];
  renderSizeOptions();
  renderImagesForColor();



  // Reset the button state now that no color is selected
  setupAddButton();
}


          addButton.addEventListener('click', e => {
            e.stopPropagation();
            if (!selectedVariant.availableForSale) return;
            const match = prod.images.edges.find(
              ei => ei.node.altText === selectedColor
            );
            cart.push({
              title: prod.title,
              variantTitle: selectedVariant.title,
              price: selectedVariant.priceV2.amount,
              id: selectedVariant.id,
              image: match ? match.node.url : prod.images.edges[0].node.url
            });
            updateCartDrawer();
            openCartDrawer();
          });

          descriptiondiv.appendChild(addButton);
          descriptiondiv.style.visibility = 'visible';

          // images
          renderImagesForColor();
        });
      });

      typediv.style.visibility = 'visible';
    })
    .catch(err => console.error("Shopify load error:", err));
  }
// inside your colldiv.click handler, replace the entire `else if (data[name]) { … }` with this:
else if (data[name]) {
  console.log("Clicked collection:", name, "has types:", data[name].types);

  // 1) Create one <p> per “type”
  data[name].types.forEach(type => {
    const typeP = document.createElement('p');
    typeP.innerText = type;
    typediv.appendChild(typeP);

    typeP.addEventListener('click', () => {
      // a) clear any old galleries & hide description
      photodiv.innerHTML = '';
      imagediv.innerHTML = '';
      descriptiondiv.style.visibility = 'hidden';

      // b) SNET branch
      if (name === 'SNET') {
        const images = imageSets[type] || [];
        currentImages = images;
        updateDescription(type);
        imagediv.innerHTML = '';
        images.forEach(src => {
          const ext = src.split('.').pop().toLowerCase();
          if (['mp4','mov','webm','ogg'].includes(ext)) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.marginBottom = '20px';
            imagediv.appendChild(video);
          } else {
            const img = document.createElement('img');
            img.src = src;
            img.style.cssText = 'max-width:100%;margin-bottom:20px;cursor:pointer';
            img.addEventListener('click', () => openModal(src));
            imagediv.appendChild(img);
          }
        });
        imagediv.style.visibility = 'visible';
        return;
      }

      // c) Info & Stockist are text‑only
      if (name === 'Info' || name === 'Stockist') {
        updateDescription(type);
        return;
      }

      // d) “All others”: photographer list
      //    (e.g. Press → Office→ ["From LDN…"], etc.)
      const people = data[name][type] || [];
      people.forEach(person => {
        const pP = document.createElement('p');
        pP.innerText = cleanPhotographerName(person);
        photodiv.appendChild(pP);

        pP.addEventListener('click', () => {
          // 1) clear old images
          imagediv.innerHTML = '';

          // 2) set the description for THIS person
          updateDescription(person);

          // 3) render their images into currentImages/modal
          currentImages = imageSets[person] || [];
          currentImages.forEach((src, i) => {
            const ext = src.split('.').pop().toLowerCase();
            if (['mp4','mov','webm','ogg'].includes(ext)) {
              const v = document.createElement('video');
              v.src = src;
              v.controls = true;
              v.style.maxWidth = '100%';
              v.style.marginBottom = '20px';
              imagediv.appendChild(v);
            } else {
              const img = document.createElement('img');
              img.src = src;
              img.style.cssText = 'max-width:100%;margin-bottom:20px;cursor:pointer';
              img.addEventListener('click', () => showModalImage(i));
              imagediv.appendChild(img);
            }
          });

          imagediv.style.visibility = 'visible';
        });
      });

      photodiv.style.visibility = 'visible';
    });
  });

  // 3) make sure the “types” list is visible
  typediv.style.visibility = 'visible';
}

  
  
});


  // ---- Cart utility functions ----
  window.updateCartDrawer = function() {
    cartDrawer.innerHTML = '';
    if (!cart.length) {
      const emptyP = document.createElement('p');
      emptyP.textContent = "Cart Empty";
      emptyP.style.cssText = 'text-align:center;margin-top:50%;transform:translateY(-50%);';
      cartDrawer.appendChild(emptyP);
      return;
    }
    let total = 0;
    cart.forEach(item => {
      total += parseFloat(item.price);
      const itemDiv = document.createElement('div');
      itemDiv.style.cssText='border-bottom:1px solid #ccc;padding-bottom:15px;margin-bottom:15px;';
      const img = document.createElement('img');
      img.src = item.image;
      img.style.cssText='width:100px;display:block;margin-bottom:10px;';
      itemDiv.appendChild(img);
      const titleP = document.createElement('p');
      titleP.textContent = item.title;
      titleP.style.cssText='margin:5px 0;';
      itemDiv.appendChild(titleP);
      const sizeP = document.createElement('p');
      sizeP.textContent = `Size: ${item.variantTitle}`;
      sizeP.style.cssText='margin:0 0 10px;';
      itemDiv.appendChild(sizeP);
      const priceP = document.createElement('p');
      priceP.textContent = `$${parseInt(item.price)}`;
      priceP.style.cssText='margin:0 0 10px;';
      itemDiv.appendChild(priceP);
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', e => {
        e.stopPropagation();      // ← prevent the click from reaching document.onclick
        removeFromCart(item.id);
      });
      
      removeBtn.style.cssText='background:black;color:white;border:none;padding:6px 12px;cursor:pointer;font-size:12px;';
      itemDiv.appendChild(removeBtn);
      cartDrawer.appendChild(itemDiv);
    });
    const totalP = document.createElement('p');
    totalP.textContent = `Total: $${parseInt(total)}`;
    cartDrawer.appendChild(totalP);
    const checkoutBtn = document.createElement('a');
    checkoutBtn.textContent = 'Proceed to Checkout';
    checkoutBtn.href = generateCheckoutUrl();
    checkoutBtn.target = '_blank';
    checkoutBtn.style.cssText='display:block;margin-top:15px;padding:10px;text-align:center;background:white;color:black;border:1px solid black;text-decoration:none;cursor:pointer;transition:all 0.3s;';
    checkoutBtn.onmouseenter = () => checkoutBtn.style.cssText+='background:black;color:white;';
    checkoutBtn.onmouseleave = () => checkoutBtn.style.cssText+='background:white;color:black;';
    cartDrawer.appendChild(checkoutBtn);
    const finalNote = document.createElement('p');
finalNote.textContent = 'All Sales Final';
finalNote.style.cssText =
  'font-size:12px; text-align:center; margin-top:8px; color:#666;';
cartDrawer.appendChild(finalNote);

  };

  window.removeFromCart = function(id) {
    const idx = cart.findIndex(i=>i.id===id);
    if (idx>-1) cart.splice(idx,1);
    updateCartDrawer();
  };

  function generateCheckoutUrl() {
    const base = 'https://wu11xs-wt.myshopify.com/cart/';
    const ids = cart.map(i=>`${i.id.replace('gid://shopify/ProductVariant/','')}:1`);
    return base + ids.join(',');
  }

  function openCartDrawer() {
    updateCartDrawer();
    cartDrawer.style.right = '0';
  }

  const permanentCartBtn = document.getElementById('cartBtn');
  if (permanentCartBtn) {
    permanentCartBtn.style.fontWeight = 'normal';
    permanentCartBtn.style.cursor     = 'pointer';
  
    permanentCartBtn.addEventListener('click', () => {
      // toggle: if already open, close; otherwise open
      if (cartDrawer.style.right === '0px' || cartDrawer.style.right === '0') {
        closeCartDrawer();
      } else {
        openCartDrawer();
      }
    });
  }
  document.addEventListener('click', e => {
    if (
      cartDrawer.style.right === '0px' &&      // only when open
      !cartDrawer.contains(e.target) &&        // clicked outside the drawer
      e.target.id !== 'cartBtn'                // and not on the Cart button
    ) {
      closeCartDrawer();
    }
  });

  function closeCartDrawer() {
    cartDrawer.style.right = '-400px';
  }
  updateCartDrawer();
};
