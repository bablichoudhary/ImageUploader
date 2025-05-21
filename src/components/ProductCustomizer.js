import { LitElement, html, css } from "lit";
import "./ImageUploader.js";
import "./TextInputBox.js";

export class ProductCustomizer extends LitElement {
  static styles = css`
    .customizer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .option-group {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    label {
      min-width: 80px;
    }
  `;

  static properties = {
    height: { type: Number },
    weight: { type: Number },
    build: { type: String },
    clothingType: { type: String },
  };

  constructor() {
    super();
    this.height = 180;
    this.weight = 80;
    this.build = "athletic";
    this.clothingType = "tshirt";
  }

  onHeightChange(e) {
    this.height = Number(e.target.value);
    this.emitCustomizerChange();
  }
  onWeightChange(e) {
    this.weight = Number(e.target.value);
    this.emitCustomizerChange();
  }
  onBuildChange(e) {
    this.build = e.target.value;
    this.emitCustomizerChange();
  }
  onClothingChange(e) {
    this.clothingType = e.target.value;
    this.emitCustomizerChange();
  }

  emitCustomizerChange() {
    this.dispatchEvent(
      new CustomEvent("customizer-change", {
        detail: {
          height: this.height,
          weight: this.weight,
          build: this.build,
          clothingType: this.clothingType,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="customizer">
        <h2>Customize Your Product</h2>

        <div class="option-group">
          <label for="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            .value=${this.height}
            @input=${this.onHeightChange}
            min="100"
            max="250"
          />
        </div>

        <div class="option-group">
          <label for="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            .value=${this.weight}
            @input=${this.onWeightChange}
            min="30"
            max="200"
          />
        </div>

        <div class="option-group">
          <label for="build">Build:</label>
          <select id="build" @change=${this.onBuildChange} .value=${this.build}>
            <option value="lean">Lean</option>
            <option value="reg">Regular</option>
            <option value="athletic">Athletic</option>
            <option value="big">Big</option>
          </select>
        </div>

        <div class="option-group">
          <label for="clothing">Clothing Type:</label>
          <select
            id="clothing"
            @change=${this.onClothingChange}
            .value=${this.clothingType}
          >
            <option value="tshirt">T-shirt</option>
            <option value="hoodie">Hoodie</option>
            <option value="sleevie">Sleeve</option>
            <option value="cap">Cap</option>
          </select>
        </div>

        <image-uploader></image-uploader>
        <text-input-box></text-input-box>
      </div>
    `;
  }
}

customElements.define("product-customizer", ProductCustomizer);
