console.log('========')
console.log('PARTICLE PHYSICS:');
console.log('========\n')

/**
 * Advanced Fundamental Forces of Nature
 **/

// Enum for particle types
enum ParticleType {
  Quark,
  Lepton,
  Boson
}

// Interface for quantum numbers
interface QuantumNumbers {
  spin: number;
  charge: number;
  color?: 'red' | 'green' | 'blue' | 'none';
  isospin?: number;
}

// Enhanced Particle class
class Particle {
  constructor(
    public name: string,
    public type: ParticleType,
    public mass: number,
    public quantumNumbers: QuantumNumbers,
    public isComposite: boolean = false
  ) {
    console.log(`particle:`);
    console.log(`- name: ${name}`);
    console.log(`- type: ${ParticleType[type]}`);
    console.log(`- mass: ${mass}`);
    console.log(`- quantumNumbers:`);
    console.log(`  - spin: ${quantumNumbers.spin}`);
    console.log(`  - charge: ${quantumNumbers.charge}`);
    console.log(`  - color: ${quantumNumbers.color}`);
    console.log(`  - isospin: ${quantumNumbers.isospin}`);
    console.log(`- isComposite: ${isComposite}\n`);
  }
}

// Interface for all fundamental forces
interface FundamentalForce {
  name: string;
  strength: number;
  range: string;
  description: string;
  mediator?: Particle;
  interact(particle1: Particle, particle2: Particle): void;
}

// Electromagnetic Force
class ElectromagneticForce implements FundamentalForce {
  name = "Electromagnetic Force";
  strength = 1 / 137; // Fine structure constant
  range = "Infinite";
  description = "Acts between electrically charged particles";
  mediator = new Particle("Photon", ParticleType.Boson, 0, { spin: 1, charge: 0 });

  interact(particle1: Particle, particle2: Particle): void {
    const force = (particle1.quantumNumbers.charge * particle2.quantumNumbers.charge) / Math.pow(Math.random(), 2);
    console.log(`Electromagnetic force between ${particle1.name} and ${particle2.name}: ${force.toExponential(2)}`);
    if (particle1.quantumNumbers.charge * particle2.quantumNumbers.charge < 0) {
      console.log("Particles attract each other");
    } else if (particle1.quantumNumbers.charge * particle2.quantumNumbers.charge > 0) {
      console.log("Particles repel each other");
    }
  }
}

// Gravitational Force
class GravitationalForce implements FundamentalForce {
  name = "Gravitational Force";
  strength = 6e-39; // relative to strong force
  range = "Infinite";
  description = "Acts between all particles with mass";
  mediator = new Particle("Graviton", ParticleType.Boson, 0, { spin: 2, charge: 0 });

  interact(particle1: Particle, particle2: Particle): void {
    const G = 6.674e-11; // Gravitational constant
    const force = (G * particle1.mass * particle2.mass) / Math.pow(Math.random(), 2);
    console.log(`Gravitational force between ${particle1.name} and ${particle2.name}: ${force.toExponential(2)} N`);
    console.log("Gravity is always attractive");
  }
}

// Strong Nuclear Force
class StrongNuclearForce implements FundamentalForce {
  name = "Strong Nuclear Force";
  strength = 1; // reference strength
  range = "~1e-15 m";
  description = "Binds quarks to form hadrons and holds atomic nuclei together";
  mediator = new Particle("Gluon", ParticleType.Boson, 0, { spin: 1, charge: 0, color: 'none' });

  interact(particle1: Particle, particle2: Particle): void {
    if ((particle1.type === ParticleType.Quark && !particle1.isComposite) || 
        (particle2.type === ParticleType.Quark && !particle2.isComposite)) {
      const colors = ['red', 'green', 'blue'];
      const color1 = particle1.quantumNumbers.color;
      const color2 = particle2.quantumNumbers.color;
      if (color1 && color2 && color1 !== color2) {
        console.log(`Strong force binds ${particle1.name} (${color1}) and ${particle2.name} (${color2})`);
        const exchangeColor = colors.find(c => c !== color1 && c !== color2);
        console.log(`Gluon exchange: ${color1} -> ${exchangeColor}, ${color2} -> ${exchangeColor}`);
      } else if (color1 && color2) {
        console.log(`No strong interaction between ${particle1.name} and ${particle2.name} (same color)`);
      } else {
        console.log(`Strong force acts on ${particle1.name} or ${particle2.name} (composite particles)`);
      }
    } else {
      console.log(`Strong force doesn't act directly on ${particle1.name} or ${particle2.name} (not individual quarks)`);
    }
  }
}

// Weak Nuclear Force
class WeakNuclearForce implements FundamentalForce {
  name = "Weak Nuclear Force";
  strength = 1e-6; // relative to strong force
  range = "~1e-18 m";
  description = "Responsible for radioactive decay and neutrino interactions";
  mediatorW = new Particle("W Boson", ParticleType.Boson, 80.4, { spin: 1, charge: 1 });
  mediatorZ = new Particle("Z Boson", ParticleType.Boson, 91.2, { spin: 1, charge: 0 });

  interact(particle1: Particle, particle2: Particle): void {
    if (particle1.type === ParticleType.Lepton || particle2.type === ParticleType.Lepton ||
        particle1.type === ParticleType.Quark || particle2.type === ParticleType.Quark) {
      console.log(`Weak interaction occurs between ${particle1.name} and ${particle2.name}`);
      if (Math.random() < 0.5) {
        console.log("W boson exchange: flavor change occurs");
        this.flavorChange(particle1);
        this.flavorChange(particle2);
      } else {
        console.log("Z boson exchange: neutral current interaction");
      }
    } else {
      console.log(`No weak interaction between ${particle1.name} and ${particle2.name}`);
    }
  }

  private flavorChange(particle: Particle): void {
    switch(particle.name) {
      case "Electron":
        console.log(`${particle.name} changes to Electron Neutrino`);
        break;
      case "Muon":
        console.log(`${particle.name} changes to Muon Neutrino`);
        break;
      case "Tau":
        console.log(`${particle.name} changes to Tau Neutrino`);
        break;
      case "Up Quark":
        console.log(`${particle.name} changes to Down Quark`);
        break;
      case "Charm Quark":
        console.log(`${particle.name} changes to Strange Quark`);
        break;
      case "Top Quark":
        console.log(`${particle.name} changes to Bottom Quark`);
        break;
      default:
        if (particle.type === ParticleType.Quark) {
          console.log(`${particle.name} changes flavor`);
        } else {
          console.log(`No flavor change for ${particle.name}`);
        }
    }
  }
}

const forces = [
  new ElectromagneticForce(),
  new GravitationalForce(),
  new StrongNuclearForce(),
  new WeakNuclearForce()
];

console.log('\n========')
console.log('FORCES:');
console.log('========\n')

forces.forEach((force: FundamentalForce) => {
  console.log(`force:`);
  console.log(`- name: ${force.name}`);
  console.log(`- strength: ${force.strength}`);
  console.log(`- range: ${force.range}`);
  console.log(`- description: ${force.description}`);
  console.log(`- mediator: ${force.mediator}\n`);
})

/**
 * Enhanced ParticleAccelerator
 **/

// particle accelerator
class EnhancedParticleAccelerator {
  private particles: Particle[] = [];
  private forces: FundamentalForce[];

  constructor(private maxEnergy: number) {
    this.forces = forces;
  }

  addParticle(particle: Particle) {
    this.particles.push(particle);
  }

  accelerate() {
    console.log(`Accelerating particles to ${this.maxEnergy} GeV`);
    this.particles.forEach(particle => {
      const momentum = Math.sqrt(this.maxEnergy ** 2 - particle.mass ** 2);
      console.log(`${particle.name} momentum: ${momentum.toExponential(2)} GeV/c`);
    });
  }

  collide() {
    if (this.particles.length < 2) {
      console.log("Need at least two particles to collide");
      return;
    }

    const p1 = this.particles[0];
    const p2 = this.particles[1];

    console.log(`\nColliding ${p1.name} with ${p2.name}`);

    // Calculate total energy
    const totalEnergy = this.maxEnergy * 2; // GeV, assuming head-on collision
    console.log(`Total collision energy: ${totalEnergy} GeV`);

    // Simulate force interactions
    this.simulateForceInteractions(p1, p2);

    // Simulate collision outcomes
    this.simulateCollisionOutcomes(p1, p2, totalEnergy);
  }

  private simulateForceInteractions(p1: Particle, p2: Particle) {
    console.log("\nForce interactions during collision:");
    this.forces.forEach(force => {
      console.log(`\n${force.name}:`);
      force.interact(p1, p2);
    });
  }

  private simulateCollisionOutcomes(p1: Particle, p2: Particle, totalEnergy: number) {
    console.log("\nCollision outcomes:");

    // Simulate particle creation
    this.simulateParticleCreation(totalEnergy);

    // Simulate decay processes
    this.simulateDecayProcesses(p1, p2);

    // Remaining energy converted to heat and radiation
    console.log("Remaining energy converted to heat and radiation");
  }

  private simulateParticleCreation(energy: number) {
    const particleCreationEvents = [
      { name: "proton-antiproton", threshold: 1.87, count: 0 },
      { name: "neutron-antineutron", threshold: 1.88, count: 0 },
      { name: "electron-positron", threshold: 0.001, count: 0 },
      { name: "muon-antimuon", threshold: 0.211, count: 0 }
    ];

    particleCreationEvents.forEach(event => {
      const pairsCreated = Math.floor(energy / event.threshold);
      if (pairsCreated > 0) {
        event.count = pairsCreated;
        energy -= pairsCreated * event.threshold;
        console.log(`Created ${pairsCreated} ${event.name} pairs`);
      }
    });

    return particleCreationEvents;
  }

  private simulateDecayProcesses(p1: Particle, p2: Particle) {
    if (p1.type === ParticleType.Quark || p2.type === ParticleType.Quark) {
      console.log("Quark-involved decay processes:");
      console.log("- Hadronization: quarks combine to form hadrons");
      console.log("- Jet formation: streams of particles from quark decay");
    }

    if (p1.type === ParticleType.Lepton || p2.type === ParticleType.Lepton) {
      console.log("Lepton-involved decay processes:");
      console.log("- Possible neutrino oscillation");
      console.log("- Lepton flavor changing interactions (via weak force)");
    }
  }
}

/**
 * particle physics expirement 1
 */

console.log("\n========");
console.log("COLLISION (1):");
console.log("========\n");

// Create particles
const upQuark = new Particle("Up Quark", ParticleType.Quark, 0.0022, { spin: 0.5, charge: 2/3, color: 'red' });
const electron = new Particle("Electron", ParticleType.Lepton, 0.000511, { spin: 0.5, charge: -1 });

// Run expirement
const lhc = new EnhancedParticleAccelerator(13000); // LHC max energy: 13 TeV
lhc.addParticle(upQuark);
lhc.addParticle(electron);

lhc.accelerate();
lhc.collide();

/**
 * particle physics expirement 2
 */

console.log("\n========");
console.log("COLLISION (2):");
console.log("========\n");

// Create particles
const electron2 = new Particle("Electron", ParticleType.Lepton, 0.000511, { spin: 0.5, charge: -1 });
const proton2 = new Particle("Proton", ParticleType.Quark, 0.938, { spin: 0.5, charge: 1 }, true); // Proton as a composite particle

// Run expirement
const lep = new EnhancedParticleAccelerator(209); // LEP energy
lep.addParticle(electron2);
lep.addParticle(proton2);

lep.accelerate();
lep.collide();