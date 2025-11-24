# PULSE Batch Processing Mode - User Guide

## Overview

The Batch Processing Mode allows you to generate multiple PlantUML diagrams from an Excel file containing system requirements. This feature is perfect for processing large numbers of requirements efficiently.

## Features

✅ **Excel Upload** - Upload requirements in Excel format (.xlsx, .xls)  
✅ **Automated Processing** - AI generates PlantUML code for each requirement  
✅ **Bulk Export** - Automatically saves .puml files and .png diagrams  
✅ **Progress Tracking** - Beautiful animated progress bar shows real-time status  
✅ **Error Handling** - Detailed error reporting for failed requirements  
✅ **Results Summary** - View success/failure statistics after processing  

## Excel File Format

Your Excel file must contain the following columns:

| Column | Header Name | Description | Required |
|--------|-------------|-------------|----------|
| B | **SYS ID** | Unique identifier for the requirement | ✅ Yes |
| C | **SYS Requirement** | The requirement text to convert | ✅ Yes |

### Example Excel Structure

```
| A (Optional) | B (SYS ID) | C (SYS Requirement)                                    |
|--------------|------------|--------------------------------------------------------|
| Row 1        | REQ-001    | Create a sequence diagram for user login flow         |
| Row 2        | REQ-002    | Generate a class diagram for e-commerce system        |
| Row 3        | REQ-003    | Design an activity diagram for order processing       |
```

### Sample Template

A sample Excel template is available in the repository:
- **File**: `sample_requirements_template.xlsx`
- **Location**: Root directory of the project

## How to Use Batch Mode

### Step 1: Switch to Batch Mode

1. Click the **"Batch Mode"** tab at the top of the application
2. The interface will switch to the batch processing view

### Step 2: Upload Excel File

1. Click **"Choose Excel File"** button
2. Select your Excel file (.xlsx or .xls)
3. The system will automatically:
   - Parse the file
   - Validate column headers
   - Extract requirements
   - Display the count of found requirements

### Step 3: Select Output Folder (Optional)

1. Click **"Choose Folder"** button
2. Select a folder where you want to organize files later

**Note**: Due to browser security restrictions, files will be downloaded to your default Downloads folder. You can move them to your selected folder after download.

### Step 4: Preview Requirements

- Review the requirements table to ensure all data is correct
- Check that SYS IDs and requirements are properly loaded

### Step 5: Start Processing

1. Click **"Start Batch Processing"** button
2. Watch the animated progress bar at the bottom
3. The system will:
   - Process each requirement sequentially
   - Generate PlantUML code using AI
   - Create PNG diagrams
   - Download files automatically

### Step 6: Review Results

After processing completes, you'll see:
- **Total Processed**: Number of requirements processed
- **Successful**: Count of successfully generated diagrams
- **Failed**: Count of failed requirements (with error details)

## Output Files

For each requirement, two files are generated:

1. **PlantUML Code File**: `{SYS_ID}.puml`
   - Contains the generated PlantUML code
   - Can be edited and re-rendered later

2. **PNG Diagram**: `{SYS_ID}.png`
   - Visual representation of the diagram
   - Ready to use in documentation

### Example Output

For requirement `REQ-001`:
- `REQ-001.puml` - PlantUML source code
- `REQ-001.png` - Diagram image

## Progress Bar Features

The creative progress bar shows:

- **Current Item**: Which requirement is being processed
- **Progress Percentage**: Visual completion indicator
- **Animated Effects**: 
  - Gradient color animation during processing
  - Shimmer effect on progress bar
  - Pulse animation on progress dots
  - Sparkle effect on completion
- **Status Icons**:
  - 🔄 Spinning loader during processing
  - ✅ Green checkmark on completion
  - ⚠️ Alert icon on errors

## Tips & Best Practices

### 📋 Excel File Preparation

1. **Use Clear Headers**: Ensure column headers contain "SYS ID" and "SYS Requirement"
2. **Avoid Empty Rows**: Remove empty rows between requirements
3. **Unique IDs**: Use unique SYS IDs to avoid file overwriting
4. **Clear Requirements**: Write clear, specific requirements for better AI results

### ⚡ Processing Tips

1. **Start Small**: Test with 2-3 requirements first
2. **Check API Limits**: Ensure your OpenRouter API has sufficient credits
3. **Monitor Progress**: Watch the progress bar for any errors
4. **Stable Connection**: Ensure stable internet connection during processing

### 🔧 Troubleshooting

**Problem**: Excel file not parsing
- **Solution**: Check that columns B and C have correct headers
- **Solution**: Ensure file is in .xlsx or .xls format

**Problem**: Files not downloading
- **Solution**: Check browser download settings
- **Solution**: Allow multiple file downloads in browser

**Problem**: Some requirements fail
- **Solution**: Check the error details in the results table
- **Solution**: Verify requirement text is clear and specific
- **Solution**: Check API key and credits

**Problem**: Slow processing
- **Solution**: This is normal - each requirement needs AI processing
- **Solution**: Average: 3-5 seconds per requirement

## Technical Details

### Processing Flow

```
1. Upload Excel → 2. Parse & Validate → 3. Extract Requirements
                                              ↓
6. Download Files ← 5. Generate Diagrams ← 4. AI Processing
```

### Dependencies

- **xlsx**: Excel file parsing
- **OpenRouter API**: AI-powered PlantUML generation
- **PlantUML Server**: Diagram rendering

### Limitations

- Browser security prevents direct folder writing
- Files download to default Downloads folder
- Sequential processing (one requirement at a time)
- Requires active internet connection
- Subject to API rate limits

## Example Use Cases

### 1. Software Requirements Documentation
Generate sequence diagrams for all user stories in a sprint

### 2. System Architecture
Create component diagrams for all system modules

### 3. Process Documentation
Generate activity diagrams for business processes

### 4. API Documentation
Create sequence diagrams for all API endpoints

## Support

For issues or questions:
1. Check this guide first
2. Review error messages in the results table
3. Verify Excel file format
4. Check API key configuration in `.env`

---

**Happy Batch Processing! 🚀**
