# ProjecteEdicionLimitada
Pàgina web de la festa del 50e aniversari el 17/10/2026.

# Projecte Edición limitada.

# SnapParty

Plataforma web *stateless* de galeria fotogràfica efímera col·laborativa per a esdeveniments, desenvolupada amb tecnologia Serverless i sense frameworks (100% Vanilla stack).

SnapParty permet als convidats d'un aniversari pujar imatges a l'instant des del mòbil sense registrar-se, comprimint els fitxers en local per optimitzar la xarxa, i visualitzar una galeria dinàmica gestionada directament mitjançant Serverless Functions i Object Storage.

## Descripció del projecte

L’objectiu del projecte és crear una aplicació web híbrida (*Single Page Application*) i *serverless* capaç de:

* Rebre fotografies de múltiples usuaris de forma simultània sense mantenir un servidor actiu 24/7.
* Processar i comprimir imatges d'alta resolució directament al dispositiu de l'usuari per estalviar dades.
* Mostrar una línia de temps visual responsive consultant directament el repositori de fitxers.
* Funcionar sense cap base de dades; l'emmagatzematge d'objectes actua com a única font de veritat (*Single Source of Truth*).
* Permetre l'accés directe per URL o codi QR sense requerir autenticació als convidats.

## Funcionalitats principals

### Mòdul de pujada mòbil (Client-side)
* **Captura directa:** Accés natiu a la càmera o carret de fotos del mòbil.
* **Selecció múltiple:** Permís per pujar blocs de fotos simultàniament.
* **Motor de compressió:** Reducció de pes integrada en el navegador mitjançant Canvas API.
* **Indicador d'estat:** Text o barra de progrés de la càrrega per lot.

### Galeria interactiva
* **Interfície dinàmica:** Disseny adaptatiu (Mobile-First) en quadrícula net i visual.
* **Càrrega optimitzada:** *Lazy loading* natiu d'imatges per no saturar el navegador.
* **Refresc asíncron:** Actualització de la graella en rebre noves imatges sense recarregar la pàgina.

### Visualitzador integrat (Lightbox)
* **Mode pantalla completa:** Ampliació d'imatges independent de forma fluida.
* **Gestió nativa de capes:** Ús de la Popover API del sistema per a zero consum de memòria JS.
* **Tancament ràpid:** Botó de sortida tàctil i tancament automàtic en fer clic a l'exterior.

## Stack tecnològic

### Frontend
* HTML5 (Semàntic)
* CSS3 (Variables natives i Grid layout)
* Vanilla JavaScript (Web Components natius)

### Backend (Serverless)
* Node.js (Runtimes Serverless d'AWS, Vercel o Cloudflare Workers)
* SDK d'Emmagatzematge d'Objectes (S3 / Cloudflare R2 Client)

### Emmagatzematge (Stateless)
* Object Storage S3-Compatible (Cloudflare R2, AWS S3 o Supabase Storage)

## Arquitectura del projecte

```text
  [ Convidat / Mòbil ]
           │
           ▼ (Compressió Canvas)
[ Serverless Functions (API) ]
  ├── GET  /api/photos  ───► ListObjects V2 ──┐
  └── POST /api/upload  ───► PutObject ───────┼─► [ Object Storage (S3/R2) ]
                                              │   (Fitxers .jpg/.webp)
                                              ▼
                                    [ CDN / Enllaços Públics ]
```

## Estructura del projecte

```text
snapparty/
│
├── public/                # Fitxers estàtics per al CDN
│   ├── index.html
│   └── js/
│       ├── app.js         # Lògica de renderitzat (Fetch GET)
│       └── components.js  # Component <upload-button> (Canvas + Fetch POST)
├── api/                   # Serverless Functions
│   ├── photos.js          # GET: Llista els objectes del bucket S3/R2
│   └── upload.js          # POST: Puja el blob rebut directament al bucket
├── vercel.json / wrangler.toml  # Configuració de la plataforma Serverless
└── README.md
```

## Gestió de dades

El sistema **NO** utilitza base de dades. 

* El llistat de fotos es genera dinàmicament en temps d'execució mitjançant l'operació `ListObjects` de l'API de l'emmagatzematge, ordenant els fitxers per la seva data de creació (`LastModified`).

## APIs previstes

### Rutes Serverless internes
* `GET /api/photos`: Invoca la funció per obtenir els metadades i les URLs públiques de les imatges des del bucket.
* `POST /api/upload`: Rep el fitxer des del formulari (`FormData`) en streaming i l'envia directament a l'Object Storage.

## Instal·lació i Desenvolupament Local

### Clonar repositori
```bash
git clone https://github.com
```

### Instal·lar dependències de desenvolupament
```bash
npm install
```

### Configurar variables d’entorn
Crear fitxer `.env` (o entorn de la plataforma Serverless):
```text
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=el_teu_access_key
S3_SECRET_ACCESS_KEY=el_teu_secret_key
S3_BUCKET_NAME=snapparty-festa
```
### Fases del projecte i calendari associat:

• Fase 1 (Completada): Definició del projecte "Edición Limitada" i abast conceptual a falta d'aquest calendari.Setmana 1
• Fase 2 (Següent): Recollida de dades i requisits. Setmana 2.
• Fase 3: Estructurar el projecte. Setmana 2 i 3.
• Fase 4: Establir processos o milestones (organització del tauler). Setmana 3.
• Fase 5: Provar i tornar a recollir dades i requeriments (el test del MVP amb les fotos de les vacances). Setmanes 3 a 5.
• Fase 6: Corregir o modificar el projecte respecte a l'inicial. Lliurament. Setmana 6.

```

### Executar entorn local Serverless
```bash
# Exemple si es fa servir el CLI de Vercel o Wrangler de Cloudflare
vercel dev  # o npx wrangler dev
```

## Millores futures
* **Presigned URLs:** Generar enllaços de pujada directes des del client per saltar-se la Serverless Function en el POST i estalviar temps d'execució.
* Suport PWA per a cues de pujada offline durant talls de cobertura.
* Descàrrega de tot l'àlbum de la festa en un sol fitxer .ZIP generat al vol.

