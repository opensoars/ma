#ma

Makes it simple to create a table of contents section with links to header anchors.

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

After that, run `ma myMarkdownFile.md`.

If you try run ma without specifying a file, it will automaticly try to find the following files: 

* `README.md`
* `readme.md`
* `README.markdown`
* `readme.markdown`