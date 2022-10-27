class PC {
  constructor() {
    this.cpuBrand = null;
    this.cpuModel = null;
    this.cpuBenchmark = null;
    this.gpuBrand = null;
    this.gpuModel = null;
    this.gpuBenchmark = null;
    this.ramBrand = null;
    this.ramModel = null;
    this.ramBenchmark = null;
    this.storageType = null;
    this.storageSize = null;
    this.storageBrand = null;
    this.storageModel = null;
    this.storageBenchmark = null;
  }

  static addBrandData(parts, selectedBrand, pc) {
    //->String, String, Object
    switch (parts) {
      case "cpu":
        pc.cpuBrand = selectedBrand;
        break;
      case "gpu":
        pc.gpuBrand = selectedBrand;
        break;
      case "ram":
        pc.ramBrand = selectedBrand;
        break;
      case "hdd":
        pc.storageBrand = selectedBrand;
        break;
      case "ssd":
        pc.storageBrand = selectedBrand;
        break;
    }
  }

  static addModelData(parts, selectedModel, pc) {
    //->String, String, Object
    switch (parts) {
      case "cpu":
        pc.cpuModel = selectedModel;
        break;
      case "gpu":
        pc.gpuModel = selectedModel;
        break;
      case "ram":
        pc.ramModel = selectedModel;
        break;
      case "hdd":
        pc.storageModel = selectedModel;
        break;
      case "ssd":
        pc.storageModel = selectedModel;
        break;
    }
  }

  static addBenchmarkData(parts, benchmark, pc) {
    //->String, Int, Object
    switch (parts) {
      case "cpu":
        pc.cpuBenchmark = benchmark;
        break;
      case "gpu":
        pc.gpuBenchmark = benchmark;
        break;
      case "ram":
        pc.ramBenchmark = benchmark;
        break;
      case "hdd":
        pc.storageBenchmark = benchmark;
        break;
      case "ssd":
        pc.storageBenchmark = benchmark;
        break;
    }
  }

  static addStorageSizeData(size, pc) {
    //->String, Object
    pc.storageSize = size;
  }

  static getGamingBenchmark(pc) {
    //->Object
    let cpuScore = parseInt(pc.cpuBenchmark * 0.25);
    let gpuScore = parseInt(pc.gpuBenchmark * 0.6);
    let ramScore = parseInt(pc.ramBenchmark * 0.125);
    let storageScore = (this.storageType = "SSD"
      ? parseInt(pc.storageBenchmark * 0.1)
      : parseInt(pc.storageBenchmark * 0.025));
    return cpuScore + gpuScore + ramScore + storageScore;
  }

  static getWorkBenchmark(pc) {
    //->Object
    let cpuScore = parseInt(pc.cpuBenchmark * 0.6);
    let gpuScore = parseInt(pc.gpuBenchmark * 0.25);
    let ramScore = parseInt(pc.ramBenchmark * 0.1);
    let storageScore = parseInt(pc.storageBenchmark * 0.05);
    return cpuScore + gpuScore + ramScore + storageScore;
  }
}
