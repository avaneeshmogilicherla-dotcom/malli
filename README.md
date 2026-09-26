# malli (மல்லிகை) — Haute Gastronomy & Botanical Alchemy

> **"A Sacred Symphony of Clay, Fire & Night-Blooming Jasmine"**

An extraordinary, Michelin-caliber restaurant website designed for **malli**, blending ancient Tamil culinary heritage with progressive avant-garde gastronomy.

---

## 🌸 Creative Direction & Design Architecture

### 1. Brand Identity & Name
* **Name**: **malli** (மல்லிகை — Jasmine in Tamil).
* **Concept**: Inspired by the night-blooming jasmine groves of Madurai, Kumbakonam earthen clay pot slow-cooking traditions, and walnut-charcoal fire gastronomy.
* **Inspirations**:
  * **Trèsind Studio** (Two Michelin Star culinary theatre, botanical minimalism, 9-course storytelling journeys).
  * **Mannmarzi Dubai** (Theatrical dining realms, poetic chapters, grand entrance).
  * **Tamasha** (Modern sensory dining, craft mixology, dark luxury aesthetic, sensory flavour radar).

### 2. Bespoke Color System
* **Champagne Gold** (`#E6C587`, `#F7E5C3`, `#B88C44`): Sacred temple jewelry, glowing embers, stardust reflections.
* **Clay Pot Color** (`#C25634`, `#8C3619`): Earthen Kumbakonam terracotta pots, warm clay hearth glow.
* **Walnut** (`#110A06`, `#1A100A`, `#22160E`): Deep aged dark luxury wood panelling.
* **Red Wine** (`#5A0E1F`, `#3A0813`, `#7C1A30`): Regal bordeaux cabernet, matching the client's red wine logo!
* **Jasmine White & Cream** (`#FAF7F2`, `#F2ECE1`): Freshly plucked night jasmine petals, ivory porcelain.

### 3. The Five Sacred Blooms (Interactive Chapters)
1. **Jasmine (Malli)** — *The Signature Blossom*: Moonlight harvest in Madurai, cold-distilled jasmine butter, Kumbakonam clay pot dum biryani.
2. **Magnolia (Shenbagam)** — *Coastal Grandeur*: Citrus nuances, magnolia leaf coconut velouté, butter-poached bay lobster.
3. **Dahlia** — *Clay & Fire*: Layered geometric petals, 72-hour cured lamb rack glazed with Kashmiri chili and pickled dahlia petals.
4. **Tulip** — *Modern Architecture*: Saffron pastry cups, spiced heirloom morels, Sevuga caviar.
5. **Gardenia (Kandaraja)** — *Velvety Mystique*: Nocturnal elixir, Valrhona 70% dark cacao with gardenia blossom foam.

---

## ✨ Standout Interactive Animations & Features

1. **Jasmine Blossom & Golden Stardust Particle Engine (`assets/js/petals.js`)**:
   - High-performance HTML5 Canvas physics engine.
   - Organic white & champagne gold jasmine petals floating in natural vortex with fluttering 3D flipping.
   - **Interactive physics**: Petals gently scatter away from cursor movement and draft with scroll wind.
   - **Click Blossom Burst**: Clicking anywhere or selecting tabs releases a swirl of fragrant petals.

2. **Atmospheric Lighting Mode Switcher (Header Pill)**:
   - **Walnut Noir** (Deep dark walnut & champagne gold)
   - **Bordeaux Red Wine** (Rich royal red wine & gold, matching the client's red logo)
   - **Terracotta Clay** (Warm earthen clay pot & ivory)
   - **Jasmine Dawn** (Ethereal ivory white & champagne gold, matching the white logo)

3. **Multisensory Ambient Soundscape Generator (`assets/js/audio.js`)**:
   - Synthesizes an ambient night raga lounge soundscape directly using the browser's native **Web Audio API** (Key of D / Raag Yaman, gentle night breeze filter, and resonant crystal temple chimes).
   - Zero external audio files needed; 100% reliable across all modern browsers.

4. **Theatrical Hero Stage & 3D Tilt**:
   - Parallax 3D tilt on the client's gold emblem reacting to mouse coordinates.
   - Live operational status indicator (*"Tonight's Reserve: 3 Tables Remaining | Scented Mist Courtyard Active"*).
   - Instant video lightbox teaser playing the client's video walkthrough.

5. **Tamasha-Inspired Botanical Mixology Radar**:
   - Signature cocktails with interactive flavor profile meters (*Floral Intensity, Citrus Brightness, Smoky Resonance, Earthen Clay*).

6. **Interactive Table Reservation Concierge & Boarding Pass**:
   - Multi-step luxury booking system (Date, Time, Seating Zone, Experience Tier).
   - Generates an instant **Digital Haute Gastronomy Boarding Pass** with unique reservation code (`ML-XXXX`) and barcode.

---

## 🚀 How to Run & Preview

The site is completely self-contained with all images, stylesheets, and scripts saved locally in `assets/`.

### Option A: Local Preview Server (Already Running!)
The local server is running at:
```
http://localhost:8080/
```
Simply open `http://localhost:8080` in your web browser.

### Option B: Open Directly
Double-click `c:\NexGeTech\malli\index.html` to open it directly in Chrome, Edge, Safari, or Firefox.

### Option C: Run via Python or Node
```bash
# In c:\NexGeTech\malli
python -m http.server 8080
# or
npx serve
```
