import morgan from "morgan";
import { users } from '../mockdata/users.js'

export default async (app, options) => {
  /* root */
    const logger = morgan("combined");
  
    app.get('/', async (req, res) => {

        console.log('cookies:', req.cookies)
        console.log('session:', req.session)

        const visited = req.cookies.visited
        const userId = req.session.userId
        const user = users.find(el => el.id === userId)
        const templateData = {
            visited,
            userId,
            user
        }
        res.cookie('visited', true)
        return res.view('index', templateData)
    })    
    app.use(logger)

    app.get("/increment", (req, res) => {
        req.session.counter = req.session.counter || 0;
        req.session.counter += 1;
        res.send(req.session.counter)
    });

    app.post("/session", (req, res) => {
        if (user.passwordDigest === encrypt(password)) {
            req.session.userId = user.id;

            console.log(req.session)
        }
    })

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
