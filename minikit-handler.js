// minikit-handler.js - Manejo del SDK MiniKit de Worldcoin
import { MiniKit } from '@worldcoin/minikit-js';

class WorldcoinMiniKitHandler {
    constructor(appId, actionId) {
        this.appId = appId;
        this.actionId = actionId;
        this.initialized = false;
    }

    /**
     * Inicializa el MiniKit SDK
     */
    async init() {
        try {
            await MiniKit.init({
                app_id: this.appId,
                action: this.actionId
            });
            this.initialized = true;
            console.log('✅ MiniKit inicializado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error al inicializar MiniKit:', error);
            throw new Error('Error al inicializar MiniKit: ' + error.message);
        }
    }

    /**
     * Verifica si el usuario es humano usando World ID
     */
    async verifyHuman() {
        if (!this.initialized) {
            throw new Error('MiniKit no está inicializado. Llama a init() primero.');
        }

        try {
            console.log('🔍 Iniciando verificación de World ID...');
            
            const verificationResult = await MiniKit.commands.verify({
                action: this.actionId,
                signal: '', // Puedes añadir una señal específica aquí
                verification_level: 'orb' // 'orb' o 'device'
            });

            if (verificationResult) {
                console.log('✅ Verificación exitosa:', verificationResult);
                return {
                    success: true,
                    result: verificationResult
                };
            } else {
                throw new Error('Verificación cancelada por el usuario');
            }
        } catch (error) {
            console.error('❌ Error en verificación:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Obtiene información del wallet del usuario
     */
    async getWalletInfo() {
        try {
            const walletInfo = await MiniKit.commands.walletAuth();
            console.log('💼 Información del wallet:', walletInfo);
            return walletInfo;
        } catch (error) {
            console.error('❌ Error al obtener información del wallet:', error);
            throw error;
        }
    }

    /**
     * Envía feedback háptico al dispositivo
     */
    async sendHapticFeedback(type = 'impact') {
        try {
            await MiniKit.commands.sendHapticFeedback({
                type: type // 'impact', 'notification', 'selection'
            });
        } catch (error) {
            console.error('❌ Error al enviar feedback háptico:', error);
        }
    }

    /**
     * Comparte contenido
     */
    async shareContent(text, url = null) {
        try {
            await MiniKit.commands.share({
                text: text,
                url: url
            });
        } catch (error) {
            console.error('❌ Error al compartir contenido:', error);
        }
    }

    /**
     * Verifica si estamos dentro de World App
     */
    isInWorldApp() {
        return MiniKit.isInstalled();
    }

    /**
     * Obtiene la configuración actual
     */
    getConfig() {
        return {
            appId: this.appId,
            actionId: this.actionId,
            initialized: this.initialized,
            inWorldApp: this.isInWorldApp()
        };
    }
}

export { WorldcoinMiniKitHandler };