# Timesheet (React-Redux)


## Getting Started

### Development mode

1. Install all the necessary dependencies.
```
> npm install
```

2. Start the development server (changes will now update live in browser). It also run mock_server.js (Rest API mock)
```
> npm run start
```

Go to: [http://localhost:3000/](http://localhost:3000/) 
(All requests matching url '/api/**' are proxied by webpack-dev-server and redirected to mock_server running on port 3001)

## Production mode

1. Install all the necessary dependencies.
```
> npm install
```

2. Compile React and bundle with webpack to '<project_root>/src/main/webapp/js/bundle.min.js'
```
> webpack
```

3. Build timesheet.jar
```
> mvn clean install
```

4. Run app
```
> java -jar <path_to_jar>/timesheet.jar
```


### Running unit tests

```
> npm run test
```

### Running e2e tests


1. Start the development server.
```
> npm run start
```

2. Run tests.
```
> npm run e2e-test
```

## Links

- [boilterplate react redux](https://github.com/buckyroberts/React-Redux-Boilerplate.git)
