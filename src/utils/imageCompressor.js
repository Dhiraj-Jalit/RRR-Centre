/**
 * Client-side image compressor using HTML5 Canvas.
 * Compresses images to stay under 2MB and reduces dimensions to prevent high memory usage on low-end devices.
 */
export async function compressImage(file, maxDimension = 1000, quality = 0.7) {
  if (!file) return null;

  // If already smaller than 200KB and jpeg/png, convert to data URL directly
  if (file.size <= 200 * 1024) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        dataUrl: reader.result,
        sizeInKb: Math.round(file.size / 1024),
        originalSizeKb: Math.round(file.size / 1024),
        name: file.name
      });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Approximate size of base64
        const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
        const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        const sizeInKb = Math.round(sizeInBytes / 1024);

        resolve({
          dataUrl,
          sizeInKb,
          originalSizeKb: Math.round(file.size / 1024),
          name: file.name
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
