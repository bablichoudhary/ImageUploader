import { LitElement, html, css } from "lit";

export class ThemeSwitcher extends LitElement {
  static styles = css`
    button {
      padding: 0.4rem 1rem;
      background-color: var(--primary, #333);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: bold;
      margin-bottom: 1rem;
      transition: background 0.3s ease;
    }

    button:hover {
      background-color: var(--primary-dark, #555);
    }

    .theme-label {
      font-size: 0.85rem;
      color: gray;
      margin-top: 0.3rem;
    }
  `;

  constructor() {
    super();
    this.currentTheme = 0;
    this.themes = ["theme-default", "theme-dark", "theme-pastel"];
  }

  connectedCallback() {
    super.connectedCallback();
    document.body.className = this.themes[this.currentTheme];
    window.addEventListener("keydown", this.onKey.bind(this));
  }

  onKey(e) {
    if (e.altKey && e.key === "q") {
      this.switchTheme();
    }
  }

  switchTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;
    document.body.className = this.themes[this.currentTheme];
    this.requestUpdate(); // Refresh UI
  }

  render() {
    return html`
      <button @click=${this.switchTheme}>Switch Theme</button>
      <div class="theme-label">Current: ${this.themes[this.currentTheme]}</div>
    `;
  }
}

customElements.define("theme-switcher", ThemeSwitcher);
