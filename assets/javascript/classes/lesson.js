class Lesson {
  learned;
  added;
  notes = [];
  examples = [];

  constructor(lesson) {
    this.learned = lesson.learned;
    this.added = lesson.added;
    if (lesson.hasOwnProperty("notes")) {
      this.notes = lesson.notes;
    }
    if (lesson.hasOwnProperty("examples")) {
      this.examples = lesson.examples;
    }
  }
  get hasNotes() {
    return (this.notes.length > 0);
  }
  get hasExamples() {
    return (this.examples.length > 0);
  }
}
