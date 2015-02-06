var express = require('express')
  , app = express()
  , sassMiddleware = require('node-sass-middleware')

////////////////////////////////////////////////////////////////////////////////
// Server Views
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

////////////////////////////////////////////////////////////////////////////////
// Server Styles
app.use(sassMiddleware({
    src: __dirname + '/styles',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'expanded',
    force: true
}));

////////////////////////////////////////////////////////////////////////////////
//Middleware
app.use(express.static(__dirname + '/public'))

////////////////////////////////////////////////////////////////////////////////
// Routes
app.get('/', function (req, res) {
    res.render('index')
})

app.get('/:template', function(req, res) {
    res.render(req.params.template)
})

////////////////////////////////////////////////////////////////////////////////
//Start server
app.set('port', process.env.PORT || 3000)
var server = app.listen(app.get('port'), function() {
    console.log("Server listing on port %d", server.address().port)
})
