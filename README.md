#ma

Makes it simple to create a table of contents section with links to header anchors in the content.

---

## Install

`npm install ma -g`

## Use

Define the location of your table of contents by placing it between these two comments: 

1. `<!--- TABLE_OF_CONTENTS -->`
2. `<!--- /TABLE_OF_CONTENTS -->`.

Define the location of your content by placing it between these two comments: 

1. `<!--- CONTENT -->`
2. `<!--- /CONTENT -->`

If the content is empty, it will automaticly place headers. When a section of your documentation has a sub section, it will automaticly give it a smaller font size. This font-sizing happens recursively up to `h6` headers.

After that, run `ma myMarkdownFile.md` from your command line.

If you run ma without specifying a file, it will automaticly try to find files with the `.md` and `.markdown` file extension.