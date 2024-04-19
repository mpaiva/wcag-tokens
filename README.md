# Accessible Design Tokens
Explore a curated collection of design tokens designed to meet WCAG standards, aiding design systems in maintaining accessibility across size, spacing, color, typography, and timing. This repository provides guidelines, examples, and best practices to help designers and developers implement these tokens into their design systems, ensuring consistent and accessible digital interfaces.

## About this community
Our mission is to enhance digital accessibility by providing a robust and standardized set of design tokens aligned with the Web Content Accessibility Guidelines (WCAG). We empower designers and developers to seamlessly integrate these tokens into existing design systems, ensuring that digital products are accessible to all users, including those with disabilities.

## Creating WCAG Design Tokens
Our initiative focuses on creating design tokens that can be used in design systems to meet different WCAG success criteria. It focuses on key areas like size, spacing, color, typography, and timing. This provides a clear method for designers and developers to make sure all digital content follows accessibility standards. These tokens act as helpful tools that allow design teams to consistently apply accessibility throughout their projects, ensuring their work is inclusive and meets global accessibility guidelines.

Below is a comprehensive list of the key WCAG criteria that our design tokens will address:

### Size and Spacing
- **1.4.12 Text Spacing**
  - Modify text spacing (line height, paragraph spacing, letter spacing, word spacing) without loss of content or functionality.

### Colors
- **1.4.1 Use of Color**
  - Color is not the sole means of conveying information, initiating action, or distinguishing a visual element.
- **1.4.3 Contrast (Minimum)**
  - Minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- **1.4.6 Contrast (Enhanced)**
  - Higher contrast ratio of 7:1 for normal text and 4.5:1 for large text.
- **1.4.11 Non-text Contrast**
  - Visual presentation of UI components and graphical objects must have a contrast ratio of at least 3:1.

### Typography
- **1.4.4 Resize Text**
  - Text can be resized up to 200% without loss of content or functionality.
- **1.4.8 Visual Presentation**
  - Control over foreground and background color, width of text blocks, and line spacing.

### Timing Units
- **2.2.1 Timing Adjustable**
  - Ability to turn off, adjust, or extend time limits unless required by the content.
- **2.2.2 Pause, Stop, Hide**
  - Control over moving, blinking, scrolling, or auto-updating information.

### Target Size
- **2.5.5 Target Size (Minimum)**
  - Target for pointer inputs is at least 44 by 44 CSS pixels, except under certain conditions.

### Additional Interaction and Layout
- **1.4.10 Reflow**
  - Content can reflow without loss of information or functionality, not requiring scrolling in two dimensions at specific dimensions.
- **1.4.13 Content on Hover or Focus**
  - Additional content triggered by hover or keyboard focus is dismissible, hoverable, and persistent.
- **2.4.7 Focus Visible**
  - Keyboard focus indicator must be visible.
- **2.5.3 Label in Name**
  - Text labels must match the visual presentation for interactive elements.
 
## Accessible Design Tokens Example
The JSON file presented below offers an example of a collection of design tokens designed to align with the Web Content Accessibility Guidelines (WCAG):

```json
{
  "category": {
    "category-name": "Category Name",
    "category-description": "Description of how these design tokens ensure compliance with a specific WCAG criterion, highlighting their role in enhancing usability and accessibility.",
    "token-sets": [
      {
        "token-set-name": "Token Set Name",
        "token-set-description": "Detailed description of what these tokens accomplish and how they meet or exceed specific WCAG criteria.",
        "wcag-sc": "WCAG Success Criterion Number",
        "wcag-url": "URL to the specific WCAG criterion",
        "wcag-level": "WCAG Compliance Level (A, AA, or AAA)",
        "user-benefit": "Explanation of how these tokens benefit users, particularly those with disabilities, to interact more effectively with the content.",
        "tokens": [
          {
            "token-name": "Token Name",
            "value": "Token Value",
            "wcag-level": "WCAG Compliance Level"
          },
          {
            "token-name": "Additional Token Name",
            "value": "Additional Token Value",
            "wcag-level": "WCAG Compliance Level"
          }
          // Add more tokens as needed
        ]
      }
      // Add more token sets as needed
    ]
  }
}

```

For a complete set of WCAG success criteria tokens, [visit the Categories page](categories.md). 

## Next Steps and Contributing to the Repository

### What's Next?
As we continue to refine and expand our repository, we aim to keep improving the design tokens to ensure they not only meet current WCAG guidelines but also anticipate future accessibility needs. Our next steps include:

- **Updating Tokens Regularly**: We will keep the tokens up-to-date with the latest accessibility standards and design trends.
- **Expanding Token Categories**: Plans are in place to introduce additional tokens that cover more aspects of accessibility, such as auditory and cognitive dimensions.
- **Enhancing Documentation**: We will provide more detailed documentation and examples to make the integration process as straightforward as possible.

### How You Can Contribute
We warmly invite contributions from the community! Whether you're a designer, developer, accessibility expert, or just passionate about making the web more accessible, your input is valuable. Here’s how you can get involved:

- **Submit Token Ideas**: If you have ideas for new tokens or improvements to existing ones, please share them with us.
- **Report Issues**: If you find any issues or inconsistencies in the current tokens, let us know through the repository's [Issues](https://github.com/mpaiva/accessible-design-tokens/issues) section.
- **Improve Documentation**: Help us make our documentation clearer and more comprehensive to assist others in using and understanding our tokens.
- **Spread the Word**: Share the repository with others who might find it useful or could contribute to its growth.

Together, we can build a more accessible digital world, one design token at a time! To get started and learn how to contribute to this repository, check out our [contribution guidelines](https://github.com/mpaiva/accessible-design-tokens/contribute.md).

## How to Make a Contribution

### Fork the Repository:
- Start by forking the repository to your GitHub account.

### Create a Branch:
- Create a branch in your forked repository. This keeps your changes organized and separate from the main branch.

### Make Your Changes:
- Make the necessary changes or additions in your branch. Ensure that your changes adhere to the existing coding and documentation standards.

### Submit a Pull Request:
- Once you have completed your changes, submit a pull request to the main repository. Please provide a comprehensive description of what changes you have made and why.

### Respond to Feedback:
- Once your pull request is reviewed, there may be feedback. Responding promptly and making any required updates is crucial in the review process.

## Code of Conduct
- Be respectful of all contributors.
- Engage constructively during disagreements.
- Follow the community guidelines for appropriate behavior.

By following these guidelines, you will help us maintain the quality and efficacy of our design tokens. We look forward to your contributions and thank you for helping us make the web a more accessible place for everyone!

Please remember, your contributions indicate your agreement to abide by the repository's terms of use and its licensing agreements.

## Questions?
If you have any questions about contributing, please feel free to contact us via the repository's [Issues](https://github.com/mpaiva/accessible-design-tokens/issues) section or directly through our community communication channels.


## Credits (Placeholder)

### Contributors
We are immensely grateful to all the individuals who have contributed their time, expertise, and passion to the development of the Accessible Design Tokens repository. Your contributions help make digital spaces more accessible to everyone.

### Acknowledgements
- **Web Content Accessibility Guidelines (WCAG)**: This repository is based on the principles and guidelines provided by the WCAG, an initiative of the World Wide Web Consortium (W3C) to provide a universal standard for web accessibility.
- **Community Feedback**: Special thanks to the broader design and development community for their valuable feedback and suggestions that have shaped these design tokens.
- **Project Sponsors and Supporters**: We appreciate the support from organizations and projects that believe in and fund our mission to improve accessibility.

### Special Thanks
- **[Your Organization Name]**: For initiating and supporting this project.
- **Technical Reviewers**: For ensuring the accuracy and effectiveness of our design tokens.
- **Documentation Volunteers**: For their efforts in making our guidelines clear and understandable.

We encourage anyone interested in contributing to or learning more about our efforts to contact us or visit our project page.

### License
This project is released under the [MIT License](LICENSE.md), allowing for widespread use and adaptation with appropriate credit.




