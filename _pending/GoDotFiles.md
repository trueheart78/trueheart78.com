# GoDotFiles
A dot file manager written in Go.

### Checking if a symlink
- Requires the `os` and `path/filepath` packages.
```
fileinfo, err := os.Lstat(filename)
if err != nil {
  fmt.Println(err)
  os.Exit(1)
}
if fileinfo.Mode()&os.ModeSymlink != 0 { 
  fmt.Println(filename, "is a symbolic link") 
  realpath, err := filepath.EvalSymlinks(filename) 
  if err == nil { 
    fmt.Println("Path:", realpath) 
  } 
}
```

#20% time/golang#