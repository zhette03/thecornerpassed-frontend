window.onload = function () {
    const logodiv = document.getElementById('logodiv');
    const colldiv = document.getElementById('colldiv');
    const typediv = document.getElementById('typediv');
    const photodiv = document.getElementById('photodiv');
    const imagediv = document.getElementById('imagediv');
  
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
  
    // Photographer to image set mapping
    const imageSets = {
      "GG Kim": ["https://res.cloudinary.com/djdu9iqeu/image/upload/IMG_0363_2_Large_utp3sy.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276784/IMG_0365_Large_sxcpmu.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276783/IMG_0371_Large_hgje6i.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276783/IMG_0378_Large_o85wdb.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276820/IMG_0386_Large_m2l4ix.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276822/IMG_0444_Large_gwbobh.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0453_Large_io0bwo.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0461_Large_ajd5m9.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0476_Large_iigmhe.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276825/IMG_0480_Large_bdvefv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0506_Large_idgsvf.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276824/IMG_0513_Large_ccjkff.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0519_Large_trb5d6.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0553_Large_gw03l0.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0567_Large_oerdk8.png", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0606_Large_egbvpz.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748276827/IMG_0595_Large_l9oybx.png"],
      "Louis F. Cota": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277114/SS25.1_tabphj.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277115/SS25.5_uch4jp.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277116/SS25.3_y68awj.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277117/SS25.4_lopfp3.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277115/SS25.5_uch4jp.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277118/SS25.6_penxdh.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.7_stvwns.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.8_opayqi.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277127/SS25.9_jkzb4f.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277123/SS25.10_xsrbjr.jpg"],
      "Chema Torres": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278398/F_C_1_u8pyiv.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278397/F_C_2.1_xkmhdc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278397/F_C_2_kmrurc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278400/F_C_3.1_cjuiqk.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278395/F_C_4_yedeei.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278398/F_C_5.1_heeuxe.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278402/F_C_5.2_tu8yij.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278403/F_C_5_vmn85x.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278401/F_C_6.1_o4gmee.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278404/F_C_6_xbfsid.jpg"],
      "Octavio Cruz": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277267/Tavio.2_onvt9a.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277268/Tavio.3_ntn7ik.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277269/Tavio.11_jcbmga.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277269/Tavio.12_zurcs3.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277270/Tavio.13_ifo6yg.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277271/Tavio.21_ql9nwo.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277274/Tavio.24_dfvxqj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277273/Tavio.31_akhu3y.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277273/Tavio.32_jxsawo.jpg"],
      "Alberto Valle-Gutierrez": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280499/003_yjevjf.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280505/004_1_bks2tl.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280503/013_f1lsgn.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280505/016_ajytgb.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280507/018_hflb81.jpg", "https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280508/DSC_0218_02_kancap.jpg"],
      "Louis F. Cota*": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278551/__b_L1_1_LB1_EDITORIAL_001_Large_ovtvna.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278569/__b_L1_1_LB1_EDITORIAL_002_rngdng.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278550/__b_L1_1_LB1_EDITORIAL_004_Large_zgngtj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278555/__b_L1_1_LB1_EDITORIAL_alt003_qfaf1d.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L2_1_LB1_EDITORIAL_007_gnfkkc.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_008_wxq796.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_008_wxq796.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278568/__b_L3_1_LB1_EDITORIAL_009_xmfe7d.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277857/__b_L4_1_LB1_EDITORIAL_0012_Large_o7pebx.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277865/__b_L4_1_LB1_EDITORIAL_0013_ua5zz4.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748277858/__b_L4_1_LB1_EDITORIAL_0015_Large_ykqkos.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278310/__d_L1_1_LB2_EDITORIAL_0016_Large_kxhddn.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278312/__d_L1_1_LB2_EDITORIAL_0018_Large_cw6rid.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278334/__d_L1_1_LB2_EDITORIAL_alt002_zzzzga.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278327/__d_L1_1_LB2_EDITORIAL_alt004_cahccg.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278332/__d_L2_1_LB2_EDITORIAL_0020_mime6q.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278318/__d_L2_1_LB2_EDITORIAL_0021_Large_ch4bpj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278318/__d_L2_1_LB2_EDITORIAL_0022_Large_igi6pv.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L2_1_LB2_EDITORIAL_alt003_ewomuj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L3_1_LB2_EDITORIAL_alt002_fm3mzx.jpg","Shttps://res.cloudinary.com/djdu9iqeu/image/upload/v1748278333/__d_L3_1_LB2_EDITORIAL_alt006_gzozsi.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278344/__d_L3_1_LB2_EDITORIAL_alt0012_ynrctj.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278335/__d_L3_1_LB2_EDITORIAL_alt002_fm3mzx.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278346/__f_L1_1_LB3_EDITORIAL_alt005_bfnabr.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278351/__f_L1_1_LB3_EDITORIAL_alt0020_aeztjt.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278357/__f_L2_1_LB3_EDITORIAL_0030_msfrwf.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278361/__f_L2_1_LB3_EDITORIAL_alt003_amgrkq.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278358/__f_L2_1_LB3_EDITORIAL_alt002_qlcbif.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278361/__f_L2_1_LB3_EDITORIAL_alt003_amgrkq.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748278360/__f_L2_1_LB3_EDITORIAL_alt007_jk6nb6.png"],
      "Louis F. Cota**": ["https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280715/FW26.1_vcnc0z.jpg","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280715/FW26.2_Large_odqsnj.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280716/FW26.3_Large_ptidks.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280717/FW26.4_Large_c3re2e.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280719/FW26.5_Large_qbksbg.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280823/FW26.6_Large_bwrzjm.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280825/FW26.7_Large_xvnuhc.png","https://res.cloudinary.com/djdu9iqeu/image/upload/v1748280827/FW26.8_Large_teybpg.png"],
      "Hernan Esquinca": ["FW24/EditorialFW24/Hernan Esquinca/CESAR_TCP_1.2-2.jpg","FW24/EditorialFW24/Hernan Esquinca/CESAR_TCP_1.jpg","FW24/EditorialFW24/Hernan Esquinca/JOAQUIN_TCP_1.3.jpg","FW24/EditorialFW24/Hernan Esquinca/JOAQUIN_TCP_1.4.jpg","FW24/EditorialFW24/Hernan Esquinca/SANTIAGO_TCP_1.3.jpg","FW24/EditorialFW24/Hernan Esquinca/SANTIAGO_TCP_3.2.jpg"],
      "Ocean Adamovich Ortiz": ["FW24/EditorialFW24/Ocean Adamovich Ortiz /IMG_1028.jpg", "FW24/EditorialFW24/Ocean Adamovich Ortiz /IMG_1103.jpg","FW24/EditorialFW24/Ocean Adamovich Ortiz /IMG_1122.jpg","FW24/EditorialFW24/Ocean Adamovich Ortiz /IMG_1190.jpg"],
      "Louis F. Cota***": ["FW24/EditorialFW24/Louis F Cota 2/_MG_8469.jpg","FW24/EditorialFW24/Louis F Cota 2/4 copy.jpg","FW24/EditorialFW24/Louis F Cota 2/Screen Shot 2023-12-28 at 4.19.49 PM copy.png","FW24/EditorialFW24/Louis F Cota 2/Screen Shot 2023-12-28 at 4.22.04 PM copy.png","FW24/EditorialFW24/Louis F Cota 2/Screen Shot 2023-12-28 at 4.22.56 PM copy2.png","FW24/EditorialFW24/Louis F Cota 2/Screen Shot 2023-12-28 at 4.23.55 PM copy.png","FW24/EditorialFW24/Louis F Cota 2/TCPLFC001 3copy.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC002.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC005.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC008.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC0011 copy.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC018.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC023.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC025.jpg","FW24/EditorialFW24/Louis F Cota 2/TCPLFC00144 copy.jpg"],
      "Film": ["SNET/Film/SNETFILM.mp4"],
      "Images": ["SNET/Images/_MG_5780.jpg","SNET/Images/_MG_5836.jpg","SNET/Images/_MG_5863 2.jpg","SNET/Images/_MG_5883.jpg","SNET/Images/_MG_6182.jpg","SNET/Images/Screenshot 2025-01-24 at 2.07.36 PM.png","SNET/Images/Screenshot 2025-01-24 at 2.08.57 PM.png","SNET/Images/snet.tcp001.jpg","SNET/Images/snet.tcp002.jpg"],
      "Exhibition": ["SNET/Exhibition/IMG_0576.MOV","SNET/Exhibition/_DSF1144.jpg","SNET/Exhibition/002.jpg",]
    };
  
    logodiv.addEventListener('click', () => {
      colldiv.style.visibility = 'visible';
    });
  
    colldiv.querySelectorAll('p').forEach(p => {
      p.addEventListener('click', () => {
        currentCollection = p.innerText;
        typediv.innerHTML = '';
        photodiv.innerHTML = '';
        imagediv.innerHTML = '';
        imagediv.style.visibility = 'hidden';
        photodiv.style.visibility = 'hidden';
  
        if (data[currentCollection]) {
          data[currentCollection].types.forEach(type => {
            const typeP = document.createElement('p');
            typeP.innerText = type;
            typediv.appendChild(typeP);
  
            typeP.addEventListener('click', () => {
              photodiv.innerHTML = '';
              imagediv.innerHTML = '';
              imagediv.style.visibility = 'hidden';
              
              // Special handling for SNET collection
              if (currentCollection === "SNET") {
                // Directly show media for SNET categories
                const images = imageSets[type];
                if (images && images.length > 0) {
                  images.forEach(src => {
                    const fileExt = src.split('.').pop().toLowerCase();
              
                    if (['mp4', 'mov', 'webm', 'ogg'].includes(fileExt)) {
                      const video = document.createElement('video');
                      video.src = src;
                      video.controls = true;
                      video.style.maxWidth = '100%';
                      video.style.marginBottom = '20px';
                      video.autoplay = false;
                      imagediv.appendChild(video);
                    } else {
                      const img = document.createElement('img');
                      img.src = src;
                      img.alt = type;
                      img.style.maxWidth = '100%';
                      img.style.marginBottom = '20px';
                      imagediv.appendChild(img);
                    }
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
                    
                      if (images && images.length > 0) {
                        images.forEach(src => {
                          const fileExt = src.split('.').pop().toLowerCase();
                    
                          if (['mp4', 'mov', 'webm', 'ogg'].includes(fileExt)) {
                            const video = document.createElement('video');
                            video.src = src;
                            video.controls = false;
                            video.style.maxWidth = '100%';
                            video.style.marginBottom = '20px';
                            video.autoplay = true;
                            imagediv.appendChild(video);
                          } else {
                            const img = document.createElement('img');
                            img.src = src;
                            img.alt = name;
                            img.style.maxWidth = '100%';
                            img.style.marginBottom = '20px';
                            imagediv.appendChild(img);
                          }
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
