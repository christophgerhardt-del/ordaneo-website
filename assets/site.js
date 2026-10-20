// Navigation: ab dem Scrollen ein heller, fester Kopf; Ausklappmenüs „Funktionen“ und „Branchen“; auf schmalen
// Bildschirmen das Menü hinter dem Burger; Links auf die aktuelle Seite werden markiert (aria-current).
// Speichert nichts und lädt nichts nach. Ohne JavaScript bleibt die Seite nutzbar: Der Kopf scrollt mit, die
// Ausklappmenüs öffnen per Hover und Tastaturfokus (CSS), und die Fußzeile führt zu allen Seiten.
// EINGEFROREN seit 21.10.2026 wie assets/site.css und assets/seiten.css (siehe plan/VORLAGE.md).
(function () {
  var nav = document.getElementById('nav')
  if (!nav) return
  function lage() { nav.classList.toggle('fest', window.scrollY > 24) }
  lage()
  window.addEventListener('scroll', lage, { passive: true })

  // Aktuelle Seite markieren: exakter Pfad, und der Bereich (Funktionen/Branchen) für Seiten darunter.
  var pfad = window.location.pathname.replace(/index\.html$/, '')
  var links = document.querySelectorAll('#nav a[href], #menue a[href], footer.gross a[href]')
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === pfad) links[i].setAttribute('aria-current', 'page')
  }
  var menues = Array.prototype.slice.call(nav.querySelectorAll('.hat-menue'))
  menues.forEach(function (menue) {
    var knopf = menue.querySelector('.hat-knopf')
    var ziel = knopf && knopf.getAttribute('href')
    if (ziel && ziel !== '/' && pfad.indexOf(ziel) === 0) menue.classList.add('aktiv')
  })

  // Ausklappmenüs: Hover (nur bei Maus), Klick auf den Pfeil, Escape, Klick daneben, Fokus verlässt das Menü.
  var mitMaus = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  function zu(menue, fokusZurueck) {
    if (!menue.classList.contains('offen')) return
    menue.classList.remove('offen')
    var pfeil = menue.querySelector('.hat-pfeil')
    if (pfeil) {
      pfeil.setAttribute('aria-expanded', 'false')
      if (fokusZurueck) pfeil.focus()
    }
  }
  menues.forEach(function (menue) {
    var pfeil = menue.querySelector('.hat-pfeil')
    if (!pfeil) return
    var timer = null
    var geoeffnetUm = 0
    function auf() {
      clearTimeout(timer)
      menues.forEach(function (anderes) { if (anderes !== menue) zu(anderes) })
      if (menue.classList.contains('offen')) return
      menue.classList.add('offen')
      pfeil.setAttribute('aria-expanded', 'true')
      geoeffnetUm = Date.now()
    }
    if (mitMaus) {
      menue.addEventListener('mouseenter', auf)
      menue.addEventListener('mouseleave', function () { clearTimeout(timer); timer = setTimeout(function () { zu(menue) }, 180) })
    }
    pfeil.addEventListener('click', function () {
      if (!menue.classList.contains('offen')) auf()
      else if (Date.now() - geoeffnetUm > 400) zu(menue)
    })
    menue.addEventListener('focusout', function (event) {
      if (event.relatedTarget && !menue.contains(event.relatedTarget)) zu(menue)
    })
  })
  document.addEventListener('click', function (event) {
    menues.forEach(function (menue) { if (!menue.contains(event.target)) zu(menue) })
  })
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return
    menues.forEach(function (menue) { zu(menue, menue.contains(document.activeElement)) })
  })

  // Menü hinter dem Burger (Telefon und schmale Tablets)
  var burger = nav.querySelector('.burger')
  var menue = document.getElementById('menue')
  if (!burger || !menue) return
  function setze(offen) {
    document.body.classList.toggle('menue-offen', offen)
    burger.setAttribute('aria-expanded', String(offen))
    burger.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen')
    if (offen) menue.removeAttribute('inert')
    else menue.setAttribute('inert', '')
  }
  burger.addEventListener('click', function () { setze(!document.body.classList.contains('menue-offen')) })
  menue.addEventListener('click', function (event) { if (event.target.closest('a')) setze(false) })
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && document.body.classList.contains('menue-offen')) { setze(false); burger.focus() }
  })
  window.addEventListener('resize', function () { if (window.innerWidth > 980) setze(false) })
})()
