# Diary of Events

Sometime last year ( 2020 ) I started some workout challenges and I was recording the sessions that I did on a book ... a BOOK!.As a software developer I found this laughable. I have the capacity, so what better way to learn a new skill than solving this small challenge whose MVP was a simple one. The application helps manage and record workouts that I engage in and their respective sessions.


## Running the application on development

*  Clone this repo onto your local machine.
*  Copy the contents in the .env.example file onto a new .env file


The application depends on Node and I suggest you install it from [here](https://nodejs.org/en/download/) if you haven't already done so. Once node has been successfully installed....

#### server
Run the following command on the cloned root directory

```bash
npm install
```
This will install all the server related dependencies. To run the server **ONLY** ( I use yarn but feel free to google the equivalent for NPM )
```bash
yarn api
```
and access the server via 
``` http://localhost:5000 ```

#### client
Navigate to client directory and run

```bash 
npm install
```
This will install all the client related dependencies. To run the client **ONLY** ( I use yarn but feel free to google the equivalent for NPM )
```bash
yarn client
```
and access the server via 
``` http://localhost:3000 ```
This command will install all the dependencies needed to run the application on local

### `yarn dev`
Run this command if you want to run both the client and the server with one command
