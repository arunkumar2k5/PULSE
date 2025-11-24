import plantumlEncoder from 'plantuml-encoder';

const PLANTUML_SERVER_URL = import.meta.env.VITE_PLANTUML_SERVER_URL || 'https://www.plantuml.com/plantuml';

export const encodePlantUML = (code) => {
  try {
    return plantumlEncoder.encode(code);
  } catch (error) {
    console.error('Encoding error:', error);
    throw new Error('Failed to encode PlantUML code');
  }
};

export const getPlantUMLImageUrl = (code, format = 'svg') => {
  const encoded = encodePlantUML(code);
  return `${PLANTUML_SERVER_URL}/${format}/${encoded}`;
};

export const downloadPlantUML = async (code, format = 'svg', filename = 'diagram') => {
  try {
    const url = getPlantUMLImageUrl(code, format);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch diagram');
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error(`Failed to download ${format.toUpperCase()}`);
  }
};

export const downloadPlantUMLCode = (code, filename = 'diagram') => {
  const blob = new Blob([code], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.puml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
