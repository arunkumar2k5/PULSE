# PULSE Batch Mode - Quick Start Guide

Get started with batch processing in 5 minutes! 🚀

## Prerequisites

✅ PULSE application running (Single Mode working)  
✅ OpenRouter API key configured in `.env`  
✅ Excel file with requirements ready  

## Step-by-Step Guide

### 1️⃣ Prepare Your Excel File (2 minutes)

Create an Excel file with this structure:

```
| B (SYS ID) | C (SYS Requirement)                                    |
|------------|--------------------------------------------------------|
| REQ-001    | Create a sequence diagram for user login flow         |
| REQ-002    | Generate a class diagram for e-commerce system        |
| REQ-003    | Design an activity diagram for order processing       |
```

**Key Points:**
- Column B header: "SYS ID"
- Column C header: "SYS Requirement"
- Start data from row 2

📄 See [SAMPLE_EXCEL_FORMAT.md](./SAMPLE_EXCEL_FORMAT.md) for detailed examples

### 2️⃣ Switch to Batch Mode (5 seconds)

1. Open PULSE in your browser
2. Click the **"Batch Mode"** tab at the top
3. You'll see the batch processing interface

### 3️⃣ Upload Your Excel File (10 seconds)

1. Click **"Choose Excel File"** button
2. Select your `.xlsx` or `.xls` file
3. Wait for parsing (usually instant)
4. You'll see: "✅ {filename} - X requirements found"

### 4️⃣ Start Processing (1 click)

1. Click **"Start Batch Processing"** button
2. Watch the animated progress bar at the bottom
3. Files will download automatically as they're generated

### 5️⃣ Collect Your Files (automatic)

Files are saved to your Downloads folder:
- `REQ-001.puml` - PlantUML source code
- `REQ-001.png` - Diagram image
- `REQ-002.puml` - PlantUML source code
- `REQ-002.png` - Diagram image
- ... and so on

### 6️⃣ Review Results (optional)

After processing completes, check the results summary:
- **Total Processed**: Number of requirements
- **Successful**: Successfully generated diagrams
- **Failed**: Any errors (with details)

## Example Workflow

```
1. Create Excel → 2. Switch to Batch Mode → 3. Upload File
                                                    ↓
6. Organize Files ← 5. Collect Downloads ← 4. Start Processing
```

## Common Issues & Solutions

### ❌ "Excel file must contain 'SYS ID' and 'SYS Requirement' columns"
**Solution**: Check that Column B header contains "SYS ID" and Column C contains "SYS Requirement"

### ❌ "No valid requirements found"
**Solution**: Ensure you have data rows (not just headers) and cells are not empty

### ❌ Files not downloading
**Solution**: 
- Check browser download settings
- Allow multiple file downloads
- Check Downloads folder permissions

### ❌ Some requirements fail
**Solution**: 
- Check error details in results table
- Verify requirement text is clear
- Ensure API key has sufficient credits

## Tips for Success

### 🎯 Start Small
Test with 2-3 requirements first to ensure everything works

### 📝 Write Clear Requirements
- Specify diagram type (sequence, class, activity, etc.)
- Include key entities or actors
- Be specific about the flow or relationship

### ⏱️ Be Patient
- Each requirement takes 3-5 seconds to process
- Don't close the browser during processing
- Watch the progress bar for status

### 🔄 Use Unique IDs
- Each SYS ID should be unique
- Duplicate IDs will overwrite files
- Use a consistent naming scheme (e.g., REQ-001, REQ-002)

## Processing Time Examples

| Requirements | Estimated Time |
|--------------|----------------|
| 5 | ~15-25 seconds |
| 10 | ~30-50 seconds |
| 25 | ~1.5-2 minutes |
| 50 | ~2.5-4 minutes |
| 100 | ~5-8 minutes |

## What Happens During Processing?

For each requirement, PULSE:
1. 📤 Sends requirement to AI (Claude 3.5 Sonnet)
2. 🤖 AI generates PlantUML code
3. 🎨 Renders diagram as PNG image
4. 💾 Downloads both `.puml` and `.png` files
5. ➡️ Moves to next requirement

## After Processing

### Organize Your Files
1. Go to your Downloads folder
2. Create a project folder (e.g., "MyProject_Diagrams")
3. Move all generated files there
4. Organize by requirement type if needed

### Use Your Diagrams
- **Documentation**: Insert PNG images into Word, Confluence, etc.
- **Version Control**: Commit `.puml` files to Git
- **Editing**: Open `.puml` files in PULSE Single Mode for modifications
- **Sharing**: Share PNG images with team members

## Need More Help?

📖 **Detailed Documentation**: [BATCH_MODE_GUIDE.md](./BATCH_MODE_GUIDE.md)  
📄 **Excel Format Guide**: [SAMPLE_EXCEL_FORMAT.md](./SAMPLE_EXCEL_FORMAT.md)  
📘 **Main README**: [README.md](./README.md)  

## Quick Reference

### Excel Format
```
Column B: SYS ID
Column C: SYS Requirement
```

### Output Files
```
{SYS_ID}.puml - PlantUML code
{SYS_ID}.png  - Diagram image
```

### Tab Location
```
Top of screen: [Single Mode] [Batch Mode] ← Click here
```

---

**You're ready to go! Start batch processing your requirements now! 🎉**
