export interface Config {
    host: string
    port: number
    forceIPv4: boolean
    forceIPv6: boolean
    keepaliveCountMax: number
    keepaliveInterval: number
    readyTimeout: number
    username: string
    password: string
    tryKeyboard: boolean
    allowAgentFwd: boolean
    strictVendor: boolean
}