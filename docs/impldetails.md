# Implementation details

## Linking images to flashcards

When displaying flashcard thumbnails, consider the following:

```json
[
    {
        "front": {"content": null, "thumbnail": true},
        "back": {"content": "Moly holy", "thumbnail": false}
    },
    {
        "front": {"content": "ILNY", "thumbnail": false},
        "back": {"content": "I Love New York", "thumbnail": false}
    },
    {
        "front": {"content": null, "thumbnail": true},
        "back": {"content": "de ochtend", "thumbnail": false}
    }
]
```
```javascript
// Pseudo (ish) code. JavaScript.
let thumbnailLocations = [
    content[0].front,
    content[2].front
];
thumbnailLocations.forEach(item, index) => {
    return console.log(`
        Content: ${item.content}\n
        Thumbnail path: (.frislet root)images/${index + 1}.png
    `);
}
```

## Gamemodes

Although pseudocode for different gamemodes will not be written down
here, it is theoretically possible to do things other than flashcards
with this data, such as a "quiz" mode. One could construct a
multiple-choice quiz from the fronts of flashcards and the back of
multiple.
