# Data Loader - dashboard with 3 Company Information Widgets.

Fetch and display data from a fake API.

- By default, there are 3 windows displaying information from the first 3 companies in a list.
- Users can add, delete, split, and drag and drop windows.
- Users can select which company will be displayed in the selected window.
- To store data, we use a fake API: db.json and json-server.
- There are 3 themes available (Blueprint, Blueprint Dark, None).
- It uses RTK Query to fetch, store, and cache data.
- There is a Dockerfile to run the app in different environments.

## Tech Stack

- Front-end: React, Redux, RTK Query, Typescript, Tailwind, Blueprint,
- Back-end: json-server, docker

<img src="https://github.com/boytrend0108/react-mosaic/blob/master/public/images/sinergy.gif" alt="App Screenshot" width="400" height="230">

### Getting Started

## Variant A via NPM:

1.Clone the repository:

```bash
 https://github.com/boytrend0108/react-mosaic
```

2.Install the required dependencies for client and server:

```bash
  npm install
```

3.Start the development server and client:

```bash
  npm run start
```

4.Open `http://localhost:3001` in your browser, server will run on `http://localhost:5000`;

## Variant B via Docker:

1 Dowload docker image:

```bash
 docker pull boytrend/mosaic
```

2 Start the development server and client:

```bash
docker run -p 3001:3001 -p5000:5000 boytrend/mosaic
```

4 Open `http://localhost:3001` in your browser, server will run on `http://localhost:5000`;

### Contributing

Pull requests are welcome.Please follow the coding style and conventions used in the project.

### License

This project is licensed under the MIT License.

## Authors

- [boytrend](https://github.com/boytrend0108)

## Enjoy coding!
