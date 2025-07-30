# Perplexity API Blog Generator

Questo script genera articoli di blog in formato HTML utilizzando l'API di Perplexity. Legge una lista di domande da un file di testo, genera contenuti per ciascuna domanda utilizzando l'API di Perplexity, e salva i risultati come file HTML utilizzando un template predefinito.

## Requisiti

- Python 3.6 o superiore
- Libreria `requests` (installabile con `pip install requests`)
- Un API key valido per Perplexity

## File del Progetto

- `perplaxyty.py`: Script principale che genera gli articoli
- `domande.txt`: File contenente le domande/titoli per gli articoli
- `template.html`: Template HTML utilizzato per formattare gli articoli

## Installazione

1. Clona o scarica questo repository
2. Installa le dipendenze:

```bash
pip install requests
```

3. Assicurati che l'API key di Perplexity sia correttamente configurato nello script (già impostato come `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`)

## Utilizzo

### Comando Base

```bash
python perplaxyty.py
```

Questo comando elaborerà tutte le domande nel file `domande.txt` e salverà gli articoli HTML nella directory `articoli`.

### Opzioni

- `--limit N`: Limita il numero di domande da processare a N (utile per test o per elaborare solo una parte delle domande)
- `--output DIR`: Specifica una directory di output personalizzata per gli articoli HTML

### Esempi

Elabora solo le prime 5 domande:
```bash
python perplaxyty.py --limit 5
```

Salva gli articoli in una directory personalizzata:
```bash
python perplaxyty.py --output miei_articoli
```

Combina entrambe le opzioni:
```bash
python perplaxyty.py --limit 10 --output articoli_test
```

## Funzionamento

1. Lo script legge le domande dal file `domande.txt`
2. Per ogni domanda:
   - Genera contenuto utilizzando l'API di Perplexity
   - Formatta il contenuto utilizzando il template HTML
   - Salva il risultato come file HTML nella directory di output
   - Aggiunge un ritardo di 2 secondi tra le richieste API per evitare limiti di frequenza

## Personalizzazione

### Modificare il Template HTML

Il file `template.html` contiene il template utilizzato per formattare gli articoli. Puoi modificarlo per cambiare l'aspetto degli articoli generati. Il template utilizza i seguenti segnaposto:

- `{TITLE}`: Titolo della pagina
- `{DESCRIPTION}`: Meta descrizione
- `{H1}`: Intestazione principale
- `{CONTENT}`: Contenuto principale dell'articolo

### Modificare il Prompt di Sistema

Puoi modificare il prompt di sistema nella funzione `generate_blog_content` nello script `perplaxyty.py` per personalizzare le istruzioni inviate all'API di Perplexity.

## Note

- L'elaborazione di un gran numero di domande può richiedere molto tempo e consumare molti crediti API
- Utilizza l'opzione `--limit` per testare lo script con un piccolo numero di domande prima di elaborare l'intero file
- I file HTML generati includono timestamp nei nomi file per garantire l'unicità