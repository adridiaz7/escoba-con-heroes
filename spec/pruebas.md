# Pruebas manuales - Escoba con héroes

Este documento recoge las pruebas básicas que se deben realizar para comprobar que el juego funciona correctamente antes de añadir mejoras como héroes, animaciones o estética final.

## 1. Arranque del juego

### Objetivo

Comprobar que el proyecto carga correctamente en el navegador.

### Pasos

1. Ejecutar `npm run build`.
2. Abrir `index.html` con Live Server.
3. Abrir la consola del navegador.

### Resultado esperado

- La página carga sin quedarse en blanco.
- No aparecen errores rojos en consola.
- Se muestra el mensaje inicial del juego.
- Se crea correctamente una instancia de `Game`.

---

## 2. Reparto inicial de cartas

### Objetivo

Comprobar que la partida empieza con cartas repartidas.

### Pasos

1. Iniciar una partida.
2. Revisar las cartas de la mesa.
3. Revisar la mano del jugador.
4. Revisar la mano de la CPU.

### Resultado esperado

- La mesa empieza con 4 cartas.
- El jugador empieza con 3 cartas.
- La CPU empieza con 3 cartas.
- La baraja reduce correctamente el número de cartas restantes.

---

## 3. Visualización de cartas

### Objetivo

Comprobar que las cartas se muestran correctamente en pantalla.

### Pasos

1. Cargar la partida.
2. Observar la zona de mesa.
3. Observar la zona de mano del jugador.
4. Observar la zona de CPU.

### Resultado esperado

- Las cartas de la mesa se ven en su zona correspondiente.
- Las cartas del jugador se ven en su mano.
- Las cartas de la CPU no muestran información completa si se decide ocultarlas.
- Cada carta tiene un identificador interno para poder seleccionarla.

---

## 4. Selección de carta del jugador

### Objetivo

Comprobar que el jugador puede seleccionar una carta de su mano.

### Pasos

1. Hacer clic sobre una carta de la mano del jugador.
2. Observar si cambia visualmente.
3. Comprobar que solo se selecciona una carta de la mano.

### Resultado esperado

- La carta seleccionada queda marcada visualmente.
- El juego sabe qué carta quiere jugar el usuario.
- Si se selecciona otra carta, se actualiza la selección.

---

## 5. Selección de cartas de la mesa

### Objetivo

Comprobar que el jugador puede seleccionar cartas de la mesa para intentar sumar 15.

### Pasos

1. Seleccionar una carta de la mano.
2. Seleccionar una o varias cartas de la mesa.
3. Observar si las cartas seleccionadas quedan marcadas.

### Resultado esperado

- Las cartas de la mesa seleccionadas quedan marcadas.
- El juego guarda correctamente las cartas elegidas.
- El jugador puede intentar una jugada con esas cartas.

---

## 6. Jugada válida que suma 15

### Objetivo

Comprobar que el juego detecta una captura correcta.

### Pasos

1. Seleccionar una carta de la mano.
2. Seleccionar cartas de la mesa que junto con la carta jugada sumen 15.
3. Pulsar el botón de jugar carta.

### Resultado esperado

- El juego reconoce que la suma es 15.
- Las cartas capturadas desaparecen de la mesa.
- La carta jugada también pasa a cartas ganadas.
- Se muestra un mensaje indicando que la captura ha sido correcta.

---

## 7. Jugada no válida

### Objetivo

Comprobar qué ocurre cuando la jugada no suma 15.

### Pasos

1. Seleccionar una carta de la mano.
2. Seleccionar cartas de la mesa que no sumen 15.
3. Pulsar el botón de jugar carta.

### Resultado esperado

- El juego no permite capturar cartas si la suma no es 15.
- Se muestra un mensaje de error o aviso.
- La partida no se rompe.
- El jugador puede seguir jugando.

---

## 8. Turno de la CPU

### Objetivo

Comprobar que la CPU juega automáticamente después del jugador.

### Pasos

1. Realizar una jugada del jugador.
2. Esperar la jugada de la CPU.
3. Observar los cambios en mesa y cartas.

### Resultado esperado

- La CPU juega una carta.
- Si puede capturar sumando 15, captura.
- Si no puede capturar, deja una carta en la mesa.
- El turno vuelve al jugador.

---

## 9. Fin de ronda

### Objetivo

Comprobar que se reparten nuevas cartas cuando jugador y CPU se quedan sin mano.

### Pasos

1. Jugar hasta que el jugador no tenga cartas.
2. Comprobar la mano de la CPU.
3. Revisar si se reparten nuevas cartas.

### Resultado esperado

- Si quedan cartas en la baraja, se reparten nuevas cartas.
- El jugador recibe 3 cartas.
- La CPU recibe 3 cartas.
- La partida continúa correctamente.

---

## 10. Fin de partida

### Objetivo

Comprobar que la partida termina cuando ya no quedan cartas.

### Pasos

1. Jugar hasta agotar la baraja y las manos.
2. Comprobar el estado final del juego.
3. Revisar puntuaciones.

### Resultado esperado

- El juego detecta el final de partida.
- Se calculan los puntos finales.
- Se muestra quién ha ganado.
- No se permite seguir jugando una vez terminada la partida.

---

## 11. Reinicio de partida

### Objetivo

Comprobar que el botón de reinicio crea una nueva partida.

### Pasos

1. Jugar algunas jugadas.
2. Pulsar el botón de reiniciar.
3. Observar la mesa, manos y marcador.

### Resultado esperado

- Se crea una nueva baraja.
- Se reparten cartas de nuevo.
- Los puntos vuelven a cero.
- El mensaje inicial se actualiza.
- No quedan selecciones antiguas.

---

## 12. Pruebas antes de añadir héroes

Antes de programar los héroes, el juego base debe cumplir:

- el proyecto compila con `npm run build`;
- la página abre con Live Server;
- no hay errores rojos en consola;
- se ven cartas en pantalla;
- el jugador puede jugar;
- la CPU responde;
- se puede completar una partida básica;
- se puede reiniciar la partida.

Si alguna de estas pruebas falla, no se deben añadir héroes todavía.