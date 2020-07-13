import * as md from 'markdown-it'
import * as vscode from 'vscode'

export function convertNotebookToHtml(document: vscode.NotebookDocument, content: string): string {

    const html_content = `
<!DOCTYPE html>
<html>
<head>
<style>
#jlmd-source-code {
    display: none;
}
</style>
</head>
<body>
${
        document.cells.map(cell => {
            if (cell.cellKind === vscode.CellKind.Markdown) {
                const as_html = md().render(cell.document.getText())
                return `<div>${as_html}</div>`
            }
            else {
                return `<div><pre class="julia"><code>${cell.document.getText()}</code></pre></div>`
            }
        }).join('\n')
        }
<div id="jlmd-source-code">${Buffer.from(content).toString('base64')}</div>
</body>
</html>
`
    return html_content
}