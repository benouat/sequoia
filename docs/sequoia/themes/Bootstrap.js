Aria.classDefinition({
  $classpath: "sequoia.themes.Bootstrap",
  $dependencies: ['sequoia.core.css.Functions', 'sequoia.core.css.Color'],
  $constructor: function() {
    var c = function(color, alpha) {
        return new sequoia.core.css.Color(color, alpha);
        };
    var f = sequoia.core.css.Functions;

    /* Global values */
    // Greys
    // -------------------------
    this.black = c("000");
    this.grayDarker = c("222");
    this.grayDark = c("333");
    this.gray = c("555");
    this.grayLight = c("999");
    this.grayLighter = c("eee");
    this.white = c("fff");

    // Accent colors
    // -------------------------
    this.blue = c("049cdb");
    this.blueDark = c("0064cd");
    this.green = c("46a546");
    this.red = c("9d261d");
    this.yellow = c("ffc40d");
    this.orange = c("f89406");
    this.pink = c("c3325f");
    this.purple = c("7a43b6");


    // Scaffolding
    // -------------------------
    this.bodyBackground = this.white;
    this.textColor = this.grayDark;

    // Links
    // -------------------------
    this.linkColor = c("92C83E");
    this.linkColorHover = f.darken(this.linkColor, 15);

    // Typography
    // -------------------------
    this.sansFontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    this.serifFontFamily = 'Georgia, "Times New Roman", Times, serif';
    this.monoFontFamily = 'Monaco, Menlo, Consolas, "Courier New", monospace';

    this.baseFontSize = "14px";
    this.baseFontFamily = this.sansFontFamily;
    this.baseLineHeight = "20px";
    this.altFontFamily = this.serifFontFamily;

    // empty to use BS default; @baseFontFamily
    this.headingsFontFamily = "inherit";
    // instead of browser default, bold
    this.headingsFontWeight = "bold";
    // empty to use BS default, @textColor
    this.headingsColor = "inherit";


    // Tables
    // -------------------------
    // overall background-color
    this.tableBackground = "transparent";
    // for striping
    this.tableBackgroundAccent = c("f9f9f9");
    // for hover
    this.tableBackgroundHover = c("f5f5f5");
    // table and cell border
    this.tableBorder = c("ddd");

    // Buttons
    // -------------------------
    this.btnBackground = this.white;
    this.btnBackgroundHighlight = f.darken(this.white, 10);
    this.btnBorder = c("bbb");

    this.btnPrimaryBackground = this.linkColor;
    this.btnPrimaryBackgroundHighlight = f.spin(this.btnPrimaryBackground, 20);

    this.btnInfoBackground = c("5bc0de");
    this.btnInfoBackgroundHighlight = c("2f96b4");

    this.btnSuccessBackground = c("62c462");
    this.btnSuccessBackgroundHighlight = c("51a351");

    this.btnWarningBackground = f.lighten(this.orange, 15);
    this.btnWarningBackgroundHighlight = this.orange;

    this.btnDangerBackground = c("ee5f5b");
    this.btnDangerBackgroundHighlight = c("bd362f");

    this.btnInverseBackground = c("444");
    this.btnInverseBackgroundHighlight = this.grayDarker;

    // Forms
    // -------------------------
    this.inputBackground = this.white;
    this.inputBorder = c("ccc");
    this.inputBorderRadius = "3px";
    this.inputDisabledBackground = this.grayLighter;
    this.formActionsBackground = c("f5f5f5");

    // Dropdowns
    // -------------------------
    this.dropdownBackground = this.white;
    this.dropdownBorder = c("000", 0.2);
    this.dropdownDividerTop = c("e5e5e5");
    this.dropdownDividerBottom = this.white;

    this.dropdownLinkColor = this.grayDark;
    this.dropdownLinkColorHover = this.white;
    this.dropdownLinkColorActive = this.dropdownLinkColor;

    this.dropdownLinkBackgroundActive = this.linkColor;
    this.dropdownLinkBackgroundHover = this.dropdownLinkBackgroundActive;


    // Z-index master list
    // -------------------------
    // Used for a bird's eye view of components dependent on the z-axis
    // Try to avoid customizing these :)
    this.zindexDropdown =          1000;
    this.zindexPopover =           1010;
    this.zindexTooltip =           1030;
    this.zindexFixedNavbar =       1030;
    this.zindexModalBackdrop =     1040;
    this.zindexModal =             1050;

  }
});