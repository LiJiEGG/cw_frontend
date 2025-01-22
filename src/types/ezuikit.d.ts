declare module 'ezuikit-js' {
  export interface EZUIKitPlayerConfig {
    id: string
    url: string
    accessToken: string
    template?: string
    audio?: number
    autoplay?: boolean
  }

  export class EZUIKitPlayer {
    constructor(config: EZUIKitPlayerConfig)
    stop(): void
  }

  export default {
    EZUIKitPlayer
  }
}