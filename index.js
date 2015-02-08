var metalsmith  = require('metalsmith'),
	markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
	collections = require('metalsmith-collections'),
	permalinks  = require('metalsmith-permalinks'),
	handlebars  = require('handlebars'),
	fs          = require('fs');
	

// Register handle bar partials
handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/templates/partials/navigation.hbt').toString());


// Initialize and configure metalsmith 
metalsmith(__dirname)
	.use(collections({
					    pages:{ pattern: 'content/pages/*.md'},
					    lessons:{
								pattern: 'content/lessons/*.md',
								sortBy: 'date',
								reverse: true
							  }
					 }))
	.use(markdown())
	.use(permalinks({ pattern: ':collection/:title' }))
	.use(templates('handlebars'))
	.source('./src')
	.destination('./build')
	.build(function(err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log('Build complete...');
				}
			});
	