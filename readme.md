## CGI proovitöö
CGI proovitööks tehtud lennubroneerimissait. Backend on tehtud Java abil ja Front-end on Reacti raamistikku kasutades loodud.

Saadaval netist: https://lennuk.ptamm.ee/

Käivitamine on kõige lihtsam Dockeri kaudu. 

`git clone https://github.com/patam2/CGI_HomeProject`

`cd CGI_HomeProject`

`docker compose up`

Töö tegemisel võtsin GitHub CoPiloti maha, et oleks rohkem isetehtud koodi. AI -- minu puhul Claude -- poolt kasutasin abi, et *refactor*ida koodi. Lisaks sellele kasutasin toda, et saada tehnilise teostuse ideid lennutabeli otsingufunktsiooni jaoks + *bug*ide lahendamiseks, kui oma kogemus ei hakanud nende peale. Suuremalt jaolt on mõlemad Dockerfile'd AI poolt koostatud.

Summaarselt läks töö tegemise peale umbes 20 tundi. Arenduse protsessi juures jäi ebaselgeks, kas "väljapääsu juures" oli mõeldud hädaabi väljapääsu rida või lennuki esi- ja taguotsa. Eeldasin, et tegu on nn. *exit row*'iga ja rakendasin esimese varjandi. 

Kõige suurem segadus tekkis lõpus *environment variable*tega tegeledes. Vastustundlikult oli mul .env fail .gitignores, ja mõtlesin, et ENV muutuja saab lihtsasti Dockerist lisada, aga sain õppetunni - see tuleb paika panna kohe Dockerfiles, mitte docker-compose.yml'is. Lisaks sellele oli konteinerite ülesse saamisega paras raskus, sest minu DigitalOceani server ei suutnud miskipärast *backend*i buildida - jäingi ootama tunde ja tunde, aga midagi ei juhtunud. Selle lahendamiseks laadisin oma arvutis tehtud *image* Docker hubi, ja muutsin serveris olevat docker-compose faili seda *image*t kasutama. See lähenemisviis töötas. 

Mida ma oleks võinud teha teisiti/paremini:
- Ma taipasin projekti kasvades, et TypeScripti oleks olnud palju mugavam kasutada
- Eristada *dev*i ja *prod*i paremini - ehk CI-CD kuidagi lahendada. 
- Kohe alguses refactorida koodi, et ei oleks üks suur fail, mida hiljem tükkideks hakkida


## Arenduspäevik
See fail sisaldab igapäevaseid märkmeid tehtud töö kohta ja kirjeldab protsessi.

### 08-03-25
- Sättisin projekti üles
- Disainisin maandumislehte

### 12-03-25
- Edasine töö maandumislehel
- Lennutabeli funtsionaalsus (otsimine)

### 14-03-25
- Edasine töö lennutabelis, otsimise täpsustamine

### 15-03-25
- Lennu broneerimise lehe esimesed alged

### 16-03-25
- Lennu broneerimise leht pea-aegu funktsionaalne

### 17-03-25
- Lennu broneerimise lehe bugfixid
- Refactorimine
- Piletite leht

### 18-03-25
- Dockeri konteinerisse!
