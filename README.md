# OPIS APLIKACIJE 
 Ova aplikacija je društvena mreža izgrađena koristeći React i Laravel, koja omogućava korisnicima da se prijave, registruju, dele postove, komentarišu, pretražuju postove i korisnike, te komuniciraju sa drugim korisnicima. Aplikacija ima sledeće funkcionalnosti:
1. Korisnici mogu da se prijave i registruju na aplikaciju. Tokom procesa registracije, korisnici unose svoje korisničko ime, lozinku i email. Nakon uspešne registracije, automatski se prijavljuju i preusmeravaju na početnu stranicu. Prilikom prijave, korisnici unose svoje kredencijale i, nakon uspešne autentifikacije, preusmeravaju se na odgovarajuću stranicu u zavisnosti od njihove uloge (admin ili korisnik).
2. Početna stranica aplikacije pruža dobrodošlicu korisnicima i sadrži inspirativne citate o prijateljstvu koji se dinamički preuzimaju sa eksternog API-ja. Ovo pruža korisnicima prijatno iskustvo i motivaciju za korišćenje aplikacije
3. Korisnici mogu pretraživati druge korisnike aplikacije po imenu, sortirati ih i dodavati među praćene. Ova funkcionalnost omogućava korisnicima da lakše pronađu i povežu se sa drugim korisnicima na platformi. Korisnici takođe mogu zapratiti ili otpratiti druge korisnike.
4. Feed stranica omogućava korisnicima da pregledaju postove drugih korisnika, dodaju nove postove i pretražuju postojeće postove po opisu, autoru ili lokaciji. Postovi sadrže informacije o autoru, vremenu kreiranja, lokaciji, opisu i slici. Korisnici mogu lajkovati i brisati postove, a sve ove akcije su zaštićene autentifikacionim tokenom. Takođe, korisnici mogu dodavati komentare na postove i pregledati komentare drugih korisnika.
5. Administratori imaju dodatne privilegije koje im omogućavaju upravljanje korisnicima i pregled statistike postova. Administratori mogu videti listu svih korisnika i brisati ih po potrebi. Takođe, imaju pristup statistikama postova gde mogu videti top tri posta sa najviše lajkova i broj postova po danima u mesecu. Ove informacije su prikazane u vidu grafikona, omogućavajući administratorima bolji pregled aktivnosti na platformi.
6. Aplikacija pruža detaljne statistike o postovima kroz grafički prikaz. Administratori mogu videti koje postove su korisnici najviše lajkovali, kao i broj postova po danima u mesecu. Ova funkcionalnost pomaže u analizi aktivnosti korisnika i donošenju odluka na osnovu podataka.
7. Pored pregledanja i brisanja korisnika, administratori imaju mogućnost da pretražuju korisnike po imenu, što olakšava upravljanje velikim brojem korisnika. Ova funkcionalnost je ključna za održavanje reda i sigurnosti na platformi.


# POKRETANJE APLIKACIJE 

      cd social_media_app
      php artisan serve
      cd social_media_front
      npom start
