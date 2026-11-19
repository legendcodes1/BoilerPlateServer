class AppRegistry {
  static instance: AppRegistry;
  instances: any; //

  constructor() {
    if (AppRegistry.instance) {
      return AppRegistry.instance;
    }
    this.instances = new Map();
    AppRegistry.instance = this;
  }

  register(name: string, instance: object) {
    this.instances.set(name, instance);
  }

  get(name: string) {
    return this.instances.get(name);
  }

  listRegistry() {
    return Array.from(this.instances.keys());
  }

  clear() {
    this.instances.clear();
  }
}

const appRegistry = new AppRegistry();

export default appRegistry;
