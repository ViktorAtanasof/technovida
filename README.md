<!-- # Technovida
[**Live Demo**](https://technovida.vercel.app/) -->
# Technovida

![Logo](https://raw.githubusercontent.com/ViktorAtanasof/technovida/main/app/src/assets/images/logo.png)

*Explore Technovida, your destination for the latest in consumer electronics. Discover a curated collection of cutting-edge smartphones, tablets, and related accessories. With an intuitive interface and specialized subcategories, Technovida simplifies your journey to find and acquire the perfect tech companions.*

[![GPLv3 License](https://img.shields.io/github/license/ViktorAtanasof/technovida?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

[**Live Demo**](https://technovida.vercel.app/)

![Banner](https://raw.githubusercontent.com/ViktorAtanasof/technovida/main/app/src/assets/images/home.png)

## Dependencies

**Frontend**
- [React 18.2.0](https://react.dev/)
- [React-router-dom 6.9.0](https://reactrouter.com/en/main)

**Backend**
- [Firebase 9.17.2](https://firebase.google.com/)

## Installation & Setup

1.1 Navigate to `app/` directory.

```bash
  cd app
```
1.2 Install dependencies & run `npm start`
```bash
  # Install dependencies
  npm install

  # Start frontend
  npm start
```

## Routes

```bash
  # Products
  /{category}/{subCategory}
  
  # Others (Home (Redirects to default category), Not Found)
  /
  /not-found
```
