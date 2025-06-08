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
    "GG Kim": ["https://via.placeholder.com/600x800/000000/FFFFFF?text=GG+Kim+1", "https://via.placeholder.com/600x800/000000/FFFFFF?text=GG+Kim+2"],
    "Louis F. Cota": ["https://via.placeholder.com/600x800/000000/FFFFFF?text=Louis+1", "https://via.placeholder.com/600x800/000000/FFFFFF?text=Louis+2"],
    "Film": ["https://via.placeholder.com/600x400/000000/FFFFFF?text=Film+Content"],
    "Images": ["https://via.placeholder.com/600x800/000000/FFFFFF?text=SNET+Image+1"],
    "Exhibition": ["https://via.placeholder.com/600x800/000000/FFFFFF?text=Exhibition+1"]
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
