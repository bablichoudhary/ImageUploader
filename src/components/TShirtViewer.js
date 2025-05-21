import { LitElement, html, css } from "lit";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class TShirtViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 400px;
      height: 400px;
      border: 1px solid #ccc;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  static properties = {
    imageUrl: { type: String },
    clothingType: { type: String },
  };

  constructor() {
    super();
    this.imageUrl = "";
    this.clothingType = "tshirt";

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;
  }

  firstUpdated() {
    this.initThree();
    this.loadModel(this.clothingType);
  }

  updated(changedProps) {
    if (changedProps.has("imageUrl")) {
      this.updateTexture();
    }
    if (changedProps.has("clothingType")) {
      this.loadModel(this.clothingType);
    }
  }

  initThree() {
    let width = this.clientWidth;
    let height = this.clientHeight;

    // 🔁 Retry till element gets proper size
    if (width === 0 || height === 0) {
      setTimeout(() => this.initThree(), 100);
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 1, 3);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.shadowRoot.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    this.scene.add(light);

    // 📏 Resize canvas on window resize
    window.addEventListener("resize", () => this.onResize());

    this.animate();
  }

  onResize() {
    if (!this.renderer || !this.camera) return;

    const width = this.clientWidth;
    const height = this.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  loadModel(type) {
    if (this.model) {
      this.scene.remove(this.model);
      this.model.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      this.model = null;
    }

    // For simplicity, let's create simple geometries instead of full models
    // Replace this with actual loading from repo using GLTFLoader or similar

    let geometry;
    switch (type) {
      case "hoodie":
        geometry = new THREE.BoxGeometry(1, 1.5, 0.5);
        break;
      case "sleevie":
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
        break;
      case "cap":
        geometry = new THREE.SphereGeometry(0.6, 32, 16, 0, Math.PI);
        break;
      case "tshirt":
      default:
        geometry = new THREE.BoxGeometry(1, 1.3, 0.5);
    }

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.model = new THREE.Mesh(geometry, material);
    this.scene.add(this.model);

    this.updateTexture();
  }

  updateTexture() {
    if (!this.model) return;
    if (!this.imageUrl) {
      this.model.material.map = null;
      this.model.material.color.set(0xffffff);
      this.model.material.needsUpdate = true;
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(this.imageUrl, (texture) => {
      this.model.material.map = texture;
      this.model.material.needsUpdate = true;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return html``; // canvas added dynamically in shadowRoot
  }
}

customElements.define("tshirt-viewer", TShirtViewer);
