Aria.beanDefinitions({
  $package: 'sequoia.widgets.CfgBeans',
  $description: 'Base configuration defintion for all Sequoia widgets',
  $namespaces: {
    "base": "aria.html.beans.ElementCfg",
    'core': 'aria.core.CfgBeans',
    'json': 'aria.core.JsonTypes',
    'common': 'aria.widgetLibs.CommonBeans',
    'template': 'aria.templates.CfgBeans'
  },
  $beans: {

    "AffixCfg": {
      $type: "json:Object",
      $description: "Activates the sticky position fixed behaviour",
      $properties: {
        "offset": {
          $type: "json:Integer",
          $description: "The offset specified in pixel",
          $default: 0
        },
        "type": {
          $type: "json:Enum",
          $enumValues: ["top", "bottom"],
          $description: "Specifies where the widget should be attached (top or bottom)",
          $default: "top"
        }
      }
    },

    "InputCfg": {
      $type: "base:Properties",
      $description: "Properties of an Input widget.",
      $properties: {
        "bind": {
          $type: "base:Properties.$properties.bind",
          $properties: {
            "value": {
              $type: "common:BindingRef",
              $description: "Bi-directional binding. The input's value is set in the bound object on blur."
            }
          }
        },
        "on": {
          $type: "base:Properties.$properties.on",
          $properties: {
            "type": {
              $type: "common:Callback",
              $description: "Callback called when the user types inside the input. It corresponds to a keydown."
            }
          }
        }
      }
    },
    "TextareaCfg": {
      $type: "InputCfg",
      $description: "Properties of a Textarea widget.",
      $properties: {

      }
    },
    "NavCfg": {
      $type: "base:Properties",
      $description: "Properties of a Nav widget.",
      $properties: {
        "affix": {
          $type: "AffixCfg",
          $description: "Wether or not the widget should have a sticky behaviour when the page is scrolled"
        },
        "active": {
          $type: "json:Integer",
          $description: "The index of the active child item",
          $default: null
        },
        "bind": {
          $type: "base:Properties.$properties.bind",
          $properties: {
            "active": {
              $type: "common:BindingRef",
              $description: "Bi-directional binding for the index of the active child item"
            }
          }
        },
        "type": {
          $type: "json:Enum",
          $enumValues : ["tabs", "pills", "list"],
          $description: "Specifies the type of nav",
          $default: "list"
        },
        "stacked": {
          $type: "json:Boolean",
          $default: false,
          $description: "Activated the stacked layout"
        }
      }
    },
    "NavbarCfg": {
      $type: "base:Properties",
      $description: "Navbar are static (not fixed to the top or bottom). They include support for a project name and basic navigation",
      $properties: {
        "active": {
          $type: "json:Integer",
          $description: "The index of the active child item",
          $default: null
        },
        "bind": {
          $type: "base:Properties.$properties.bind",
          $properties: {
            "active": {
              $type: "common:BindingRef",
              $description: "Bi-directional binding for the index of the active child item"
            }
          }
        },
        "brand": {
          $type: "json:Object",
          $description: "Information relative to your brand"
        },
        "type": {
          $type: "json:Enum",
          $enumValues : ["std", "inverted"],
          $description: "Specifies the type of navbar",
          $default: "std"
        }
      }
    },
    "DropdownCfg": {
      $type: "base:Properties",
      $description: "Toggleable, contextual menu for displaying lists of links"
    }
  }
});