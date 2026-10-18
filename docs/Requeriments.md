# Fase 2: Recollida de dades i requisits (Setmana 2)

L'objectiu d'aquesta fase és formalitzar els requeriments de l'aplicació "Edición Limitada" abans de començar a dissenyar el front-end i picar codi a la Fase 3.

## 1. Requisits del contingut per a la prova (Validació d'Usuari)
* **Origen de les imatges:** Lot de fotografies reals de l'aniversari fetes per la mateixa cumpleañera amb el seu propi dispositiu mòbil.
* **Flux de tractament:** L'assessor tècnic (desenvolupador) rebrà aquestes fotos, les tractarà de forma interna i les introduirà en l'estructura local del MVP.
* **Objectiu de la prova:** Validar de primera mà la facilitat d'ús, el flux i l'experiència de la interfície amb usuaris reals sense experiència tècnica, utilitzant el seu propi material de la festa.

## 2. Requisits funcionals de l'usuari (Interfície)
* **Visualització:** Exposar totes les fotos reals lliurades en una sola pantalla unificada i totalment adaptada a pantalles de telèfons mòbils.
* **Ampliació:** Permetre l'obertura de qualsevol imatge a pantalla completa de manera fluida (Lightbox).
* **Descàrrega individual:** Disposar d'un mecanisme natiu i visible perquè qualsevol convidat pugui baixar una imatge concreta directament a la memòria del seu mòbil.
* **Simulació d'acció:** Mostrar un element d'interfície clar que identifiqui el botó per "pujar fotos", funcionant en mode de simulació local durant aquest MVP.

## 3. Requisits tècnics estructurals (Restriccions del sistema)
* **Filosofia de desenvolupament:** Prohibició d'utilitzar frameworks. El codi serà 100% Vanilla stack (HTML5 semàntic, CSS3 net i Vanilla JS) aprofitant les APIs natives del navegador (com Popover API).
* **Model d'estat (Stateless Mock):** El llistat i rutes de les imatges es gestionaran en una estructura de JavaScript local que simuli fidelment el futur comportament de l'API de l'Object Storage, evitant l'ús de bases de dades o connexions de xarxa en aquesta fase.
