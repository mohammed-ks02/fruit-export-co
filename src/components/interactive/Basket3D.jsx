import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Basket3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1.2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(480, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(15, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    scene.add(directionalLight);

    // Additional lights for better visibility
    const fillLight = new THREE.DirectionalLight(0xfff8dc, 0.6);
    fillLight.position.set(-10, 8, -8);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 15, 0);
    scene.add(topLight);

    // Create improved basket design
    const createBasket = (x, y, z, color, handleColor) => {
      const basketGroup = new THREE.Group();
      
      // Main basket body - improved design
      const basketGeometry = new THREE.CylinderGeometry(1.8, 2.0, 3.0, 16, 4, true);
      const basketMaterial = new THREE.MeshLambertMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7,
        roughness: 0.8,
        metalness: 0.1
      });
      const basket = new THREE.Mesh(basketGeometry, basketMaterial);
      basket.castShadow = true;
      basket.receiveShadow = true;
      basketGroup.add(basket);

      // Basket weave pattern - improved design
      const weaveMaterial = new THREE.MeshLambertMaterial({ 
        color: handleColor,
        roughness: 0.9,
        metalness: 0.0
      });
      
      // Horizontal weave rings - improved spacing
      for (let i = 0; i < 5; i++) {
        const weaveGeometry = new THREE.TorusGeometry(1.85, 0.1, 8, 16);
        const weave = new THREE.Mesh(weaveGeometry, weaveMaterial);
        weave.position.y = -1.3 + i * 0.6;
        weave.rotation.x = Math.PI / 2;
        weave.castShadow = true;
        weave.receiveShadow = true;
        basketGroup.add(weave);
      }

      // Vertical weave strips - improved design
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const weaveGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3.0, 6);
        const weave = new THREE.Mesh(weaveGeometry, weaveMaterial);
        weave.position.x = Math.cos(angle) * 1.85;
        weave.position.z = Math.sin(angle) * 1.85;
        weave.castShadow = true;
        weave.receiveShadow = true;
        basketGroup.add(weave);
      }

      // Basket handle - improved design
      const handleGeometry = new THREE.TorusGeometry(0.8, 0.1, 8, 16);
      const handle = new THREE.Mesh(handleGeometry, weaveMaterial);
      handle.position.y = 2.2;
      handle.rotation.x = Math.PI / 2;
      handle.castShadow = true;
      handle.receiveShadow = true;
      basketGroup.add(handle);

      // Add decorative rim
      const rimGeometry = new THREE.TorusGeometry(2.05, 0.08, 8, 16);
      const rim = new THREE.Mesh(rimGeometry, weaveMaterial);
      rim.position.y = 1.4;
      rim.rotation.x = Math.PI / 2;
      rim.castShadow = true;
      rim.receiveShadow = true;
      basketGroup.add(rim);

      basketGroup.position.set(x, y, z);
      scene.add(basketGroup);
      return basketGroup;
    };

    // Create three baskets in different positions around the page
    const fruitBasket = createBasket(-6, 0, -2, 0x8B4513, 0x654321);
    const vegBasket = createBasket(0, 0, 3, 0x8B4513, 0x654321);
    const fishBasket = createBasket(6, 0, -2, 0x8B4513, 0x654321);

    // Create realistic fruits with better visibility
    const fruits = [];
    const fruitTypes = [
      { name: 'apple', geometry: new THREE.SphereGeometry(0.3, 12, 12), color: 0xff0000 },
      { name: 'orange', geometry: new THREE.SphereGeometry(0.25, 12, 12), color: 0xffa500 },
      { name: 'avocado', geometry: new THREE.SphereGeometry(0.35, 12, 12), color: 0x228B22 },
      { name: 'grapes', geometry: new THREE.SphereGeometry(0.12, 8, 8), color: 0x800080 },
      { name: 'mango', geometry: new THREE.SphereGeometry(0.4, 12, 12), color: 0xffd700 },
      { name: 'banana', geometry: new THREE.CylinderGeometry(0.08, 0.08, 0.7, 8), color: 0xffff00 },
      { name: 'strawberry', geometry: new THREE.SphereGeometry(0.15, 8, 8), color: 0xff1493 },
      { name: 'pear', geometry: new THREE.SphereGeometry(0.28, 12, 12), color: 0x90EE90 },
      { name: 'pineapple', geometry: new THREE.CylinderGeometry(0.2, 0.25, 0.8, 8), color: 0xffd700 },
      { name: 'kiwi', geometry: new THREE.SphereGeometry(0.2, 8, 8), color: 0x228B22 }
    ];

    for (let i = 0; i < 15; i++) {
      const fruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
      const material = new THREE.MeshLambertMaterial({ 
        color: fruitType.color,
        transparent: true,
        opacity: 0.95,
        roughness: 0.3,
        metalness: 0.1
      });
      
      const fruit = new THREE.Mesh(fruitType.geometry, material);
      
      // Position in fruit basket (left side)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      fruit.position.x = -6 + Math.cos(angle) * radius;
      fruit.position.z = -2 + Math.sin(angle) * radius;
      fruit.position.y = -0.8 + Math.random() * 2.0;
      
      fruit.rotation.x = Math.random() * Math.PI;
      fruit.rotation.y = Math.random() * Math.PI;
      fruit.rotation.z = Math.random() * Math.PI;
      
      const scale = 0.9 + Math.random() * 0.3;
      fruit.scale.set(scale, scale, scale);
      
      fruit.castShadow = true;
      fruit.receiveShadow = true;
      scene.add(fruit);
      fruits.push(fruit);
    }

    // Create realistic vegetables with better visibility
    const vegetables = [];
    const vegTypes = [
      { name: 'carrot', geometry: new THREE.CylinderGeometry(0.1, 0.15, 0.9, 8), color: 0xff8c00 },
      { name: 'tomato', geometry: new THREE.SphereGeometry(0.25, 12, 12), color: 0xff4500 },
      { name: 'onion', geometry: new THREE.SphereGeometry(0.22, 12, 12), color: 0xfff8dc },
      { name: 'potato', geometry: new THREE.SphereGeometry(0.18, 8, 8), color: 0xdeb887 },
      { name: 'cucumber', geometry: new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8), color: 0x228b22 },
      { name: 'bell_pepper', geometry: new THREE.SphereGeometry(0.25, 12, 12), color: 0xff6347 },
      { name: 'broccoli', geometry: new THREE.SphereGeometry(0.3, 8, 8), color: 0x228b22 },
      { name: 'cauliflower', geometry: new THREE.SphereGeometry(0.28, 8, 8), color: 0xf5f5dc },
      { name: 'lettuce', geometry: new THREE.SphereGeometry(0.35, 8, 8), color: 0x90EE90 },
      { name: 'cabbage', geometry: new THREE.SphereGeometry(0.32, 8, 8), color: 0x228B22 }
    ];

    for (let i = 0; i < 12; i++) {
      const vegType = vegTypes[Math.floor(Math.random() * vegTypes.length)];
      const material = new THREE.MeshLambertMaterial({ 
        color: vegType.color,
        transparent: true,
        opacity: 0.95,
        roughness: 0.4,
        metalness: 0.1
      });
      
      const veg = new THREE.Mesh(vegType.geometry, material);
      
      // Position in vegetable basket (center, back)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      veg.position.x = Math.cos(angle) * radius;
      veg.position.z = 3 + Math.sin(angle) * radius;
      veg.position.y = -0.8 + Math.random() * 2.0;
      
      veg.rotation.x = Math.random() * Math.PI;
      veg.rotation.y = Math.random() * Math.PI;
      veg.rotation.z = Math.random() * Math.PI;
      
      const scale = 0.9 + Math.random() * 0.3;
      veg.scale.set(scale, scale, scale);
      
      veg.castShadow = true;
      veg.receiveShadow = true;
      scene.add(veg);
      vegetables.push(veg);
    }

    // Create realistic fish with better visibility
    const fish = [];
    const fishTypes = [
      { name: 'salmon', geometry: new THREE.CylinderGeometry(0.18, 0.1, 0.9, 8), color: 0xff6b6b },
      { name: 'tuna', geometry: new THREE.CylinderGeometry(0.15, 0.08, 0.8, 8), color: 0x4682b4 },
      { name: 'cod', geometry: new THREE.CylinderGeometry(0.12, 0.06, 0.7, 8), color: 0x87ceeb },
      { name: 'mackerel', geometry: new THREE.CylinderGeometry(0.1, 0.05, 0.6, 8), color: 0x2f4f4f },
      { name: 'sardine', geometry: new THREE.CylinderGeometry(0.08, 0.04, 0.5, 8), color: 0x696969 },
      { name: 'trout', geometry: new THREE.CylinderGeometry(0.13, 0.07, 0.75, 8), color: 0x20b2aa },
      { name: 'sea_bass', geometry: new THREE.CylinderGeometry(0.16, 0.09, 0.85, 8), color: 0x4682b4 },
      { name: 'red_snapper', geometry: new THREE.CylinderGeometry(0.14, 0.07, 0.7, 8), color: 0xff6347 }
    ];

    for (let i = 0; i < 10; i++) {
      const fishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      const material = new THREE.MeshLambertMaterial({ 
        color: fishType.color,
        transparent: true,
        opacity: 0.9,
        roughness: 0.2,
        metalness: 0.3
      });
      
      const fishItem = new THREE.Mesh(fishType.geometry, material);
      
      // Position in fish basket (right side)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      fishItem.position.x = 6 + Math.cos(angle) * radius;
      fishItem.position.z = -2 + Math.sin(angle) * radius;
      fishItem.position.y = -0.8 + Math.random() * 2.0;
      
      fishItem.rotation.x = Math.random() * Math.PI;
      fishItem.rotation.y = Math.random() * Math.PI;
      fishItem.rotation.z = Math.random() * Math.PI;
      
      const scale = 0.9 + Math.random() * 0.3;
      fishItem.scale.set(scale, scale, scale);
      
      fishItem.castShadow = true;
      fishItem.receiveShadow = true;
      scene.add(fishItem);
      fish.push(fishItem);
    }

    // Add some leaves for realism in vegetable basket
    for (let i = 0; i < 6; i++) {
      const leafGeometry = new THREE.SphereGeometry(0.1, 4, 4);
      const leafMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x228B22,
        transparent: true,
        opacity: 0.8
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.2;
      leaf.position.x = Math.cos(angle) * radius;
      leaf.position.z = 3 + Math.sin(angle) * radius;
      leaf.position.y = -0.5 + Math.random() * 1.0;
      
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      scene.add(leaf);
      vegetables.push(leaf);
    }

    // Add some ice cubes for fish basket
    for (let i = 0; i < 4; i++) {
      const iceGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const iceMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.6
      });
      const ice = new THREE.Mesh(iceGeometry, iceMaterial);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.0;
      ice.position.x = 6 + Math.cos(angle) * radius;
      ice.position.z = -2 + Math.sin(angle) * radius;
      ice.position.y = -0.3 + Math.random() * 0.8;
      
      ice.castShadow = true;
      ice.receiveShadow = true;
      scene.add(ice);
      fish.push(ice);
    }

    // Camera position for better view of all three baskets
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Rotate baskets slowly
      fruitBasket.rotation.y += 0.003;
      vegBasket.rotation.y += 0.003;
      fishBasket.rotation.y += 0.003;
      
      // Animate fruits
      fruits.forEach((fruit, index) => {
        fruit.rotation.y += 0.004;
        const bounce = Math.sin(time * 2 + index * 0.5) * 0.002;
        fruit.position.y += bounce;
        const sway = Math.sin(time * 1.5 + index * 0.3) * 0.001;
        fruit.position.x += sway;
      });
      
      // Animate vegetables
      vegetables.forEach((veg, index) => {
        veg.rotation.y += 0.004;
        const bounce = Math.sin(time * 2 + index * 0.5) * 0.002;
        veg.position.y += bounce;
        const sway = Math.sin(time * 1.5 + index * 0.3) * 0.001;
        veg.position.x += sway;
      });
      
      // Animate fish
      fish.forEach((fishItem, index) => {
        fishItem.rotation.y += 0.004;
        const bounce = Math.sin(time * 2 + index * 0.5) * 0.002;
        fishItem.position.y += bounce;
        const sway = Math.sin(time * 1.5 + index * 0.3) * 0.001;
        fishItem.position.x += sway;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Basket3D; 