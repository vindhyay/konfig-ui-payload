import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ScriptLoaderService {
  constructor() {}
  scriptExists(scriptUrl: string): boolean {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].getAttribute("src");
      if (src && src === scriptUrl) {
        return true; // Script with the given URL exists
      }
    }
    return false; // Script with the given URL does not exist
  }
  linkExists(linkUrl: string): boolean {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      const href = links[i].getAttribute("href");
      if (href && href === linkUrl) {
        return true;
      }
    }
    return false;
  }
  loadScript = src => {
    if (!this.scriptExists(src)) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = src;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  };
  loadCss = (linkUrl: string) => {
    if (!this.linkExists(linkUrl)) {
      const head = document.getElementsByTagName("head")[0];
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = linkUrl;
      head.appendChild(link);
    }
  };
}
