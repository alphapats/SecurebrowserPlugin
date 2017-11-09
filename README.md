# SecurebrowserPlugin: a browser plugin for security.
In order to provide more control to web users, we attempted to formulate few simple security policies so that user can decide what information he want to sent to the network and to whom the information can be sent. These simple policies define user's browsing
requirements and are based on security goals of user or organization. These policies are then implemented by writing chrome extension using webrequest API. This chrome extension monitors the HTTP requests originating from web browser and HTTP responses
received from web server. The extension matches the requests and responses against the policies defined by the user. Based on the policy defined by the user, then it decides whether to permit the resource or deny the access to that web resource.

How to use:

go to extension in chrome

select developer options

click on load extensions

select complete folder

Once plugin loaded, go to options to select your security settings


