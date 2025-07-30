# Pulizia del Sito Web

## Riepilogo delle Modifiche

Ho rimosso i file non necessari dal vecchio sito, mantenendo solo i file essenziali per il caricamento sul server. Ecco un riepilogo delle modifiche effettuate:

### File e Cartelle Mantenuti

- **File HTML principali**:
  - home.html
  - comuni.html
  - guida-installazione.html
  - materiali.html
  - normative.html
  - preventivo.html
  - sitemap.xml

- **Directory CSS**: Contiene tutti i file CSS necessari per lo stile del sito
  - Bootstrap CSS
  - File CSS personalizzati

- **Directory JS**: Contiene tutti i file JavaScript necessari per la funzionalità del sito
  - Bootstrap JS
  - Script personalizzati

- **Directory FAQ**: Contiene tutte le pagine FAQ (752 file)

- **Directory Templates**: Contiene i template HTML utilizzati dal sito
  - header.html
  - footer.html
  - unified-menu.html
  - faq-template.html

### File e Cartelle Rimossi

- **File di sviluppo**:
  - README.md
  - README_FAQ.md
  - come-vedere-il-sito.md
  - domande.txt
  - fix_html_structure.ps1
  - remove_stufe_pellet_sections.ps1
  - template.html
  - test.html
  - update_faq_pages.py
  - update_main_pages.py

- **Directory Hugo**: Conteneva una nuova versione del sito non ancora costruita
  - hugo-site/
  - hugo-temp/

- **File di configurazione IDE**:
  - .idea/
  - .output.txt

## Istruzioni per il Caricamento sul Server

Per caricare il sito sul server, è sufficiente trasferire tutti i file e le cartelle rimanenti nella directory principale del server web. La struttura del sito è ora pulita e pronta per essere caricata.

I file essenziali per il funzionamento del sito sono:
- I file HTML nella directory principale
- La directory css/
- La directory js/
- La directory faq/
- La directory templates/