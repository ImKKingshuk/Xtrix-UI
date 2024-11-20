<h1 align="center">XtrixUI</h1>

<p align="center">
XtrixUI: Your Modern Cross-Framework UI Library! 🚀 
Empowering developers with fully customizable components, seamless integration with TailwindCSS, and a commitment to accessibility, responsiveness, and performance. Build stunning web applications with ease and flexibility!
</p>

<br><br>

## Features

- **Unstyled Components**: Gain total control over your component designs by applying any TailwindCSS class for a fully personalized look.
- **Seamless TailwindCSS Integration**: Leverage the power of TailwindCSS utilities directly within XtrixUI components, simplifying and accelerating your styling workflow.

- **Accessibility-First Design**: Built with WAI-ARIA compliance in mind, ensuring inclusive and accessible experiences for all users.

- **Responsive by Design**: Out-of-the-box responsiveness across all devices with optimized breakpoints and media queries.

- **TypeScript Support**: Enjoy a fully-typed API for better developer experience, enhanced type safety, and reduced bugs.

- **Customizable Themes**: Switch effortlessly between light, dark, and custom themes for ultimate design flexibility.

- **Zero Runtime Styles**: Powered by TailwindCSS, XtrixUI avoids runtime styles for efficient, lightweight bundles.

- **Server-Side Rendering (SSR)**: Fully compatible with SSR for faster load times and improved SEO.

- **Elegant UI Design**: Beautiful, timeless component designs that ensure your project stands out.

<br>

## Installation

Install **XtrixUI** using your preferred package manager:

### bun

```bash
bun add xtrixui
```

### npm

```bash
npm install xtrixui
```

### pnpm

```bash
pnpm add xtrixui
```

### yarn

```bash
yarn add xtrixui
```

<br>

## Usage

### Basic Example

```jsx
import { Button } from "xtrixui/Button";

const MyApp = () => (
  <div>
    <Button className="bg-blue-500 text-white">Click Me!</Button>
  </div>
);

export default MyApp;
```

### Advanced Customization

Customize XtrixUI components with TailwindCSS and extend functionality.

```jsx
import { Card } from "xtrixui/Card";

const CustomCard = () => (
  <Card className="shadow-lg hover:shadow-xl transition">
    <h1 className="text-xl font-bold">Welcome to XtrixUI</h1>
    <p className="text-gray-600">
      The ultimate UI library for modern developers.
    </p>
  </Card>
);

export default CustomCard;
```

<br>

## API Reference

### Components

- **Button**: A fully customizable button component.
- **Card**: A flexible container for showcasing content.
- **Modal**: An accessible modal dialog box.
- **Input**: A customizable input field for forms.

For a full list of components, refer to the [Official Documentation](#).

<br>

## Why Choose XtrixUI?

XtrixUI stands apart with its unique features:

- Total styling freedom with TailwindCSS.
- Fully customizable, accessible components.
- Aesthetic designs with built-in responsiveness.
- Easy-to-use API, even for large-scale applications.

<br>

## License

This project is licensed under the GPL-3.0-or-later License.

<h3 align="center">
Start building your next-generation web applications with XtrixUI today! 🚀 </h3>
