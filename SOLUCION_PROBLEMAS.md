# 🔧 Solución de Problemas - PrepaPRIO 2

## ⚠️ Si los módulos no funcionan al hacer clic

### Problema
Al hacer clic en "Panel Control", "Evidencias Aula", "Atención a la Diversidad", "Evaluación" u "Otros Datos", la aplicación no responde o no muestra nada.

### ✅ Solución

Esto ocurre porque la aplicación tiene datos antiguos guardados en el navegador que no son compatibles con la nueva versión.

**Opción 1: Borrar datos y empezar de nuevo (RECOMENDADO)**
1. Abre el navegador
2. Presiona F12 para abrir las Herramientas de Desarrollo
3. Ve a la pestaña "Consola" o "Console"
4. Escribe esto y presiona Enter:
   ```javascript
   localStorage.removeItem('prepaPRIO2_data')
   ```
5. Recarga la página (F5)
6. ¡Listo! Ahora todos los módulos deberían funcionar

**Opción 2: Migración automática (ya incluida)**
La nueva versión incluye un sistema de migración automática que debería actualizar tus datos antiguos al nuevo formato. Si esto no funciona, usa la Opción 1.

---

## 🆕 Si empiezas desde cero

Si es la primera vez que usas la app o has borrado los datos:
1. Abre `index.html` en tu navegador
2. Todos los módulos deberían funcionar correctamente
3. Los datos se guardarán automáticamente en el navegador

---

## 📱 Instalación como PWA

Para instalar la app en tu dispositivo:

**En Chrome/Edge (PC):**
1. Abre la app en el navegador
2. Haz clic en el icono de instalación en la barra de direcciones
3. O ve a Menú > Instalar PrepaPRIO 2

**En Chrome (Android):**
1. Abre la app en Chrome
2. Toca el menú (3 puntos)
3. Selecciona "Añadir a pantalla de inicio"

**En Safari (iPhone/iPad):**
1. Abre la app en Safari
2. Toca el botón de compartir
3. Selecciona "Añadir a pantalla de inicio"

---

## 💾 Backup de tus datos

Para hacer una copia de seguridad de tus datos:

1. Abre las Herramientas de Desarrollo (F12)
2. Ve a la pestaña "Consola"
3. Copia y pega este código:
   ```javascript
   copy(localStorage.getItem('prepaPRIO2_data'))
   ```
4. Pega el contenido en un archivo de texto y guárdalo

Para restaurar:
1. Abre las Herramientas de Desarrollo (F12)
2. Ve a la pestaña "Consola"
3. Copia y pega tu backup entre las comillas:
   ```javascript
   localStorage.setItem('prepaPRIO2_data', 'PEGA_AQUI_TU_BACKUP')
   ```
4. Recarga la página

---

## 🔍 Verificar qué versión tienes

Para saber si estás usando la versión actualizada:
1. Abre las Herramientas de Desarrollo (F12)
2. Ve a la pestaña "Consola"
3. Escribe:
   ```javascript
   JSON.parse(localStorage.getItem('prepaPRIO2_data')).evaluacion
   ```
4. Si ves `aspectosGenerales: []` y `procesoChecklist: [...]`, tienes la versión nueva ✅
5. Si ves `aspectosGenerales: ""` y `criteriosEvaluacion: [...]`, tienes la versión antigua ❌

---

## 📞 Soporte

Si después de seguir estos pasos sigues teniendo problemas:
1. Abre las Herramientas de Desarrollo (F12)
2. Ve a la pestaña "Consola"
3. Toma una captura de pantalla de los errores en rojo
4. Busca ayuda con esa información

---

## ✨ Características de la Nueva Versión

- ✅ Sistema de migración automática de datos
- ✅ Temporalización libre en Programación
- ✅ Evidencias con Buenas Prácticas y Seguimiento
- ✅ Medidas Generales en Atención a la Diversidad
- ✅ Aspectos Generales por tipo de evaluación
- ✅ Protocolo de Conductas Suicidas en Otros Datos
- ✅ "Progreso" en lugar de "Completitud"

---

**CEIP Capitulaciones - Santa Fe, Granada**
