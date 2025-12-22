---
id: 'linux-vm-azure'
title: 'Creando una máquina virtual Linux en Azure'
slug: 'vm-linux-en-azure'
date: 2025-12-22
summary: 'Una guía paso a paso para desplegar tu primer servidor Ubuntu en Microsoft Azure, desde la creación hasta la conexión SSH.'
tags: ['Azure', 'Linux', 'Ubuntu', 'Cloud Computing']
image: /blog/linux-vm-on-azure/shared/azure-vm.jpeg
author: David Deras
lastmod: 2025-12-22
---

En esta guía, aprenderemos cómo desplegar una máquina virtual (VM) con Linux (específicamente Ubuntu) en la nube de Microsoft Azure. Veremos el proceso de configuración paso a paso, desde la selección de la imagen hasta la conexión segura mediante SSH, y repasaremos algunas buenas prácticas para gestionar tus recursos en la nube.

[toc]

---

## Requisitos previos

Antes de comenzar, asegúrate de tener:

- Una cuenta de Microsoft Azure activa. Si no tienes una, puedes crear una <a target="_blank" href="https://azure.microsoft.com/es-es/free/" rel="noopener noreferrer">cuenta gratuita</a> que incluye crédito inicial y servicios gratuitos por 12 meses. También puedes aprovechar la suscripción gratuita si eres estudiante a través de <a target="_blank" href="https://azure.microsoft.com/es-es/free/students/" rel="noopener noreferrer">Azure for Students</a>.
- Una terminal (PowerShell, CMD, Bash) y un cliente SSH instalado en tu computadora.

---

## Accediendo al Portal

Lo primero es iniciar sesión en el <a target="_blank" href="https://portal.azure.com/" rel="noopener noreferrer">Portal de Azure</a>.

Una vez dentro, en la barra de búsqueda superior, escribe "Máquinas virtuales" (o "Virtual machines" si lo tienes en inglés) y selecciona el servicio.

![Buscando el servicio de máquinas virtuales](/blog/linux-vm-on-azure/shared/search-vm.png)
_Buscando el servicio de máquinas virtuales_

---

## Creando la Máquina Virtual

Dentro del panel de Máquinas virtuales, haz clic en el botón **Crear** (Create) y selecciona **Máquina virtual** (Virtual machine).

![Botón de crear VM](/blog/linux-vm-on-azure/shared/create-button.png)
_Iniciando el asistente de creación_

Esto abrirá el asistente de configuración. Vamos a configurar las pestañas más importantes.

### 1. Datos básicos (Basics)

Esta es la sección más crítica. Aquí definiremos qué es nuestra máquina y dónde vivirá.

<!-- ![Pestaña de datos básicos](/blog/linux-vm-on-azure/shared/basics-tab.png)
_Configuración básica de la VM_ -->

Configura los siguientes campos:

1.  **Suscripción**: Selecciona tu suscripción activa.
2.  **Grupo de recursos**: Es un contenedor lógico para tus recursos. Haz clic en "Crear nuevo" y dale un nombre (ej. `rg-linux-demo`). Esto facilita borrar todo después.
3.  **Nombre de la máquina virtual**: Un nombre descriptivo, por ejemplo `vm-ubuntu-01`.
4.  **Región**: Elige la región más cercana a ti o a tus usuarios (ej. `(US) East US`).
5.  **Opciones de disponibilidad**: Para este tutorial, podemos dejarlo en "No se requiere redundancia de la infraestructura".
6.  **Tipo de seguridad**: Déjalo en "Estándar".
7.  **Imagen**: Aquí seleccionaremos el sistema operativo. Busca y selecciona **Ubuntu Server 24.04 LTS - x64 Gen2** (o la versión LTS más reciente disponible).
8.  **Tamaño**: Esto define la potencia (CPU/RAM) y el costo. Para pruebas, busca la serie **B1s** o **B2s** (Standard_B1s), que suelen ser económicas o elegibles para la capa gratuita.

> **Nota sobre costos**: Azure cobra por minuto de uso. Asegúrate de revisar el precio estimado mensual que aparece al seleccionar el tamaño.

#### Cuenta de administrador

Aquí configuraremos cómo accederemos a la VM.

-   **Tipo de autenticación**: Selecciona **Clave pública SSH** (Recomendado por seguridad).
-   **Nombre de usuario**: `azureuser` (o el que prefieras).
-   **Origen de clave pública SSH**: Selecciona "Generar nuevo par de claves" (Generate new key pair).
-   **Nombre del par de claves**: Dale un nombre para identificar el archivo que descargaremos (ej. `vm-ubuntu-01_key`).

#### Reglas de puerto de entrada

Para poder administrar el servidor remotamente, necesitamos abrir el puerto SSH.

-   **Puertos de entrada públicos**: Selecciona "Permitir los puertos seleccionados".
-   **Seleccionar puertos de entrada**: Asegúrate de que **SSH (22)** esté seleccionado.

---

### 2. Discos y Redes

Para un despliegue básico, las configuraciones por defecto en las pestañas de **Discos** y **Redes** suelen ser suficientes.

-   En **Discos**, Azure asignará un disco SSD Premium o Estándar por defecto.
-   En **Redes**, creará automáticamente una Red Virtual (VNet) y una IP Pública para que tu máquina sea accesible desde internet.

Puedes avanzar haciendo clic en **Siguiente** hasta llegar a la pestaña **Revisar y crear**.

---

## Revisar y crear

Azure validará tu configuración. Si todo está correcto, verás un mensaje de "Validación superada" y el precio por hora estimado.

Haz clic en **Crear**.

<!-- ![Validación y creación](/blog/linux-vm-on-azure/shared/review-create.png)
_Resumen final antes de crear_ -->

### Descargar la clave privada

Inmediatamente después de hacer clic en crear, aparecerá una ventana emergente pidiéndote que descargues la clave privada.

**IMPORTANTE**: Haz clic en **Descargar la clave privada y crear el recurso**.
Se descargará un archivo `.pem` en tu computadora. **No pierdas este archivo**, es la única "llave" para entrar a tu servidor. Guárdalo en una carpeta segura (ej. `~/.ssh/` o en tu carpeta de proyectos).

<!-- ![Descargando clave SSH](/blog/linux-vm-on-azure/shared/download-key.png)
_Ventana para descargar la clave .pem_ -->

---

## Conectando a la VM

Espera unos minutos a que el despliegue termine. Cuando veas el mensaje "Se completó la implementación", haz clic en **Ir al recurso**.

En la página de información general (Overview) de tu nueva VM, busca la **Dirección IP pública**. Cópiala.

<!-- ![IP Pública de la VM](/blog/linux-vm-on-azure/shared/public-ip.png)
_Ubicación de la IP pública_ -->

Ahora, abre tu terminal en tu computadora (donde guardaste el archivo `.pem`).

1.  (Opcional pero recomendado en Linux/Mac) Cambia los permisos de la clave para que sea de solo lectura:
    ```bash
    chmod 400 ruta/a/tu/clave.pem
    ```

2.  Conéctate usando el comando SSH:
    ```bash
    ssh -i ruta/a/tu/clave.pem azureuser@TU_IP_PUBLICA
    ```
    *Reemplaza `ruta/a/tu/clave.pem` con la ruta real y `TU_IP_PUBLICA` con la IP que copiaste de Azure.*

3.  La primera vez te preguntará si confías en el host (`Are you sure you want to continue connecting?`). Escribe `yes` y presiona ENTER.

¡Listo! Deberías ver el prompt de bienvenida de Ubuntu.

<!-- ![Terminal conectada](/blog/linux-vm-on-azure/shared/terminal-connected.png)
_Conexión exitosa vía SSH_ -->

---

## Primeros pasos en tu servidor

Una vez dentro, es una buena práctica actualizar los repositorios y paquetes del sistema. Ejecuta:

```bash
sudo apt update && sudo apt upgrade -y
```

Ahora tienes un servidor Linux completo a tu disposición en la nube. Puedes instalar un servidor web como Nginx, Docker, o desplegar tus aplicaciones.

---

## Limpiando recursos

Si creaste esta máquina solo para probar, recuerda eliminarla para evitar costos inesperados.

La forma más fácil de borrar todo es eliminar el **Grupo de recursos** que creamos al inicio (`rg-linux-demo`). Esto borrará la VM, el disco, la IP pública y la red virtual de una sola vez.

1. Ve a "Grupos de recursos" en el portal.
2. Selecciona tu grupo.
3. Haz clic en "Eliminar grupo de recursos".
4. Confirma el nombre y elimina.

Espero que esta guía te haya servido para perderle el miedo a la nube y desplegar tu primera máquina virtual. ¡Happy cloud computing!
