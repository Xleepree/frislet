# Specification for ".frislet" files

## 1: Overview

A .frislet file must have a structure according to the following diagram
and list:

```
├─ images/            (folder, mandatory)
│   ├─ thumbnail.png  (PNG image, mandatory if there is a thumbnail)
│   └─ 1.png          (PNG image, example. continues infinitely)
├─ content.json       (JSON file, mandatory)
└─ manifest.json      (JSON file, mandatory)
```

- "images" directory: Contains .png files.  
If `"thumbnail"` in "manifest.json" is value `true`, "images/thumbnail.png" must
exist.  
If `"thumbnail"` is value `true` for the front or back of any flashcard
in content.json, a numbered ".png" (example: "1.png") must exist and so forth infinitely, in the same order as the fronts and backs of flashcards in content.json with the value `true` for `"thumbnail"`.
- "content.json" file: JSON file.
- "manifest.json" file: JSON file.

## 2: "images"

In the "images" directory are .png files.

> In the event the images you wish to place in the "images" directory are
> not of type ".png," you may perform a simple file extension renaming
> instead of a conversion.

## 3: "content.json"

JSON file that conforms to: 
[content.schema.json](../schemas/content.schema.json)

## 4: "manifest.json"

JSON file that conforms to:
[manifest.schema.json](../schemas/manifest.schema.json)

## 5: Compression

To finish a .frislet file from these components, they must be compressed
into a ".zip" and then renamed to be of pattern `\\.frislet$`.  

> The components of a ".frislet" file must be at its root.  
> The following is **incorrect:**
> ```
> ├─ Figure.frislet
> │   └─ Figure/...
> ```