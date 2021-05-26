# Book Notes Generator - Go
- Current name is `book-notes-generator` but that repo is taken
	- Ideas: `jotter`




## Ideas
- `Version` class
- Cross-system support
- Simple REST-like commands
	- `binary-name create "Book Name"`
	- `binary-name new "Book Name"`
	- `binary-name import "Book Name"`
	- `binary-name list` -> show an index-like list of existing YAML with details
- Utilize templates
	- Readme insert line
	- Readme for book
	- Chapters for each book
- New `binary setup` to generate a config file

## Libraries to Use
- YAML - [GitHub - go-yaml/yaml: YAML support for the Go language.](https://github.com/go-yaml/yaml)
- Homedir - [GitHub - mitchellh/go-homedir: Go library for detecting and expanding the user’s home directory without cgo.](https://github.com/mitchellh/go-homedir/)
- Clear - [GitHub - dmowcomber/go-clear: a go library to clear the screen](https://github.com/dmowcomber/go-clear)
- Spew for testing - [GitHub - davecgh/go-spew: Implements a deep pretty printer for Go data structures to aid in debugging](https://github.com/davecgh/go-spew)

## Needs
- Better support for knowing number of chapters and indenting properly
- Easier growth of adjectives for authors
	- External file we randomly pick from?
	- Extensive internal list?
	- Remote API that provides it? 
- Support for generating the config file as `~/.book-notes.conf`
```
book_notes_path: /Users/jmills/book-notes
yaml_directory: _yaml_
notes_directory:
```









#20% time/golang##20% time/needs demoed##golang/ideas#