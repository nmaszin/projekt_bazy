# System wspomagania działania uczelni wyższej (SWDUW)

Niniejsze repozytorium zawiera kod źródłowy SWDUW.

## Uruchomienie
1. Należy sklonować niniejsze repozytorium, na przykład w ten sposób (lub analogicznie, po kluczu SSH):
```bash
$ git clone https://github.com/nmaszin/projekt_bazy
```

2. W pierwszym terminalu należy uruchomić kontenery Dockera. Aby uniknąć problemów, wynikających z przedawnienia się wcześniejszych obrazów, można to zrobić w taki sposób:
```bash
$ cd projekt_bazy
$ docker-compose down
$ docker-compose build
$ docker-compose up
```

3. W drugim terminalu należy uruchomić backend z API. W tym celu należy wykonać następujący zestaw komend:
```bash
$ cd projekt_bazy/api
$ npm install
$ npm start
```

4. Należy z poziomu API zainicjować bazę danych potrzebnymi tabelami. W tym celu należy wykonać zapytanie `POST /db`, używając jakiegoś klienta HTTP (np. Postmana).

5. W trzecim terminalu należy uruchomić aplikację frontendową. W tym celu należy wykonać następujący zestaw komend:
```bash
$ cd projekt_bazy/web
$ npm install
$ npm start
```

