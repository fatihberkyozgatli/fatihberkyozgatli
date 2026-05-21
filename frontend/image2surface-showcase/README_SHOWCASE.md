# Image2Surface Showcase

A lightweight showcase/demo version of Image2Surface that displays in an iframe on the portfolio.

## What It Does

- **No Backend Required** - Uses pre-generated mock mesh data
- **Instant Demo** - Shows a pre-loaded landscape sample image
- **Interactive Preview** - Users can adjust settings (resolution, smoothness, height scale) and click "Generate" to see the 3D mesh
- **Realistic UX** - Simulates processing delays for authentic feel

## Setup

```bash
cd image2surface-showcase
npm install
npm run dev
```

The app will run on `http://localhost:3001`

## How It Works

1. **Landing Page** - Shows a pre-loaded sample landscape image
2. **Settings** - Users can adjust:
   - **Resolution**: Controls mesh detail (10-100%)
   - **Smoothness**: Gaussian blur strength (1-15)
   - **Height Scale**: Vertical exaggeration (0.5-3x)
3. **Generate Button** - Simulates 3D mesh generation (3 second delay)
4. **3D Viewer** - Shows interactive Three.js mesh with rotation, zoom, pan
5. **Edit Mode** - Can apply smoothing, scaling, and sharpening to demo mesh
6. **Export** - Downloads a dummy OBJ file

## Port Configuration

- **Development**: `http://localhost:3001`
- **Production**: Will be embedded at a path on your main domain
  - Frontend `.env`: `NEXT_PUBLIC_IMAGE2SURFACE_DASHBOARD_URL=https://your-domain.com/image2surface-showcase`

## File Structure

- `lib/mock-data.ts` - Pre-generated mesh vertices, faces, and colors
- `lib/api.ts` - Mock API functions (replace real backend calls)
- `app/page.tsx` - Landing page with sample image and settings
- `components/` - Reused from original Image2Surface frontend

## Deployment

When deploying:

1. Build the showcase app: `npm run build`
2. Deploy alongside main portfolio or separately
3. Update portfolio's `.env` with correct showcase URL
4. Ensure showcase app is accessible at that URL

## Future Enhancements

- Add actual image upload that generates real mesh (requires backend)
- Add more sample images
- Add mesh preview on landing page
- Add progress indicator during generation
