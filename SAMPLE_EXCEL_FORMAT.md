# Sample Excel Format for PULSE Batch Mode

## Required Format

Your Excel file must have the following structure:

### Column Layout

| Column | Header Name | Description | Example |
|--------|-------------|-------------|---------|
| A | (Optional) | Any additional info | Description, Notes, etc. |
| B | **SYS ID** | Unique requirement identifier | REQ-001, SYS-042, etc. |
| C | **SYS Requirement** | The requirement text | "Create a sequence diagram..." |

## Sample Data

Here's an example of how your Excel file should look:

| A | B (SYS ID) | C (SYS Requirement) |
|---|------------|---------------------|
| Description | REQ-001 | Create a sequence diagram for user login flow with authentication server, user interface, and database |
| User Story | REQ-002 | Generate a class diagram for an e-commerce system with Product, Order, Customer, and Payment classes |
| Process Flow | REQ-003 | Design an activity diagram for order processing workflow from order placement to delivery |
| System Design | REQ-004 | Create a component diagram showing microservices architecture with API Gateway, Auth Service, and Data Service |
| API Flow | REQ-005 | Generate a sequence diagram for REST API call flow between client, server, and database |

## Important Notes

1. **Header Row**: The first row must contain column headers
2. **SYS ID Column**: Must be in Column B and contain "SYS ID" in the header
3. **SYS Requirement Column**: Must be in Column C and contain "SYS Requirement" in the header
4. **Case Insensitive**: Header matching is case-insensitive
5. **No Empty Rows**: Avoid empty rows between requirements
6. **Unique IDs**: Each SYS ID should be unique to avoid file overwriting

## Creating Your Excel File

### Option 1: Using Microsoft Excel
1. Open Microsoft Excel
2. Create headers in row 1: Column B = "SYS ID", Column C = "SYS Requirement"
3. Fill in your requirements starting from row 2
4. Save as `.xlsx` format

### Option 2: Using Google Sheets
1. Open Google Sheets
2. Create headers in row 1: Column B = "SYS ID", Column C = "SYS Requirement"
3. Fill in your requirements starting from row 2
4. Download as Excel (.xlsx) format: File → Download → Microsoft Excel (.xlsx)

### Option 3: Using LibreOffice Calc
1. Open LibreOffice Calc
2. Create headers in row 1: Column B = "SYS ID", Column C = "SYS Requirement"
3. Fill in your requirements starting from row 2
4. Save as Excel 2007-365 (.xlsx) format

## Tips for Writing Requirements

### Good Requirements
✅ "Create a sequence diagram for user authentication with OAuth2 flow"
✅ "Generate a class diagram for inventory management system with Product, Warehouse, and Stock classes"
✅ "Design an activity diagram for customer onboarding process"

### Requirements to Improve
❌ "Make a diagram" (too vague)
❌ "System flow" (not specific enough)
❌ "Database" (missing context)

### Best Practices
- Be specific about the diagram type (sequence, class, activity, component, etc.)
- Include key entities or actors
- Mention the main flow or relationship
- Keep requirements clear and concise
- Use technical terms appropriately

## Example Requirements by Diagram Type

### Sequence Diagrams
- "Create a sequence diagram for payment processing with user, payment gateway, and bank"
- "Generate a sequence diagram showing microservice communication for order placement"

### Class Diagrams
- "Design a class diagram for library management system with Book, Member, and Loan classes"
- "Create a class diagram for social media platform with User, Post, Comment, and Like entities"

### Activity Diagrams
- "Generate an activity diagram for employee leave approval workflow"
- "Create an activity diagram for e-commerce checkout process"

### Component Diagrams
- "Design a component diagram for web application with frontend, backend, and database layers"
- "Create a component diagram showing microservices architecture"

## File Size Recommendations

- **Small Batch**: 5-10 requirements (good for testing)
- **Medium Batch**: 10-50 requirements (typical use case)
- **Large Batch**: 50+ requirements (ensure stable internet connection)

## Processing Time Estimates

- **Per Requirement**: ~3-5 seconds (depends on complexity and API response time)
- **10 Requirements**: ~30-50 seconds
- **50 Requirements**: ~2.5-4 minutes
- **100 Requirements**: ~5-8 minutes

---

**Ready to start? Create your Excel file following this format and upload it in PULSE Batch Mode!**
