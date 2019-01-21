---
layout: post
title: Handling .NET Core Web API Exceptions with an Aurelia Interceptor
image: img/testimg-cover.jpg
author: Jonathan Eckman
date: 2018-01-14T07:03:47.149Z
tags: [".NET Core", "Aurelia"]
draft: false
---

## Problem: Failed to Fetch
In my teams Aurelia app, I wanted an easy way to handle all HTTP response errors coming from our .NET Core Web API. This is easily done with the `requestError` method on Aurelia's [Interceptor](http://aurelia.io/docs/api/fetch-client/interface/Interceptor) interface. This method acts as a Promise reject handler so when working properly, I'd expect to recieve the failed Response as an argument. Instead, a [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) was thrown with the message "Failed to fetch". 

![TypeError: Failed to fetch](/img/failed-to-fetch.png)

## Aurelia Interceptor
The problem was not with Aurelia nor the underlying fetch library. Both were doing their jobs given the configuration I provided. The final `responseError` code simply receives the failed response, does something with the payload, then rejects the promise. The `ServerError` interface shown in the example below provides typings for our custom error payload. You will see where this object is created in a moment.

```js
responseError(response: any): Promise<Response> {
    if (response instanceof Response) {
        return response.json().then((serverError: ServerError) => {
        
            // Do something with the error here.
            
            return Promise.reject<Response>(serverError.error);
        }); 
    }
}
```

## .NET Core Exception Handling Middleware
I already knew something was failing in our API code. On the client, I was receiving a 500 error with a message indicating a CORS problem. 

> No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://localhost:44303' is therefore not allowed access. The response had HTTP status code 500. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

There was a problem, but the CORS error is misleading. Checking the server logs, I found that the real problem was an unhandled SQL exception. In `Startup.cs`, my API was configured to handle errors with the [UseDeveloperExceptionPage](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling#the-developer-exception-page) middleware:

```
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
}
```

I suspected the root cause had to do with this middleware. Searching around, I found a [discussion on GitHub](https://github.com/aspnet/Diagnostics/issues/247) that proved it. This middleware strips everything it can from the response headers which causes the CORS and "Failed to fetch" errors. 

My solution was to add my own error handling middleware to the API called `ErrorHandlingMiddleware`.

```
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var code = HttpStatusCode.InternalServerError;

        var result = JsonConvert.SerializeObject(new { 
             error = "An internal server error has occurred." 
        });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;
        return context.Response.WriteAsync(result);
    }
}
```

I then registered that middleware in the `Configure` method of `Startup.cs`.

```
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseStaticFiles();
app.UseMvc();
```

After this change, `responseError` received the response with everything I needed to know how to handle it, such as a status code and error message. 

![Response object](/img/failed-to-fetch-resolved.png)

