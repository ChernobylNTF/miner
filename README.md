# DTY Mining App con Worldcoin MiniKit SDK 💎

Aplicación de minería de tokens DTY (Destinity) integrada con el SDK MiniKit de Worldcoin para verificación de humanidad.

## 🚀 Instalación

### Prerrequisitos
- Node.js v16 o superior
- npm o yarn
- World App (para probar la aplicación)

### Configuración del proyecto

1. **Clona o descarga el proyecto**
2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **El SDK de MiniKit ya está instalado:**
   ```bash
   npm install @worldcoin/minikit-js
   ```

## 📱 Uso del SDK MiniKit

### Instalación del SDK
```bash
npm install @worldcoin/minikit-js
```

### Configuración básica

#### 1. Importar el SDK
```javascript
import { MiniKit } from '@worldcoin/minikit-js';
```

#### 2. Inicializar MiniKit
```javascript
await MiniKit.init({
    app_id: 'tu_app_id_aqui',
    action: 'tu_action_id_aqui'
});
```

#### 3. Verificar humanidad con World ID
```javascript
const result = await MiniKit.commands.verify({
    action: 'tu_action_id',
    signal: '', // Señal opcional
    verification_level: 'orb' // 'orb' o 'device'
});
```

### Usando el WorldcoinMiniKitHandler

He creado una clase helper en `minikit-handler.js` para facilitar el uso:

```javascript
import { WorldcoinMiniKitHandler } from './minikit-handler.js';

// Inicializar
const miniKit = new WorldcoinMiniKitHandler('tu_app_id', 'tu_action_id');
await miniKit.init();

// Verificar humanidad
const verification = await miniKit.verifyHuman();
if (verification.success) {
    console.log('¡Usuario verificado!', verification.result);
}

// Obtener info del wallet
const walletInfo = await miniKit.getWalletInfo();

// Enviar feedback háptico
await miniKit.sendHapticFeedback('impact');

// Compartir contenido
await miniKit.shareContent('¡Mira mi app!', 'https://mi-app.com');
```

## 🛠️ Comandos disponibles

### Desarrollo
```bash
npm run dev     # Inicia servidor de desarrollo en puerto 3000
npm start       # Alias para npm run dev
```

### MiniKit Commands disponibles

#### Verificación
```javascript
MiniKit.commands.verify({
    action: 'action_id',
    signal: 'optional_signal',
    verification_level: 'orb' // o 'device'
})
```

#### Autenticación de Wallet
```javascript
MiniKit.commands.walletAuth()
```

#### Pago
```javascript
MiniKit.commands.pay({
    to: 'direccion_destino',
    tokens: [
        {
            symbol: 'WLD',
            token_amount: '1.0'
        }
    ]
})
```

#### Enviar Transacción
```javascript
MiniKit.commands.sendTransaction({
    transaction: [{
        address: 'contract_address',
        abi: contract_abi,
        functionName: 'function_name',
        args: ['arg1', 'arg2']
    }]
})
```

#### Feedback Háptico
```javascript
MiniKit.commands.sendHapticFeedback({
    type: 'impact' // 'impact', 'notification', 'selection'
})
```

#### Compartir
```javascript
MiniKit.commands.share({
    text: 'Texto a compartir',
    url: 'https://ejemplo.com'
})
```

## 📋 Configuración

### Variables de configuración (config.js)
```javascript
const CONTRACT_ADDRESS = "0x55E6C9C22C0eaD68F0be7CdcB5d8BAa636a8A1a0";
const WORLDCOIN_APP_ID = "app_158d2ce5b87e96111765af5b41168b93";
const ACTION_ID = "test-action";
```

### Configuración de World ID
1. Visita [World ID Developer Portal](https://developer.worldcoin.org/)
2. Crea una nueva aplicación
3. Obtén tu `app_id` y configura tus `actions`
4. Actualiza las variables en `config.js`

## 🏗️ Estructura del proyecto

```
├── index.html              # Aplicación principal
├── config.js              # Configuración de la app
├── minikit-handler.js     # Helper para MiniKit SDK
├── package.json           # Dependencias del proyecto
├── README.md             # Este archivo
└── node_modules/         # Dependencias instaladas
```

## 🔧 Desarrollo

### Para usar el SDK localmente (en lugar del CDN):

1. **Actualiza el HTML** para importar desde node_modules:
   ```html
   <script type="module">
       import { MiniKit } from './node_modules/@worldcoin/minikit-js/dist/index.js';
       // resto del código...
   </script>
   ```

2. **O usa el helper creado:**
   ```html
   <script type="module">
       import { WorldcoinMiniKitHandler } from './minikit-handler.js';
       // resto del código...
   </script>
   ```

### Servir la aplicación
```bash
npm start
```
Esto abrirá la aplicación en `http://localhost:3000`

## 📱 Testing

Para probar la aplicación:
1. Abre la aplicación en World App
2. O usa el simulador en el Developer Portal
3. Prueba las funciones de verificación y minería

## 🔗 Enlaces útiles

- [Documentación oficial de MiniKit](https://docs.world.org/mini-apps)
- [World ID Developer Portal](https://developer.worldcoin.org/)
- [Repositorio oficial de IDKit](https://github.com/worldcoin/idkit-js)
- [Guía de Mini Apps](https://docs.world.org/mini-apps/getting-started)

## 🐛 Solución de problemas

### Error: "MiniKit no está inicializado"
Asegúrate de llamar a `MiniKit.init()` antes de usar otros comandos.

### Error: "No se pudo conectar a World App"
Verifica que estés ejecutando la aplicación dentro de World App o usa el simulador.

### Error de importación
Si usas módulos ES6, asegúrate de que tu `package.json` tenga `"type": "module"`.

## 📄 Licencia

ISC License