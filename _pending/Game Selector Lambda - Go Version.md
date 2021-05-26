# Game Selector Lambda - Go Version
I have a crazy cool game selector built in Ruby running on Sinatra and being hosted on Heroku.

I’d love to transition this to an AWS Lambda-based binary, written in Go, using the AWS API Gateway for interfacing.

The current version does have tests, so they should be handy in making it act identically.

## Code
[GitHub - trueheart78/game-selector: Parses my game list and returns whatever I want it to](https://github.com/trueheart78/game-selector/)

## Technologies
- Redis
	- Caches the parsed page so frequent requests have no extra page requests. *May be unnecessary*
	- Caching  for N minutes (5-10) 
	- *v1.0 may not have this*
	- https://golangme.com/blog/how-to-use-redis-with-golang/
	- Use AWS Elasticache Redis

## URLs to Parse
- https://blog.trueheart78.com/games/
- https://blog.trueheart78.com/character-names/
- https://doggettck.github.io


#golang/rewrite# #20% time/golang##20% time/needs demoed#