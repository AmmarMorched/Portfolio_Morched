# Portfolio - Morched Ammar

A modern, multilingual portfolio website for a Firmware and Embedded AI Engineer. Built with React, Vite, and Tailwind CSS, featuring dark/light theme support and responsive design.

## Features

- **Multilingual Support**: Full support for English, French, and Arabic with RTL layout for Arabic
- **Dark/Light Theme**: Toggle between dark and light themes with persistent preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Built with Framer Motion for smooth transitions and animations
- **Contact Form**: Integrated with Formspree for direct email submissions
- **Resume Download**: Dropdown menu to download English or French resume
- **Project Showcase**: Featured projects with GitHub links
- **Experience Timeline**: Professional experience with detailed descriptions
- **Skills Display**: Categorized technical skills with icons

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons (Font Awesome, Feather Icons)
- **Forms**: Formspree for contact form
- **Fonts**: Inter (body), JetBrains Mono (code)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Configuration

### Resume Files

Place your resume PDF files in the `public` folder:
- `public/resume-en.pdf` - English resume
- `public/resume-fr.pdf` - French resume

### Formspree Integration

To enable the contact form, sign up at [Formspree](https://formspree.io/) and:
1. Create a new form
2. Replace `YOUR_FORM_ID` in `src/App.jsx` (line 299) with your Formspree form ID

### Customization

#### Personal Information

Update the following in `src/App.jsx`:
- Name in translations (lines 27, 80, 140)
- Email in Contact form (line 299)
- Social links in Footer (lines 456-458)
- LinkedIn and GitHub URLs

#### Experience Data

Update the `experiences` object (lines 288-352) with your professional experience. Each language (en, fr, ar) has its own array of experiences.

#### Projects Data

Update the `projects` object (lines 354-469) with your projects. Each language has its own array with translated titles and descriptions.

#### Skills Data

Update the `skills` object (lines 471-478) with your technical skills.

#### Theme Colors

Customize theme colors in the `themes` object (lines 222-241):
- Dark theme colors
- Light theme colors

## Project Structure

```
portfolio/
├── public/
│   ├── resume-en.pdf    # English resume (add your file)
│   └── resume-fr.pdf    # French resume (add your file)
├── src/
│   ├── App.jsx          # Main application component
│   └── index.css       # Global styles and theme variables
├── index.html          # HTML entry point
├── package.json        # Dependencies
└── README.md           # This file
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and build settings

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Author

**Morched Ammar**
- LinkedIn: [morched-ammar-805407197](https://www.linkedin.com/in/morched-ammar-805407197/)
- GitHub: [AmmarMorched](https://github.com/AmmarMorched)
- Email: morcheda62@gmail.com

---

Built with ❤️ using React, Vite, and Tailwind CSS
