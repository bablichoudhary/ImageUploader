import { LitElement, html, css } from "lit";

export class TextInputBox extends LitElement {
  static styles = css`
    textarea {
      width: 100%;
      height: 100px;
      resize: none;
    }
  `;

  constructor() {
    super();
    this.text = "";
  }

  onInput(e) {
    this.text = e.target.value;
    this.dispatchEvent(
      new CustomEvent("text-changed", {
        detail: this.text,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label>Text to Print (max 3 lines):</label>
      <textarea
        maxlength="150"
        rows="3"
        placeholder="Enter your text here..."
        @input=${this.onInput}
      ></textarea>
    `;
  }
}

customElements.define("text-input-box", TextInputBox);
