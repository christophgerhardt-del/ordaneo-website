// Navigation: ab dem Scrollen ein heller, fester Kopf; auf schmalen Bildschirmen das Menü hinter dem Burger.
// Speichert nichts und lädt nichts nach. Ohne JavaScript bleibt die Seite vollständig nutzbar (Kopf scrollt mit).
(function () {
  var nav = document.getElementById('nav')
  if (!nav) return
  function lage() { nav.classList.toggle('fest', window.scrollY > 24) }
  lage()
  window.addEventListener('scroll', lage, { passive: true })

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
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setze(false) })
})()
