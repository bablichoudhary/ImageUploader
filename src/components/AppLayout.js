import { LitElement, html, css } from "lit";
import "./ProductCustomizer.js";
import "./ThemeSwitcher.js";

export class AppLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      max-width: 900px;
      margin: auto;
    }
  `;

  static properties = {
    imageUrl: { type: String },
    printText: { type: String },
    height: { type: Number },
    weight: { type: Number },
    build: { type: String },
    clothingType: { type: String },
  };

  constructor() {
    super();
    this.imageUrl = "";
    this.printText = "";
    this.height = 180;
    this.weight = 80;
    this.build = "athletic";
    this.clothingType = "tshirt";
  }

  onImageUploaded(e) {
    this.imageUrl = e.detail;
  }

  onTextChanged(e) {
    this.printText = e.detail;
  }

  onCustomizerChange(e) {
    const { height, weight, build, clothingType } = e.detail;
    this.height = height;
    this.weight = weight;
    this.build = build;
    this.clothingType = clothingType;
  }

  render() {
    return html`
      <theme-switcher></theme-switcher>
      <product-customizer
        @image-uploaded=${this.onImageUploaded}
        @text-changed=${this.onTextChanged}
        @customizer-change=${this.onCustomizerChange}
      ></product-customizer>

      <tshirt-viewer
        style="width: 100%; height: 400px"
        .imageUrl=${this.imageUrl}
        .clothingType=${this.clothingType}
      ></tshirt-viewer>

      <div style="margin-top: 2rem;">
        <h3>Current Selection:</h3>
        <p>Height: ${this.height} cm</p>
        <p>Weight: ${this.weight} kg</p>
        <p>Build: ${this.build}</p>
        <p>Clothing: ${this.clothingType}</p>
        <p>Print Text: ${this.printText}</p>
        ${this.imageUrl
          ? html`<img
              src=${this.imageUrl}
              alt="Uploaded Image"
              style="max-width: 200px; border: 1px solid #ccc;"
            />`
          : html`<p>No image uploaded yet</p>`}
      </div>
    `;
  }
}

customElements.define("app-layout", AppLayout);
