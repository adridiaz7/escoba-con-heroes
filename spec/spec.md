# SPEC - Escoba con héroes

## Objetivo

Crear un juego web basado en una versión simplificada de la escoba, donde el jugador se enfrenta a una CPU.

El objetivo principal es jugar cartas y capturar cartas de la mesa formando combinaciones que sumen 15.

La diferencia respecto a una escoba normal es que el juego incluye héroes con habilidades especiales sencillas.

## Alcance del MVP

La primera versión del juego debe permitir:

- crear una baraja española de 40 cartas;
- mezclar la baraja;
- repartir cartas a la mesa;
- repartir cartas al jugador;
- repartir cartas a la CPU;
- mostrar las cartas en pantalla;
- permitir que el jugador seleccione una carta de su mano;
- permitir que el jugador seleccione cartas de la mesa;
- comprobar si la carta jugada y las cartas seleccionadas suman 15;
- capturar cartas si la jugada es válida;
- dejar la carta en la mesa si no se captura;
- hacer que la CPU juegue automáticamente;
- mostrar mensajes básicos de la partida;
- permitir reiniciar la partida.

## Reglas simplificadas

- Se juega con baraja española de 40 cartas.
- Los palos son oros, copas, bastos y espadas.
- Las cartas usadas son 1, 2, 3, 4, 5, 6, 7, 10, 11 y 12.
- Para sumar 15, las figuras tienen valor adaptado:
  - 10 vale 8;
  - 11 vale 9;
  - 12 vale 10.
- El jugador juega una carta de su mano.
- Puede seleccionar una o varias cartas de la mesa.
- Si la suma total es 15, captura las cartas.
- Si no suma 15, la carta jugada se queda en la mesa.
- La CPU juega de forma automática con una lógica sencilla.

## Héroes iniciales

### Cambiacartas

Una vez por partida puede devolver una carta de su mano al mazo, barajar y robar otra carta.

### Recolectora

Si captura 3 o más cartas en una misma jugada, suma 1 punto extra.

### Coleccionista

Al final de la partida, si tiene 6 o más figuras capturadas, suma 2 puntos extra.

Se consideran figuras las cartas 10, 11 y 12.

## Clases principales

### Card

Representa una carta de la baraja.

Responsabilidades:

- guardar el palo;
- guardar el valor;
- devolver el valor real para sumar 15;
- generar un identificador de carta.

### Deck

Representa la baraja.

Responsabilidades:

- crear las cartas;
- mezclar la baraja;
- repartir cartas;
- indicar cuántas cartas quedan.

### Player

Representa a un jugador.

Responsabilidades:

- guardar la mano;
- jugar una carta;
- recibir cartas;
- guardar cartas capturadas;
- acumular puntuación.

### CpuPlayer

Representa a la CPU.

Responsabilidades:

- elegir una carta;
- buscar una combinación que sume 15;
- jugar automáticamente.

### Table

Representa la mesa de juego.

Responsabilidades:

- guardar las cartas visibles en la mesa;
- añadir cartas;
- retirar cartas capturadas;
- buscar cartas por identificador;
- buscar combinaciones que sumen 15.

### Game

Controla la partida.

Responsabilidades:

- crear baraja, mesa, jugador y CPU;
- iniciar la partida;
- controlar turnos;
- validar jugadas;
- gestionar capturas;
- comprobar final de partida;
- reiniciar el juego.

### Hero

Representa un héroe con habilidad.

Responsabilidades:

- guardar nombre;
- guardar descripción;
- controlar si la habilidad ya se ha usado;
- aplicar la habilidad cuando corresponda.

## Criterios de aceptación

El juego se considerará funcional cuando:

- el proyecto compile con `npm run build`;
- el jugador pueda ver su mano;
- el jugador pueda ver las cartas de la mesa;
- el jugador pueda seleccionar una carta de su mano;
- el jugador pueda seleccionar cartas de la mesa;
- el juego compruebe correctamente si la suma es 15;
- las cartas capturadas desaparezcan de la mesa;
- la CPU pueda realizar una jugada automática;
- el juego muestre mensajes básicos;
- exista un botón para reiniciar la partida.

## Fuera de alcance

No se incluirá en esta primera versión:

- multijugador online;
- base de datos;
- login de usuarios;
- ranking online;
- animaciones complejas;
- frameworks como React, Angular o Vue;
- reglas completas avanzadas de la escoba tradicional.

## Restricciones técnicas

- El proyecto se desarrollará con HTML, CSS y TypeScript.
- El navegador ejecutará el JavaScript generado en la carpeta `dist`.
- Se utilizará programación orientada a objetos.
- La lógica debe ser clara y explicable.
- La CPU tendrá una lógica sencilla.