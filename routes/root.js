import morgan from "morgan";


export default async (app, options) => {
  /* root */
    const logger = morgan("combined");
  
    app.get('/', async (req, res) => res.view('index'))    
    app.use(logger)

    /**
     * страницы about/posts/users и другие грузяться автоматически отдельными файлами в /routes about.js/courses.js и т.п. 
     */

    // app.use((req, res, next) => {
    //     console.log("AAAAAAAA");
    //     next();
    // });

    // app.get("/", (req, res) => {
    //     console.log("CCCCCCCC");
    //     res.send("Hello");
    // });
}
