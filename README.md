# Arbetserfarenheter Webbapplikation

Denna webbapplikation konsumerar en webbtjänst för hantering av arbetserfarenheter. Nedan finns en beskrivning av de olika delarna i webbapplikationen.

## Funktioner

### 1. index.html - Visa alla poster

På denna sida visas alla arbetserfarenheter i en lista. Webbapplikationen använder Fetch API för att hämta data från den REST-webbtjänst som hanterar arbetserfarenheter.

### 2. add.html - Lägg till ny post

På denna sida finns ett formulär för att lägga till en ny arbetserfarenhet. När användaren fyller i formuläret och skickar det, används Fetch API för att skicka data till webbtjänsten för att lägga till den nya posten.

### 3. about.html - Om webbplatsen

På denna sida finns information om webbplatsen och dess syfte. Här kan även information om vilken databas-server som används inkluderas.

## Slutsats

Genom att använda Fetch API har vi skapat en fristående frontend-applikation som kan kommunicera med en separat webbtjänst för hantering av arbetserfarenheter. Detta gör det möjligt att separera frontend och backend, vilket ger flexibilitet och skalbarhet i systemet.
