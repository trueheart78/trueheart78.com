class Purchase {
  name;
  system;
  status;
  releaseDate;
  reason;
  url;
  hours = 0;
  gamepass = false;
  notes = [];

  constructor(purchase) {
    this.name = purchase.name;
    this.system = purchase.system.toUpperCase();
    this.status = purchase.status.toLowerCase();
    if (purchase.hasOwnProperty("hours")) {
      this.hours = purchase.hours;
    }
    if (purchase.hasOwnProperty("gamepass")) {
      this.gamepass = purchase.gamepass;
    }
    if (purchase.hasOwnProperty("notes")) {
      this.notes = purchase.notes;
    }
    if (purchase.hasOwnProperty("release_date")) {
      this.releaseDate = purchase.release_date;
    }
    if (purchase.hasOwnProperty("reason")) {
      this.reason = purchase.reason;
    }
    if (purchase.hasOwnProperty("url")) {
      this.url = purchase.url;
    }
  }
  get hasHours() {
    return (this.hours > 0);
  }
  get hasNotes() {
    return (this.notes.length > 0);
  }
  get hasUrl() {
    return (this.url != undefined && this.url.length > 0);
  }
  get hasReleaseDate() {
    return (this.releaseDate != undefined);
  }
  get isWaiting() {
    return (this.status == "waiting");
  }
  get complete() {
    return this.completed;
  }
  get completed() {
    return (["downloded", "purchased", "skipped"].includes(this.status));
  }
  get incomplete() {
    return !(this.completed);
  }
}
