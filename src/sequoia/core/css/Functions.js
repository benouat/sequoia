(function() {

  var Color;

  var __init_number = function() {
      var number = function(n) {
          if (aria.utils.Type.isNumber(n)) {
            return n;
          } else {
            throw {
              error: "RuntimeError",
              message: "Color functions take numbers as parameters"
            };
          }
          };

      var clamp = function(val) {
          return Math.min(1, Math.max(0, val));
          };

      return Aria.classDefinition({
        $classpath: 'sequoia.core.css.Functions',
        $singleton: true,
        $dependencies: ['sequoia.core.css.Color'],
        $prototype: {
          api: ['color', 'rgb', 'rgba', 'hsl', 'hsla', 'hue', 'saturation', 'lightness', 'red', 'blue', 'green', 'alpha', 'opacify', 'transparentize',  'luma', 'saturate', 'desaturate', 'greyscale', 'lighten', 'darken', 'fadein', 'fadeout', 'fade', 'spin', 'multiply', 'screen', 'overlay', 'softlight', 'hardlight', 'difference', 'exclusion', 'average', 'negation'],
          color: function(rgb, a) {
            return new Color(rgb, a);
          },
          rgb: function(r, g, b) {
            return this.rgba(r, g, b, 1.0);
          },

          rgba: function(r, g, b, a) {
            var n = number,
                rgb = [n(r), n(g), n(b)],
                a = n(a);
            return new Color(rgb, a);
          },

          hsl: function(h, s, l) {
            return this.hsla(h, s, l, 1.0);
          },

          hsla: function(h, s, l, a) {
            h = (number(h) % 360) / 360;
            s = number(s);
            l = number(l);
            a = number(a);

            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            var m1 = l * 2 - m2;

            return this.rgba(hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255, a);

            function hue(h) {
              h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
              if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
              else if (h * 2 < 1) return m2;
              else if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
              else return m1;
            }
          },
          hue: function(color) {
            return Math.round(color.toHSL().h);
          },

          saturation: function(color) {
            // TODO: Should be a Dimension object (value, unit)
            return Math.round(color.toHSL().s * 100);
          },

          lightness: function(color) {
            // TODO: Should be a Dimension object (value, unit)
            return Math.round(color.toHSL().l * 100);
          },

          red: function(color) {
            return color.toRGB().r;
          },

          blue: function(color) {
            return color.toRGB().b;
          },

          green: function(color) {
            return color.toRGB().g;
          },

          alpha: function(color) {
            return color.toHSL().a;
          },

          opacify: function(color, amount) {
            amount = (amount > 1) ? amount / 100 : amount;
            return this.rgba(this.red(color), this.green(color), this.blue(color), clamp(color.toHSL().a + amount));
          },

          transparentize: function(color, amount) {
            amount = (amount > 1) ? amount / 100 : amount;
            return this.rgba(this.red(color), this.green(color), this.blue(color), clamp(color.toHSL().a - amount));
          },

          luma: function(color) {
            return Math.round((0.2126 * (color.toRGB().r / 255) + 0.7152 * (color.toRGB().g / 255) + 0.0722 * (color.toRGB().b / 255)) * color.alpha * 100);
          },

          saturate: function(color, amount) {
            var hsl = color.toHSL();
            hsl.s += amount / 100;
            hsl.s = clamp(hsl.s);
            return this.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
          },

          desaturate: function(color, amount) {
            var hsl = color.toHSL();
            hsl.s -= amount / 100;
            hsl.s = clamp(hsl.s);
            return this.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
          },

          greyscale: function(color) {
            return this.desaturate(color, 100);
          },

          lighten: function(color, amount) {
            var hsl = color.toHSL();
            hsl.l += amount / 100;
            hsl.l = clamp(hsl.l);
            return this.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
          },
          darken: function(color, amount) {
            var hsl = color.toHSL();
            hsl.l -= amount / 100;
            hsl.l = clamp(hsl.l);
            return this.hsla(hsl.h, hsl.s, hsl.l, hsl.a);

          },
          fadein: function(color, amount) { this.$logWarn("%1 not yet implemented", ["fadeIn"]); return color; },
          fadeout: function(color, amount) { this.$logWarn("%1 not yet implemented", ["fadeout"]); return color; },
          fade: function(color, amount) { this.$logWarn("%1 not yet implemented", ["fade"]); return color; },
          spin: function(color, amount) { this.$logWarn("%1 not yet implemented", ["spin"]); return color; },

          /* Blending Methods */
          multiply: function(color1, color2) {
            var r = color.toRGB().r * color2.toRGB().r / 255;
            var g = color.toRGB().g * color2.toRGB().g / 255;
            var b = color.toRGB().b * color2.toRGB().b / 255;
            return this.rgb(r, g, b);
          },

          screen: function(color1, color2) {
            var r = 255 - (255 - color1.toRGB().r) * (255 - color2.toRGB().r) / 255;
            var g = 255 - (255 - color1.toRGB().g) * (255 - color2.toRGB().g) / 255;
            var b = 255 - (255 - color1.toRGB().b) * (255 - color2.toRGB().b) / 255;
            return this.rgb(r, g, b);
          },

          overlay: function(color1, color2) {
            var r = color1.toRGB().r < 128 ? 2 * color1.toRGB().r * color2.toRGB().r / 255 : 255 - 2 * (255 - color1.toRGB().r) * (255 - color2.toRGB().r) / 255;
            var g = color1.toRGB().g < 128 ? 2 * color1.toRGB().g * color2.toRGB().g / 255 : 255 - 2 * (255 - color1.toRGB().g) * (255 - color2.toRGB().g) / 255;
            var b = color1.toRGB().b < 128 ? 2 * color1.toRGB().b * color2.toRGB().b / 255 : 255 - 2 * (255 - color1.toRGB().b) * (255 - color2.toRGB().b) / 255;
            return this.rgb(r, g, b);
          },

          softlight: function(color1, color2) {
            var t = color2.toRGB().r * color1.toRGB().r / 255;
            var r = t + color1.toRGB().r * (255 - (255 - color1.toRGB().r) * (255 - color2.toRGB().r) / 255 - t) / 255;
            t = color2.toRGB().g * color1.toRGB().g / 255;
            var g = t + color1.toRGB().g * (255 - (255 - color1.toRGB().g) * (255 - color2.toRGB().g) / 255 - t) / 255;
            t = color2.toRGB().b * color1.toRGB().b / 255;
            var b = t + color1.toRGB().b * (255 - (255 - color1.toRGB().b) * (255 - color2.toRGB().b) / 255 - t) / 255;
            return this.rgb(r, g, b);
          },

          hardlight: function(color1, color2) {
            var r = color2.toRGB().r < 128 ? 2 * color2.toRGB().r * color1.toRGB().r / 255 : 255 - 2 * (255 - color2.toRGB().r) * (255 - color1.toRGB().r) / 255;
            var g = color2.toRGB().g < 128 ? 2 * color2.toRGB().g * color1.toRGB().g / 255 : 255 - 2 * (255 - color2.toRGB().g) * (255 - color1.toRGB().g) / 255;
            var b = color2.toRGB().b < 128 ? 2 * color2.toRGB().b * color1.toRGB().b / 255 : 255 - 2 * (255 - color2.toRGB().b) * (255 - color1.toRGB().b) / 255;
            return this.rgb(r, g, b);
          },

          difference: function(color1, color2) {
            var r = Math.abs(color1.toRGB().r - color2.toRGB().r);
            var g = Math.abs(color1.toRGB().g - color2.toRGB().g);
            var b = Math.abs(color1.toRGB().b - color2.toRGB().b);
            return this.rgb(r, g, b);
          },
          exclusion: function(color1, color2) {
            var r = color1.toRGB().r + color2.toRGB().r * (255 - color1.toRGB().r - color1.toRGB().r) / 255;
            var g = color1.toRGB().g + color2.toRGB().g * (255 - color1.toRGB().g - color1.toRGB().g) / 255;
            var b = color1.toRGB().b + color2.toRGB().b * (255 - color1.toRGB().b - color1.toRGB().b) / 255;
            return this.rgb(r, g, b);
          },
          average: function(color1, color2) {
            var r = (color1.toRGB().r + color2.toRGB().r) / 2;
            var g = (color1.toRGB().g + color2.toRGB().g) / 2;
            var b = (color1.toRGB().b + color2.toRGB().b) / 2;
            return this.rgb(r, g, b);
          },
          negation: function(color1, color2) {
            var r = 255 - Math.abs(255 - color2.toRGB().r - color1.toRGB().r);
            var g = 255 - Math.abs(255 - color2.toRGB().g - color1.toRGB().g);
            var b = 255 - Math.abs(255 - color2.toRGB().b - color1.toRGB().b);
            return this.rgb(r, g, b);
          }


        },
        $onload: function() {
          Color = sequoia.core.css.Color;
        },
        $onunload: function() {
          Color = null;
        }
      });

      };

  if (!aria.utils.Type) {
    Aria.load({
      classes: ['aria.utils.Type'],
      oncomplete: __init_number
    });
  } else {
    __init_number();
  }

})();