#ma

Makes it simple to create a table of contents section with links to header anchors in documentation content.

---

## Install

`npm install ma -g`

## Use

Define the location of your table of contents by placing it between these two comments: 

1. `<!--- TABLE_OF_CONTENTS -->`
2. `<!--- /TABLE_OF_CONTENTS -->`.

Define the location of (where to place) your content by placing (it between) these two comments: 

1. `<!--- CONTENT -->`
2. `<!--- /CONTENT -->`

After that, run `ma myMarkdownFile.md` from your command line.

If you run ma without specifying a file, it will automaticly try to find files with the `.md` or `.markdown` file extension.

#### Auto content
If the content is empty, it will automaticly place headers. When a section of your documentation has a sub section, it will automaticly give it a smaller font size. This font-sizing happens recursively up to `h6` headers. It is actualy recommended to just specify an empty content section. So ma can create headers for you.

#### Limitations
There is one limitation regarding the naming of sections and sub sections, they have to be unique! Otherwise both Github and ma wouldn't know which content header to match table of contents links with. This is not a ma limitation only. When you write your own markdown documentation, it is also required to use unique names.