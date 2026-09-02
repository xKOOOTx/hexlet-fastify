import morgan from "morgan";
import { users } from '../mockdata/users.js'

export default async (app, options) => {
  /* root */
    const logger = morgan("combined");
  
    app.get('/', async (req, res) => {

        const visited = req.cookies.visited
        const userId = req.session.get('userId')
        console.log('LOGIN 2:', req.session.get('userId'))
        console.log('userId: ', userId)
        const user = users.find(el => el.id === userId)
        const templateData = {
            visited,
            userId,
            user,
            messages: res.flash()
        }
        res.cookie('visited', true)
        return res.view('index', templateData)
    })
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
