# AWS Lambda
## Goals
* Save money vs Heroku
	* Lambda Free tier will satisfy my needs
	* API Gateway costs are minor, and are unnecessary when interacting with Alexa Skills
* Less management than Heroku
	* What even?
* Easier to tie into Alexa Skills
	* Makes them private
* Rewrite apps in Go from Ruby
	* Alexa Alerter
	* Game Selector 

## Hurdles
* Local development


## Want To Learn
- [ ] Proper way to setup a Lambda
	* [Examples for Go Support on AWS Lambda | AWS Compute Blog](https://aws.amazon.com/blogs/compute/announcing-go-support-for-aws-lambda/)
	* [GitHub - aws/aws-lambda-go: Libraries, samples and tools](https://github.com/aws/aws-lambda-go)
- [ ] Interfacing it with an API Gateway over HTTPS
- [ ] Local development made easy
	* 	right now, just thinking testable packages that the handler calls

## Learned
1. Golang must be compiled for Linux to work on Lambda
```
GOOS=linux go build main.go -o awesomeApp
```
2. Must be in a manually uploadable zip file
	1. `zip `
3. Use `httptest` for mocking API services 
4. Api gateway can handle rejecting badly structured data, or data with missing or invalid values. 
5. **CORS** is cross-origin request and enables access controls at the *integration response* section.  You can restrict methods, domains, etc.
6. Each *Method* needs support for headers re: CORS, Even though you checked it for the options.
	1. Add *Access-Control-Allow-Origin* to the Method Execution
	2. Enable the header in the Integration Response as `’*’`
7. Use body mapping templates to transform data before it hits your lambda.
	1. [AWS API Gateway Body Matching Templates](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)
8. You can use body mapping on the response to create structured JSON so your lambda doesn’t need return JSON. It could return a string or a int, etc.
9. Models allow the request to validate against expected data. You can set the model requirement in the *Method Request* section
10. Models are written using the [JSON Schema language](http://json-schema.org)
	1. Also see [Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema/)


### Models (Optional)

### Validation

1. Must be registered in the **Method Request** under *Request Model*.
	1. Set it as the `application/json` model.
	2. Then the *Request Validator* setting at the top needs changed to *Validate Body*.
	3.  Test them to verify the validation works, as expected.

### Body Mapping

1. Must be assigned in the **Integration Request** under *Body Mapping Templates*
	1. Check *When there are no templates defined (recommended)*
	2. Click on *application/json* (create it if it doesn’t exist)
	3. Select your model in the *Generate Template* dropdown
	4. Map the data accordingly from your model to the desired JSON format

```
#set($inputRoot = $input.path('$'))
{
  "age" : $inputRoot.age
}
```

2. Must be assigned in the **Integration Response** under *Body Mapping Templates*
	1. Click on *application/json*
	2. If you are passing back a non-JSON body from your Lambda, you can assign your data accordingly
```
#set($inputRoot = $input.path('$'))
{
  "your-age" : $inputRoot
}
```

3. Test your setup accordingly.

### Sample Model

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "CompareData",
  "type": "object",
  "properties": {
    "age": {"type": "integer"},
    "height": {"type": "integer"},
    "income": {"type": "integer"}
  },
  "required": ["age", "height", "income"]
}
```

#20% time# #aws/api gateway# #aws/lambda# #serverless #golang/build/goos#