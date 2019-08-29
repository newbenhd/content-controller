# nepage
chrome extension

## Notes
 - Chrome extension program runs in client; therefore, can't run server side code
 - A content script has access to the current page, but is limited in the APIs it can access. For example, it cannot listen for clicks on the browser action. We need to add a different type of script to our extension, a background script, which has access to every Chrome API but cannot access the current page. 
 
## Source
    - https://thoughtbot.com/blog/how-to-make-a-chrome-extension
    - https://www.youtube.com/watch?v=bmxr75CV36A