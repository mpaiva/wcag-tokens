# Accessible Design Tokens

This documentation provides detailed JSON structures for various design tokens aligned with specific WCAG success criteria. These tokens are intended to help designers and developers implement accessible design systems consistently and effectively.

## Table of Contents
1. [Target Size (Minimum)](#255-target-size-minimum)
2. [Reduced Motion](#233-animation-from-interactions)
3. [Timing Control](#221-timing-adjustable)
4. [Focus Visibility](#247-focus-visible)
5. [Reflow](#1410-reflow)
6. [Content on Hover or Focus](#1413-content-on-hover-or-focus)

---

## 2.5.5 Target Size (Minimum)
**Ensures interactive elements are large enough to be easily tapped or clicked.**
**User Benefit:** Ensuring a minimum target size for interactive elements makes it easier for users with limited dexterity or precision, such as the elderly or those with motor disabilities, to interact with the content without frustration or errors. Larger clickable areas reduce the chance of missed clicks and improve the overall user experience by making interfaces more forgiving and easier to use.

```json
{
  "category": {
    "category-name": "Target Size",
    "category-description": "Design tokens to ensure compliance with WCAG 2.5.5, specifying minimum target sizes for interactive elements to enhance usability and accessibility for all users, including those with motor impairments.",
    "token-sets": [
      {
        "token-set-name": "Minimum Target Size Tokens",
        "token-set-description": "Tokens define the minimum size for interactive elements such as buttons, links, and custom controls to meet or exceed the recommended target size of 44 by 44 CSS pixels, enhancing accessibility for users who may struggle with smaller targets.",
        "wcag-sc": "2.5.5",
        "wcag-url": "https://www.w3.org/TR/WCAG/#target-size",
        "wcag-level": "AA",
        "user-benefit": "Ensuring a minimum target size for interactive elements makes it easier for users with limited dexterity or precision, such as the elderly or those with motor disabilities, to interact with the content without frustration or errors. Larger clickable areas reduce the chance of missed clicks and improve the overall user experience by making interfaces more forgiving and easier to use.",
        "tokens": [
          {
            "token-name": "minimumButtonSize",
            "value": "44px",
            "wcag-level": "AA"
          },
          {
            "token-name": "minimumIconSize",
            "value": "44px",
            "wcag-level": "AA"
          },
          {
            "token-name": "minimumCustomControlSize",
            "value": "44px",
            "wcag-level": "AA"
          }
        ]
      }
    ]
  }
}
```

## 2.3.3 Animation from Interactions
**Reduces or eliminates motion animation triggered by interaction unless essential.**
**User Benefit:** Reducing or eliminating motion animations helps users who experience discomfort or seizures from animated content. It also benefits users who find animations distracting. Enabling reduced motion settings ensures that the interface remains comfortable and accessible for all users, including those sensitive to motion.

```json
{
  "category": {
    "category-name": "Reduced Motion",
    "category-description": "Design tokens aimed at providing user preferences for reduced motion in web interfaces, complying with WCAG 2.3.3 to minimize or eliminate motion animation from interactions.",
    "token-sets": [
      {
        "token-set-name": "Motion Reduction Tokens",
        "token-set-description": "Tokens that enable the application of reduced motion settings to web interfaces, ensuring accessibility for users sensitive to motion.",
        "wcag-sc": "2.3.3",
        "wcag-url": "https://www.w3.org/TR/WCAG/#animation-from-interactions",
        "wcag-level": "AAA",
        "user-benefit": "Reducing or eliminating motion animations helps users who experience discomfort or seizures from animated content. It also benefits users who find animations distracting. Enabling reduced motion settings ensures that the interface remains comfortable and accessible for all users, including those sensitive to motion.",
        "tokens": [
          {
            "token-name": "reduceMotionEnabled",
            "value": "true", // Boolean value indicating if the reduce motion settings should be applied
            "wcag-level": "AAA"
          },
          {
            "token-name": "animationDuration",
            "value": "0s", // Duration to effectively remove animations or transition effects
            "wcag-level": "AAA"
          },
          {
            "token-name": "animationTimingFunction",
            "value": "linear", // Ensures animations are smooth and less intrusive if enabled
            "wcag-level": "AAA"
          },
          {
            "token-name": "animationTimingSpeed",
            "value": "300ms", // Speed of animation, adjusted for reduced motion preferences
            "wcag-level": "AAA"
          },
          {
            "token-name": "animationBezierCurve",
            "value": "ease-out", // Specifies the Bezier curve to make the motion feel smoother and less jarring
            "wcag-level": "AAA"
          }
        ]
      }
    ]
  }
}

```

## 2.2.1 Timing Adjustable
**Allows users to modify, extend, or disable timing constraints unless essential for real-time functionality.**
**User Benefit:** Providing controls to adjust time limits allows users with different abilities to interact at their own pace. This is especially helpful for those who need more time to read or understand information, ensuring that everyone can use content comfortably without feeling rushed.

```json
{
  "category": {
    "category-name": "Timing Control",
    "category-description": "Design tokens that provide mechanisms for users to manage timing aspects of content that moves, blinks, scrolls, or auto-updates, ensuring compliance with WCAG standards for adjustable and controllable content.",
    "token-sets": [
      {
        "token-set-name": "Adjustable Timing Tokens",
        "token-set-description": "Tokens enable users to adjust or extend time limits on content that updates automatically, unless such adjustments are incompatible with the content's nature.",
        "wcag-sc": "2.2.1",
        "wcag-url": "https://www.w3.org/TR/WCAG/#timing-adjustable",
        "wcag-level": "A",
        "user-benefit": "Providing controls to adjust time limits allows users with different abilities to interact at their own pace. This is especially helpful for those who need more time to read or understand information, ensuring that everyone can use content comfortably without feeling rushed.",
        "tokens": [
          {
            "token-name": "defaultTimeLimit",
            "value": "120000ms", // Default 120 seconds before content changes
            "wcag-level": "A"
          },
          {
            "token-name": "extendedTimeOption",
            "value": "true", // Allows extension of time limits
            "wcag-level": "A"
          }
        ]
      }
    ]
  }
}
```

## 2.2.2 Pause, Stop, Hide
**Provides mechanisms for users to pause, stop, or hide moving, blinking, or auto-updating content.**
**User Benefit:** This capability allows users to control media and animations that could be distracting or cause discomfort. By giving users the ability to pause, stop, or hide such content, it enhances accessibility and allows for a more personalized interaction experience.

```json
{
  "category": {
    "token-sets": [
      {
        "token-set-name": "Pause, Stop, Hide Tokens",
        "token-set-description": "Tokens ensure that users can pause, stop, or hide any moving, blinking, or auto-updating elements to prevent distractions or accessibility issues.",
        "wcag-sc": "2.2.2",
        "wcag-url": "https://www.w3.org/TR/WCAG/#pause-stop-hide",
        "wcag-level": "A",
        "user-benefit": "This capability allows users to control media and animations that could be distracting or cause discomfort. By giving users the ability to pause, stop, or hide such content, it enhances accessibility and allows for a more personalized interaction experience.",
        "tokens": [
          {
            "token-name": "pauseControl",
            "value": "available", // Indicates availability of a pause control
            "wcag-level": "A"
          },
          {
            "token-name": "stopControl",
            "value": "available", // Indicates availability of a stop control
            "wcag-level": "A"
          },
          {
            "token-name": "hideControl",
            "value": "available", // Indicates availability of a hide control
            "wcag-level": "A"
          },
          {
            "token-name": "autoUpdateTimeout",
            "value": "300000ms", // 5 minutes before auto-updating content changes, with control to pause or stop
            "wcag-level": "A"
          }
        ]
      }
    ]
  }
}

```
## 2.4.7 Focus Visible
**Ensures that keyboard-operable user interfaces have a visible keyboard focus indicator.**
**User Benefit:** Ensuring visible focus on interactive elements enhances accessibility for keyboard users, including those with visual impairments. It makes navigation predictable and provides clear feedback on where the interaction is occurring within the interface.

```json
{
  "category": {
    "category-name": "Focus Visibility",
    "category-description": "Design tokens to ensure compliance with WCAG 2.4.7, specifying how focus visual indicators should appear on keyboard-operable user interfaces to enhance usability and accessibility.",
    "token-sets": [
      {
        "token-set-name": "Focus Visibility Tokens",
        "token-set-description": "Tokens are designed to ensure that any keyboard-operable interface elements are visibly highlighted when focused, aiding users in navigating through content effectively.",
        "wcag-sc": "2.4.7",
        "wcag-url": "https://www.w3.org/TR/WCAG/#focus-visible",
        "wcag-level": "AA",
        "user-benefit": "Ensuring visible focus on interactive elements enhances accessibility for keyboard users, including those with visual impairments. It makes navigation predictable and provides clear feedback on where the interaction is occurring within the interface.",
        "tokens": [
          {
            "token-name": "focusBorderColor",
            "value": "#FF3B3F", // Bright red for high visibility
            "wcag-level": "AA"
          },
          {
            "token-name": "focusBorderWidth",
            "value": "2px", // Thick enough to be easily noticeable
            "wcag-level": "AA"
          },
          {
            "token-name": "focusBorderStyle",
            "value": "solid", // Solid style for clear visibility
            "wcag-level": "AA"
          },
          {
            "token-name": "focusBorderRadius",
            "value": "4px", // Optional styling for rounded corners
            "wcag-level": "AA"
          },
          {
            "token-name": "focusOutlineWidth",
            "value": "3px", // Width of the outline shown on focused elements
            "wcag-level": "AA"
          },
          {
            "token-name": "focusOutlineStyle",
            "value": "solid", // Style of the outline (e.g., solid, dotted, dashed)
            "wcag-level": "AA"
          },
          {
            "token-name": "focusOutlineColor",
            "value": "#3b99fc", // Color of the outline, should be highly visible against the background
            "wcag-level": "AA"
          },
          {
            "token-name": "focusBackgroundColor",
            "value": "#eaf4ff", // Background color change on focus to enhance visibility
            "wcag-level": "AA"
          },
          {
            "token-name": "focusTextColor",
            "value": "#000000", // Text color on focused elements, ensuring high contrast with background
            "wcag-level": "AA"
          }
        ]
      }
    ]
  }
}
```
## 1.4.10 Reflow
**Requires that content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:**
- **Vertical scrolling content at a width equivalent to 320 CSS pixels;**
- **Horizontal scrolling content at a height equivalent to 256 CSS pixels.**
**User Benefit:** Ensuring content reflows properly allows users, especially those with low vision who may need to enlarge text, to view content without the need to scroll in two directions. This makes navigation easier and less frustrating, enhancing accessibility for users utilizing screen magnifiers or other assistive technologies.

```json
{
  "category": {
    "category-name": "Reflow",
    "category-description": "Design tokens that ensure content can be presented without two-dimensional scrolling, maintaining functionality and information integrity as per WCAG standards.",
    "token-sets": [
      {
        "token-set-name": "Responsive Layout Tokens",
        "token-set-description": "Tokens designed to control margins, padding, and other spacing properties to support reflow at key viewport sizes, ensuring accessibility on mobile devices and small screens.",
        "wcag-sc": "1.4.10",
        "wcag-url": "https://www.w3.org/TR/WCAG/#reflow",
        "wcag-level": "AA",
        "user-benefit": "Ensuring content reflows properly allows users, especially those with low vision who may need to enlarge text, to view content without the need to scroll in two directions. This makes navigation easier and less frustrating, enhancing accessibility for users utilizing screen magnifiers or other assistive technologies.",
        "tokens": [
          {
            "token-name": "baseMargin",
            "value": "16px", // Ensures sufficient space on the edges of content
            "wcag-level": "AA"
          },
          {
            "token-name": "basePadding",
            "value": "16px", // Provides padding around content to prevent clipping
            "wcag-level": "AA"
          },
          {
            "token-name": "minimumViewportWidth",
            "value": "320px", // Minimum width without horizontal scrolling
            "wcag-level": "AA"
          },
          {
            "token-name": "minimumViewportHeight",
            "value": "256px", // Minimum height without vertical scrolling
            "wcag-level": "AA"
          }
        ]
      }
    ]
  }
}
```
## 1.4.13 Content on Hover or Focus
**Ensures that additional content triggered by hover or keyboard focus is dismissible, hoverable, and persistent.**
**User Benefit:** This criterion helps users who need more time to interact with content that appears when an element is hovered over or focused. Making this content dismissible, hoverable, and persistent ensures that all users, especially those with limited motor skills or cognitive disabilities, can fully interact with additional content without it disappearing unexpectedly.

```json
{
  "category": {
    "category-name": "Interactive States",
    "category-description": "Design tokens that manage the visual properties of elements during hover or focus states, ensuring they meet accessibility standards for being dismissible, hoverable, and persistent.",
    "token-sets": [
      {
        "token-set-name": "Hover and Focus Tokens",
        "token-set-description": "Tokens ensure the visual consistency and accessibility of content triggered by hover or keyboard focus, including adjustments for visibility, dismissal, and interaction.",
        "wcag-sc": "1.4.13",
        "wcag-url": "https://www.w3.org/TR/WCAG/#content-on-hover-or-focus",
        "wcag-level": "AA",
        "user-benefit": "This criterion helps users who need more time to interact with content that appears when an element is hovered over or focused. Making this content dismissible, hoverable, and persistent ensures that all users, especially those with limited motor skills or cognitive disabilities, can fully interact with additional content without it disappearing unexpectedly.",
        "tokens": [
          {
            "token-name": "focusBorderColor",
            "value": "#1A73E8", // A blue color that generally meets contrast requirements
            "wcag-level": "AA"
          },
          {
            "token-name": "hoverBackgroundColor",
            "value": "#F1F3F4", // Light grey background for hover, ensuring visibility
            "wcag-level": "AA"
          },
          {
            "token-name": "dismissButtonSize",
            "value": "44px", // Ensures that dismiss buttons are easily clickable, meeting minimum target size
            "wcag-level": "AA"
          },
          {
            "token-name": "persistentVisibilityDuration",
            "value": "5000ms", // Duration to keep hover/focus content visible, facilitating ease of use
            "wcag-level": "AA"
          }
        ]
      }
    ]
  }
}
```

## Additional Tokens Under Evaluation
This section outlines potential future tokens or current considerations for new token implementations aimed at further enhancing accessibility. We continuously explore new areas where design tokens can be beneficial, such as adapting to emerging technologies, addressing newly identified accessibility challenges, or refining existing solutions based on user feedback. Our goal is to stay at the forefront of accessibility improvements to ensure that all users have the best possible experience.

## Suggest a Token
We highly value community input and encourage you to propose new tokens or suggest improvements to existing ones. Your contributions can make a significant impact on making digital content more accessible to everyone. If you have ideas for new tokens or enhancements to our current set, please submit your suggestions through our [GitHub Issues page](https://github.com/mpaiva/accessible-design-tokens/issues). We look forward to your innovative ideas and feedback!


