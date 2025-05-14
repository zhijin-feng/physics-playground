# Simulation Page Style Guide

This document provides an overview of the styles used in the `simulation.css` for the simulation page, including the layout structure, component-specific styles, and naming conventions.

---

### 1. Layout Structure

#### `.sim-page-layout`
- **Purpose**: This is the main container for the entire simulation page layout.
- **Properties**:
    - `display: flex`: Makes it a flex container to arrange child elements.
    - `min-height: 100vh`: Ensures that the page takes at least the full height of the viewport.
    - `background-color: #1a1a1a`: Sets a dark background color for the page.
    - `color: white`: Ensures the text is readable with a light color against the dark background.

#### `.sim-main-content`
- **Purpose**: This is the main content area where the simulation and header are placed.
- **Properties**:
    - `flex-grow: 1`: Makes this section take up all available space.
    - `display: flex; flex-direction: column`: Aligns child elements vertically.

---

### 2. Sidebar (Left Navigation)

#### `.sim-sidebar`
- **Purpose**: The sidebar that holds the simulation navigation buttons.
- **Properties**:
    - `width: 220px`: Sets a fixed width for the sidebar.
    - `background-color: #1e1e1e`: Ensures the sidebar has a dark background.
    - `padding: 1.5rem 1rem`: Adds padding inside the sidebar.
    - `border-right: 1px solid #333`: Gives a subtle border separating it from the main content.

#### `.sim-sidebar-title`
- **Purpose**: The title at the top of the sidebar, typically "Simulations".
- **Properties**:
    - `font-size: 1.2rem`: Sets the font size for the title.
    - `margin-bottom: 2rem`: Adds space below the title for better spacing.

#### `.sim-nav-button`
- **Purpose**: A navigation button used for selecting different simulations.
- **Properties**:
    - `display: block; width: 100%`: Ensures the button takes up the full width of the sidebar.
    - `background-color: #2a2a2a`: Dark background color for the button.
    - `border-radius: 8px`: Softens the button's corners.
    - `cursor: pointer`: Makes it clickable.
    - `transition: background 0.2s, color 0.2s`: Smooth hover effect for a more interactive experience.

#### `.sim-nav-button.active`
- **Purpose**: A class applied to the active navigation button, indicating the currently selected simulation.
- **Properties**:
    - `background-color: #4e80ff`: Highlights the active button with a blue background.
    - `color: white`: Changes text color to white to match the active state.

---

### 3. Main Content Area (Canvas & Header)

#### `.sim-header`
- **Purpose**: The top header that includes a "Back" link and the title of the current simulation.
- **Properties**:
    - `display: flex; align-items: center`: Aligns the header items (back button and title) horizontally.
    - `padding: 1rem 2rem`: Adds padding for spacing around the header content.
    - `background-color: #222`: Dark background for the header.
    - `border-bottom: 1px solid #333`: Subtle border separating the header from the content.

#### `.sim-back-link`
- **Purpose**: A link for navigating back to the homepage.
- **Properties**:
    - `color: #1e88e5`: A light blue color to make it stand out.
    - `font-size: 1rem`: Sets the font size to be consistent with the overall layout.

#### `.sim-title`
- **Purpose**: The title of the currently active simulation, displayed in the header.
- **Properties**:
    - `font-size: 1.5rem`: Larger font size for the title.
    - `font-weight: 600`: Adds weight to make the title stand out.

#### `.sim-canvas-container`
- **Purpose**: The container that holds the canvas for the simulation.
- **Properties**:
    - `width: 80%`: Sets the width of the canvas to 80% of the parent container.
    - `height: 70vh`: Ensures the canvas takes up a large portion of the vertical space.
    - `background-color: #000`: Sets the canvas background to black for visual clarity.
    - `border: 2px solid #444`: Adds a subtle border to define the canvas area.
    - `border-radius: 12px`: Smooth corners for the canvas.
    - `position: relative`: Allows for positioning of child elements like the simulation.
    - `display: flex; justify-content: center; align-items: center`: Centers the content inside the canvas container.

---

### 4. Placeholder Text

#### `.sim-placeholder-text`
- **Purpose**: Displays placeholder text inside the canvas when there's no simulation running.
- **Properties**:
    - `color: #888`: Light grey color to make it less prominent.
    - `font-size: 1rem`: Consistent font size for the placeholder.
