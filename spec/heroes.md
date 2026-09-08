# Héroes y habilidades - Escoba con héroes

Este documento define los héroes iniciales del juego y sus habilidades.

La idea es que las habilidades añadan variedad a la partida, pero sin complicar demasiado la lógica principal de la escoba.

## Criterio general

Los héroes deben cumplir estas condiciones:

- tener una habilidad sencilla de entender;
- poder explicarse fácilmente en la presentación;
- no romper las reglas básicas de sumar 15;
- poder programarse con condiciones, arrays y métodos claros;
- no depender de animaciones complejas ni de elementos externos.

## Héroe 1 - Cambiacartas

### Tipo de habilidad

Habilidad activa.

### Descripción

Una vez por partida, el jugador puede elegir una carta de su mano, devolverla al mazo, barajar el mazo y robar una carta nueva.

### Objetivo

Dar al jugador una segunda oportunidad cuando tiene una mano poco útil.

### Condiciones

- Solo se puede usar una vez por partida.
- El jugador debe tener cartas en la mano.
- La baraja debe tener al menos una carta disponible.
- La carta elegida vuelve al mazo antes de barajar.

### Lógica aproximada

1. El jugador selecciona una carta de su mano.
2. La carta se elimina de la mano.
3. La carta vuelve al mazo.
4. El mazo se mezcla.
5. El jugador roba una carta nueva.
6. La habilidad queda marcada como usada.

---

## Héroe 2 - Recolectora

### Tipo de habilidad

Habilidad pasiva.

### Descripción

Si el jugador captura 3 o más cartas de la mesa en una misma jugada, suma 1 punto extra.

### Objetivo

Premiar las jugadas grandes y hacer más interesante la elección de cartas.

### Condiciones

- La jugada debe ser válida.
- La suma total debe ser 15.
- Deben capturarse 3 o más cartas de la mesa.
- El punto extra se suma en el momento de la captura.

### Lógica aproximada

1. El jugador realiza una captura válida.
2. Se cuentan las cartas capturadas de la mesa.
3. Si son 3 o más, se suma 1 punto extra.

---

## Héroe 3 - Coleccionista

### Tipo de habilidad

Habilidad pasiva de final de partida.

### Descripción

Al final de la partida, si el jugador tiene 6 o más figuras capturadas, suma 2 puntos extra.

### Objetivo

Dar importancia a las cartas capturadas durante toda la partida, no solo a las escobas.

### Figuras

Se consideran figuras:

- 10;
- 11;
- 12.

### Condiciones

- Solo se comprueba al final de la partida.
- Se cuentan las figuras capturadas por el jugador.
- Si tiene 6 o más figuras, se suman 2 puntos extra.

### Lógica aproximada

1. Termina la partida.
2. Se revisan las cartas capturadas por el jugador.
3. Se cuentan las cartas cuyo valor sea 10, 11 o 12.
4. Si el total es 6 o más, se añaden 2 puntos.

---

## Héroe 4 - Escobero

### Tipo de habilidad

Habilidad pasiva.

### Descripción

Cada vez que el jugador hace una escoba, suma 1 punto adicional.

### Objetivo

Reforzar una mecánica clásica de la escoba y premiar las jugadas que limpian la mesa.

### Condiciones

- La jugada debe ser válida.
- La mesa debe quedar vacía después de capturar.
- El punto adicional se suma en el momento de la escoba.

### Lógica aproximada

1. El jugador captura cartas.
2. Se comprueba si la mesa queda vacía.
3. Si la mesa queda vacía, se considera escoba.
4. Si el jugador tiene este héroe, suma 1 punto extra.

---

## Orden recomendado de implementación

Para evitar errores, los héroes no deben programarse antes de que funcione la partida básica.

Orden recomendado:

1. Terminar juego base.
2. Comprobar que se puede jugar una partida completa.
3. Añadir Cambiacartas.
4. Añadir Recolectora.
5. Añadir Coleccionista.
6. Añadir Escobero.
7. Probar todas las habilidades por separado.
8. Probar una partida completa con cada héroe.

## Pruebas necesarias

Antes de dar por buena la parte de héroes, hay que comprobar:

- que una habilidad activa no pueda usarse dos veces;
- que una habilidad pasiva se aplique solo cuando corresponda;
- que los puntos extra se sumen correctamente;
- que el juego siga funcionando aunque el jugador no use habilidad;
- que cambiar de héroe no rompa la partida;
- que la CPU pueda jugar aunque no tenga héroe implementado o tenga uno básico.