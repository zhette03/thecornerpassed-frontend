window.onload = function () {
  const logodiv = document.getElementById('logodiv');
  const colldiv = document.getElementById('colldiv');
  const typediv = document.getElementById('typediv');
  const photodiv = document.getElementById('photodiv');
  const imagediv = document.getElementById('imagediv');
  const descriptiondiv = document.getElementById('descriptiondiv');

  let currentCollection = "";

  const data = {
    SS26: {
      types: ["Lookbook"],
      Lookbook: ["GG Kim"]
    },
    SS25: {
      types: ["Lookbook", "Editorial"],
      Lookbook: ["Louis F. Cota"],
      Editorial: ["Chema Torres", "Louis F. Cota*", "Octavio Cruz"]
    },
    FW24: {
      types: ["Lookbook", "Editorial"],
      Lookbook: ["Louis F. Cota**"],
      Editorial: ["Alberto Valle-Gutierrez", "Hernan Esquinca", "Ocean Adamovich Ortiz", "Louis F. Cota***"]
    },
    SNET: {
      types: ["Film", "Images", "Exhibition"]
    }
  };

  // Descriptions for each photoshoot
  const descriptions = {
    "GG Kim": "From inside the cage, everyone appears behind bars. To be livestock is to live in the tension between breath and ownership: to move, to feel, to bleed, while being counted, priced, and contained. In the factories of flesh, animals are born not into life but into labor. Not as beings, but as yield. They are kept alive only to serve death, suspended in a state of extraction.<br><br> This is not far from how empire handles bodies it cannot recognize as sovereign. The Indigenous, the disabled, the colonized; named wild, named burden, named less-than. Like land mapped for conquest, or animals tagged for slaughter, we too are sorted, measured, and made legible to the market. The logics are parallel. The cages are the same.<br><br> Imperialism arrives not as chaos, but as grid. It wraps itself in order, in progress, in care, but its care is cold. Its language is smooth, efficient, deadly. It paves over kinship with profit, rewrites survival into stock. <br><br> LIVE-STOCK moves inside this contradiction. Through dress, through skin, through fabric that scratches and remembers, it asks what becomes of the wild when it is worn. It fuses military cut with feral texture, bodies clad in both resistance and wound. Here, clothing does not conceal; it reveals. The seams speak of containment. The folds remember escape.<br><br> To be called animal is not insult, but inheritance. The animal is not beneath—it is beside. Kin in captivity. Reflection in refusal. We claim it not to regress, but to remember. That there were once other ways. That care was once something softer.<br><br> We wear what they tried to erase. We wear it snarling. We wear it weeping. We wear it still.<br><br> The question remains:<br> Who gets caged?<br> Who gets consumed?<br> And who decides what violence is allowed?<br> We know it persists.",
    "Louis F. Cota": "A minimalist approach to fashion photography that emphasizes clean lines and modern silhouettes. Each frame tells a story of contemporary elegance.<br><br>Photographer: Louis F. Cota<br>Creative Direction: Brand Studio",
    "Chema Torres": "Direction– Jordan Perdomo, Joaquín E. Braver<br> Production– Joaquín E. Braver<br> Photo– Chema Torres<br> Post Production– Jordan Perdomo<br> Style– Javier Barrera<br> Assist– Emiliano Valdez<br> Talent– Paula Cintora Jaramillo, Mar Solares ",
    "Louis F. Cota*": "Creative Direction– Jordan Perdomo<br>  Photo– Louis F. Cota<br>  Post Production– Louis F. Cota, Jordan Perdomo <br> MUA– Qeto Chantadze<br>  Styling– Errin Shin<br>  Talent– Wife Erath, Izzy Ravana, Joaquín Echeverry Braver, Julian Wolfe, Chandni Amira Dhanoa<br>  Production Assist– Brandon Salinas, Robin Singh Johal ",
    "Octavio Cruz": "Direction– Jordan Perdomo, Octavio Cruz<br> Photo– Octavio Cruz<br> Post Production– Jordan Perdomo<br> Makeup– Octavio Cruz<br> Talent– Molly ",
    "Louis F. Cota**": "A sophisticated lookbook showcasing the depth and versatility of the Fall/Winter collection. Classic photography meets modern fashion sensibilities.<br><br>Photographer: Louis F. Cota<br>Production: Fashion House",
    "Alberto Valle-Gutierrez": "Photo– Alberto Valle-Gutierrez<br> Direction– Jordan Perdomo, Alberto Valle-Gutierrez<br> Style– Jack pekarsky<br> Assist– Brandon Salinas<br> Talent– Wife Erath, Immanuel Sealy",
    "Hernan Esquinca": "Photo– Hernan Esquinca<br> Assist– G.G. Kim<br> Talent– Joaquín Echeverry Braver, Cesar Guilhoux, Santiago Dominguez ",
    "Ocean Adamovich Ortiz": "Photo– Ocean Adamovich Ortiz<br> Style– Ocean Adamovich Ortiz<br> Model– Alyse ",
    "Louis F. Cota***": "Photo– Louis F. Cota<br> Creative Direction– Jordan Perdomo, Louis F. Cota<br> Styling– David Goldberg, Jordan Perdomo, G.G. Kim<br> Production G.G. Kim<br> Talent– Mauricio Perdomo-Doncel, Joaquín Echeverry Braver, Joi Li, Danka Latorre, Jarrie Damir, Kevon Joseph, Balla Dia, Isaiah Gonzales Assist– Brandon Salinas ",
    "Film": "Director– Louis F. Cota<br> Creative Directors– Jordan Perdomo, Louis F Cota<br> Brand Designer– Jordan Perdomo<br> Executive Producer– Jordan Perdomo<br> Producer– Chandni Amira Dhanoa<br> Production Assistant– Brandon Salinas<br> Set Design– Chandni Amira Dhanoa<br> Styling– Miracle<br> Casting Director– Dax Reedy <br>Talent– Ava Anita, Peezy<br> On-set photographer– Louis F. Cota ",
    "Images": "Director– Louis F. Cota<br> Creative Directors– Jordan Perdomo, Louis F Cota<br> Brand Designer– Jordan Perdomo<br> Executive Producer– Jordan Perdomo<br> Producer– Chandni Amira Dhanoa<br> Production Assistant– Brandon Salinas<br> Set Design– Chandni Amira Dhanoa<br> Styling– Miracle<br> Casting Director– Dax Reedy <br>Talent– Ava Anita, Peezy<br> On-set photographer– Louis F. Cota ",
    "Exhibition": "Director– Louis F. Cota<br> Creative Directors– Jordan Perdomo, Louis F Cota<br> Brand Designer– Jordan Perdomo<br> Executive Producer– Jordan Perdomo<br> Producer– Chandni Amira Dhanoa<br> Production Assistant– Brandon Salinas<br> Set Design– Chandni Amira Dhanoa<br> Styling– Miracle<br> Casting Director– Dax Reedy <br>Talent– Ava Anita, Peezy<br> On-set photographer– Louis F. Cota "
  };

  // Photographer to image set mapping    
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
    "Images": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281346/_MG_5780_Large_rg5dct.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281348/_MG_5836_Large_n3d4jm.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281350/_MG_5863_2_Large_buh9fr.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281354/_MG_5883_jvxtbz.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281355/_MG_6182_Large_agsz1z.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281359/Screenshot_2025-01-24_at_2.07.36_PM_izwsv1.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281363/Screenshot_2025-01-24_at_2.08.57_PM_pv5t46.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281362/snet.tcp001_Large_qlfulm.png"],
    "Exhibition": ["https://res.cloudinary.com/djdu9iqeu/video/upload/v1748282177/IMG_0576_aenixq.mov","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281857/_DSF1144_bnndef.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748281859/002_mq3pyp.jpg"]
  };

  // Function to update description
  function updateDescription(key) {
    const descP = document.getElementById('descp');
    if (descriptions[key]) {
      descP.innerHTML = descriptions[key];
      descriptiondiv.style.visibility = 'visible';
    }
  }

  // Function to hide description
  function hideDescription() {
    descriptiondiv.style.visibility = 'hidden';
  }

  logodiv.addEventListener('click', () => {
    colldiv.style.visibility = 'visible';
    hideDescription();
  });

  colldiv.querySelectorAll('p').forEach(p => {
    p.addEventListener('click', () => {
      currentCollection = p.innerText;
      typediv.innerHTML = '';
      photodiv.innerHTML = '';
      imagediv.innerHTML = '';
      imagediv.style.visibility = 'hidden';
      photodiv.style.visibility = 'hidden';
      hideDescription();

      if (data[currentCollection]) {
        data[currentCollection].types.forEach(type => {
          const typeP = document.createElement('p');
          typeP.innerText = type;
          typediv.appendChild(typeP);

          typeP.addEventListener('click', () => {
            photodiv.innerHTML = '';
            imagediv.innerHTML = '';
            imagediv.style.visibility = 'hidden';
            hideDescription();
            
            // Special handling for SNET collection
            if (currentCollection === "SNET") {
              // Directly show media for SNET categories
              const images = imageSets[type];
              if (images && images.length > 0) {
                updateDescription(type); // Show description for SNET categories
                images.forEach(src => {
                  const img = document.createElement('img');
                  img.src = src;
                  img.alt = type;
                  img.style.maxWidth = '100%';
                  img.style.marginBottom = '20px';
                  imagediv.appendChild(img);
                });
            
                imagediv.style.visibility = 'visible';
              }
            } else {
              // Original handling for other collections
              const names = data[currentCollection][type];
              if (names) {
                names.forEach(name => {
                  const nameP = document.createElement('p');
                  nameP.innerText = name;
                  photodiv.appendChild(nameP);

                  nameP.addEventListener('click', () => {
                    const images = imageSets[name];
                    imagediv.innerHTML = ''; // clear previous images
                    updateDescription(name); // Show description for photographer
                  
                    if (images && images.length > 0) {
                      images.forEach(src => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = name;
                        img.style.maxWidth = '100%';
                        img.style.marginBottom = '20px';
                        imagediv.appendChild(img);
                      });
                  
                      imagediv.style.visibility = 'visible';
                    }
                  });
                });
                photodiv.style.visibility = 'visible';
              }
            }
          });
        });
        typediv.style.visibility = 'visible';
      }
    });
  });
};
