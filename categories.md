# Accessible Design Tokens

This documentation provides detailed JSON structures for various design tokens aligned with specific WCAG success criteria. These tokens are intended to help designers and developers implement accessible design systems consistently and effectively.

## Table of Contents
1. [Target Size (Minimum)](#target-size-minimum)
2. [Reduced Motion](#reduced-motion)
3. [Timing Control](#timing-control)
4. [Focus Visibility](#focus-visibility)
5. [Reflow](#reflow)
6. [Content on Hover or Focus](#content-on-hover-or-focus)

---

## Target Size (Minimum)
Design tokens that specify minimum target sizes for interactive elements to enhance usability and accessibility for all users.
```json
{
  "category": {
    "category-name": "Target Size",
    "category-description": "Design tokens to ensure compliance with WCAG 2.5.5, specifying minimum target sizes for interactive elements.",
    "token-sets": [
      {
        "token-set-name": "Minimum Target Size Tokens",
        "token-set-description": "Tokens define the minimum size for interactive elements such as buttons, links, and custom controls.",
        "wcag-sc": "2.5.5",
        "wcag-url": "https://www.w3.org/TR/WCAG/#target-size",
        "wcag-level": "AA",
        "user-benefit": "Ensuring a minimum target size for interactive elements makes it easier for users with limited dexterity to interact without frustration.",
        "tokens": [
          {"token-name": "minimumButtonSize", "value": "44px"},
          {"token-name": "minimumIconSize", "value": "44px"},
          {"token-name": "minimumCustomControlSize", "value": "44px"}
        ]
      }
    ]
  }
}
