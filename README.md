# Argentina Economic Signal  
**Nowcasting del EMAE y señal sintética de régimen económico**

Este repositorio presenta un pipeline reproducible para construir una **señal económica mensual para Argentina**, basada en nowcasting del EMAE y en la dinámica de indicadores reales adelantados.  
El objetivo es sintetizar información de nivel y momentum en una **señal interpretable (0–100)** y una **clasificación de régimen económico**.

---

## 1. Objetivo

Desarrollar una señal contemporánea que permita:

- Anticipar cambios en el **ciclo económico**.
- Separar **nivel interanual** de **dinámica subyacente**.
- Facilitar análisis de régimen (expansión, transición, contracción).
- Proveer un insumo simple y comunicable para visualización y seguimiento.

El enfoque es **exploratorio y analítico**, no estructural ni normativo.

---

## 2. Datos

Frecuencia mensual. Series transformadas a variación interanual (YoY) y alineadas temporalmente.

Variables utilizadas:

- `ym`: período mensual (YYYY-MM)
- `emae_yoy`: EMAE interanual (INDEC)
- `ipi_yoy`: IPI Manufacturero interanual (INDEC)
- `isac_yoy`: ISAC Construcción interanual (INDEC)

El dataset final se exporta para consumo directo por la app:


---

## 3. Metodología

### 3.1 Nowcasting del EMAE
Se estima un nowcast mensual del EMAE (`yhat`) a partir de indicadores reales adelantados.  
El énfasis está puesto en **consistencia temporal y estabilidad**, no en optimización in-sample.

### 3.2 Baselines
Se compara el modelo contra un baseline ingenuo:

- **Naive**: `EMAE_t ≈ EMAE_{t-1}`

Este baseline resulta competitivo en MAE, lo cual es consistente con la inercia típica de series macroeconómicas mensuales.

### 3.3 Construcción de la señal
La señal prioriza la **dinámica** sobre el nivel:

- Aceleración del nowcast (`Δ yhat`)
- Suavizado temporal (rolling window)
- Normalización min–max → escala **0–100**

Esto permite capturar cambios de momentum incluso cuando el nivel interanual permanece positivo o cercano a cero.

### 3.4 Clasificación de régimen
Reglas determinísticas y transparentes:

- **Contracción**: señal < 30  
- **Transición**: 30 ≤ señal < 60  
- **Expansión**: señal ≥ 60  

---

## 4. Resultados principales

### Precisión (benchmark)
- **MAE modelo**: ≈ 4.33  
- **MAE naive**: ≈ 3.11  

En términos de error medio absoluto, el baseline ingenuo es competitivo, lo cual es esperable.

### Dirección y dinámica
- **Coincidencia de signo en aceleración** (`Δ yhat` vs `Δ EMAE real`):  
  **≈ 86%**

Esto indica que el modelo captura adecuadamente la **dirección del cambio**, aun cuando el error de nivel no sea mínimo.

### Interpretación económica
- El valor agregado del enfoque no está en el nivel puntual, sino en:
  - Identificar **cambios de régimen**.
  - Detectar **debilitamientos o recuperaciones tempranas**.
- Es posible observar períodos de **contracción** aun con EMAE YoY levemente positivo, reflejando pérdida de momentum.

---

## 5. Visualización

La app web muestra:

- Último valor de la señal (0–100)
- Régimen económico actual
- EMAE YoY estimado
- Evolución histórica de la señal

Está diseñada como **dashboard liviano**, orientado a lectura ejecutiva y seguimiento temporal.

---

## 6. Limitaciones

- Señal de naturaleza **heurística**, no probabilística.
- Sensible a revisiones de datos oficiales.
- Umbrales de régimen convencionales y ajustables.
- No sustituye modelos estructurales ni proyecciones oficiales.

---

## 7. Disclaimer

Este trabajo tiene fines analíticos y de investigación.  
No constituye recomendación de inversión ni pronóstico oficial.

