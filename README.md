# ma

[![Build Status](https://img.shields.io/travis/opensoars/ma.svg?style=flat)](https://travis-ci.org/opensoars/ma)
[![Coverage Status](https://img.shields.io/coveralls/opensoars/ma.svg?style=flat)](https://coveralls.io/r/opensoars/ma)
[![Dependency Status](https://david-dm.org/opensoars/ma.svg?style=flat)](https://david-dm.org/opensoars/ma)
[![Development Dependency Status](https://david-dm.org/opensoars/ma/dev-status.svg?style=flat)](https://david-dm.org/opensoars/ma#info=devDependencies&view=table)


Makes it simple to create a table of contents section with anchor links to header anchors in documentation content.


---


## Install

`npm install ma -g` or clone source.

## Use

Ma assumes you use a correct indentation style. No tab characters and two or four spaces for each level of indentation.

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

---

## Todo

* Test `processFile`
* Save to new file, using cli
* Process an already processed file


---

## Example

Input:

```md
# Lorem ipsum

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

## Table of contents

<!--- TABLE_OF_CONTENTS -->
* Lorem
  * Amet
    * Elit
* Ipsum
  * laborum
  * Mollit
* Dolor
<!--- /TABLE_OF_CONTENTS -->

---

<!--- CONTENT -->
<!--- /CONTENT -->

---

## Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.
```

Output:

```md
# Lorem ipsum

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

## Table of contents

<!--- TABLE_OF_CONTENTS -->

* [**Lorem**](#lorem)
  * [Amet](#amet)
    * [Elit](#elit)
* [**Ipsum**](#ipsum)
  * [laborum](#laborum)
  * [Mollit](#mollit)
* [**Dolor**](#dolor)

<!--- /TABLE_OF_CONTENTS -->

---

<!--- CONTENT -->

## Lorem
### Amet
#### Elit

---

## Ipsum
### laborum
### Mollit

---

## Dolor

<!--- /CONTENT -->

---

## Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.
```

Which looks like [this](https://github.com/opensoars/ma/blob/master/doc/example_result.md).