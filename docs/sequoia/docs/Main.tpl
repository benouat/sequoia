{Template {
  $classpath: 'sequoia.docs.Main',
  $css: ['sequoia.docs.styles.Doc']
}}

  {macro main()}

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a href="/" class="brand">Sequoia</a>
          <ul class="nav nav-pills">
            <li class="active">
              <a href="./documentation.html">Home</a>
            </li>
            <li>
              <a href="./documentation.html">Base</a>
            </li>
            <li>
              <a href="./documentation.html">Components</a>
            </li>
            <li>
              <a href="./documentation.html">Customize</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <header>
      <div class="container">
        <img src="/sequoia/docs/images/logo.png" class="pull-right"/>
        <h1>Sequoia</h1>
        <p class="lead">Html, CssTemplate and Javascript toolkit for AriaTemplates</p>
      </div>
    </header>
    <section id="main" class="container">
      <div class="row">
        <div class="sidebar">
          {@sequoia:Nav {
            type: "list",
            attributes: {
              classList: ['doc-menu']
            }
          }}
            <li><a href="#"><i class="icon-chevron-right"></i> Pouet</a></li>
            <li><a href="#"><i class="icon-chevron-right"></i> Download Pouet</a></li>
            <li><a href="#"><i class="icon-chevron-right"></i> What's Pouet</a></li>
            <li><a href="#"><i class="icon-chevron-right"></i> HTML Pouet</a></li>
            <li><a href="#"><i class="icon-chevron-right"></i> Examples</a></li>
            <li><a href="#"><i class="icon-chevron-right"></i> What next?</a></li>
          {/@sequoia:Nav}
        </div>
        <div class="content">
          <section id="pouet">
            <div class="page-header">
              <h1>Pouet</h1>
            </div>
            <h3>This is a subheader</h3>
            <p>Some content should be appended here</p>
            <p>{@sequoia:Nav {
                  type: "pills",
                  bind: {
                    active: { inside: data, to: "active" }
                  },
                  on: {
                    'click': {
                      fn: function(event) {
                        event.preventDefault(true);
                      }
                    }
                  }
                }}
                <li><a href="#">Test 1</a></li>
                <li><a href="#">Test 2</a></li>
                <li><a href="#">Test 3</a></li>
                <li><a href="#">Test 4</a></li>
                <li><a href="#">Test 5</a></li>
                {/@sequoia:Nav}</p>
            <p>{@sequoia:Nav {
                  bind: {
                    active: { inside: data, to: "active" }
                  },
                  on: {
                    'click': {
                      fn: function(event) {
                        event.preventDefault(true);
                      }
                    }
                  }
                }}
                <li><a href="#">Test 1</a></li>
                <li><a href="#">Test 2</a></li>
                <li><a href="#">Test 3</a></li>
                <li><a href="#">Test 4</a></li>
                <li><a href="#">Test 5</a></li>
                {/@sequoia:Nav}</p>
          </section>
          <section id="a-table">
            <div class="page-header">
              <h1>A Table</h1>
            </div>
            <h3>This is a subheader</h3>
            <p>Some content should be appended here</p>
              {@sequoia:Dropdown {
              }}
                <li><a tabindex="-1" href="#">Action</a></li>
                <li class="disabled"><a tabindex="-1" href="#">Another action</a></li>
                <li><a tabindex="-1" href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-submenu">
                  <a tabindex="-1" href="#">More Action</a>
                  {@sequoia:Dropdown {
                    submenu: true
                  }}
                    <li><a tabindex="-1" href="#">Action</a></li>
                    <li><a tabindex="-1" href="#">Another action</a></li>
                    <li class="divider"></li>
                    <li class="dropdown-submenu">
                      <a tabindex="-1" href="#">More Action</a>
                      {@sequoia:Dropdown {
                        submenu: true
                      }}
                        <li><a tabindex="-1" href="#">Action</a></li>
                        <li><a tabindex="-1" href="#">Another action</a></li>
                        <li><a tabindex="-1" href="#">Something else here</a></li>
                      {/@sequoia:Dropdown}
                    </li>
                    <li class="divider"></li>
                    <li><a tabindex="-1" href="#">Something else here</a></li>
                  {/@sequoia:Dropdown}
                </li>
              {/@sequoia:Dropdown}

          </section>
          <section id="pouetpouet">
            <div class="page-header">
              <h1>Pouet Pouet</h1>
            </div>
            <h3>This is a subheader</h3>
            <p>Some content should be appended here</p>
          </section>
        </div>
      </div>
    </section>
    <footer>
      <div class="container">
        <p class="pull-right">
          <a href="http://ariatemplates.com" class="brand pull-right">\{aria templates\}</a>
        </p>
        <p>Designed and built by <a href="http://github.com/benouat">@benoua</a></p>
        <p>Code licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>.</p>
        <p>Icons from <a href="http://glyphicons.com">Glyphicons Free</a>, licensed under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.</p>
      </div>
    </footer>
  {/macro}
{/Template}