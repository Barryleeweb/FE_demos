# requireJS
RequireJS is a JavaScript file and module loader.Using a modular script loader like RequireJS will improve the speed and quality of your code.when learnt the requireJS,I wrote the demo using requireJS's idea.

The demo contains one html which is requireJS.html and four javascript's files.

In requireJS.html,using a data-main script to set configuration options and then load the first application module.
Note:the script tag require.js generates for your data-main module includes the async attribute. 

In these js's files,main.js、monkey.js、require.js are more important:

1、precondition：require.js;

2、main.js include 'require.config' which unified management about the requireJS and 'require' which is executed;

3、monkey.js using 'define' to define a module.


