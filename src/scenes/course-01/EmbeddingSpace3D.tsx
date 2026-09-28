import { useEffect, useRef } from "react";
type EmbeddingPoint = {
  label: string;
  position: [number, number, number];
  related: boolean;
};

const POINTS: EmbeddingPoint[] = [
  { label: "ciel", position: [0.9, 0.2, 0.2], related: true },
  { label: "nuage", position: [0.25, 0.75, 0.65], related: true },
  { label: "pluie", position: [1.15, -0.35, 0.45], related: true },
  { label: "soleil", position: [1.45, 0.65, -0.35], related: true },
  { label: "chat", position: [-1.1, 0.95, 0.25], related: false },
  { label: "chien", position: [-0.75, -0.9, -0.45], related: false },
  { label: "voiture", position: [-1.45, -0.15, -0.65], related: false },
];

export function EmbeddingSpace3D({ step }: { step: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const makeLabel = (text: string, accent: boolean) => {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 128;
        const context = canvas.getContext("2d");
        if (!context) return null;

        context.font = "800 46px Arial";
        context.fillStyle = accent ? "#171717" : "#6d6a64";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.65, 0.42, 1);
        return sprite;
      };

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.45, 6.5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const world = new THREE.Group();
      scene.add(world);

      const grid = new THREE.GridHelper(5.8, 18, 0x171717, 0xd8d3ca);
      grid.rotation.x = Math.PI / 2;
      grid.position.z = -0.8;
      grid.material.transparent = true;
      grid.material.opacity = 0.18;
      world.add(grid);

      const axes = new THREE.AxesHelper(2.1);
      axes.material.transparent = true;
      axes.material.opacity = 0.22;
      world.add(axes);

      const group = new THREE.Group();
      world.add(group);

      const relatedColor = new THREE.Color("#b8d93d");
      const neutralColor = new THREE.Color("#171717");

      const pointObjects = POINTS.map((point) => {
        const geometry = new THREE.SphereGeometry(point.label === "ciel" ? 0.12 : 0.085, 20, 20);
        const material = new THREE.MeshBasicMaterial({
          color: point.related ? relatedColor : neutralColor,
          transparent: true,
          opacity: point.related ? 0.95 : 0.48,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...point.position);
        group.add(mesh);

        const label = makeLabel(point.label, point.label === "ciel" || point.related);
        if (label) {
          label.position.set(point.position[0], point.position[1] + 0.2, point.position[2]);
          group.add(label);
        }

        return { mesh, label, point };
      });

      const lines = new THREE.Group();
      group.add(lines);

      POINTS.filter((point) => point.related && point.label !== "ciel").forEach((point) => {
        const ciel = POINTS[0];
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...ciel.position),
          new THREE.Vector3(...point.position),
        ]);
        const material = new THREE.LineBasicMaterial({ color: 0x9ba1a8, transparent: true, opacity: 0.28 });
        lines.add(new THREE.Line(geometry, material));
      });

      const clock = new THREE.Clock();
      const frameRef = { current: 0 };

      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(mount);

      const animate = () => {
        const elapsed = clock.getElapsedTime();
        const motionAmount = reducedMotion ? 0 : 1;
        const reveal = reducedMotion ? 1 : Math.min(1, elapsed / 1.2);
        const easedReveal = 1 - Math.pow(1 - reveal, 3);
        const targetRotation = step >= 3 ? -0.16 : 0;
        const targetCameraZ = step >= 3 ? 5.2 : 6.5;

        world.rotation.y += ((targetRotation + Math.sin(elapsed * 0.35) * 0.08 * motionAmount) - world.rotation.y) * 0.025;
        world.rotation.x += ((0.28 + Math.sin(elapsed * 0.28) * 0.035 * motionAmount) - world.rotation.x) * 0.025;
        camera.position.z += (targetCameraZ - camera.position.z) * 0.035;
        camera.position.y += ((0.45 - easedReveal * 0.18) - camera.position.y) * 0.035;
        group.scale.setScalar(0.72 + easedReveal * 0.28);

        pointObjects.forEach(({ mesh, label, point }, index) => {
          const pulse = reducedMotion ? 0 : Math.sin(elapsed * 2.1 + index) * 0.025;
          const baseScale = point.related ? 1.18 : 1;
          const scale = baseScale * easedReveal + pulse;
          mesh.scale.setScalar(Math.max(0.02, scale));
          if (label) label.material.opacity = (point.related ? 0.95 : 0.48) * easedReveal;
        });

        lines.children.forEach((line) => {
          const material = (line as import("three").Line).material as import("three").LineBasicMaterial;
          material.opacity = 0.28 * easedReveal;
        });

        frameRef.current += 1;
        if (frameRef.current % 2 === 0) renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(animate);

      cleanup = () => {
        observer.disconnect();
        renderer.setAnimationLoop(null);
        renderer.dispose();
        scene.traverse((object) => {
          const resource = object as import("three").Mesh;
          if (resource.geometry) resource.geometry.dispose();
          const material = resource.material;
          const disposeMaterial = (item: import("three").Material) => {
            const map = (item as import("three").Material & { map?: import("three").Texture | null }).map;
            map?.dispose();
            item.dispose();
          };
          if (Array.isArray(material)) material.forEach(disposeMaterial);
          else if (material) disposeMaterial(material);
        });
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    };

    void init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [step]);

  return <div ref={mountRef} className="embedding-space-3d" aria-label="Visualisation 3D pédagogique d’un espace d’embeddings" />;
}
