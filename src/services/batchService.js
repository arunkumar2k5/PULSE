import * as XLSX from 'xlsx';
import { generatePlantUML } from './llmService';
import { getPlantUMLImageUrl } from './plantUmlService';

/**
 * Parse Excel file and extract requirements
 * Expected columns: SYS ID (column B), SYS Requirement (column C)
 */
export const parseExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length < 2) {
          reject(new Error('Excel file must contain at least a header row and one data row'));
          return;
        }
        
        // Find column indices
        const headers = jsonData[0];
        const sysIdIndex = headers.findIndex(h => 
          h && h.toString().toLowerCase().includes('sys') && h.toString().toLowerCase().includes('id')
        );
        const sysReqIndex = headers.findIndex(h => 
          h && h.toString().toLowerCase().includes('sys') && h.toString().toLowerCase().includes('requirement')
        );
        
        if (sysIdIndex === -1 || sysReqIndex === -1) {
          reject(new Error('Excel file must contain "SYS ID" and "SYS Requirement" columns'));
          return;
        }
        
        // Extract requirements (skip header row)
        const requirements = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          const sysId = row[sysIdIndex];
          const sysReq = row[sysReqIndex];
          
          if (sysId && sysReq) {
            requirements.push({
              id: sysId.toString().trim(),
              requirement: sysReq.toString().trim(),
              rowNumber: i + 1
            });
          }
        }
        
        if (requirements.length === 0) {
          reject(new Error('No valid requirements found in Excel file'));
          return;
        }
        
        resolve(requirements);
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Process a single requirement: generate PlantUML code and save files
 */
export const processRequirement = async (requirement, outputFolder) => {
  try {
    // Generate PlantUML code using AI
    const plantUmlCode = await generatePlantUML(requirement.requirement);
    
    // Get PNG image URL
    const imageUrl = getPlantUMLImageUrl(plantUmlCode, 'png');
    
    return {
      id: requirement.id,
      requirement: requirement.requirement,
      plantUmlCode,
      imageUrl,
      success: true
    };
  } catch (error) {
    console.error(`Error processing requirement ${requirement.id}:`, error);
    return {
      id: requirement.id,
      requirement: requirement.requirement,
      error: error.message,
      success: false
    };
  }
};

/**
 * Save PlantUML code to file
 */
export const savePlantUMLCode = (code, filename) => {
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

/**
 * Download PNG diagram
 */
export const downloadDiagram = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch diagram');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error(`Failed to download diagram: ${error.message}`);
  }
};

/**
 * Process all requirements in batch
 */
export const processBatchRequirements = async (requirements, outputFolder, onProgress) => {
  const results = [];
  
  for (let i = 0; i < requirements.length; i++) {
    const requirement = requirements[i];
    
    // Update progress
    if (onProgress) {
      onProgress({
        total: requirements.length,
        current: i + 1,
        currentItem: requirement.id,
        status: 'processing'
      });
    }
    
    // Process requirement
    const result = await processRequirement(requirement, outputFolder);
    results.push(result);
    
    // If successful, download files
    if (result.success) {
      try {
        // Save PlantUML code
        savePlantUMLCode(result.plantUmlCode, result.id);
        
        // Download PNG diagram
        await downloadDiagram(result.imageUrl, result.id);
        
        // Small delay to avoid overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error saving files for ${result.id}:`, error);
        result.success = false;
        result.error = error.message;
      }
    }
  }
  
  // Update final progress
  if (onProgress) {
    onProgress({
      total: requirements.length,
      current: requirements.length,
      currentItem: 'Completed',
      status: 'completed'
    });
  }
  
  return results;
};
