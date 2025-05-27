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
      "GG Kim": ["https://res.cloudinary.com/djdu9iqeu/image/upload/IMG_0363_2_Large_utp3sy.png", "GGKim/IMG_0365.jpg","GGKim/IMG_0371.jpg", "GGKim/IMG_0378.jpg","GGKim/IMG_0386.jpg", "GGKim/IMG_0444.jpg","GGKim/IMG_0453.jpg", "GGKim/IMG_0461.jpg","GGKim/IMG_0476.jpg", "GGKim/IMG_0480.jpg","GGKim/IMG_0506.jpg", "GGKim/IMG_0513.jpg","GGKim/IMG_0519.jpg", "GGKim/IMG_0553.jpg","GGKim/IMG_0567.jpg", "GGKim/IMG_0606.jpg","GGKim/IMG_0595.jpg"],
      "Louis F. Cota": ["SS25/LookbookSS25/SS25.1.jpg", "SS25/LookbookSS25/SS25.2.jpg", "SS25/LookbookSS25/SS25.3.jpg", "SS25/LookbookSS25/SS25.4.jpg", "SS25/LookbookSS25/SS25.5.jpg", "SS25/LookbookSS25/SS25.6.jpg", "SS25/LookbookSS25/SS25.7.jpg","SS25/LookbookSS25/SS25.8.jpg","SS25/LookbookSS25/SS25.9.jpg","SS25/LookbookSS25/SS25.10.jpg"],
      "Chema Torres": ["SS25/EditorialSS25/ChemaTorres /F_C_1.jpg","SS25/EditorialSS25/ChemaTorres /F_C_2.1.jpg","SS25/EditorialSS25/ChemaTorres /F_C_2.jpg","SS25/EditorialSS25/ChemaTorres /F_C_3.1.jpg","SS25/EditorialSS25/ChemaTorres /F_C_4.jpg","SS25/EditorialSS25/ChemaTorres /F_C_5.1.jpg","SS25/EditorialSS25/ChemaTorres /F_C_5.2.jpg","SS25/EditorialSS25/ChemaTorres /F_C_5.jpg", "SS25/EditorialSS25/ChemaTorres /F_C_6.1.jpg", "SS25/EditorialSS25/ChemaTorres /F_C_6.jpg"],
      "Octavio Cruz": ["SS25/EditorialSS25/OctavioCruz /Tavio.2.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.3.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.11.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.12.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.13.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.21.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.24.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.31.jpg","SS25/EditorialSS25/OctavioCruz /Tavio.32.jpg"],
      "Alberto Valle-Gutierrez": ["FW24/EditorialFW24/Alberto Valle-Gutierrez/003.jpg", "FW24/EditorialFW24/Alberto Valle-Gutierrez/004 1.jpg","FW24/EditorialFW24/Alberto Valle-Gutierrez/013.jpg","FW24/EditorialFW24/Alberto Valle-Gutierrez/016.jpg","FW24/EditorialFW24/Alberto Valle-Gutierrez/018.jpg", "FW24/EditorialFW24/Alberto Valle-Gutierrez/DSC_0218_02.jpg"],
      "Louis F. Cota*": ["SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L1 1 LB1 EDITORIAL 001.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L1 1 LB1 EDITORIAL 002.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L1 1 LB1 EDITORIAL 004.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L1 1 LB1 EDITORIAL alt003.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L2 1 LB1 EDITORIAL 007.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L3 1 LB1 EDITORIAL 009.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L3 1 LB1 EDITORIAL 0010.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L3 1 LB1 EDITORIAL alt008 copy.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L4 1 LB1 EDITORIAL 0012.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L4 1 LB1 EDITORIAL 0013.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ b L4 1 LB1 EDITORIAL 0015.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L1 1 LB2 EDITORIAL 0016.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L1 1 LB2 EDITORIAL 0018.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L1 1 LB2 EDITORIAL alt002.png","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L1 1 LB2 EDITORIAL alt004.png","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L2 1 LB2 EDITORIAL 0020.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L2 1 LB2 EDITORIAL 0021.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L2 1 LB2 EDITORIAL 0022.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L2 1 LB2 EDITORIAL alt003.png","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L3 1 LB2 EDITORIAL alt002.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L3 1 LB2 EDITORIAL alt006.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ d L3 1 LB2 EDITORIAL alt0012.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L1 1 LB3 EDITORIAL 0027.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L1 1 LB3 EDITORIAL alt005.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L1 1 LB3 EDITORIAL alt0020.png","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L2 1 LB3 EDITORIAL 0030.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L2 1 LB3 EDITORIAL 0031.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L2 1 LB3 EDITORIAL alt002.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L2 1 LB3 EDITORIAL alt003.jpg","SS25/EditorialSS25/LouisFCotaSS25Editorial/_ f L2 1 LB3 EDITORIAL alt007.png"],
      "Louis F. Cota**": ["FW24/LookbookSS24/FW26.1.jpeg","FW24/LookbookSS24/FW26.2.jpeg","FW24/LookbookSS24/FW26.3.jpeg","FW24/LookbookSS24/FW26.4.jpeg","FW24/LookbookSS24/FW26.5.jpeg","FW24/LookbookSS24/FW26.6.jpeg","FW24/LookbookSS24/FW26.7.jpeg","FW24/LookbookSS24/FW26.8.jpeg"],
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
