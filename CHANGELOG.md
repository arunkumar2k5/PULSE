# Changelog

## [1.1.0] - 2025-11-23

### Fixed - Scrolling and Layout Issues

#### ChatPanel Component
- **Fixed**: Moved input form to the top (fixed position)
- **Fixed**: Made messages area scrollable with proper overflow handling
- **Improved**: Input box now stays visible even with long chat history
- **Layout**: Header → Input Form → Scrollable Messages

#### CodeEditor Component  
- **Fixed**: Added explicit scrollbar configuration to Monaco Editor
- **Fixed**: Header is now fixed at the top
- **Improved**: Editor area properly scrolls for long code
- **Added**: Custom scrollbar sizing (10px) for better UX

#### DiagramPreview Component
- **Fixed**: Export button now fixed at the top header
- **Fixed**: Preview area is now scrollable with `overflow-auto`
- **Improved**: Export button disabled when no diagram is available
- **Improved**: Export dropdown menu has higher z-index (z-50) to stay on top
- **Layout**: Fixed Header with Export → Scrollable Preview Area

### Technical Changes

All three panels now follow the same pattern:
```jsx
<div className="flex flex-col h-full">
  {/* Fixed Header */}
  <div className="flex-shrink-0">...</div>
  
  {/* Scrollable Content */}
  <div className="flex-1 overflow-auto">...</div>
</div>
```

### Benefits

1. ✅ **Chat input always accessible** - No need to scroll to send messages
2. ✅ **Export button always visible** - Quick access to download options
3. ✅ **Proper scrolling** - Each panel handles overflow independently
4. ✅ **No layout breaking** - Multiple messages/long code won't break the UI
5. ✅ **Better UX** - Controls stay fixed while content scrolls

### Testing Recommendations

1. Add multiple chat messages and verify scrolling works
2. Add long PlantUML code and verify editor scrolls
3. Generate large diagrams and verify preview scrolls
4. Verify export button is always accessible
5. Test with different screen sizes
