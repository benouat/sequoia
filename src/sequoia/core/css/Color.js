(function() {

    var uType, uArray, uString, htmlColors;

    Aria.classDefinition({
        $classpath: 'sequoia.core.css.Color',
        $dependencies: ['aria.utils.Type', 'aria.utils.Array', 'aria.utils.String', 'sequoia.core.css.Html4Colors'],
        $constructor: function(rgb, alpha) {
            if (uType.isArray(rgb)) {
                this.rgb = rgb;
            } else if (rgb.length == 6) {
                this.rgb = rgb.match(/.{2}/g).map(function(c) {
                    return parseInt(c, 16);
                });
            } else {
                this.rgb = rgb.split('').map(function(c) {
                    return parseInt(c + c, 16);
                });
            }
            this.alpha = typeof(alpha) === 'number' ? alpha : 1.0;

        },
        $prototype: {

            toRGB: function() {
                return {
                    r: Math.round(this.rgb[0]),
                    g: Math.round(this.rgb[1]),
                    b: Math.round(this.rgb[2])
                };
            },

            toHSL: function() {
                var r = this.rgb[0] / 255,
                    g = this.rgb[1] / 255,
                    b = this.rgb[2] / 255,
                    a = this.alpha;

                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2,
                    d = max - min;

                if (max === min) {
                    h = s = 0;
                } else {
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                    switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    }
                    h /= 6;
                }
                return {
                    h: h * 360,
                    s: s,
                    l: l,
                    a: a
                };
            },
            toARGB: function() {
                var argb = [Math.round(this.alpha * 255)].concat(this.rgb);
                return '#' + argb.map(function(i) {
                    i = Math.round(i);
                    i = (i > 255 ? 255 : (i < 0 ? 0 : i)).toString(16);
                    return i.length === 1 ? '0' + i : i;
                }).join('');
            },
            compare: function(x) {
                if (!x.rgb) {
                    return -1;
                }

                return (x.rgb[0] === this.rgb[0] && x.rgb[1] === this.rgb[1] && x.rgb[2] === this.rgb[2] && x.alpha === this.alpha) ? 0 : -1;
            },

            __rgba_str: function() {
                var split = ", ";
                this.rgb = this.rgb.map(function(c) {
                    return Math.round(c);
                });
                return "rgba(" + this.rgb.join(split) + split + this.alpha + ")";
            },
            __smallest_str: function() {
                var small_hex_str = this.__hex_str().replace(/^#(.)\1(.)\2(.)\3$/g, "#$1$2$3");
                var color = htmlColors.HTML4_COLORS_REVERSE[this.rgb];
                return (color && color.length <= small_hex_str.length) ? color : small_hex_str;
            },
            __hex_str: function(small) {
                var hex = "#";
                uArray.forEach(this.rgb, function(k) {
                    k = Math.round(k);
                    hex += uString.pad(k.toString(16), 2, "0", "left"=="left");
                }, this);
                return small ? hex.replace(/^#(.)\1(.)\2(.)\3$/g, "#$1$2$3") : hex;
            },

            toString: function() {
                if (this.alpha < 1.0) {
                    return this.__rgba_str();
                } else if (htmlColors.HTML4_COLORS_REVERSE[this.rgb]) {
                    return this.__smallest_str();
                }
                return this.__hex_str("small" == "small");
            }
        },
        $onload: function() {
            uType = aria.utils.Type;
            uArray = aria.utils.Array;
            uString = aria.utils.String;
            htmlColors = sequoia.core.css.Html4Colors;
        },
        $onunload: function() {
            htmlColors = uType = uArray = uString = null;
        }
    });

})();