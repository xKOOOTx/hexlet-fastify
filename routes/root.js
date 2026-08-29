export default async (app, options) => {
    /* root */
    app.get('/', async (req, res) => res.view('index'))    

    /**
     * страницы about/posts/users и другие грузяться автоматически отдельными файлами в /routes about.js/courses.js и т.п. 
     */
}
