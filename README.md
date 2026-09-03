# Escoba con héroes

Proyecto del tercer entregable: juego web basado en una versión simplificada de la escoba.

## Idea general

El jugador juega contra la CPU usando cartas de la baraja española. El objetivo es capturar cartas de la mesa formando combinaciones que sumen 15.

La diferencia principal es que cada jugador puede tener un héroe con una habilidad especial.

## Tecnologías utilizadas

- HTML
- CSS
- TypeScript
- JavaScript generado en la carpeta dist
- DOM y eventos del navegador

## Reglas principales

- Se utiliza una baraja española de 40 cartas.
- Se reparten cartas al jugador, a la CPU y a la mesa.
- Si la carta jugada junto con cartas de la mesa suma 15, se capturan esas cartas.
- Si no suma 15, la carta jugada se queda en la mesa.
- La CPU juega de forma automática con una lógica sencilla.

## Héroes iniciales

1. Cambiacartas: una vez por partida puede devolver una carta de la mano al mazo, barajar y robar otra.
2. Recolectora: si captura 3 o más cartas en una jugada, suma 1 punto extra.
3. Coleccionista: si al final de la partida tiene 6 o más figuras capturadas, suma 2 puntos extra.

## Restricciones

- No se usarán frameworks como React, Angular o Vue.
- No habrá juego online.
- La CPU tendrá una lógica sencilla y explicable.