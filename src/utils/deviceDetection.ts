export function detectDeviceCapability(): 'high' | 'medium' | 'low' {
    if (typeof window === 'undefined') return 'medium';

    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    if (isMobile) return 'low';

    // Check GPU
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return 'low';

    // @ts-ignore
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'medium';

    // @ts-ignore
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    // Check for high-end GPUs
    if (
        renderer.includes('NVIDIA') ||
        renderer.includes('AMD') ||
        renderer.includes('Radeon') ||
        renderer.includes('Apple M') // Apple Silicon
    ) {
        return 'high';
    }

    // Check memory
    // @ts-ignore
    const memory = navigator.deviceMemory;
    if (memory && memory >= 8) return 'high';
    if (memory && memory >= 4) return 'medium';

    return 'medium';
}
