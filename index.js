"use strict";

module.exports = function (tasks) {

    // adds the old syntax -webkit-gradient
    tasks.addTask({
        forBrowsersLowerThan: {
            chrome: 10.0,
            safari: 5.1,
            android: 4.0
        },
        filter: 'Declaration',
        fn: function (declaration) {
            if (declaration.has({
                type: 'Function',
                vendor: false,
                name: 'linear-gradient'
            })) {
                declaration
                    .cloneBefore()
                    .walk({
                        type: 'Function',
                        name: 'linear-gradient'
                    },
                    function (fn) {
                        var args = fn.toArray();
                        var newArgs = ['linear'];

                        //Calculate the gradient direction
                        var point = 'top';

                        if (/(top|bottom|left|right|deg)/.test(args[0])) {
                            point = args.shift();
                        }

                        switch (point) {
                            case 'to bottom':
                            case 'top':
                                newArgs.push('left top', 'left bottom');
                                break;

                            case 'to top':
                            case 'bottom':
                                newArgs.push('left bottom', 'left top');
                                break;

                            case 'to right':
                            case 'left':
                                newArgs.push('left top', 'right top');
                                break;

                            case 'to left':
                            case 'right':
                                newArgs.push('right top', 'left top');
                                break;

                            default:
                                if (/^\ddeg$/.test(point)) {
                                    newArgs.push(parseInt(point, 10) + 'deg');
                                } else {
                                    newArgs.push('left top', 'left bottom');
                                }
                        }

                        //Gradient colors and color stops
                        var total = args.length - 1;

                        args.forEach(function (param, i) {
                            var text;

                            if (i === 0) {
                                text = 'from';
                            } else if (i === total) {
                                text = 'to';
                            } else {
                                text = 'color-stop';
                            }

                            newArgs.push(text + '(' + param + ')');
                        });

                        //Apply the changes
                        fn.replaceWithCode('-webkit-gradient(' + newArgs.join(',') + ')', 'Function');
                    });
            }
        }
    });
};
