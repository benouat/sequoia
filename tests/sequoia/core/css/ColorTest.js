Aria.classDefinition({
    $classpath: "tests.sequoia.core.css.ColorTest",

    $extends: "aria.jsunit.TestCase",

    $dependencies: ["sequoia.core.css.Color"],

    $prototype: {

        testHexConstructor: function() {
            var black = new sequoia.core.css.Color("000000");
            this.assertEquals("#000", black.toString(), "The short hexadecimal representation of #000000 color should be #000");
            black.$dispose();
        },

        testRGBConstructor: function() {
            var black = new sequoia.core.css.Color([0, 0, 0]);

            this.assertEquals("#000", black.toString(), "The short hexadecimal representation of rgb(0, 0, 0) color should be #000");
            black.$dispose();
        }

    }

});