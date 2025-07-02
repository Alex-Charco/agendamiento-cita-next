# Agendamiento de citas médica
Aplicación web, para agendar citas médicas con el framework Next.js y lenguaje de programación JavaScript.

- ![Completado](https://img.shields.io/badge/status-completado-brightgreen)
  - ✔️ **Implementación de Pipeline CI/CD:** se añadió un pipeline CI/CD que incluye integración con GitHub, GitHub Actions, análisis con SonarCloud y ESLint, pruebas con Node.js, notificaciones en Slack y despliegue automático en Vercel.

- ![Pendiente](https://img.shields.io/badge/status-pendiente-orange)
  - ✔️ **Construcción del proyecto web:** Páginas, componentes... para la construcción del forntend web.

## Creación del proyecto
Creación del proyecto Nextx.js ejecutando en comando en el cmd:

    npx create-next-app@latest agendamiento-citas-next --use-npm --javascript

Ingresar al proyecto 

    cd agendamiento-citas-next

Ejecutar el comando:

    npm install

Levantar el servidor de desarrollo:

```bash
npm run dev
```

Abrir http://localhost:3000 en el navegador para ver el resultado.

## INSTALACIÓN DE DEPENDENCIAS
Desistalación NextUI

#### [NextUI](https://nextui.org/docs/guide/installation)
    
	npm install @nextui-org/react

Se cambia por HeroUI con la respectiva configuración:

#### [HeroUI](https://www.heroui.com/)
    
	npm install @heroui/react

#### [Axios](https://www.npmjs.com/package/axios)
    
	npm install axios

#### [Autoprefixer](https://www.npmjs.com/package/autoprefixer)

    npm i autoprefixer

#### [React-icons](https://www.npmjs.com/package/react-icons)

    npm install react-icons

#### [jwt-decode](https://www.npmjs.com/package/jwt-decode)

    npm install jwt-decode

#### [SweetAlert2](https://sweetalert2.github.io/)

La librería permite personalizar las notificaciones:

	npm install sweetalert2

#### Dependencias para pruebas unitarias

    npm install -testing-library/react @testing-library/jest-dom

    npm install --save-dev jest-environment-jsdom

    npm install --save-dev babel-jest @babel/preset-env @babel/preset-react

    npm install --save-dev jest

    npm install --save-dev @testing-library/user-event


*Explicación:*

1. **`@testing-library/react`**: Herramienta para realizar pruebas unitarias facilitando la interacción con el DOM.

2. **`@testing-library/jest-dom`**: Extiende `jest` para agregar aserciones personalizadas, mejorando la experiencia de las pruebas.

3. **`jest-environment-jsdom`**: Configura Jest para usar un entorno simulado de navegador (JS DOM) durante las pruebas unitarias.

4. **`babel-jest`**: Permite que Jest use Babel para transpilar código JavaScript durante las pruebas.

5. **`@babel/preset-env`**: Preajuste de Babel para compilar código JavaScript a versiones compatibles con los navegadores actuales.

6. **`@babel/preset-react`**: Preajuste de Babel para compilar JSX y características específicas de React en JavaScript.
7. **`jest`**: es necesaria para hacer las pruebas.


#### Dependencias para generar receta en formato pdf 

	npm install jspdf jspdf-autotable

---

#### NOTA
Al caducar el token no permitira realizar solicitudes a la api y mostrará una notificación que la sesión a caducado.

## Deploy en Vercel

Ver el proyecto desplegado en [Vercel](https://agendamiento-cita-next.vercel.app/).
