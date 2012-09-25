{Template {
  $classpath: 'Test'
}}

  {macro main()}
    <h1>Sequoia Test Page</h1>

    <div>
      {@sequoia:Input {
        attributes: {
          placeholder: "Pouet Input"
        },
        bind: {
          value: { inside: data, to: "input" }
        }
      }/}
      {section {
        id: "input",
        bindRefreshTo: [ { inside: data, to: "input" } ],
        macro: {
          name: "display",
          args: ["input"]
        }
      }/}
    </div>


    <div>
      {@sequoia:Textarea {
        attributes: {
          placeholder: "Pouet Textarea"
        },
        bind: {
          value: { inside: data, to: "textarea" }
        }
      }}{/@sequoia:Textarea}
      {section {
        id: "textarea",
        type: "pre",
        bindRefreshTo: [ { inside: data, to: "textarea" } ],
        macro: {
          name: "display",
          args: ["textarea"]
        }
      }/}
    </div>


  {/macro}

  {macro display(node)}
    ${data[node]}
  {/macro}

  {macro createNode(index, color)}
    <div class="square ${color}${index}"></div>
  {/macro}

{/Template}