# timeToTaylor
The concert it July 7th, 2018, at 7pm

## First Phase - Checking a Website
[days.to/until/7-july](https://days.to/until/7-july)

### Downside
- Web-only
- No hours, minutes, or seconds 
- I can’t tweak it

## Second Phase - Inline Ruby Script
```
which taylor
aliased to ruby -e 'd=0;h=0;m=0;s=(Time.mktime(2018,7,7,19)-Time.now).to_i;while(s >= 86_400) do; s-=86_400;d+=1;end;while(s > 3_600) do;s-=3_600;h+=1;end;while(s >= 60) do;s-=60;m+=1;end;puts "#{d} days, #{h} hours, #{m} minutes and #{s} seconds until showtime!"'
```
### Upside
* Locally available
* Hours, minutes, and seconds
### Downside
- Local alias only
- Requires Ruby to be installed
- Is a nightmare to parse visually

## Third Phase - Go Binary (Installed)
```
which timeToTaylor
/Users/jmills/programming/go/bin/timeToTaylor
```
### Upside
* Cross-system compilation makes it available for *ALL* systems
	* [Releases · trueheart78/timeToTaylor · GitHub](https://github.com/trueheart78/timeToTaylor/releases)
### Downside
* No web service

## Fourth Phase - AWS Lambda
![](Time%20to%20Taylor%20-%20Go%20and%20AWS%20Lambda/FF468605-E977-43AC-B9CE-774969DC1490.png)
### Upside
* Required minor tweaks to the pre-existing Go code
* Online for me
### Downside
* Online *only* for me

## Fifth Phase - AWS API Gateway
[timeToTaylor - showtime](https://gvitovaif0.execute-api.us-east-2.amazonaws.com/development/showtime)
### Upside
* Online for everyone
### Downside
* No real front-end

## Sixth Phase - AWS S3 Static Site
_TBD_
_Golang client?_
_Webpage on my domain?_


#20% time/golang# #20% time/ruby##taylor swift##aws/api gateway# #aws/lambda##20% time/demoed#