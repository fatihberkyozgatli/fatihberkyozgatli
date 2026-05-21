// Mock mesh data - pre-generated 3D surface from the sample image
// This represents a realistic surface output from the Image2Surface pipeline

export const MOCK_MESH = {
  vertices: Array.from({ length: 2500 }, (_, i) => {
    const row = Math.floor(i / 50);
    const col = i % 50;
    const x = (col / 49) * 2 - 1;
    const y = (row / 49) * 2 - 1;
    
    // Create a realistic surface with multiple frequency components
    // Simulates what would come from depth estimation on an actual image
    const frequency1 = Math.sin(x * 2.5 + y * 1.8) * Math.cos(y * 2.2) * 0.35;
    const frequency2 = Math.sin(x * 5 + 0.5) * Math.cos(y * 4.5 - 0.3) * 0.25;
    const frequency3 = Math.sin((x + y) * 3) * 0.15;
    const detail = (Math.sin(x * 12) * Math.cos(y * 10) + Math.sin(x * 8 + y * 7)) * 0.08;
    
    const height = frequency1 + frequency2 + frequency3 + detail + (Math.random() * 0.05 - 0.025);
    
    return { x, y, z: Math.max(-0.8, Math.min(0.8, height)) };
  }),
  
  indices: Array.from({ length: 49 }, (_, row) =>
    Array.from({ length: 49 }, (_, col) => {
      const v0 = row * 50 + col;
      const v1 = row * 50 + col + 1;
      const v2 = (row + 1) * 50 + col;
      const v3 = (row + 1) * 50 + col + 1;
      
      return [
        { vertices: [v0, v1, v2], faces: [] },
        { vertices: [v1, v3, v2], faces: [] }
      ];
    }).flat()
  ).flat().map((face, idx) => ({
    v0: face.vertices[0],
    v1: face.vertices[1],
    v2: face.vertices[2]
  })),
  
  vertex_colors: Array.from({ length: 2500 }, (_, i) => {
    const row = Math.floor(i / 50);
    const col = i % 50;
    const x = (col / 49) * 2 - 1;
    const y = (row / 49) * 2 - 1;
    
    const frequency1 = Math.sin(x * 2.5 + y * 1.8) * Math.cos(y * 2.2) * 0.35;
    const frequency2 = Math.sin(x * 5 + 0.5) * Math.cos(y * 4.5 - 0.3) * 0.25;
    const frequency3 = Math.sin((x + y) * 3) * 0.15;
    const detail = (Math.sin(x * 12) * Math.cos(y * 10) + Math.sin(x * 8 + y * 7)) * 0.08;
    const height = frequency1 + frequency2 + frequency3 + detail;
    
    // Color gradient based on height
    const normalized = Math.max(0, Math.min(1, (height + 0.8) / 1.6));
    
    if (normalized < 0.25) {
      return `rgb(41, 98, 255)`; // Deep blue (low)
    } else if (normalized < 0.4) {
      return `rgb(100, 150, 255)`; // Light blue (low-mid)
    } else if (normalized < 0.5) {
      return `rgb(144, 238, 144)`; // Light green (mid)
    } else if (normalized < 0.65) {
      return `rgb(210, 180, 140)`; // Tan (mid-high)
    } else if (normalized < 0.8) {
      return `rgb(139, 90, 43)`; // Brown (high)
    } else {
      return `rgb(200, 200, 200)`; // Light gray (very high)
    }
  })
};

// Sample image - your custom image
export const SAMPLE_IMAGE_URL = '/sampleimage.jpg';
