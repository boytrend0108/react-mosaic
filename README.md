# Data Loader - dashboard with 3 Company Information Widgets.

Fetch and display data from a fake API.

- By default, there are 3 windows displaying information from the first 3 companies in a list.
- Users can add, delete, split, and drag and drop windows.
- Users can select which company will be displayed in the selected window.
- To store data, we use a fake API: db.json and json-server.
- Are 3 themes available (Blueprint, Blueprint Dark, None).
- It uses RTK Query to fetch, store, and cache data.
- There is a Dockerfile to run the app in different environments.

## Tech Stack

- Front-end: React, Redux, RTK Query, Typescript, Tailwind, Blueprint, Webpack
- Back-end: json-server, docker

<img src="https://github.com/boytrend0108/react-mosaic/blob/master/public/images/sinergy.gif" alt="App Screenshot" width="500" height="300">

### Getting Started
1 Download docker image:

```bash
 docker pull boytrend/mosaic:2.3
```

2 Start the development server and client:

```bash
docker run -d -p 3001:3001 -p5000:5000 boytrend/mosaic:2.3
```

4 Open `http://localhost:3001` in your browser, server will run on `http://localhost:5000`;

### Contributing

Pull requests are welcome.Please follow the coding style and conventions used in the project.

### License

This project is licensed under the MIT License.

## Authors

- [boytrend](https://github.com/boytrend0108)

## Enjoy coding!
