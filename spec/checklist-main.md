# Checklist antes de fusionar en main

Este documento recoge las comprobaciones que se deben realizar antes de pasar los cambios a la rama `main`.

La rama `main` debe quedar como versión estable del proyecto, por lo que no conviene fusionar cambios sin probar antes.

## 1. Comprobaciones de Git

Antes de fusionar hay que comprobar:

- que estamos en la rama correcta;
- que no hay cambios pendientes sin commit;
- que la rama está actualizada con GitHub.

Comandos:

```bash
git status
git branch
git pull