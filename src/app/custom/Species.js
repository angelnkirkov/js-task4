import { EventEmitter } from 'eventemitter3';

class Species extends EventEmitter {
  constructor() {
    super();
    this.name = null;
    this.classification = null;
  }

  static get events() {
    return { SPECIES_CREATED: 'species_created' };
  }

  async init(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.name && data.classification) {
        this.name = data.name;
        this.classification = data.classification;
        console.log(`Name : ${this.name} | Classification : ${this.classification}`);
        this.emit(Species.events.SPECIES_CREATED);
      }
    } catch (e) {
      console.error(`Error while fetching data from the URL : ${url}`);
      throw new Error(e);
    }
  }
}

export { Species };
