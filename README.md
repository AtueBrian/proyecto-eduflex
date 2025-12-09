📘 Proyecto — Instrucciones de Instalación y Ejecución

Este proyecto está dividido en Back-end (Node.js) y Front-end (React + Vite).
A continuación se detallan los pasos necesarios para que cualquier miembro del equipo pueda ejecutarlo sin problemas.

🚀 1. Requisitos

Asegurate de tener instalado:

Node.js (v16+ recomendado)

npm

MySQL

Git (opcional pero recomendado)

📥 2. Clonar el repositorio
Por consola:
git clone https://github.com/lucasfederico/proyecto-eduflex.git

📦 3. Instalación de dependencias

El proyecto tiene dependencias separadas para Back y Front, por lo tanto se instalan por separado.

En la Carpeta del Repositorio abrir la consola y ejecutar los siguientes comandos
▶️ Back-end :
cd Back
npm install

💻 Front-end :
cd ../Front
npm install

🗄️ 4. Configuración de la Base de Datos

Crear una base de datos vacía en MySQL (por ejemplo: ejemplo).

Importar el archivo ejemplo.sql incluido en el proyecto.

✔️ Usando la CLI de MySQL
mysql -u root -p ejemplo < ejemplo.sql

Esto genera todas las tablas y datos iniciales necesarios.

▶️ 5. Ejecución del proyecto
🟦 Iniciar el Back-end

Desde la carpeta Back:

npm run dev

🟩 Iniciar el Front-end

Desde la carpeta Front:

npm run dev


Luego abrir el navegador en:
👉 http://localhost:5173
 (o el puerto que muestre Vite)
