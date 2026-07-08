# Taxi Elbasan — Website

Website i plotë për një biznes taxi në Elbasan: rezervim i shpejtë në WhatsApp, kalkulator distance/çmimi, statusi i shoferit, ndjekje fluturimi, panel admini, dhe shumë më tepër. Ndërtuar me Next.js dhe Supabase (falas përgjithmonë në planin bazë).

Ky README është shkruar hap pas hapi, edhe nëse s'ke përvojë teknike. Ndiq radhën.

---

## 1. Çfarë të duhet përpara se të fillosh

- Një llogari falas në [supabase.com](https://supabase.com) (baza e të dhënave)
- Një llogari falas në [vercel.com](https://vercel.com) (aty jeton website-i, falas)
- Një llogari GitHub (opsionale, por rekomandohet — [github.com](https://github.com))
- Numri i WhatsApp Business i taksisë (me kodin e vendit, p.sh. `355691234567`, pa shenjën `+`)
- Node.js i instaluar në kompjuter (vetëm nëse do të testosh lokalisht — jo i domosdoshëm nëse ngarkon direkt në Vercel)

---

## 2. Krijo bazën e të dhënave (Supabase) — 5 minuta

1. Shko te [supabase.com](https://supabase.com) → **Start your project** → hyr me GitHub ose email.
2. Kliko **New Project**. Zgjidh një emër (p.sh. `taxi-elbasan`), një fjalëkalim për databazën (ruaje diku), dhe rajonin më të afërt (Frankfurt është më i afërti me Shqipërinë).
3. Prit ~2 minuta derisa projekti të krijohet.
4. Shko te **SQL Editor** (ikona në të majtë) → **New query**.
5. Hap file-in `supabase/schema.sql` nga ky projekt, kopjo GJITHË përmbajtjen, ngjite në SQL Editor, dhe kliko **Run**.
   - Kjo krijon të gjitha tabelat (rezervime, destinacione, pyetje të shpeshta, cilësime, newsletter) dhe i mbush me të dhëna fillestare (çmimet e Elbasan → Aeroport, Tiranë, etj.) që mund t'i ndryshosh më vonë nga paneli i adminit.
6. Shko te **Settings → API**. Aty gjen tre gjëra që të duhen në hapin tjetër:
   - **Project URL** → kjo është `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → kjo është `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (kliko "reveal") → kjo është `SUPABASE_SERVICE_ROLE_KEY` — **kjo është sekrete, mos e ndaj me askënd, mos e vendos në kod publik**

---

## 3. Konfiguro variablat e mjedisit (environment variables)

Kopjo file-in `.env.example` dhe riemërto kopjen `.env.local`. Plotëso çdo rresht:

```
NEXT_PUBLIC_SUPABASE_URL=...          (nga hapi 2)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     (nga hapi 2)
SUPABASE_SERVICE_ROLE_KEY=...         (nga hapi 2)

ADMIN_PASSWORD=zgjidh-nje-fjalekalim-te-forte

RESEND_API_KEY=              (opsionale — shiko seksionin 7)
RESEND_TO_EMAIL=
RESEND_FROM_EMAIL=

AVIATIONSTACK_API_KEY=       (opsionale — shiko seksionin 8)
```

**`ADMIN_PASSWORD`** është fjalëkalimi për panelin e administratorit (`/admin`). Zgjidh diçka që vetëm ti e di.

---

## 4. Ngarkimi në internet (deploy) me Vercel — mënyra më e lehtë

**Nuk të duhet të instalosh asgjë në kompjuter për këtë hap.**

1. Shko te [github.com](https://github.com) dhe krijo një repository të ri (p.sh. `taxi-elbasan`), publik ose privat — nuk ka rëndësi.
2. Ngarko të gjithë përmbajtjen e këtij projekti (të gjitha folderat/file-t përveç `node_modules` dhe `.next` nëse ekzistojnë) në atë repository. Mënyra më e lehtë: në faqen e repository-t kliko **Add file → Upload files** dhe tërhiq gjithçka.
3. Shko te [vercel.com](https://vercel.com) → **Add New → Project** → zgjidh repository-n që sapo krijove.
4. Para se të klikosh Deploy, hap **Environment Variables** dhe shto SAKTËSISHT të njëjtat variabla që vendose te `.env.local` në hapin 3 (emrin dhe vlerën, një nga një).
5. Kliko **Deploy**. Prit 1–2 minuta.
6. Website-i yt është gati në një adresë si `taxi-elbasan.vercel.app`. Nëse ke domain tëndin (p.sh. `taxielbasan.al`), shto atë te **Settings → Domains** në Vercel dhe ndiq udhëzimet për DNS.

Çdo herë që ndryshon kod dhe e ngarkon përsëri në GitHub, Vercel e rifreskon website-in automatikisht.

### Alternativë: testim lokal para se ta ngarkosh

Nëse ke Node.js (version 18+) të instaluar:

```bash
npm install
npm run dev
```

Hap `http://localhost:3000` në browser. `npm run build` kontrollon që gjithçka është gati për prodhim.

---

## 5. Si të ngarkosh fotot

Website-i është ndërtuar që fotot të vendosen vetë, pa prekur kod. Në folderin `public/images/` vendos foto me **saktësisht këto emra**:

| Emri i file-it              | Ku shfaqet                  | Përmasa minimale rekomanduar |
|------------------------------|------------------------------|-------------------------------|
| `hero-poster.jpg`             | Foto e parë e hero-s, para se video të ngarkohet | 1920×1080 px |
| `car-exterior.jpg`           | Galeria — makina nga jashtë  | 1600×1200 px                  |
| `car-interior.jpg`           | Galeria — makina nga brenda  | 1600×1200 px                  |
| `driver.jpg`                 | Galeria — foto e shoferit    | 1200×1200 px                  |
| `airport-pickup.jpg`         | Galeria — marrja në aeroport | 1600×1200 px                  |

Derisa të ngarkosh foto reale, ai vend shfaq një kuti të stilizuar me emrin e file-it që pret — kështu e di gjithmonë ku duhet ta vendosësh. Sapo ngarkon një foto me emrin e saktë (dhe e ngarkon website-in përsëri në Vercel, ose thjesht e shton te GitHub), foto shfaqet automatikisht.

Këshillë: përdor foto horizontale (jo vertikale), me dritë natyrale, dhe kompreso ato (p.sh. në [squoosh.app](https://squoosh.app)) përpara se t'i ngarkosh, që faqja të hapet shpejt.

### Video në sfondin e hero-s (opsionale)

Seksioni kryesor (hero) mund të ketë një video të shkurtër që bën loop në sfond (p.sh. makina duke lëvizur natën, ose rrugë në Elbasan). Për ta shtuar:

1. Vendos një video në `public/video/hero-bg.mp4` — saktësisht ky emër dhe vend.
2. Rekomandohet: 8–15 sekonda, pa zë (do të hiqet automatikisht — video luhet gjithmonë e heshtur), 1920×1080, e kompresuar mirë (nën 8–10 MB që faqja të hapet shpejt — përdor [HandBrake](https://handbrake.fr) falas për ta kompresuar).
3. Nëse nuk vendos video, faqja shfaq automatikisht `hero-poster.jpg` (nëse e ke vendosur) ose një sfond gradient të thjeshtë — asgjë s'prishet.

Nuk të duhet të prekësh asnjë kod për këtë, thjesht vendos file-in me emrin e saktë.

---

## 6. Paneli i Administratorit

Shko te `jotdomain.com/admin` dhe fut fjalëkalimin që vendose te `ADMIN_PASSWORD`.

Aty mund të:

- **Bookings** — shikon çdo rezervim që klientët dërgojnë, dhe ndryshon statusin (Pending → Confirmed → On The Way → Completed). Ky status shfaqet automatikisht te "Statusi i Rezervimit" në faqe kur klienti kërkon me numrin e telefonit.
- **Destinations** — ndryshon çmimet, distancat, dhe kohët për çdo destinacion, ose shton destinacione të reja.
- **FAQs** — ndryshon pyetjet dhe përgjigjet e shpeshta (këto përdoren edhe nga "Asistenti" i chat-it në faqe).
- **Settings** — ndryshon statusin live (Në Dispozicion / I Zënë), kohën e mbërritjes së shoferit, numrin e WhatsApp, numrin e telefonit, numrin e udhëtimeve, etj.
- **Newsletter** — shikon listën e email-eve që janë regjistruar.

---

## 7. Si të ndryshosh numrin e telefonit / WhatsApp me tëndin

Numri që ke parë në kod (`355691234567`) është vetëm shembull. Ka **tre vende** ku mund të ndryshohet — përdor mënyrën e parë, pjesa tjetër është vetëm për informim:

**Mënyra më e shpejtë (rekomanduar) — nga paneli i adminit, pasi website-i të jetë online:**
1. Shko te `jotdomain.com/admin` dhe hyr me `ADMIN_PASSWORD`.
2. Shko te tab-i **Settings**.
3. Ndrysho:
   - **Numri i WhatsApp** → vetëm shifra, me kodin e Shqipërisë, pa `+` dhe pa hapësira. Shembull: nëse numri yt është `+355 69 123 4567`, shkruaj `355691234567`.
   - **Numri i telefonit** → ky përdoret nga butoni "Telefono Tani" dhe mund ta shkruash me `+`, p.sh. `+355691234567`.
4. Ndryshimi shfaqet menjëherë në sit, pa ri-deploy.

**Alternativë — direkt te Supabase (nëse për ndonjë arsye admini s'punon):**
1. Shko te projekti yt në [supabase.com](https://supabase.com) → **Table Editor** → tabela `settings`.
2. Gjej rreshtin me `key = whatsapp_number` dhe ndrysho `value`-n (p.sh. `"355691234567"` — me thonjëza, është tekst).
3. Bëj të njëjtën gjë për `key = phone_number` (p.sh. `"+355691234567"`).

**Vlera e para-vendosur në kod (fallback):** nëse databaza ende s'është lidhur (nuk ke vendosur ende variablat e Supabase te Vercel), sistemi përdor numrat e shembullit që gjenden te `lib/defaults.js` (fushat `whatsapp_number` dhe `phone_number`) dhe `supabase/schema.sql` (të dhënat fillestare). Këto i ndryshon dot vetëm nëse redakton kodin — por meqë Mënyra 1 (paneli i adminit) mbivendos gjithmonë këto vlera pasi Supabase është lidhur, zakonisht s'të duhet të prekësh fare këto file.

---

## 8. (Opsionale) Njoftime me Email për çdo rezervim

Si parazgjedhje, rezervimet dërgohen automatikisht në WhatsApp dhe ruhen në databazë — kjo funksionon pa asnjë konfigurim shtesë. Nëse do edhe email njoftimi:

1. Krijo llogari falas te [resend.com](https://resend.com).
2. Merr një API key nga aty.
3. Shto te variablat e mjedisit: `RESEND_API_KEY`, `RESEND_TO_EMAIL` (email-i yt ku do t'i marrësh njoftimet), dhe `RESEND_FROM_EMAIL` (nëse ke domain të verifikuar te Resend; përndryshe lëre bosh dhe do përdoret një adresë e parazgjedhur).

Pa këto, butoni "Dërgo me Email" thjesht nuk bën asgjë shtesë — WhatsApp funksionon gjithsesi normalisht.

---

## 9. (Opsionale) Ndjekje automatike e fluturimeve

Si parazgjedhje, seksioni "Ndjekja e Fluturimit" i thotë klientit që ta japë numrin e fluturimit dhe shoferi e kontrollon manualisht — kjo funksionon menjëherë pa konfigurim.

Për ndjekje automatike (statusi i fluturimit merret vetë nga interneti):

1. Krijo llogari falas te [aviationstack.com](https://aviationstack.com) (plani falas mjafton për fillim).
2. Merr API key-n.
3. Shto te variablat e mjedisit: `AVIATIONSTACK_API_KEY`.

---

## 10. Ndryshimi i numrave, çmimeve dhe përmbajtjes

Shumica e gjërave ndryshohen nga paneli i adminit (seksioni 6), pa prekur kod fare. Nëse do ndryshime më të thella në dizajn ose tekst, file-t kryesorë janë:

- `components/` — çdo seksion i faqes është një file i veçantë këtu (Hero, BookingWizard, DestinationsPricing, etj.)
- `lib/i18n.js` — të gjitha tekstet në shqip/anglisht/italisht
- `lib/defaults.js` — çmimet dhe destinacionet e para-mbushura (përdoren vetëm nëse databaza është bosh)
- `app/globals.css` — ngjyrat dhe stilet

---

## 11. Struktura e projektit (për referencë)

```
app/                  faqet dhe API routes (Next.js App Router)
  admin/              paneli i administratorit
  api/                pikat e API-t (booking, flight, admin CRUD)
  page.js             faqja kryesore
  layout.js           layout-i global, fontet
components/           çdo seksion i faqes si komponent i veçantë
lib/                  logjika e përbashkët (supabase, çmime, whatsapp, përkthime)
public/images/        këtu vendosen fotot (shiko seksionin 5)
supabase/schema.sql   skema e plotë e databazës, gati për t'u ekzekutuar
```

---

## 12. Probleme të mundshme

- **Faqja duket bosh / pa destinacione**: kontrollo që `NEXT_PUBLIC_SUPABASE_URL` dhe `NEXT_PUBLIC_SUPABASE_ANON_KEY` janë vendosur saktë te Vercel. Pa to, faqja funksionon gjithsesi me çmime të para-vendosura, por rezervimet nuk ruhen në databazë.
- **Nuk hyj dot te /admin**: sigurohu që `ADMIN_PASSWORD` është vendosur te Vercel, dhe që e ke ri-deploy-uar pas ndryshimit të variablave (Vercel → Deployments → ... → Redeploy).
- **WhatsApp nuk hapet**: kontrollo që `whatsapp_number` te Settings është vetëm shifra, me kodin e Shqipërisë `355`, pa `+` dhe pa hapësira (p.sh. `355691234567`).

Sukses me biznesin!
