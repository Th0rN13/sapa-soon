# Design System Document: The Luminous Canvas

## 1. Overview & Creative North Star
**Creative North Star: "Atmospheric Clarity"**

This design system is engineered to move beyond the generic "SaaS template" look. Instead of relying on rigid grids and heavy borders, we embrace **Atmospheric Clarity**. This philosophy treats the screen as a high-key photographic studio where light is the primary architect. 

By utilizing intentional asymmetry, overlapping editorial elements, and a "vibrant neutral" palette, we create a 'Coming Soon' experience that feels like a breath of fresh air. We avoid the "noir" or "moody" tech aesthetic in favor of a high-end, editorial feel that prioritizes legibility, optimism, and soft, tactile depth.

---

## 2. Colors & Tonal Architecture
The palette is rooted in a high-key, airy spectrum. We utilize cool blues (`primary`) and soft violets (`secondary`) to create a sense of professional warmth.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
Structure must be achieved through:
- **Background Color Shifts:** Moving from `surface` (#eff8ff) to `surface_container_low` (#e2f3ff).
- **Whitespace:** Using the spacing scale to create psychological boundaries.
- **Tonal Transitions:** Subtle shifts in hue to denote change in context.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium materials—like frosted glass or high-grade vellum. 
- **Base Level:** `surface` (#eff8ff)
- **Secondary Level:** `surface_container_low` (#e2f3ff) for large structural areas.
- **Elevation Level:** `surface_container_lowest` (#ffffff) for the most prominent interactive cards, creating a "lifted" feel through brightness rather than shadow.

### The "Glass & Gradient" Rule
To inject "soul" into the interface:
- **Glassmorphism:** Use `surface_container` tokens with 70-80% opacity and a `20px` to `40px` backdrop-blur for floating navigation or modal elements.
- **Signature Gradients:** For Hero CTAs and primary visual anchors, utilize a linear gradient transitioning from `primary` (#00647b) to `primary_container` (#00cffc) at a 135-degree angle. This adds a "vibrant polish" that flat colors cannot replicate.

---

## 3. Typography
The system uses a pairing of **Manrope** (for character and impact) and **Inter** (for precision and utility).

- **Display & Headlines (Manrope):** These are the "editorial voice." Use `display-lg` (3.5rem) with a tight letter-spacing (-0.02em) to create an authoritative, high-end look. Ensure these elements have breathing room; a headline should never feel "trapped."
- **Titles & Body (Inter):** These provide the "functional narrative." Inter’s neutral construction ensures that even at `body-sm` (0.75rem), the information is accessible.
- **Labels (Inter):** Use `label-md` with `uppercase` styling and `0.05em` letter-spacing for category tags or "Coming Soon" status indicators.

The hierarchy is designed to guide the eye through a "Z-pattern" flow, using the scale jump from `display-lg` to `body-lg` to create immediate focal points.

---

## 4. Elevation & Depth
In this design system, depth is a result of light, not darkness.

- **Tonal Layering:** Instead of a drop shadow, place a `surface_container_lowest` (#ffffff) card atop a `surface_container` (#cfecff) background. The delta in brightness creates a natural, sophisticated lift.
- **Ambient Shadows:** When an element must float (e.g., a "Notify Me" popover), use a shadow color derived from `on_surface` (#003346) at 6% opacity, with a Blur of `40px` and a Y-offset of `12px`. It should feel like a soft glow rather than a hard shadow.
- **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use the `outline_variant` (#87b3cd) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Use backdrop-blurs on elements using the `secondary_container` (#d8caff) at low opacities to create a "jewel-toned" frosted effect for secondary accents.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, and a `full` (9999px) roundedness for a friendly, modern feel.
- **Secondary:** `surface_container_highest` background with `primary` text. No border.
- **Interaction:** On hover, increase the brightness of the gradient. On press, scale the button to 98%.

### Input Fields (The "Vellum" Style)
- **Background:** `surface_container_lowest` (#ffffff).
- **Border:** Use the Ghost Border rule (15% `outline_variant`).
- **Focus State:** Transition the border to 100% `primary` and add a soft `primary_container` outer glow (8px blur).
- **Labels:** Always use `label-md` sitting 8px above the input.

### Cards
- **Construction:** Use `md` (1.5rem) or `lg` (2rem) corner radius.
- **Separation:** Forbid the use of divider lines. Separate content using `body-md` for descriptions and `title-sm` for sub-headers, utilizing 24px of vertical whitespace between groups.

### Coming Soon Specifics: Waitlist Chips
- Use `secondary_container` (#d8caff) with `on_secondary_container` (#5000d2) text for "Phase 1" or "Early Access" tags. These should have a `full` roundedness.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Place hero text on the left and allow "floating" UI elements to overlap background shapes to create depth.
- **Use High-Key Lighting:** Ensure at least 70% of the viewport utilizes the `surface` or `surface_container_low` hues.
- **Prioritize Breathing Room:** If you think there is enough whitespace, add 15% more.

### Don't:
- **No Pure Blacks:** Never use #000000. Use `on_background` (#003346) for the darkest text.
- **No Hard Dividers:** Never use a solid line to separate the header from the hero or list items from each other. Use tonal shifts.
- **No "Noir" Shadows:** Avoid small, dark, high-opacity shadows. They look "cheap" and "standard."
- **No Default Grids:** Don't let the grid lock you into boxes. Let elements break the container slightly to feel organic and bespoke.