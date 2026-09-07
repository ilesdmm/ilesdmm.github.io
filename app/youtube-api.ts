export type PreviewPlayer = {
  mute(): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
};

type PlayerEvent = { target: PreviewPlayer; data: number };
type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent): void;
    };
  }) => PreviewPlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;

// All nine previews share a single API download.
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT?.Player) resolve(window.YT);
      previousReady?.();
    };
    script.onerror = () => {
      apiPromise = undefined;
      script.remove();
      reject(new Error("YouTube preview controls could not load."));
    };
    document.head.append(script);
  });
  return apiPromise;
}
