import { LitElement, html, css } from "lit";

export class ImageUploader extends LitElement {
  static styles = css`
    .upload-box {
      border: 2px dashed gray;
      padding: 20px;
      text-align: center;
    }
  `;

  onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      this.dispatchEvent(
        new CustomEvent("image-uploaded", {
          detail: URL.createObjectURL(file),
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <div
        class="upload-box"
        @drop=${this.onDrop}
        @dragover=${(e) => e.preventDefault()}
      >
        Drag and drop or select image:
        <input type="file" @change=${this.onFileChange} />
      </div>
    `;
  }
}

customElements.define("image-uploader", ImageUploader);
