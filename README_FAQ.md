# Sistema FAQ Integrato - Documentazione

Questo documento descrive il nuovo sistema di FAQ integrato direttamente in `home.html` per il sito Preventivi Canne Fumarie Verona.

## Panoramica

Il sistema FAQ è stato completamente riprogettato per:
1. Integrare direttamente le FAQ in `home.html` (senza iframe)
2. Mantenere lo stesso design e stile del resto del sito
3. Organizzare le domande in categorie per una migliore navigazione
4. Fornire funzionalità di ricerca per trovare facilmente le risposte
5. Ottimizzare l'esperienza utente su tutti i dispositivi

## Struttura del Sistema FAQ

Il sistema FAQ è composto da:

1. **Pagina principale FAQ** - Una sezione in `home.html` con ID `faq` che mostra tutte le domande organizzate per categorie
2. **Pagine individuali per ogni domanda** - Sezioni in `home.html` con ID univoci (es. `faq-stufa-a-pellet-...`) che mostrano la risposta completa a una domanda
3. **Funzionalità di ricerca** - Un campo di ricerca che filtra le domande in tempo reale
4. **Navigazione a breadcrumb** - Link per tornare alla pagina principale FAQ da ogni domanda
5. **Stili CSS e JavaScript** - Codice aggiunto a `home.html` per gestire l'aspetto e le funzionalità

## Come Funziona

1. Le domande vengono lette dal file `domande.txt`
2. Vengono categorizzate automaticamente in base alla prima parola o al formato "Categoria: Domanda"
3. Il contenuto per ogni domanda viene generato utilizzando l'API Perplexity
4. Tutto il contenuto viene integrato direttamente in `home.html`
5. La navigazione tra le domande utilizza la funzione `showPage()` esistente

## Come Aggiungere Nuove Domande FAQ

### Metodo 1: Aggiungere domande a domande.txt e rigenerare

1. Aggiungi le nuove domande al file `domande.txt` (una per riga)
2. Esegui lo script `integrated_faq_generator.py` per rigenerare il contenuto:
   ```
   python integrated_faq_generator.py
   ```
   
   Oppure, per processare solo un numero limitato di domande:
   ```
   python integrated_faq_generator.py --limit 10
   ```

3. Lo script aggiornerà automaticamente `home.html` con le nuove domande e risposte

### Metodo 2: Aggiungere manualmente una singola domanda

Se vuoi aggiungere manualmente una singola domanda:

1. Aggiungi una nuova sezione per la domanda in `home.html` seguendo questo modello:
   ```html
   <!-- FAQ QUESTION: [Tua Domanda] -->
   <div class="page-content" id="faq-[id-univoco-per-la-domanda]">
       <section class="section">
           <div class="container">
               <div class="faq-breadcrumb">
                   <a href="#" onclick="showPage('faq'); return false;">← Torna alle Domande Frequenti</a>
               </div>
               <h2>[Tua Domanda]</h2>
               <div class="content-card">
                   [Contenuto HTML della risposta]
                   <div class="contact-info" style="margin: 2rem 0; padding: 1rem; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1e3c72;">
                       <h3>Hai altre domande?</h3>
                       <p>Contattaci direttamente per una consulenza personalizzata:</p>
                       <p><a href="tel:+393801568721" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #1e3c72; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">📞 Chiama Ora: 380 156 8721</a></p>
                   </div>
               </div>
           </div>
       </section>
   </div>
   ```

2. Aggiungi un link alla domanda nella sezione principale FAQ:
   ```html
   <div class="faq-category">
       <h3>[Categoria]</h3>
       <div class="faq-questions">
           <div class="faq-question-item">
               <a class="faq-question-link" href="#" onclick="showPage('faq-[id-univoco-per-la-domanda]'); return false;">
                   [Tua Domanda]
               </a>
           </div>
           <!-- Altre domande nella stessa categoria -->
       </div>
   </div>
   ```

## Personalizzazione

### Modificare le Categorie

Le categorie vengono generate automaticamente in base alla prima parola della domanda o al formato "Categoria: Domanda". Per personalizzare le categorie:

1. Modifica la funzione `categorize_questions()` in `integrated_faq_generator.py`
2. Puoi aggiungere regole personalizzate per assegnare domande a categorie specifiche

### Modificare lo Stile

Lo stile del sistema FAQ è definito nella sezione CSS aggiunta a `home.html`. Per modificare l'aspetto:

1. Trova la sezione di stile CSS dedicata alle FAQ (cerca `/* FAQ Styling */`)
2. Modifica i colori, i margini, i padding e altri stili secondo le tue preferenze

## Risoluzione dei Problemi

### La ricerca non funziona

Verifica che il JavaScript per la funzionalità di ricerca sia stato correttamente aggiunto a `home.html`. Cerca la funzione `setupFaqSearch()`.

### Le domande non vengono categorizzate correttamente

Modifica la funzione `categorize_questions()` in `integrated_faq_generator.py` per migliorare la logica di categorizzazione.

### Errori durante la generazione del contenuto

Se l'API Perplexity restituisce errori, verifica:
1. Che la chiave API sia valida
2. Che la connessione internet sia attiva
3. Che le domande non contengano caratteri speciali problematici

## Requisiti Tecnici

- Python 3.6 o superiore
- Librerie Python: requests, beautifulsoup4
- Chiave API Perplexity valida

## Note Importanti

- Lo script `integrated_faq_generator.py` sovrascrive le sezioni FAQ esistenti in `home.html`
- Fai sempre un backup di `home.html` prima di eseguire lo script
- Per processare tutte le domande in `domande.txt` potrebbe essere necessario molto tempo a causa dei limiti dell'API