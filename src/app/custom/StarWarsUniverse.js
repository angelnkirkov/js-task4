import { EventEmitter } from 'eventemitter3';
import { Species } from './Species';

class StarWarsUniverse extends EventEmitter {
  constructor(maxSpecies = 10) {
    super();
    this.species = [];
    this._maxSpecies = maxSpecies;
    this.id = 1;
  }

  static get events() {
    return { MAX_SPECIES_REACHED: 'max_species_reached', SPECIES_CREATED: 'species_created' };
  }

  get speciesCount() {
    return this.species.length;
  }

  async _onSpeciesCreated(species) {
    this.species.push(species);
    console.log(this.species);
    this.emit(StarWarsUniverse.events.SPECIES_CREATED, { speciesCount: this.species.length });

    if (this.species.length === this._maxSpecies) {
      this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
    } else {
      await this.createSpecies(`https://swapi.boom.dev/api/species/${++this.id}`);
    }
  }

  async createSpecies(url = `https://swapi.boom.dev/api/species/${this.id}`) {
    console.log(`Creating species from the URL : ${url}`);
    const species = new Species();

    species.addListener(StarWarsUniverse.events.SPECIES_CREATED, this._onSpeciesCreated.bind(this, species));
    await species.init(url);
  }
}

export { StarWarsUniverse };
